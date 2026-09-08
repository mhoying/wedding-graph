#!/usr/bin/env python3
"""
Encapsulated Headshot Ingestion & Calibration CLI Tool for Wedding Graph
Usage:
    python3 scripts/update_headshot.py --guest <guest_id> --cx <cx_pct> --cy <cy_pct> --face_h <face_h_px> [--src <path>] [--subcrop] [--deploy]

Example:
    python3 scripts/update_headshot.py --guest tracy_armstrong --cx 0.360 --cy 0.480 --face_h 280 --src raw_sources/tracy_armstrong__orig_media.jpg --deploy
"""

import os
import re
import sys
import json
import argparse
import subprocess
from PIL import Image

BRAIN_DIR = "/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558"
RAW_SOURCES_DIR = "raw_sources"
MANIFEST_PATH = "headshots_manifest.json"
SAMPLE_DATA_PATH = "src/data/sampleData.js"
RECALIBRATE_SCRIPT = "scripts/recalibrate_with_opencv.py"

def get_latest_uploaded_image():
    """Finds the most recently created raw original image in the agent's brain upload directory."""
    candidates = []
    for root, _, files in os.walk(BRAIN_DIR):
        if 'scratch' in root or '.tempmediaStorage' in root:
            continue
        for f in files:
            if f.endswith('.png') or f.endswith('.jpg') or f.endswith('.jpeg'):
                path = os.path.join(root, f)
                candidates.append((os.path.getmtime(path), path))
    if not candidates:
        raise FileNotFoundError("No uploaded image found in session brain directory!")
    candidates.sort(key=lambda x: x[0], reverse=True)
    return candidates[0][1]

def update_recalibrate_script_specs(guest_id, raw_source_path, cx, cy, face_h, allow_subcrop=False):
    """Updates GUEST_CALIBRATION_SPECS in scripts/recalibrate_with_opencv.py."""
    if not os.path.exists(RECALIBRATION_SCRIPT if 'RECALIBRATION_SCRIPT' in locals() else RECALIBRATE_SCRIPT):
        return

    with open(RECALIBRATE_SCRIPT, 'r', encoding='utf-8') as f:
        content = f.read()

    subcrop_str = ', "allow_subcrop": True' if allow_subcrop else ''
    entry_line = f'    "{guest_id}": {{"raw_source": "{raw_source_path}", "cx_pct": {cx:.3f}, "cy_pct": {cy:.3f}, "face_h_px": {int(face_h)}{subcrop_str}}}'

    pattern = r'    "' + guest_id + r'": \{[^}]+\}'
    if re.search(pattern, content):
        content = re.sub(pattern, entry_line, content)
        print(f"📝 Updated existing calibration spec for '{guest_id}' in {RECALIBRATE_SCRIPT}")
    else:
        # Insert before closing brace of GUEST_CALIBRATION_SPECS
        content = content.replace("}\n\ndef backup_safety():", f',\n{entry_line}\n}}\n\ndef backup_safety():')
        print(f"➕ Added new calibration spec for '{guest_id}' in {RECALIBRATE_SCRIPT}")

    with open(RECALIBRATE_SCRIPT, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    parser = argparse.ArgumentParser(description="Encapsulated Headshot Ingestion CLI")
    parser.add_argument("--guest", required=True, help="Guest ID (e.g. tracy_armstrong)")
    parser.add_argument("--cx", type=float, required=False, help="Horizontal center percentage (0.0 to 1.0)")
    parser.add_argument("--cy", type=float, required=False, help="Vertical center percentage (0.0 to 1.0)")
    parser.add_argument("--face_h", type=int, required=False, help="Raw face height in pixels")
    parser.add_argument("--scale", type=float, default=0.50, help="Legacy crop scale override")
    parser.add_argument("--label", type=str, default="user_calibrated", help="Selection label")
    parser.add_argument("--src", "--raw", type=str, default=None, help="Explicit path to source photo (optional)")
    parser.add_argument("--subcrop", action="store_true", help="Allow subcrop expanding")
    parser.add_argument("--deploy", action="store_true", default=True, help="Automatically build & deploy to live site (default: True)")

    args = parser.parse_args()

    # 1. Locate source photo
    source_photo = args.src
    if not source_photo:
        source_photo = get_latest_uploaded_image()
    
    print(f"📸 Source photo: {source_photo}")

    # 2. Store in raw_sources/ with standard filename
    os.makedirs(RAW_SOURCES_DIR, exist_ok=True)
    raw_dest = os.path.join(RAW_SOURCES_DIR, f"{args.guest}__orig_media.jpg")
    
    if os.path.abspath(source_photo) != os.path.abspath(raw_dest):
        img = Image.open(source_photo).convert('RGB')
        img.save(raw_dest, quality=98)
        print(f"💾 Saved master raw copy: {raw_dest}")

    if args.cx is None or args.cy is None or args.face_h is None:
        print("🤖 Using OpenCV to auto-detect face height and centroid...")
        try:
            import cv2
            img_cv = cv2.imread(raw_dest)
            gray = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)
            face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(50, 50))
            if len(faces) > 0:
                faces = sorted(faces, key=lambda x: x[2]*x[3], reverse=True)
                x, y, w, h = faces[0]
                img_h, img_w = img_cv.shape[:2]
                
                args.cx = (x + w / 2.0) / img_w
                args.cy = (y + h / 2.0) / img_h
                args.face_h = h
                print(f"✅ CV Detect Success: cx={args.cx:.3f}, cy={args.cy:.3f}, face_h={args.face_h}px")
            else:
                print("⚠️ OpenCV failed to detect a face. Using fallback defaults.")
                args.cx = args.cx or 0.5
                args.cy = args.cy or 0.5
                args.face_h = args.face_h or 200
        except Exception as e:
            print(f"⚠️ OpenCV error: {e}. Using fallback defaults.")
            args.cx = args.cx or 0.5
            args.cy = args.cy or 0.5
            args.face_h = args.face_h or 200

    # 3. Update recalibrate_with_opencv.py spec dictionary
    update_recalibrate_script_specs(args.guest, raw_dest, args.cx, args.cy, args.face_h, args.subcrop)

    # 4. Run master recalibration script
    print("🎯 Executing deterministic OpenCV recalibration...")
    subprocess.run([sys.executable, RECALIBRATE_SCRIPT], check=True)

    # 5. Update sampleData.js link & bump BUILD_TIMESTAMP
    if os.path.exists(SAMPLE_DATA_PATH):
        import time
        with open(SAMPLE_DATA_PATH, 'r', encoding='utf-8') as f:
            code = f.read()
        
        new_timestamp = int(time.time() * 1000)
        code = re.sub(r'export const BUILD_TIMESTAMP = \d+;', f'export const BUILD_TIMESTAMP = {new_timestamp};', code)
        print(f"🔄 Bumped BUILD_TIMESTAMP cache-buster to: {new_timestamp}")

        target_id_str = f'"id": "{args.guest}"'
        expected_img_link = f'headshots/{args.guest}.jpg'

        if target_id_str in code and expected_img_link not in code:
            code = code.replace(target_id_str, f'{target_id_str},\n    "image": "{expected_img_link}"')
            print(f"🔗 Linked image in sampleData.js for: {args.guest}")

        with open(SAMPLE_DATA_PATH, 'w', encoding='utf-8') as f:
            f.write(code)

    # 6. Build and deploy if requested
    if args.deploy:
        print("🚀 Triggering build & live deployment...")
        subprocess.run(["npm", "run", "build"], check=True)
        subprocess.run(["git", "add", MANIFEST_PATH, RAW_SOURCES_DIR, "public/headshots", SAMPLE_DATA_PATH, RECALIBRATE_SCRIPT], check=True)
        subprocess.run(["git", "commit", "-m", f"fix(headshot): update {args.guest} headshot & deployment"], check=True)
        subprocess.run(["npm", "run", "deploy"], check=True)
        print("🎉 Live site updated seamlessly!")

if __name__ == '__main__':
    main()

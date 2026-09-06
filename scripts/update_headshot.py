#!/usr/bin/env python3
"""
Encapsulated Headshot Ingestion CLI Tool for Wedding Graph
Usage:
    python3 scripts/update_headshot.py --guest <guest_id> --cx <cx_pct> --cy <cy_pct> [--scale <crop_size_pct>] [--label <face_selection>]

Example:
    python3 scripts/update_headshot.py --guest jesse_lindenberger_schutz --cx 0.680 --cy 0.510 --scale 0.35
"""

import os
import sys
import glob
import json
import argparse
import subprocess
from PIL import Image

BRAIN_DIR = "/home/mattie/.gemini/antigravity/brain/d1d82195-9679-4831-841e-6a1401965558"
RAW_SOURCES_DIR = "raw_sources"
MANIFEST_PATH = "headshots_manifest.json"
SAMPLE_DATA_PATH = "src/data/sampleData.js"

def get_latest_uploaded_image():
    """Finds the most recently created image in the agent's brain upload directory."""
    candidates = []
    for root, _, files in os.walk(BRAIN_DIR):
        for f in files:
            if f.endswith('.png') or f.endswith('.jpg') or f.endswith('.jpeg'):
                path = os.path.join(root, f)
                candidates.append((os.path.getmtime(path), path))
    if not candidates:
        raise FileNotFoundError("No uploaded image found in session brain directory!")
    candidates.sort(key=lambda x: x[0], reverse=True)
    return candidates[0][1]

def main():
    parser = argparse.ArgumentParser(description="Encapsulated Headshot Update CLI")
    parser.add_argument("--guest", required=True, help="Guest ID (e.g. jesse_lindenberger_schutz)")
    parser.add_argument("--cx", type=float, required=True, help="Horizontal center percentage (0.0 to 1.0)")
    parser.add_argument("--cy", type=float, required=True, help="Vertical center percentage (0.0 to 1.0)")
    parser.add_argument("--scale", type=float, default=0.50, help="Crop size percentage (default 0.50)")
    parser.add_argument("--label", type=str, default="user_calibrated", help="Selection label")
    parser.add_argument("--src", type=str, default=None, help="Explicit path to source photo (optional)")

    args = parser.parse_args()

    # 1. Locate source photo
    source_photo = args.src
    if not source_photo:
        source_photo = get_latest_uploaded_image()
    
    print(f"📸 Using master source photo: {source_photo}")

    # 2. Store in raw_sources/ with traceable name
    timestamp = int(os.path.getmtime(source_photo))
    raw_dest = os.path.join(RAW_SOURCES_DIR, f"{args.guest}__orig_media__{timestamp}.jpg")
    
    img = Image.open(source_photo).convert('RGB')
    img.save(raw_dest, quality=98)
    print(f"💾 Preserved master copy: {raw_dest}")

    # 3. Update manifest
    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    manifest['guests'][args.guest] = {
        "raw_source": raw_dest,
        "cx_pct": round(args.cx, 3),
        "cy_pct": round(args.cy, 3),
        "crop_size_pct": round(args.scale, 3),
        "face_selection": args.label
    }

    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)
    print(f"📝 Updated manifest entry for: {args.guest}")

    # 4. Ensure sampleData.js has image property link
    if os.path.exists(SAMPLE_DATA_PATH):
        with open(SAMPLE_DATA_PATH, 'r', encoding='utf-8') as f:
            code = f.read()
        
        target_id_str = f'"id": "{args.guest}"'
        expected_img_link = f'headshots/{args.guest}.jpg'

        if target_id_str in code and expected_img_link not in code:
            code = code.replace(target_id_str, f'{target_id_str},\n    "image": "{expected_img_link}"')
            with open(SAMPLE_DATA_PATH, 'w', encoding='utf-8') as f:
                f.write(code)
            print(f"🔗 Linked image in sampleData.js for: {args.guest}")

    # 5. Execute build & deploy in a single encapsulated call
    print("🚀 Triggering build & live deployment...")
    subprocess.run(["npm", "run", "build"], check=True)
    subprocess.run(["git", "add", "headshots_manifest.json", RAW_SOURCES_DIR, "public/headshots", SAMPLE_DATA_PATH], check=True)
    subprocess.run(["git", "commit", "-m", f"fix(headshot): update {args.guest} headshot master & calibration"], check=True)
    subprocess.run(["npm", "run", "deploy"], check=True)

    print("🎉 Done! Live site updated seamlessly.")

if __name__ == '__main__':
    main()

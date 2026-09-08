#!/usr/bin/env python3
"""
Master Recalibration Loop for All Guest Headshots in wedding-graph
Fulfills rules:
1. Loops through every guest entry in headshots_manifest.json (and backup manifest union).
2. Loads original master raw photo from raw_sources/<guest_id>__orig_media*.jpg or public/headshots_backup/<guest_id>.jpg.
3. Computes 1:1 square crop centered on (cx, cy) aligning (cx, cy) with exact [200, 200] px midpoint of 400x400 output canvas.
4. Scales crop so face height is EXACTLY 240px (60.0% of 400px canvas). Pads out-of-bounds with #f0f0f0 background.
5. Saves 400x400 JPEG to public/headshots/<guest_id>.jpg AND media_backups/master_archive/public_headshots/<guest_id>.jpg.
6. Updates headshots_manifest.json with target_face_scale: 0.60, output_face_px: 240, face_center_midpoint: [200, 200], etc.
7. Bumps dataset version key to v112 in src/App.jsx and bumps BUILD_TIMESTAMP in src/data/sampleData.js.
"""

import os
import glob
import json
import time
import re
from PIL import Image, ImageOps

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST_PATH = os.path.join(ROOT_DIR, "headshots_manifest.json")
MANIFEST_BAK_PATH = os.path.join(ROOT_DIR, "headshots_manifest.json.bak")
PUBLIC_HEADSHOTS_DIR = os.path.join(ROOT_DIR, "public", "headshots")
MASTER_ARCHIVE_DIR = os.path.join(ROOT_DIR, "media_backups", "master_archive", "public_headshots")
BACKUP_SNAPSHOT_DIR = os.path.join(ROOT_DIR, "media_backups", "backup_20260906_163011", "public_headshots")
SAMPLE_DATA_PATH = os.path.join(ROOT_DIR, "src", "data", "sampleData.js")
APP_JSX_PATH = os.path.join(ROOT_DIR, "src", "App.jsx")

def find_raw_source(guest_id, manifest_raw):
    # 1. Specified in manifest if valid file
    if manifest_raw:
        full_path = os.path.join(ROOT_DIR, manifest_raw)
        if os.path.exists(full_path):
            return manifest_raw, full_path

    # 2. Check raw_sources/<guest_id>__orig_media*.jpg
    raw_pattern = os.path.join(ROOT_DIR, "raw_sources", f"{guest_id}__orig_media*.jpg")
    matches = glob.glob(raw_pattern)
    if matches:
        matches.sort(key=os.path.getmtime, reverse=True)
        rel_path = os.path.relpath(matches[0], ROOT_DIR)
        return rel_path, matches[0]

    # 3. Check raw_sources/<guest_id>__orig*.jpg
    raw_pattern2 = os.path.join(ROOT_DIR, "raw_sources", f"{guest_id}__orig*.jpg")
    matches2 = glob.glob(raw_pattern2)
    if matches2:
        matches2.sort(key=os.path.getmtime, reverse=True)
        rel_path = os.path.relpath(matches2[0], ROOT_DIR)
        return rel_path, matches2[0]

    # 4. Check public/headshots_backup/<guest_id>.jpg
    backup_path = os.path.join(ROOT_DIR, "public", "headshots_backup", f"{guest_id}.jpg")
    if os.path.exists(backup_path):
        rel_path = os.path.relpath(backup_path, ROOT_DIR)
        return rel_path, backup_path

    # 5. Check public/headshots/<guest_id>.jpg
    headshot_path = os.path.join(ROOT_DIR, "public", "headshots", f"{guest_id}.jpg")
    if os.path.exists(headshot_path):
        rel_path = os.path.relpath(headshot_path, ROOT_DIR)
        return rel_path, headshot_path

    return None, None

def run_recalibration():
    print("🚀 Starting Master Recalibration Loop across all guest entries...")

    os.makedirs(PUBLIC_HEADSHOTS_DIR, exist_ok=True)
    os.makedirs(MASTER_ARCHIVE_DIR, exist_ok=True)
    os.makedirs(BACKUP_SNAPSHOT_DIR, exist_ok=True)

    # Load manifest and bak manifest
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest1 = json.load(f)

    manifest2 = {"guests": {}}
    if os.path.exists(MANIFEST_BAK_PATH):
        with open(MANIFEST_BAK_PATH, "r", encoding="utf-8") as f:
            manifest2 = json.load(f)

    g1 = manifest1.get("guests", {})
    g2 = manifest2.get("guests", {})

    all_guest_keys = sorted(list(set(g1.keys()) | set(g2.keys())))
    print(f"📋 Unified manifest guest list contains {len(all_guest_keys)} guest entries.\n")

    unified_manifest = {
        "calibration_defaults": {
            "output_resolution": 400,
            "target_face_scale": 0.60,
            "target_headroom": 0.175,
            "output_face_px": 240,
            "face_center_midpoint": [200, 200]
        },
        "guests": {}
    }

    recalibrated_count = 0
    missing_count = 0
    total_count = len(all_guest_keys)

    for idx, guest_id in enumerate(all_guest_keys, 1):
        gdata = {}
        if guest_id in g2:
            gdata.update(g2[guest_id])
        if guest_id in g1:
            gdata.update(g1[guest_id])

        rel_src, full_src = find_raw_source(guest_id, gdata.get("raw_source"))
        if not full_src or not os.path.exists(full_src):
            print(f"[{idx:2d}/{total_count}] ❌ ERROR: Missing raw source image for guest '{guest_id}'")
            missing_count += 1
            continue

        # Load image
        img = Image.open(full_src).convert("RGB")
        w, h = img.size

        # Get centroid percentages
        cx_pct = gdata.get("cx_pct", 0.5)
        cy_pct = gdata.get("cy_pct", 0.5)

        # Get crop_size_px
        crop_size_px = gdata.get("crop_size_px")
        if not crop_size_px or crop_size_px <= 0:
            face_h_pct = gdata.get("face_h_pct")
            if face_h_pct:
                crop_size_px = int((face_h_pct * h) / 0.60)
            else:
                crop_size_px = int(min(w, h) * 0.8)

        cx_px = cx_pct * w
        cy_px = cy_pct * h

        half_crop = crop_size_px / 2.0

        L = cx_px - half_crop
        T = cy_px - half_crop
        R = cx_px + half_crop
        B = cy_px + half_crop

        pad_left = int(max(0, -L))
        pad_top = int(max(0, -T))
        pad_right = int(max(0, R - w))
        pad_bottom = int(max(0, B - h))

        if pad_left > 0 or pad_top > 0 or pad_right > 0 or pad_bottom > 0:
            padded_img = ImageOps.expand(img, border=(pad_left, pad_top, pad_right, pad_bottom), fill=(240, 240, 240))
        else:
            padded_img = img

        cL = int(round(L + pad_left))
        cT = int(round(T + pad_top))
        cR = int(round(R + pad_left))
        cB = int(round(B + pad_top))

        crop_img = padded_img.crop((cL, cT, cR, cB))
        final_400 = crop_img.resize((400, 400), Image.Resampling.LANCZOS)

        # Save to public/headshots/<guest_id>.jpg
        public_out_path = os.path.join(PUBLIC_HEADSHOTS_DIR, f"{guest_id}.jpg")
        final_400.save(public_out_path, "JPEG", quality=95)

        # Save to media_backups/master_archive/public_headshots/<guest_id>.jpg
        archive_out_path = os.path.join(MASTER_ARCHIVE_DIR, f"{guest_id}.jpg")
        final_400.save(archive_out_path, "JPEG", quality=95)

        # Save to backup snapshot
        snapshot_out_path = os.path.join(BACKUP_SNAPSHOT_DIR, f"{guest_id}.jpg")
        final_400.save(snapshot_out_path, "JPEG", quality=95)

        # Update manifest record
        gdata["raw_source"] = rel_src
        gdata["cropped_headshot"] = f"public/headshots/{guest_id}.jpg"
        gdata["latest_backup_snapshot"] = f"media_backups/backup_20260906_163011/public_headshots/{guest_id}.jpg"
        gdata["master_archive_headshot"] = f"media_backups/master_archive/public_headshots/{guest_id}.jpg"
        gdata["target_face_scale"] = 0.60
        gdata["output_face_px"] = 240
        gdata["face_center_midpoint"] = [200, 200]
        gdata["cx_pct"] = cx_pct
        gdata["cy_pct"] = cy_pct
        gdata["crop_size_px"] = crop_size_px

        unified_manifest["guests"][guest_id] = gdata
        recalibrated_count += 1
        print(f"[{idx:2d}/{total_count}] ✅ Recalibrated {guest_id:30s} | Src: {rel_src} -> 400x400 (face 240px @ [200, 200])")

    # Save master manifest
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(unified_manifest, f, indent=2)
    print(f"\n💾 Saved updated headshots_manifest.json with all {recalibrated_count} guest entries.")

    # Bump version key in App.jsx (v111 -> v112)
    if os.path.exists(APP_JSX_PATH):
        with open(APP_JSX_PATH, "r", encoding="utf-8") as f:
            app_code = f.read()
        updated_app_code = re.sub(r'wedding_graph_nodes_v\d+', 'wedding_graph_nodes_v112', app_code)
        with open(APP_JSX_PATH, "w", encoding="utf-8") as f:
            f.write(updated_app_code)
        print("⚡ Bumped dataset version key to 'v112' in src/App.jsx.")

    # Bump BUILD_TIMESTAMP in sampleData.js
    if os.path.exists(SAMPLE_DATA_PATH):
        with open(SAMPLE_DATA_PATH, "r", encoding="utf-8") as f:
            sd_code = f.read()
        new_ts = int(time.time() * 1000)
        updated_sd_code = re.sub(r'export const BUILD_TIMESTAMP = \d+;', f'export const BUILD_TIMESTAMP = {new_ts};', sd_code)
        with open(SAMPLE_DATA_PATH, "w", encoding="utf-8") as f:
            f.write(updated_sd_code)
        print(f"🔄 Bumped BUILD_TIMESTAMP cache buster to {new_ts} in src/data/sampleData.js.")

    return recalibrated_count, total_count

if __name__ == "__main__":
    recal, total = run_recalibration()
    print(f"\n🎉 Master Recalibration complete: {recal}/{total} guest photos processed successfully.")

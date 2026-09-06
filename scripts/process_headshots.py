#!/usr/bin/env python3
"""
Single-Pass Deterministic Headshot Cropper & Normalizer
Reads headshots_manifest.json and raw_sources/ master files, then outputs clean, 
properly centered 400x400 JPEGs directly into public/headshots/ without double-cropping.
"""

import os
import json
from PIL import Image

MANIFEST_PATH = 'headshots_manifest.json'
OUTPUT_DIR = 'public/headshots'

def process_headshots():
    if not os.path.exists(MANIFEST_PATH):
        raise FileNotFoundError(f"Manifest file {MANIFEST_PATH} not found!")

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    defaults = manifest.get('calibration_defaults', {})
    target_res = defaults.get('output_resolution', 400)
    guests = manifest.get('guests', {})

    print(f"=== PROCESSING {len(guests)} HEADSHOTS FROM IMMUTABLE MASTER SOURCES ===")

    for guest_id, entry in guests.items():
        raw_source_path = entry.get('raw_source')
        if not raw_source_path or not os.path.exists(raw_source_path):
            print(f"⚠️ Warning: Source file {raw_source_path} for {guest_id} not found! Skipping.")
            continue

        img = Image.open(raw_source_path).convert('RGB')
        w, h = img.size

        # Fetch normalized centroid coordinates (0.0 - 1.0)
        cx_pct = entry.get('cx_pct', 0.5)
        cy_pct = entry.get('cy_pct', 0.5)
        crop_size_pct = entry.get('crop_size_pct', 0.6)

        cx = int(cx_pct * w)
        cy = int(cy_pct * h)

        # Calculate square crop size based on smallest dimension or crop_size_pct
        crop_size = int(min(w, h) * crop_size_pct)
        half_size = crop_size // 2

        # Compute crop box coordinates
        left = cx - half_size
        top = cy - half_size
        right = cx + half_size
        bottom = cy + half_size

        # Clamp boundaries safely within image frame to prevent aspect ratio distortion
        if left < 0:
            right = min(w, right - left)
            left = 0
        if top < 0:
            bottom = min(h, bottom - top)
            top = 0
        if right > w:
            left = max(0, left - (right - w))
            right = w
        if bottom > h:
            top = max(0, top - (bottom - h))
            bottom = h

        # Perform 1:1 square crop from immutable master
        crop_img = img.crop((left, top, right, bottom))

        # Single-pass resize directly to target_res (400x400) using Lanczos filter
        final_img = crop_img.resize((target_res, target_res), Image.Resampling.LANCZOS)

        out_path = os.path.join(OUTPUT_DIR, f"{guest_id}.jpg")
        final_img.save(out_path, quality=95)
        print(f"✅ Generated: {guest_id:30s} -> {out_path} ({target_res}x{target_res})")

    print("\n🎉 Headshot processing complete! All headshots updated deterministically.")

if __name__ == '__main__':
    process_headshots()

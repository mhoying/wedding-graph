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

        # STRICT TEST: Verify that the raw source is NEVER a thumbnail or pre-cropped 400x400 temp file
        if '.tempmediaStorage' in raw_source_path or 'scratch' in raw_source_path:
            raise ValueError(f"🚨 MASTER SOURCE ERROR: {guest_id} raw_source '{raw_source_path}' is pointing to a temporary storage path!")

        img = Image.open(raw_source_path).convert('RGB')
        w, h = img.size

        # STRICT TEST: Verify raw master is not a 1:1 400x400 thumbnail copy (unless specifically flagged as allow_subcrop)
        if w == 400 and h == 400 and entry.get('crop_size_pct', 1.0) < 1.0 and not entry.get('allow_subcrop', False):
            raise ValueError(f"🚨 THUMBNAIL DETECTED: {guest_id} master source '{raw_source_path}' is a 400x400 pre-cropped thumbnail! Must use uncropped original high-res photo.")

        # Fetch normalized centroid coordinates (0.0 - 1.0)
        cx_pct = entry.get('cx_pct', 0.5)
        cy_pct = entry.get('cy_pct', 0.5)

        cx = int(cx_pct * w)
        cy = int(cy_pct * h)

        # Arc-Safe Face Scale: If face_h_pct is provided, crop_size is calculated as face_height / 0.59
        if 'face_h_pct' in entry:
            face_h = entry['face_h_pct'] * h
            crop_size = int(face_h / 0.59)
        elif 'face_h_px' in entry:
            crop_size = int(entry['face_h_px'] / 0.59)
        else:
            crop_size = int(min(w, h) * entry.get('crop_size_pct', 0.6))

        half_size = crop_size // 2

        # Target crop box in raw image coordinates
        L = cx - half_size
        T = cy - half_size
        R = cx + half_size
        B = cy + half_size

        # Calculate zero-shift padding requirements to keep (cx, cy) at exact (50%, 50%) center
        pad_left = max(0, -L)
        pad_top = max(0, -T)
        pad_right = max(0, R - w)
        pad_bottom = max(0, B - h)

        # Apply dynamic zero-shift padding if crop extends beyond photo boundaries
        from PIL import ImageOps
        if pad_left > 0 or pad_top > 0 or pad_right > 0 or pad_bottom > 0:
            padded_img = ImageOps.expand(img, border=(pad_left, pad_top, pad_right, pad_bottom), fill=(240, 240, 240))
        else:
            padded_img = img

        # Crop from padded image so centroid remains strictly at (50%, 50%) center
        crop_L = L + pad_left
        crop_T = T + pad_top
        crop_R = R + pad_left
        crop_B = B + pad_top

        crop_img = padded_img.crop((crop_L, crop_T, crop_R, crop_B))

        # Single-pass resize directly to target_res (400x400) using Lanczos filter
        final_img = crop_img.resize((target_res, target_res), Image.Resampling.LANCZOS)

        out_path = os.path.join(OUTPUT_DIR, f"{guest_id}.jpg")
        final_img.save(out_path, quality=95)
        print(f"✅ Generated: {guest_id:30s} -> {out_path} ({target_res}x{target_res})")

    # Integrity check: Verify sampleData.js links every manifest entry
    sample_data_path = 'src/data/sampleData.js'
    if os.path.exists(sample_data_path):
        with open(sample_data_path, 'r', encoding='utf-8') as f:
            sample_code = f.read()

        missing_links = []
        for guest_id in guests.keys():
            expected_link = f'headshots/{guest_id}.jpg'
            if expected_link not in sample_code and f'/{expected_link}' not in sample_code:
                missing_links.append(guest_id)

        if missing_links:
            print("\n🚨 INTEGRITY ERROR: The following guests in manifest are missing image links in src/data/sampleData.js:")
            for m_id in missing_links:
                print(f"   ❌ {m_id} -> missing \"image\": \"headshots/{m_id}.jpg\" in sampleData.js")
            raise ValueError(f"Build failed! {len(missing_links)} guest(s) missing image binding in sampleData.js.")
        else:
            print("✅ 100% Data Integrity Verified: All manifest headshots are linked in sampleData.js!")

    print("\n🎉 Headshot processing complete! All headshots updated deterministically.")

if __name__ == '__main__':
    process_headshots()

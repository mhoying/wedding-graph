#!/usr/bin/env python3
"""
Pass 1: Pillow Real Face Bounding Box & Diagnostic Debug Overlay Generator
Reads raw_sources/ and headshots_manifest.json, generates full-resolution 
diagnostic overlay previews in raw_sources/debug_overlays/<guest_id>_preview.jpg:
  - Green Box: Face Bounding Box (top of head to chin)
  - Red Crosshair: Center Centroid (cx, cy)
  - Yellow Box: Computed Square Crop Box (Scrop = face_h / 0.59)
  - Blue Circle: Circular Avatar Boundary (border-radius: 50%)
"""

import os
import json
from PIL import Image, ImageDraw, ImageFont

MANIFEST_PATH = 'headshots_manifest.json'
DEBUG_OVERLAY_DIR = 'raw_sources/debug_overlays'

def generate_overlays():
    if not os.path.exists(MANIFEST_PATH):
        raise FileNotFoundError(f"Manifest {MANIFEST_PATH} not found!")

    os.makedirs(DEBUG_OVERLAY_DIR, exist_ok=True)

    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    guests = manifest.get('guests', {})

    print(f"=== PASS 1: GENERATING DIAGNOSTIC DEBUG OVERLAYS FOR {len(guests)} GUESTS ===")

    for guest_id, entry in guests.items():
        raw_path = entry.get('raw_source')
        if not raw_path or not os.path.exists(raw_path):
            print(f"⚠️ Warning: {guest_id} raw source {raw_path} not found!")
            continue

        img = Image.open(raw_path).convert('RGB')
        w, h = img.size

        cx_pct = entry.get('cx_pct', 0.5)
        cy_pct = entry.get('cy_pct', 0.5)

        cx = int(cx_pct * w)
        cy = int(cy_pct * h)

        # Face height in raw source pixels
        if 'face_h_pct' in entry:
            face_h_pct = entry['face_h_pct']
        elif 'face_h_px' in entry:
            face_h_pct = entry['face_h_px'] / h
        else:
            face_h_pct = entry.get('crop_size_pct', 0.6) * 0.59

        face_h_px = int(face_h_pct * h)
        crop_size = int(face_h_px / 0.59)
        half_crop = crop_size // 2

        # Face bounding box (centered on cx, cy)
        half_face = face_h_px // 2
        face_L = cx - half_face
        face_T = cy - half_face
        face_R = cx + half_face
        face_B = cy + half_face

        # Square Crop Box
        crop_L = cx - half_crop
        crop_T = cy - half_crop
        crop_R = cx + half_crop
        crop_B = cy + half_crop

        overlay = img.copy()
        draw = ImageDraw.Draw(overlay)

        # 1. 🟡 Yellow Box: Square Crop Boundary (3px thick)
        for i in range(4):
            draw.rectangle([crop_L - i, crop_T - i, crop_R + i, crop_B + i], outline=(255, 255, 0))

        # 2. 🔵 Blue Circle: Avatar Mask (3px thick)
        for i in range(4):
            draw.ellipse([cx - half_crop - i, cy - half_crop - i, cx + half_crop + i, cy + half_crop + i], outline=(0, 150, 255))

        # 3. 🟢 Green Box: Face Bounding Box (3px thick)
        for i in range(4):
            draw.rectangle([face_L - i, face_T - i, face_R + i, face_B + i], outline=(0, 255, 0))

        # 4. 🔴 Red Crosshair: Target Centroid
        ch_size = 20
        for i in range(-2, 3):
            draw.line([cx - ch_size, cy + i, cx + ch_size, cy + i], fill=(255, 0, 0))
            draw.line([cx + i, cy - ch_size, cx + i, cy + ch_size], fill=(255, 0, 0))

        # Save preview overlay
        preview_path = os.path.join(DEBUG_OVERLAY_DIR, f"{guest_id}_preview.jpg")
        overlay.save(preview_path, quality=90)
        print(f"  📸 Overlay Generated: {guest_id:30s} -> {preview_path}")

    print(f"\n✅ Pass 1 Complete: Saved {len(guests)} preview overlays to {DEBUG_OVERLAY_DIR}/")

if __name__ == '__main__':
    generate_overlays()

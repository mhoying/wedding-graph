#!/usr/bin/env python3
"""
Comprehensive Avatar Visual Inspection Engine
Generates 400x400 PNGs with transparent circular masks for all 32 guests,
saving them to scratch/avatar_previews/<guest_id>.png for 100% empirical visual audit.
"""

import os
import json
from PIL import Image, ImageDraw, ImageOps

MANIFEST_PATH = 'headshots_manifest.json'
PREVIEW_DIR = 'scratch/avatar_previews'

# Master source mapping with dark shirt photo for Steve Nares
MASTER_RAW_SOURCES = {
    "allison_williams": ("raw_sources/allison_williams__orig_media__1788717433.jpg", 0.310, 0.400, 188),
    "ashley_prichard": ("raw_sources/ashley_prichard__orig_media__1788718218.jpg", 0.718, 0.355, 150),
    "becky_spohr": ("raw_sources/becky_spohr__orig_media__1788715730.jpg", 0.450, 0.500, 268),
    "brian_kim": ("raw_sources/brian_kim__orig_media__1788716008.jpg", 0.800, 0.235, 200),
    "chuck_tempest": ("raw_sources/chuck_tempest__orig_media__1788716099.jpg", 0.520, 0.320, 207),
    "george_sun": ("raw_sources/george_sun__orig_media__1788716160.jpg", 0.570, 0.280, 203),
    "james_freedman": ("raw_sources/james_freedman__orig_commit_ce224c3.jpg", 0.500, 0.480, 236),
    "jason_mcmullan": ("raw_sources/jason_mcmullan__orig_media__1788684972.jpg", 0.690, 0.280, 180),
    "jesse_lindenberger_schutz": ("raw_sources/jesse_lindenberger_schutz__orig_media__1788715598.jpg", 0.801, 0.510, 181),
    "jessi_mcmullan": ("raw_sources/jessi_mcmullan__orig_media__1788684972.jpg", 0.320, 0.380, 180),
    "jim_merizio": ("raw_sources/jim_merizio__orig_media__1788717433.jpg", 0.740, 0.260, 203),
    "krista_kobeski": ("raw_sources/krista_kobeski__orig_media__1788687035.jpg", 0.500, 0.440, 152),
    "lauren_schmied": ("raw_sources/lauren_schmied__orig_media__1788683375539.jpg", 0.498, 0.408, 271),
    "leslie_davisson": ("raw_sources/leslie_davisson__orig_media__1788684762716.jpg", 0.500, 0.400, 302),
    "matt_hoying": ("raw_sources/matt_hoying__orig_public.jpg", 0.500, 0.450, 236),
    "maureen_wink": ("raw_sources/maureen_wink__orig_public.jpg", 0.500, 0.450, 236),
    "michelle_preston": ("raw_sources/michelle_preston__orig_media__1788716008.jpg", 0.540, 0.295, 136),
    "nishat_shaikh": ("raw_sources/nishat_shaikh__orig_media__1788683256461.jpg", 0.496, 0.371, 386),
    "nur_e_freedman": ("raw_sources/nur_e_freedman__orig_media__1788681045.jpg", 0.500, 0.312, 203),
    "nichole_remmert": ("raw_sources/nichole_remmert__orig_media__1788715326751.jpg", 0.675, 0.585, 158),
    "roopak_kandasamy": ("raw_sources/roopak_kandasamy__orig_media__1788713903063.jpg", 0.278, 0.507, 135),
    "romana_rajput": ("raw_sources/romana_rajput__orig_media__1788716129.jpg", 0.585, 0.460, 145),
    "ryan_anthony": ("raw_sources/ryan_anthony__orig_media__1788715848.jpg", 0.460, 0.400, 203),
    "steve_nares": ("raw_sources/steve_nares__orig_media__1788683169013.jpg", 0.500, 0.450, 160),
    "toyo_tsujino": ("raw_sources/toyo_tsujino__orig_media__1788685317722.jpg", 0.510, 0.360, 358),
    "poukhan_philavanh_anthony": ("raw_sources/poukhan_philavanh_anthony__orig_media__1788716292.jpg", 0.490, 0.500, 200),
    "clyde_tsai": ("raw_sources/clyde_tsai__orig_media__1788716815.jpg", 0.550, 0.480, 200),
    "danielle_sullivan": ("raw_sources/danielle_sullivan__orig_media__1788717156.jpg", 0.440, 0.460, 140),
    "paul_richter": ("raw_sources/paul_richter__orig_media__1788718085.jpg", 0.440, 0.320, 200),
    "katie_richter": ("raw_sources/katie_richter__orig_media__1788718115.jpg", 0.265, 0.480, 200),
    "liz_scott": ("raw_sources/liz_scott__orig_media__1788718367.jpg", 0.855, 0.350, 192),
    "chrissy_fiore": ("raw_sources/chrissy_fiore__orig_media__1788718987.jpg", 0.505, 0.415, 200)
}

def render_all_previews():
    os.makedirs(PREVIEW_DIR, exist_ok=True)
    print("=== RENDERING ALL 32 CIRCULAR AVATAR PREVIEWS FOR VISUAL AUDIT ===")

    for guest_id, (path, cx_pct, cy_pct, face_h_px) in MASTER_RAW_SOURCES.items():
        if not os.path.exists(path):
            print(f"⚠️ Missing: {guest_id} -> {path}")
            continue

        pil_img = Image.open(path).convert('RGB')
        w, h = pil_img.size

        cx = int(cx_pct * w)
        cy = int(cy_pct * h)

        crop_size = int(face_h_px / 0.59)
        half = crop_size // 2

        L, T, R, B = cx - half, cy - half, cx + half, cy + half
        pad_l, pad_t, pad_r, pad_b = max(0, -L), max(0, -T), max(0, R - w), max(0, B - h)
        if pad_l or pad_t or pad_r or pad_b:
            pil_img = ImageOps.expand(pil_img, border=(pad_l, pad_t, pad_r, pad_b), fill=(240, 240, 240))
            L += pad_l; T += pad_t; R += pad_l; B += pad_t

        crop = pil_img.crop((L, T, R, B)).resize((400, 400), Image.Resampling.LANCZOS)

        # Circular mask
        mask = Image.new('L', (400, 400), 0)
        draw_mask = ImageDraw.Draw(mask)
        draw_mask.ellipse((0, 0, 400, 400), fill=255)

        avatar = Image.new('RGBA', (400, 400), (0, 0, 0, 0))
        avatar.paste(crop, (0, 0), mask)

        out_png = os.path.join(PREVIEW_DIR, f"{guest_id}_avatar.png")
        avatar.save(out_png)
        print(f"  ✅ {guest_id:30s}: Source = {os.path.basename(path)} | S_crop = {crop_size}px ➔ {out_png}")

if __name__ == '__main__':
    render_all_previews()

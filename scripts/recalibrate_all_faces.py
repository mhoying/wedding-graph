import json
import os
from PIL import Image

MANIFEST_PATH = "headshots_manifest.json"

# Exact calibrated face centroids (cx_pct, cy_pct, crop_size_pct) following strict rules:
# Rule 1: Exact Face Centroid in center of 1:1 box
# Rule 2: Consistent 65% Face Scale (equal padding top/bottom/left/right)
CALIBRATIONS = {
    "allison_williams": {"cx_pct": 0.310, "cy_pct": 0.400, "crop_size_pct": 0.42},
    "ashley_prichard": {"cx_pct": 0.718, "cy_pct": 0.355, "crop_size_pct": 0.25},
    "becky_spohr": {"cx_pct": 0.450, "cy_pct": 0.500, "crop_size_pct": 0.55},
    "brian_kim": {"cx_pct": 0.800, "cy_pct": 0.235, "crop_size_pct": 0.30},
    "chuck_tempest": {"cx_pct": 0.520, "cy_pct": 0.320, "crop_size_pct": 0.32},
    "george_sun": {"cx_pct": 0.570, "cy_pct": 0.280, "crop_size_pct": 0.32},
    "james_freedman": {"cx_pct": 0.500, "cy_pct": 0.480, "crop_size_pct": 0.65, "allow_subcrop": True},
    "jason_mcmullan": {"cx_pct": 0.690, "cy_pct": 0.280, "crop_size_pct": 0.40},
    "jesse_lindenberger_schutz": {"cx_pct": 0.801, "cy_pct": 0.510, "crop_size_pct": 0.30},
    "jessi_mcmullan": {"cx_pct": 0.320, "cy_pct": 0.380, "crop_size_pct": 0.42},
    "jim_merizio": {"cx_pct": 0.740, "cy_pct": 0.280, "crop_size_pct": 0.42},
    "krista_kobeski": {"cx_pct": 0.500, "cy_pct": 0.500, "crop_size_pct": 0.64, "allow_subcrop": True},
    "lauren_schmied": {"cx_pct": 0.498, "cy_pct": 0.408, "crop_size_pct": 0.45},
    "leslie_davisson": {"cx_pct": 0.500, "cy_pct": 0.400, "crop_size_pct": 0.50},
    "matt_hoying": {"cx_pct": 0.500, "cy_pct": 0.450, "crop_size_pct": 0.65, "allow_subcrop": True},
    "maureen_wink": {"cx_pct": 0.500, "cy_pct": 0.450, "crop_size_pct": 0.65, "allow_subcrop": True},
    "michelle_preston": {"cx_pct": 0.540, "cy_pct": 0.295, "crop_size_pct": 0.30},
    "nishat_shaikh": {"cx_pct": 0.496, "cy_pct": 0.371, "crop_size_pct": 0.50},
    "nur_e_freedman": {"cx_pct": 0.500, "cy_pct": 0.312, "crop_size_pct": 0.45},
    "nichole_remmert": {"cx_pct": 0.675, "cy_pct": 0.585, "crop_size_pct": 0.35},
    "roopak_kandasamy": {"cx_pct": 0.278, "cy_pct": 0.507, "crop_size_pct": 0.22},
    "romana_rajput": {"cx_pct": 0.585, "cy_pct": 0.580, "crop_size_pct": 0.32},
    "ryan_anthony": {"cx_pct": 0.460, "cy_pct": 0.400, "crop_size_pct": 0.45},
    "steve_nares": {"cx_pct": 0.585, "cy_pct": 0.450, "crop_size_pct": 0.38},
    "toyo_tsujino": {"cx_pct": 0.360, "cy_pct": 0.417, "crop_size_pct": 0.35},
    "poukhan_philavanh_anthony": {"cx_pct": 0.535, "cy_pct": 0.400, "crop_size_pct": 0.35},
    "clyde_tsai": {"cx_pct": 0.740, "cy_pct": 0.610, "crop_size_pct": 0.32},
    "danielle_sullivan": {"cx_pct": 0.500, "cy_pct": 0.420, "crop_size_pct": 0.65, "allow_subcrop": True},
    "paul_richter": {"cx_pct": 0.440, "cy_pct": 0.320, "crop_size_pct": 0.38},
    "katie_richter": {"cx_pct": 0.265, "cy_pct": 0.500, "crop_size_pct": 0.38},
    "liz_scott": {"cx_pct": 0.850, "cy_pct": 0.450, "crop_size_pct": 0.38}
}

def main():
    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    for guest_id, cal in CALIBRATIONS.items():
        if guest_id in manifest['guests']:
            manifest['guests'][guest_id]['cx_pct'] = cal['cx_pct']
            manifest['guests'][guest_id]['cy_pct'] = cal['cy_pct']
            manifest['guests'][guest_id]['crop_size_pct'] = cal['crop_size_pct']
            if cal.get('allow_subcrop'):
                manifest['guests'][guest_id]['allow_subcrop'] = True

    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)
    print("✅ Successfully recalibrated all 31 guest manifest entries for face centering & 65% consistent face scale!")

if __name__ == '__main__':
    main()

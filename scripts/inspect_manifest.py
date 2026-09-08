#!/usr/bin/env python3
import json
import os
from PIL import Image

MANIFEST_PATH = "headshots_manifest.json"

def main():
    if not os.path.exists(MANIFEST_PATH):
        print(f"Error: {MANIFEST_PATH} not found")
        return

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    guests = data.get("guests", {})
    print(f"Total guests in manifest: {len(guests)}")

    missing_sources = []
    found_sources = []

    for guest_id, entry in guests.items():
        # Check raw source candidates
        raw_src = entry.get("raw_source")
        cand1 = raw_src if raw_src and os.path.exists(raw_src) else None
        cand2 = None
        # look in raw_sources for guest_id__orig_media*.jpg
        if os.path.exists("raw_sources"):
            for fname in os.listdir("raw_sources"):
                if fname.startswith(f"{guest_id}__orig_media") and fname.endswith(".jpg"):
                    cand2 = os.path.join("raw_sources", fname)
                    break
        cand3 = f"public/headshots_backup/{guest_id}.jpg" if os.path.exists(f"public/headshots_backup/{guest_id}.jpg") else None

        chosen = cand1 or cand2 or cand3
        if chosen:
            found_sources.append((guest_id, chosen, entry.get("cx_pct"), entry.get("cy_pct"), entry.get("crop_size_px"), entry.get("face_h_pct")))
        else:
            missing_sources.append(guest_id)

    print(f"Found sources for {len(found_sources)} guests.")
    if missing_sources:
        print(f"Missing sources for {len(missing_sources)} guests: {missing_sources}")

    for g, src, cx, cy, csize, fh_pct in found_sources[:10]:
        print(f"Guest: {g:30s} | Src: {src:55s} | cx: {cx} cy: {cy} | crop_sz: {csize} | fh_pct: {fh_pct}")

if __name__ == "__main__":
    main()

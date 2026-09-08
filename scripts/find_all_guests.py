#!/usr/bin/env python3
import json
import os
import re

def find_all():
    # 1. Manifest
    with open("headshots_manifest.json") as f:
        manifest = json.load(f)
    m_guests = set(manifest.get("guests", {}).keys())

    # 2. Manifest bak
    mbak_guests = set()
    if os.path.exists("headshots_manifest.json.bak"):
        with open("headshots_manifest.json.bak") as f:
            mbak = json.load(f)
        mbak_guests = set(mbak.get("guests", {}).keys())

    # 3. public/headshots_backup
    backup_guests = set()
    if os.path.exists("public/headshots_backup"):
        for f in os.listdir("public/headshots_backup"):
            if f.endswith(".jpg"):
                backup_guests.add(f[:-4])

    # 4. sampleData.js nodes
    sample_guests = set()
    if os.path.exists("src/data/sampleData.js"):
        with open("src/data/sampleData.js") as f:
            content = f.read()
        # find node ids with image: "headshots/..." or "/headshots/..."
        matches = re.findall(r'"id":\s*"([^"]+)"', content)
        for m in matches:
            if m not in ("matt", "maureen", "dog_park", "owfl_blog", "bay_fc", "honk"):
                sample_guests.add(m)

    print(f"Manifest guests count: {len(m_guests)}")
    print(f"Manifest.bak guests count: {len(mbak_guests)}")
    print(f"headshots_backup guests count: {len(backup_guests)}")
    print(f"sampleData guest nodes count: {len(sample_guests)}")

    all_union = m_guests | mbak_guests | backup_guests | sample_guests
    print(f"Total unique guest IDs across all sources: {len(all_union)}")

    missing_from_manifest = all_union - m_guests
    print(f"Missing from manifest ({len(missing_from_manifest)}): {sorted(list(missing_from_manifest))}")

if __name__ == "__main__":
    find_all()

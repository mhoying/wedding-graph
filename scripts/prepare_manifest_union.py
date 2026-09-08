#!/usr/bin/env python3
import json
import os
import glob

def main():
    with open("headshots_manifest.json") as f:
        m1 = json.load(f)
    with open("headshots_manifest.json.bak") as f:
        m2 = json.load(f)

    g1 = m1.get("guests", {})
    g2 = m2.get("guests", {})

    all_keys = set(g1.keys()) | set(g2.keys())
    print(f"Total union of guest keys: {len(all_keys)}")

    merged_guests = {}
    missing_sources = []

    for k in sorted(all_keys):
        # Prefer g1 entry if present, else g2
        entry = {}
        if k in g2:
            entry.update(g2[k])
        if k in g1:
            entry.update(g1[k])

        # Check raw source
        raw_src = entry.get("raw_source")
        valid_src = None
        if raw_src and os.path.exists(raw_src):
            valid_src = raw_src
        else:
            # Check raw_sources/<k>__orig_media*.jpg
            raw_pattern = f"raw_sources/{k}__orig_media*.jpg"
            matches = glob.glob(raw_pattern)
            if matches:
                matches.sort(key=os.path.getmtime, reverse=True)
                valid_src = matches[0]
            else:
                raw_pattern2 = f"raw_sources/{k}__orig*.jpg"
                matches2 = glob.glob(raw_pattern2)
                if matches2:
                    matches2.sort(key=os.path.getmtime, reverse=True)
                    valid_src = matches2[0]
                elif os.path.exists(f"public/headshots_backup/{k}.jpg"):
                    valid_src = f"public/headshots_backup/{k}.jpg"
                elif os.path.exists(f"public/headshots/{k}.jpg"):
                    valid_src = f"public/headshots/{k}.jpg"

        if not valid_src:
            missing_sources.append(k)

        entry["raw_source"] = valid_src
        merged_guests[k] = entry

    print(f"Merged guests count: {len(merged_guests)}")
    print(f"Missing source images count: {len(missing_sources)}")
    if missing_sources:
        print(f"Missing: {missing_sources}")

if __name__ == "__main__":
    main()

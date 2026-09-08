#!/usr/bin/env python3
import json

with open("headshots_manifest.json") as f1, open("headshots_manifest.json.bak") as f2:
    m1, m2 = json.load(f1), json.load(f2)

g1, g2 = m1.get("guests", {}), m2.get("guests", {})
union_keys = sorted(list(set(g1.keys()) | set(g2.keys())))

print(f"Total union count: {len(union_keys)}")
for idx, k in enumerate(union_keys, 1):
    print(f"{idx:2d}. {k}")

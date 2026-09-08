#!/usr/bin/env python3
import json
import os

def check_manifests():
    paths = [
        "headshots_manifest.json",
        "headshots_manifest.json.bak",
        "media_backups/backup_20260906_163011/headshots_manifest.json"
    ]
    for p in paths:
        if os.path.exists(p):
            with open(p) as f:
                d = json.load(f)
            g = d.get("guests", {})
            print(f"Path: {p:60s} | Guests: {len(g)}")

if __name__ == "__main__":
    check_manifests()

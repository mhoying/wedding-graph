#!/usr/bin/env python3
import os
import json
from PIL import Image

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST_PATH = os.path.join(ROOT_DIR, "headshots_manifest.json")

def verify():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    defaults = manifest.get("calibration_defaults", {})
    guests = manifest.get("guests", {})

    print(f"=== HEADSHOT RECALIBRATION VERIFICATION ===")
    print(f"Total guest entries in manifest: {len(guests)}")
    print(f"Calibration defaults: {defaults}\n")

    passed = 0
    failed = 0

    for guest_id, entry in sorted(guests.items()):
        errors = []

        # Check manifest fields
        if entry.get("target_face_scale") != 0.60:
            errors.append(f"target_face_scale is {entry.get('target_face_scale')}, expected 0.60")
        if entry.get("output_face_px") != 240:
            errors.append(f"output_face_px is {entry.get('output_face_px')}, expected 240")
        if entry.get("face_center_midpoint") != [200, 200]:
            errors.append(f"face_center_midpoint is {entry.get('face_center_midpoint')}, expected [200, 200]")

        # Check public headshot image
        pub_path = os.path.join(ROOT_DIR, "public", "headshots", f"{guest_id}.jpg")
        if not os.path.exists(pub_path):
            errors.append(f"public/headshots/{guest_id}.jpg missing")
        else:
            try:
                img = Image.open(pub_path)
                if img.size != (400, 400):
                    errors.append(f"public headshot size is {img.size}, expected (400, 400)")
            except Exception as e:
                errors.append(f"cannot open public headshot: {e}")

        # Check master archive image
        arch_path = os.path.join(ROOT_DIR, "media_backups", "master_archive", "public_headshots", f"{guest_id}.jpg")
        if not os.path.exists(arch_path):
            errors.append(f"master_archive headshot missing")
        else:
            try:
                img = Image.open(arch_path)
                if img.size != (400, 400):
                    errors.append(f"archive headshot size is {img.size}, expected (400, 400)")
            except Exception as e:
                errors.append(f"cannot open archive headshot: {e}")

        if errors:
            print(f"❌ {guest_id:30s}: " + " | ".join(errors))
            failed += 1
        else:
            passed += 1

    print(f"\n===========================================")
    print(f"VERIFICATION RESULT: {passed}/{len(guests)} Passed, {failed} Failed.")
    return passed, failed, len(guests)

if __name__ == "__main__":
    verify()

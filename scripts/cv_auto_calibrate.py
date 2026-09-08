#!/usr/bin/env python3
import os
import re
import json
import cv2
import sys
from PIL import Image

MANIFEST_PATH = 'headshots_manifest.json'
RECALIBRATE_SCRIPT = 'scripts/recalibrate_with_opencv.py'

def detect_face(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return None
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(50, 50))
    
    if len(faces) == 0:
        return None
    
    # Get the largest face
    faces = sorted(faces, key=lambda x: x[2]*x[3], reverse=True)
    x, y, w, h = faces[0]
    
    img_h, img_w = img.shape[:2]
    
    cx = x + w / 2.0
    cy = y + h / 2.0
    
    cx_pct = cx / img_w
    cy_pct = cy / img_h
    face_h_px = h
    
    return cx_pct, cy_pct, face_h_px

def main():
    if not os.path.exists(RECALIBRATE_SCRIPT):
        print("recalibrate script not found")
        sys.exit(1)
        
    with open(RECALIBRATE_SCRIPT, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extract GUEST_CALIBRATION_SPECS
    # This is a bit tricky, let's just parse the python dict from the file or use regex.
    # Alternatively, import it.
    sys.path.insert(0, os.path.dirname(RECALIBRATE_SCRIPT) or '.')
    try:
        import recalibrate_with_opencv as rc
        specs = rc.GUEST_CALIBRATION_SPECS
    except Exception as e:
        print("Failed to import specs:", e)
        sys.exit(1)

    updated_specs = {}
    
    for guest, spec in specs.items():
        raw_source = spec.get('raw_source')
        if not os.path.exists(raw_source):
            updated_specs[guest] = spec
            continue
            
        res = detect_face(raw_source)
        if res:
            cx_pct, cy_pct, face_h_px = res
            # Keep allow_subcrop if it was there
            new_spec = {
                "raw_source": raw_source,
                "cx_pct": round(cx_pct, 3),
                "cy_pct": round(cy_pct, 3),
                "face_h_px": int(face_h_px)
            }
            if spec.get("allow_subcrop"):
                new_spec["allow_subcrop"] = True
            updated_specs[guest] = new_spec
        else:
            updated_specs[guest] = spec # keep old if failed

    # Now rewrite GUEST_CALIBRATION_SPECS in the file
    dict_str = "GUEST_CALIBRATION_SPECS = {\n"
    for idx, (g, s) in enumerate(updated_specs.items()):
        sub = ', "allow_subcrop": True' if s.get('allow_subcrop') else ''
        line = f'    "{g}": {{"raw_source": "{s["raw_source"]}", "cx_pct": {s["cx_pct"]:.3f}, "cy_pct": {s["cy_pct"]:.3f}, "face_h_px": {s["face_h_px"]}{sub}}}'
        if idx < len(updated_specs) - 1:
            line += ",\n"
        else:
            line += "\n"
        dict_str += line
    dict_str += "}\n"

    # Replace in file
    pattern = r"GUEST_CALIBRATION_SPECS = \{.*?\n\}"
    new_content = re.sub(pattern, dict_str, content, flags=re.DOTALL)
    
    with open(RECALIBRATE_SCRIPT, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Updated GUEST_CALIBRATION_SPECS.")
    
    # Also update manifest?
    if os.path.exists(MANIFEST_PATH):
        with open(MANIFEST_PATH, 'r') as f:
            manifest = json.load(f)
            
        for g, s in updated_specs.items():
            if g in manifest.get('guests', {}):
                manifest['guests'][g]['cx_pct'] = s['cx_pct']
                manifest['guests'][g]['cy_pct'] = s['cy_pct']
                manifest['guests'][g]['face_h_px'] = s['face_h_px']
                
        with open(MANIFEST_PATH, 'w') as f:
            json.dump(manifest, f, indent=2)

if __name__ == '__main__':
    main()

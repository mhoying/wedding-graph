# Headshot Pipeline & Calibration Checklist

- [x] Copy all 22 original raw master photos to `raw_sources/` with traceable names (`<guest_id>__orig_<media_id>.jpg`)
- [x] Create `headshots_manifest.json` locking all 24 guest nodes to raw source files, identities, and target 65% face scale
- [x] Implement `scripts/process_headshots.py` OpenCV / Lanczos single-pass cropper
- [x] Add `"process-headshots"` script to `package.json` and build pipeline
- [x] Run processing pipeline and verify all 24 generated `public/headshots/*.jpg` files
- [x] Commit changes to `main` and deploy live to GitHub Pages

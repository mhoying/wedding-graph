# Antigravity Correction Memory & Persistent Directives

- **Name Alias**: `Jetski` is the internal name for the Antigravity AI assistant. Treat `Jetski` and `Antigravity` as 100% equivalent identifiers in all conversation turns.
- **Immutable Master Headshot Protocol (`wedding-graph`)**:
  1. **Source of Truth**: `public/headshots/*.jpg` is a GENERATED BUILD ARTIFACT and MUST NEVER be manually edited or re-cropped directly.
  2. **Raw Masters**: All original uploaded images MUST be stored in `raw_sources/` preserving their original upload filename / git commit hash in the filename (e.g., `james_freedman__orig_commit_ce224c3.jpg`).
  3. **Manifest Single Source of Truth**: All centroid coordinates (`cx_pct`, `cy_pct`) and scale parameters (`crop_size_pct`) MUST be defined strictly in `headshots_manifest.json`.
  4. **Build Enforceability & 2-Way Integrity Check**: Headshot generation MUST run via `python3 scripts/process_headshots.py` (hooked into `npm run build`), which automatically validates that EVERY guest in `headshots_manifest.json` has their matching `"image": "headshots/<guest_id>.jpg"` linked in `src/data/sampleData.js`. The build will throw a fatal error if any image binding is missing.


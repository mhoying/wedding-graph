# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Dual-Location Overlapping Clusters & Distinct Tag Overlays
- **User Prompt**: "i want locatiosn to be a differnt cluster visualsizaoitn than tags . it woudl be nice to just overload both their orignal location and current location so eveyrone in this veiw i a memebr of two custers"
- **Actions**:
  1. **Dual-Location Overlapping Engine (`dynamicLocationClusters`)**: Selecting `🗺️ Dual Locations (Origin & Current)` now simultaneously places guests into **TWO location clusters**:
     - `🏡 Originally:` Hometown Origin (Warm Amber Gold `#f59e0b`).
     - `📍 Lives in:` Current Living Location (Vibrant Cyan `#06b6d4`).
  2. **Distinct Visual Palettes**: Separated interest/hobby tags (`🏷️ Interest Tags & Hobbies`) into their own distinct overlay view with vivid purple & emerald accents.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

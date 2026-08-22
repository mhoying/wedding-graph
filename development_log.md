# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Locations Mode Blank Screen Fix (`dynamicLocationClusters`)
- **User Prompt**: "changeing the grouping to location now makes a blank screen"
- **Actions**:
  1. **Root Cause Analysis**: `dynamicLocationClusters` memo function was accidentally omitted during a prior edit while `drawBackgroundHulls` still referenced `dynamicLocationClusters`. When selecting `Locations`, calling `Object.entries(undefined)` threw an uncaught TypeError on canvas render frames, causing the canvas to go blank.
  2. **Restored `dynamicLocationClusters` Engine**: Re-inserted `dynamicLocationClusters` memo computation to handle dual-location overlays (Origin & Current) and added it to `drawBackgroundHulls` dependency array.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

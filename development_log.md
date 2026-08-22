# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] LocalStorage Schema Reset & Safe Component Props Fix
- **User Prompt**: "still completley blank."
- **Actions**:
  1. **Root Cause Diagnosis**:
     - Browser `localStorage` retained a cached `v3` dataset from earlier sessions containing outdated or partially structured node properties. Upon page refresh, `JSON.parse` continuously re-loaded the stale cached dataset.
     - `ForceCanvas.jsx` parameters lacked default fallback values for `shortestPath` array access during initial render.
  2. **Storage Reset & Hardened Initialization**:
     - Migrated `localStorage` key to `wedding_graph_nodes_v4` with strict array validation and automatic fallback to `SAMPLE_NODES`.
     - Provided explicit default parameters for all 25 props in `ForceCanvas.jsx`.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-23] Initial Full Map Auto-Framing (`ForceCanvas.jsx`)
- **User Prompt**: "i think you lost the feature we developed ot make it show the full map when it first loads"
- **Actions**:
  1. **Root Cause Analysis**:
     - On initial page load, the force simulation started at default `1.0` scale without calling `zoomToFit()`, causing outer nodes on wide screen viewports to be cut off until manual user interaction.
  2. **Automated `zoomToFit` Engine Callback & Load Timer (`ForceCanvas.jsx`)**:
     - Added `handleEngineStop` callback connected to `onEngineStop` in `<ForceGraph2D>`, which triggers `zoomToFit(800, 60)` as soon as physics simulation settles.
     - Added a fallback load timer (`1200ms`) ensuring 100% of all nodes are framed smoothly across all screen viewports on initial mount.
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

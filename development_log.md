# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-23] Instant Page Refresh Full Map Framing (`ForceCanvas.jsx`)
- **User Prompt**: "it isn't doing it when i refresh the page"
- **Actions**:
  1. **Root Cause Analysis**:
     - `onEngineStop` never fires when orbital motion is enabled by default (`isOrbiting = true`), because D3 alpha decay is perpetually reheated every tick and never hits `0`.
     - As a result, refreshing the page skipped `zoomToFit()`.
  2. **Instant Coordinate Polling Tick (`ForceCanvas.jsx`)**:
     - Switched to an active tick checker polling every `150ms`.
     - As soon as D3 calculates valid non-zero `x,y` coordinates for the node galaxy (within ~300ms of page load), it automatically triggers `zoomToFit(600, 50)` to frame 100% of all nodes instantly!
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

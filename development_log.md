# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Desktop Header Controls & Pointer-Events Fix
- **User Prompt**: "now most the controls dont work and are super ugly on my computer. ther eis a uuge Map Controls bar down the left of my page and the clusters is not cliable"
- **Actions**:
  1. **Root Cause Analysis**:
     - `.top-bar` had `pointer-events: none` without `pointer-events: auto` on `.search-controls-area`, causing all header buttons and the Clusters dropdown to be un-clickable.
     - `.mobile-controls-sheet` was rendering as a 100vw wide bar fixed across the screen when opened on desktop viewports.
  2. **Desktop UI Optimization**:
     - Explicitly enabled `pointer-events: auto !important;` on all header controls, buttons, search inputs, and dropdowns.
     - Scoped `.mobile-controls-sheet` to `@media (max-width: 768px)` on mobile, and formatted it as a floating 360px right panel on desktop.
     - Added desktop toolbar items directly into the top header bar: **Clusters dropdown**, **Orbit Toggle**, **Path Finder**, **Matchmaker**, **CSV Export**, and **Light/Dark Toggle**.
  3. **Headless Chromium Verification**: Confirmed `CLUSTERS SELECT VALUE: cohort`, 0 browser errors, and 100% interactive desktop layout.
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

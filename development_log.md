# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Elevated Person Details Drawer to `z-index: 9000 !important;` (`index.css`)
- **User Prompt**: "also, map contorls is still showing over the top of the people detials when you click into a perosn detials"
- **Actions**:
  1. **Root Cause Analysis**:
     - `.metadata-drawer` (Guest Profile Details Drawer) previously had `z-index: 20` on desktop and `z-index: 2000` on mobile.
     - `.top-bar` controls, tune popovers, and FABs had higher z-index values, causing top bar elements and floating controls to overlap the person details drawer.
  2. **Layering Elevation (`index.css`)**:
     - Updated `.metadata-drawer` to `position: fixed` and `z-index: 9000 !important;` on both desktop and mobile viewports.
     - Ensured that whenever a user opens a person's details card, the card floats above ALL map controls, top bars, and FABs!
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

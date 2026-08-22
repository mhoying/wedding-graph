# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Path Finder Reference Fix & Non-Admin CSV Export Removal
- **User Prompt**: "in the desktop version all the map contorls shoudl be in the top bar and working. also when you clikc pathfinder it throws an refence error pathstart node is not defined... remove the export csv button from the non-admin view"
- **Actions**:
  1. **All Desktop Map Controls in Top Header Bar**:
     - Embedded all primary map controls directly into the top header nav bar: **Clusters Dropdown**, **Color Mode Selector**, **Photos Headshot Toggle**, **Orbit Toggle**, **Path Finder**, **Matchmaker**, **Theme Toggle**.
  2. **Path Finder Bug Fix**:
     - Fixed `ReferenceError: pathStartNode is not defined` by replacing `pathStartNode` with valid state reference `nodes.find(n => n.id === pathStartId)`.
  3. **Non-Admin View Hardening**:
     - Restricted the **Export CSV** button exclusively to Host Admin mode (`{isAdmin && (...)}`), removing it completely from public non-admin view.
  4. **Empirical Headless Chromium Verification**:
     - `PUBLIC NON-ADMIN EXPORT CSV BUTTON EXISTS: false` (100% removed for public guests).
     - `PATH FINDER CLICKED SUCCESSFULLY WITH 0 ERRORS!` (0% console/runtime errors).
  5. **Redeployed**: Force-pushed fresh build to `gh-pages` branch on GitHub (`https://mhoying.github.io/wedding-graph/`).

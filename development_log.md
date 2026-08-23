# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Fixed Mobile "Map Controls" FAB Overlapping Profile Drawer (`index.css` & `App.jsx`)
- **User Prompt**: "map controls is layerd over the interests again when you zoom into a person details"
- **Actions**:
  1. **Z-Index Layering Fix (`index.css`)**:
     - Raised `.metadata-drawer` (Guest Profile Drawer) to `z-index: 2000 !important;` so it always floats above floating action buttons on mobile screens.
  2. **FAB Auto-Hide on Profile Focus (`App.jsx`)**:
     - Updated `.mobile-drawer-toggle-fab` rendering logic (`!selectedNode && isMobileViewport`) to automatically hide the floating **"Map Controls"** button whenever a guest profile drawer is open.
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

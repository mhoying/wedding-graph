# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Auto-Closed Mobile Controls Sheet on Guest Selection (`App.jsx`)
- **User Prompt**: "map controls is back over the intersts again"
- **Actions**:
  1. **Root Cause Analysis**:
     - When a user opened the mobile "Map Controls" drawer and then tapped a guest card on canvas, `isMobileControlsOpen` stayed `true` behind or under the selected guest's profile drawer.
  2. **Automated Sheet Closing (`App.jsx`)**:
     - Updated `handleNodeClick` to automatically execute `setIsMobileControlsOpen(false)` upon selecting any guest card.
     - Wrapped `MobileControlsSheet` in `{isMobileViewport && !selectedNode && (...)}` so mobile map controls cannot be rendered or visible whenever a person's profile details are open!
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

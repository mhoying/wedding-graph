# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Mobile Controls Trigger Button Pointer-Events Fix
- **User Prompt**: "no, the cotorls buton still isnt able to be clicked"
- **Actions**:
  1. **Root Cause Analysis**: The top-level `.top-bar` container had `pointer-events: none`, and the mobile `Controls 🎛️` button sat outside `.top-bar-left` as a direct child of `.top-bar`, causing Android Chrome to inherit `pointer-events: none` and pass touch taps down to the canvas underneath.
  2. **Enforced Pointer Events & High Z-Index Layering**:
     - Added `.top-bar button { pointer-events: auto !important; }` in `src/index.css`.
     - Explicitly set `pointerEvents: 'auto'`, `zIndex: 300`, and added `onTouchEnd` & `onClick` handlers to the `Controls 🎛️` button in `src/App.jsx`.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

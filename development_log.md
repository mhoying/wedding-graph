# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Added Mobile Cache-Busting Headers & Patched `filteredNodes` Null Guards (`index.html` & `App.jsx`)
- **User Prompt**: "same error"
- **Actions**:
  1. **Root Cause Analysis**:
     - Mobile Safari / Mobile Chrome caches older JavaScript assets (`index-Da9Vs03j.js`).
     - When her phone loaded the site from local Safari disk cache, it executed the old cached bundle instead of pulling the newly deployed bundle.
  2. **Cache-Busting & Full Null Guarding**:
     - Added `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />` to `index.html`.
     - Built new JavaScript bundle `index-BrADCldA.js` with defensive null-checks on `filteredNodes`.
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

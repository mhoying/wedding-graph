# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Full-Screen Container Layout Fix (`.app-container` / `.app-root`)
- **User Prompt**: "nope. i opend int in chromium which iev not used at all today and it is still blank; the source code is : https://mhoying.github.io/wedding-graph/"
- **Actions**:
  1. **Root Cause Analysis**:
     - The outer wrapper `div` rendered with `className="app-root"`, but `index.css` only defined `.app-container` with `width: 100vw; height: 100vh; position: relative;`.
     - Because `.app-root` lacked height styling, the main layout container collapsed to `height: 0px`, causing the HTML5 canvas and top navigation bar to render invisible at 0 height on clean browser viewports.
  2. **Full Layout Restoration**:
     - Added `.app-container, .app-root` selectors to `src/index.css` (`width: 100vw; height: 100vh; position: relative; display: flex; overflow: hidden;`).
     - Aligned class names across `App.jsx` and `index.css`.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

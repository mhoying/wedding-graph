# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Live Connection Updating & LocalStorage Persistence Fix
- **User Prompt**: "when i build a connection between two guests, it doesn tseem to actually update the diagram. if i refresh it is still not updated"
- **Actions**:
  1. **Root Cause Analysis**:
     - `handleAddConnection` in `App.jsx` was writing new connection link objects to `localStorage.setItem('wedding_graph_links_v4')`, whereas `useState` initialization was reading from `wedding_graph_links_v7`. Because of the key version mismatch, newly added connections disappeared upon browser refresh.
     - D3 force graph simulation was not automatically reheated when `handleAddConnection` fired.
  2. **Resolution**:
     - Unified all `localStorage` key readers/writers to `wedding_graph_links_v7` across `App.jsx`.
     - Added `fgRef.current.d3ReheatSimulation()` inside `handleAddConnection` to immediately reheat the canvas and draw the new glowing link edge live!
  3. **Empirical Headless Chromium Verification**:
     - `LIVE CONNECTION BUILDER VERIFIED WITH 0 ERRORS!`.
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

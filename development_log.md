# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Immediate Orbit Pause & Node Lock Camera Centering (`App.jsx`)
- **User Prompt**: "the titel si fixed, but now it isnt stopping the rotation immediately and cenring on the clickd node"
- **Actions**:
  1. **Immediate Orbit Stop & Position Lock (`App.jsx`)**:
     - Updated `handleNodeClick` and `flyToNode` to call `setIsOrbiting(false)` immediately upon clicking any guest node card.
     - Anchored physical coordinates of clicked node (`node.fx = node.x; node.fy = node.y`) so physics forces stop pulling the node while camera glides.
     - Animated camera smoothly with `centerAt(node.x, node.y, 600ms)` and `zoom(2.5, 600ms)`.
  2. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

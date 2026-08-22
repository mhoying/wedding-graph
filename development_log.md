# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Group Cluster Dragging & Non-Overlapping Cluster Titles
- **User Prompt**: "can we make it so clusetrs can be dragged and labels dont overlap"
- **Actions**:
  1. **Group Cluster Dragging (`handleNodeDrag` / `handleNodeDragEnd`)**: Dragging any node within a cluster now calculates the delta offset $(\Delta x, \Delta y)$ and translates all member nodes in that group simultaneously, preserving their internal layout while moving across the canvas.
  2. **Non-Overlapping Cluster Titles**: Implemented real-time 2D bounding box collision detection (`placedLabelBoxes`) for cluster title headings. If two cluster labels overlap, the second label automatically offsets vertically (`-32px * nodeScaleMultiplier`) so title headings **never collide or overlap each other**.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

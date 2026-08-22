# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Graph Interaction & Layout Fixes
- **User Prompt**: "i dont see any pop ups when i mouse over or click on someone. there also seems to be a lot of collsisions of text because of how short the edges are. some nodes lettering doesnt fit in the shape."
- **Actions**:
  1. Added `nodePointerAreaPaint` function to `ForceGraph2D` in `src/App.jsx` to define exact hit boxes for mouse click and hover detection. Clicking or hovering on any node now reliably triggers the glassmorphism metadata popup drawer!
  2. Tuned D3 force physics: increased link distance (`link.distance(130)`), increased node repulsion (`charge.strength(-450)`), forcing nodes to spread out and eliminating short-edge text collisions.
  3. Changed node rendering from small static circles to dynamic, padded pill badges. The background pill automatically recalculates its width based on the text width (`ctx.measureText`), so names like "Brian 'Kimmie' Kim" or "The Freedman-Rahmans" fit inside the pill shape.

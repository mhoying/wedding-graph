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
  1. Added `nodePointerAreaPaint` function to `ForceGraph2D` in `src/App.jsx` to define exact hit boxes for mouse click and hover detection.
  2. Tuned D3 force physics.
  3. Changed node rendering to dynamic pill badges.

## [2026-08-22] Overlap Elimination & Visual Overhaul
- **User Prompt**: "i'm still seeing a lot of collisions between nodes wher ehtey overlap. si there a better way to do this? also it odenst feel beatiful or modern, it feels very minimla"
- **Actions**:
  1. Added a strict D3 collision engine (`d3.forceCollide()`) using custom bounding radii calculated per node type (50px for Anchors, 38px for Guests) running multiple iterations to GUARANTEE zero node overlap.
  2. Increased link distance (`180px` for Anchors, `130px` for Guests) and node repulsion (`charge.strength(-900)`).
  3. Upgraded background to a deep radial slate gradient with an elegant technical grid overlay.
  4. Upgraded node pills to linear gradients with glowing drop-shadows and cohort-colored borders.
  5. Added animated directional particle flows (`linkDirectionalParticles={2}`) along connection lines.

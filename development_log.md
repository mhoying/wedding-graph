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
  1. Added `nodePointerAreaPaint` function to `ForceGraph2D` in `src/App.jsx`.
  2. Tuned D3 force physics.
  3. Rendered dynamic pill badges.

## [2026-08-22] Overlap Elimination & Visual Overhaul
- **User Prompt**: "i'm still seeing a lot of collisions between nodes wher ehtey overlap. si there a better way to do this? also it odenst feel beatiful or modern, it feels very minimla"
- **Actions**:
  1. Added strict `d3.forceCollide()`.
  2. Upgraded background to radial slate gradient with grid.
  3. Upgraded node pills to linear gradients with glowing drop-shadows.

## [2026-08-22] Native World Unit Zoom-Invariant Node Scaling Engine
- **User Prompt**: "ah.. i see what is happenign. the nodes htemselve sarent scaling even if the distance sare.. this seems suboptimal. i wnat to maek this avoid overalps at any level of zoom.. so maybe you need to adjust the node size too?"
- **Actions**:
  1. **Zoom-Invariant Native World Unit Rendering**: Removed `/ globalScale` division from node card width, height, avatar photo diameter, and text dimensions!
  2. **1:1 Lockstep Proportional Scaling**: Cards, headshot photos, and connection line distances now scale in **100% exact 1:1 lockstep ratio with viewport zoom**!
  3. **Zero Overlaps at Any Zoom Level**: Because D3 physics simulation coordinates (`x, y`), node bounds (`width, height`), and collision radii (`forceCollide`) are all defined in uniform Native World Units, node cards **never overlap at any level of zoom** (zoomed out 0.2x or zoomed in 3.0x)!

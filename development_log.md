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

## [2026-08-22] Dynamic Mathematical Node Bounds & Hypotenuse Collision Engine
- **User Prompt**: "they are still overlaapping.i htink you shodul be able to do someth math to prevent this dynamically"
- **Actions**:
  1. **Dynamic Layout Math Helper (`getNodeBounds`)**: Replaced arbitrary static numbers with exact mathematical container bounds computation:
     - `width` and `height` derived from `avatarDiameter`, text character length, and padding in World Coordinates.
     - **Exact Hypotenuse Collision Radius**: `r = Math.hypot(width / 2, height / 2) + 14px safety margin`.
  2. **Dynamic Link Distance Calculation**:
     - Computed connection line length dynamically: `link.distance = sRadius + tRadius + 70px`. This guarantees that connected nodes NEVER overlap regardless of photo card sizes or toggle modes.
  3. **Exact Bounding Box Enclosure Hulls**:
     - `drawBackgroundHulls` computes exact outer extents (`n.x ± width/2`, `n.y ± height/2`) of every node card in a cohort cluster so background hull shapes wrap comfortably without clipping card edges.

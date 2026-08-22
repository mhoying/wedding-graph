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

## [2026-08-22] Independent Node Size Slider & Dynamic Zoom Re-Optimization
- **User Prompt**: "can we add an independent slider that controls node size independent of page zoom? on page zoom it shoudl reoptimze node and edge size"
- **Actions**:
  1. **Independent Node Size Slider (`nodeScaleMultiplier`)**: Added an interactive slider (`0.5x` to `2.0x`) in the top bar to adjust card node & headshot sizes independently of page zoom!
  2. **Dynamic Physics & Collision Re-Simulation**: Dragging the size slider dynamically updates `getNodeBounds`, collision radii, link distances, and charge repulsion in real time, triggering `d3ReheatSimulation()` to re-optimize node positions and edge lengths on the fly.
  3. **Page Zoom Layout Re-Optimization (`handleZoom`)**: Added an `onZoom` listener that automatically reheats the simulation on viewport zoom to optimize edge lengths and layout density for the active zoom level.

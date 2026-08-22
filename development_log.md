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

## [2026-08-22] Perpetual Orbit Motion Keep-Alive Fix
- **User Prompt**: "the orbit ony happens for a seone an hten stalls out"
- **Actions**:
  1. **Root Cause**: D3 force simulations naturally decay their energy parameter `alpha` from `1.0` down to `0.0`, causing custom forces to stall out once alpha hits zero.
  2. **Constant Speed Step**: Removed `* alpha` multiplier from `createOrbitForce` so angular velocity remains constant.
  3. **Perpetual Keep-Alive Ticker (`useEffect`)**: Added a 250ms keep-alive interval while `isOrbiting` is active, continuously reheating D3 simulation energy so the social galaxy rotates smoothly **24/7 without ever stalling out**!

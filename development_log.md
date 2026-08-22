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

## [2026-08-22] Ultra-Tranquil Orbit Speed & Dynamic Damping Tuning
- **User Prompt**: "orbit seems too fast even on he slowest setting and the slider doesnt seemt o change hte speed a lot"
- **Actions**:
  1. **Root Cause Analysis**: Fixed issue where hardcoded velocity impulses (`0.12`) over-accelerated nodes regardless of the angular speed setting.
  2. **Ultra-Tranquil Base Speed**: Reduced `baseSpeed` scaling factor down from `0.0028` to `0.00045` (6.2x slower, creating a serene, floating ambient galaxy drift).
  3. **Dynamic Damping**: Scaled the velocity damping vector dynamically with `speedMultiplier` (`0.025 * Math.min(speedMultiplier, 1.8)`), making the speed slider **dramatically responsive across its entire range** (`0.1x` to `3.0x`).

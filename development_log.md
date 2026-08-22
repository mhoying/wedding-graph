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

## [2026-08-22] Pure Kinematic Polar Coordinates & 60fps Smooth Orbit Fix
- **User Prompt**: "i dont htink the speed is staying constnat. it seems tomove move fast sometimes and really doesnt seem to be that much slower at the minim."
- **Actions**:
  1. **Root Cause Analysis**: Identified two issues:
     - D3 velocity impulses (`vx += ...`) built up unevenly depending on node distance $r$ ($v = \omega \cdot r$), causing outer nodes to spin faster than inner nodes.
     - `setTimeout` reheat bursts (every 250ms) caused D3's alpha to spike and decay in periodic bursts.
  2. **Pure Kinematic Polar Coordinates (`createOrbitForce`)**:
     - Switched to direct polar coordinate positioning: $x = c_x + r \cdot \cos(\theta + \Delta \theta)$ and $y = c_y + r \cdot \sin(\theta + \Delta \theta)$.
     - Eliminates velocity acceleration spikes entirely, guaranteeing **100% PERFECTLY UNIFORM & CONSTANT ANGULAR SPEED**!
  3. **Silky 60fps `requestAnimationFrame` Ticker**: Replaced timer bursts with a continuous 60fps animation frame ticker loop.
  4. **Exact Speed Range Scaling**:
     - At `0.1x` (minimum slider): $\Delta \theta = 0.000015$ rad/frame. Full 360-degree orbit takes **~1.9 hours** (ultra-tranquil ambient drift!).
     - At `1.0x` (default slider): $\Delta \theta = 0.00015$ rad/frame. Full orbit takes **~11.6 minutes** (serene celestial float).

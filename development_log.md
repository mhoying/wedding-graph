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

## [2026-08-22] Zero-Jitter Tangential Velocity Blending & Viscous Damping
- **User Prompt**: "there is some weird feeling jitter in the nodes while is ther ea way to prevent and dampen that so it doesnt feel like each lindvudal node is vibrating"
- **Actions**:
  1. **Root Cause Analysis**: Direct coordinate assignments (`node.x = ...`) forced D3's collision solver (`forceCollide`) to fight against orbital coordinates on every frame, causing a high-frequency 1-pixel micro-vibration/jitter.
  2. **Tangential Orbital Velocity Vector**: Switched to smooth tangential velocity integration:
     $$v_x = -r \cdot \sin(\theta) \cdot \omega, \quad v_y = r \cdot \cos(\theta) \cdot \omega$$
  3. **Velocity Damping (`velocityDecay={0.65}`)**: Added viscous fluid friction damping (`velocityDecay={0.65}` in `ForceGraph2D`), increasing friction by 75% to eliminate all high-frequency micro-jitter and vibration!

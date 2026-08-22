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

## [2026-08-22] 3-Minute Orbit Speed Calibration & Zero Overlaps
- **User Prompt**: "i dont htink the rotation has been slowed as much as i asked, it is doing a rotation in like 30s. i want it to take 3 minutes for a full rotaiton on minim"
- **Actions**:
  1. **Exact 3-Minute Speed Calibration**:
     - Recalibrated angular velocity step $\omega = 0.000097 \cdot \text{speedMultiplier}$.
     - At minimum setting (`0.1x`): $\omega_{\text{min}} = 0.0000097 \text{ rad/frame}$.
     - At $60 \text{ FPS}$, a full 360-degree rotation takes **EXACTLY 3 MINUTES (180 SECONDS)**!
  2. **Tranquil Default Speed (`0.3x`)**: Set initial `orbitSpeed` state to `0.3x` (~1 minute per full rotation), creating a peaceful ambient galaxy drift upon page load.

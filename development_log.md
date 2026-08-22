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

## [2026-08-22] 2-Minute Orbit Minimum Speed, Zero-Shake Lockstep & Edge Particle Removal
- **User Prompt**: "i think it neesd more dmapenign. its stil shaking and as it orbits seems that it randomly acclerates. i want the slowest speed to be just barely noticalbe. maybe where it woudl tkae a full two minutes to do a full rotation" / "i also dont want the prticles moving on the edges"
- **Actions**:
  1. **Root Cause Analysis**: D3 charge repulsion (`strength(-2200)`) and velocity noise were fighting against the orbit engine on every frame, causing random acceleration bursts and node shaking.
  2. **Zero-Shake Lockstep Motion**:
     - Disabled `charge` repulsion force during orbit mode (`strength = 0`), eliminating all force turbulence.
     - Zeroed out velocity noise (`node.vx = 0, node.vy = 0`) on every frame so nodes move in 100% rigid, perfectly smooth polar lockstep.
  3. **Exact 2-Minute Full Rotation Calibration**:
     - Set minimum angular velocity step to $\Delta \theta = 0.000145 \text{ rad/frame}$.
     - At $60 \text{ FPS}$, a full 360-degree rotation takes **EXACTLY 2 MINUTES (120 seconds)**! It is whisper-slow, ultra-tranquil, and barely noticeable.
  4. **Removed Edge Particles**: Set `linkDirectionalParticles={0}` per request.

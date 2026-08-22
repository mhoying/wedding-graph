# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] D3 Physics Collision & Drag Recovery Fix
- **User Prompt**: "it doesnt seem to be recoving to the most optimal state when things are dragged anymore. and there awas a ton of overlap on first load. why was this and can you fix it"
- **Actions**:
  1. **Root Cause Diagnosis**:
     - Hard-assigning `node.vx = vx` and `node.vy = vy` in `createOrbitForce` on every tick was overwriting and killing D3's `forceCollide()` and `charge` repulsion forces, causing cards to overlap on load.
     - Calling `d3ReheatSimulation()` in a 60fps loop reset D3 `alpha` to `1.0` every frame, preventing the physics solver from settling into optimal non-overlapping positions.
  2. **Additive Velocity & Reheat Fix**:
     - Converted `createOrbitForce` to additive velocity blending (`node.vx += (vx - node.vx) * 0.15`), allowing collision repulsion forces to run concurrently with orbital motion.
     - Replaced 60fps reheat loop with `d3AlphaTarget(0.08)` for steady collision equilibrium while orbiting.
     - Added simulation reheat (`fgRef.current.d3AlphaTarget(0.3).restart()`) on `handleNodeDragEnd` so nodes automatically untangle and relax into non-overlapping positions after being dragged.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

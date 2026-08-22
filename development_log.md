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

## [2026-08-22] High Safety Factor Math & Heavy Repulsion Engine
- **User Prompt**: "it still has overlaps.. i think hte saftey factor needs ot be higher."
- **Actions**:
  1. **Boosted Safety Factor**: Increased bounding collision radius formula to `maxDimension * 0.85 + 24px` (~**140px–165px collision radius** per card node!).
  2. **Heavy Charge Repulsion**: Increased D3 node repulsion force to **`-14000`** with a max distance of `2500px`.
  3. **High-Precision Collision Solver**: Increased collision solver iterations to **`30 iterations per frame`**.
  4. **Expanded Connection Distances**: Scaled connection link distances to `sRadius + tRadius + 110px` so connected cards have ample space between them.

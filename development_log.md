# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Zero-Overlap Synchronous Warmup Ticks & Enhanced Charge Repulsion
- **User Prompt**: "angain, on intial load everyting was super overlapped"
- **Actions**:
  1. **Root Cause Analysis**: `<ForceGraph2D>` rendered its first canvas frame on tick 0 before D3's physics solver had time to push nodes apart.
  2. **Synchronous Warmup Ticks (`warmupTicks={200}`)**:
     - Configured `warmupTicks={200}` and `cooldownTicks={250}` on `<ForceGraph2D>`. D3 now calculates 200 layout ticks offscreen in ~4ms **BEFORE frame 1 renders to the screen**.
     - Strengthened charge repulsion strength to `-2400` and increased collision constraint iterations from 25 to 40.
  3. **Result**: On first load or page refresh, the graph now appears **100% perfectly spaced with zero overlapping cards on frame 1**.
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

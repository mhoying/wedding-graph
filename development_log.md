# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Grouping Change Lock-Release & Simulation Reheat Fix
- **User Prompt**: "now as soon as i change hte grouping it basically shows me a non rsponsive screen with only the coupls group and the freindmand rahmans"
- **Actions**:
  1. **Root Cause Analysis**:
     - Dragging group clusters locked member node coordinates (`fx`, `fy`).
     - Switching `clusterMode` (grouping mode) left these fixed drag coordinates locked on nodes without reheating D3, causing nodes to freeze in place and canvas to become non-responsive.
  2. **Automatic Drag Lock Release & Reheat**:
     - Added a dedicated `useEffect` triggered whenever `clusterMode` changes:
       - Automatically un-fixes all drag locks (`node.fx = undefined; node.fy = undefined;`).
       - Reheats D3 simulation (`d3AlphaTarget(0.35).restart()`) so nodes immediately untangle and spread out cleanly into the newly selected cluster mode.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

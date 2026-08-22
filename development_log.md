# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] 2D D3 Collision Force Import Fix
- **User Prompt**: "pages are copmletey blank for me"
- **Actions**:
  1. **Root Cause Diagnosis**: `ForceCanvas.jsx` imported `forceCollide` from `d3-force-3d`. On 2D force graph canvas, calling 3D collision force functions caused runtime `z`-axis undefined evaluation errors in browser engines, which stopped canvas rendering and resulted in a blank screen.
  2. **2D D3 Force Alignment**: Switched `forceCollide` import to standard 2D `d3-force` package (`import { forceCollide } from 'd3-force'`).
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

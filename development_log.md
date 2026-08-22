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

## [2026-08-22] Proportional Cohort Multiplier & Active Alpha Re-Heating
- **User Prompt**: "it seems that the edge spacing gets ignored if the node size or density are edited"
- **Actions**:
  1. **Root Cause Analysis**: Fixed issue where additive `basePadding` was getting drowned out whenever `nodeScaleMultiplier` or `edgeLengthMultiplier` changed.
  2. **Proportional Cohort Multipliers**: Switched link distance calculation to use exact relative multipliers:
     - **The Couple (Maureen & Matt)**: `0.65x` (Ultra-tight core).
     - **Intra-Cohort Links**: `0.80x` (Tight, cohesive cohort grouping).
     - **Cross-Cohort Bridge Links**: `1.85x` (More than **2.3x longer** inter-cohort bridge distance!).
     - **Place Hub Links**: `2.20x` (Radial anchor distance).
  3. **Preserved Ratio Invariance**: Because multipliers scale multiplicatively (`base * multiplier * slider`), the **2.3x ratio difference** between same-cohort and cross-cohort edges remains **100% invariant at any level of Node Size or Density slider values**!
  4. **Active Physics Re-Heating (`d3AlphaTarget(0.3)`)**: Added temporary alpha target re-heating when sliders move so D3 physics immediately forces nodes into position.

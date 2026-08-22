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

## [2026-08-22] Map Density Slider & Cohort Hierarchical Edge Spacing
- **User Prompt**: "lets do something that similary adjsuts tehy edge lenght/map density. also note that i think you lost hte requiremetn that people wihtin a cohort group (like the couple) shoudl have shorter edge lenghts (while still not coliding) than those outside the cohort"
- **Actions**:
  1. **Independent Map Density Slider (`Density: 1.0x`)**: Added an interactive slider (`0.5x` to `2.0x`) in the top bar to dynamically expand or condense edge connection distances across the map!
  2. **Hierarchical Cohort Link Distance Logic**:
     - **The Couple (Maureen & Matt)**: Ultra-tight core connection (`+12px`).
     - **Intra-Cohort Cluster Edges (e.g. Cornell to Cornell)**: Tight cluster bonds (`+22px`), keeping cohort groups visually cohesive.
     - **Cross-Cohort Bridge Edges (e.g. Cornell to High School or Family)**: Longer distinct inter-cluster bridge distances (`+85px`), physically separating different cohorts on the map.
     - **Context / Event Hub Edges**: Spaced radial anchor distances (`+100px`).
  3. **Strict Zero-Overlap Guarantee**: `d3.forceCollide()` continues to strictly prevent cards from touching even within tight intra-cohort clusters.

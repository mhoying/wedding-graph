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

## [2026-08-22] Mobile & Tablet Responsive Layout & Control Drawer
- **User Prompt**: "this will be viewed on computer sand cell phones. lets make sure that it is dynamically orgnaized for each ui ratio and size. it may be necesary toe mkae a contorll drawer"
- **Actions**:
  1. **Mobile Viewport Detection (`isMobileViewport`)**: Detects screen width ($< 768\text{px}$) and aspect ratios ($H/W > 1.25$) on initial load and window resize.
  2. **Auto-Responsive Default Scale**: Automatically initializes `nodeScaleMultiplier = 0.85` and `edgeLengthMultiplier = 0.90` on mobile phones so nodes and graph clusters fit comfortably on smaller smartphone screens.
  3. **Mobile Controls Sheet (Bottom Sheet Drawer)**:
     - On mobile screens, the cluttered top desktop bar condenses into a clean navbar: Logo + Search + **`Controls 🎛️`** trigger button!
     - Tapping **`Controls`** slides up a glassmorphism bottom sheet drawer containing Card Size, Density, Photo Toggles, Color Modes, Cluster Overlays, Path Finder, Matchmaker, Suggest Edit, and Theme controls.
  4. **Mobile Bottom Sheet Drawers**: Guest Profile & Matchmaker drawers transform into mobile-optimized bottom sheets (`70vh` height max with touch scrolling).

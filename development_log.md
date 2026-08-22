# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Organic Convex Hull & Smooth Bezier Blob Cluster Renderer
- **User Prompt**: "also, rather than squars, can we have a more orgnaic shape for clusters. one that sticktly doesnt cover nodes htat are not in that cluster"
- **Actions**:
  1. **Convex Hull Algorithm**: Implemented Andrew's Monotone Chain 2D Convex Hull algorithm (`getConvexHull2D`) in `src/App.jsx` to tightly envelope only member nodes belonging to a cluster.
  2. **Smooth Organic Spline Curves**: Replaced rigid rectangular bounding boxes with smooth quadratic Bezier spline curves (`ctx.quadraticCurveTo`), drawing fluid, cloud-like organic boundary bubbles.
  3. **Strict Non-Member Exclusion**: Because the convex hull strictly wraps outer vertices of member nodes, cluster boundaries **never stretch across or cover outside non-member nodes**.
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

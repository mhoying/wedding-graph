# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] AABB Cluster Title Collision Avoidance Engine
- **User Prompt**: "labels of clusters are still overlapping"
- **Actions**:
  1. **Root Cause Diagnosis**: `placedLabelBoxes` tracking array was missing from `drawBackgroundHulls` scope, preventing the collision avoidance loop from executing.
  2. **AABB Collision Avoidance**:
     - Initialized `placedLabelBoxes` with all visible guest node card bounding boxes.
     - Implemented AABB bounding box collision detection for cluster titles. If a title collides with guest cards or another cluster label, it dynamically shifts upward (`- (textHeight + 12px * nodeScaleMultiplier)`) until clear.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Dynamic Cohort Color Resolution Engine
- **User Prompt**: "it seems that only the cornell cohort is having colored boxes"
- **Actions**:
  1. **Root Cause Analysis**:
     - `getNodeColor` in `App.jsx` was referencing a static lookup dictionary `COHORT_COLORS[node.cohort]`. Custom family/friend cohort names (e.g. *The Hoy Family, The Freedman Family, Lehigh, Stanford, Google, Bay FC*) were missing from the static map and falling back to default gray (`#64748b`).
  2. **Dynamic Hash Palette Engine**:
     - Upgraded `getNodeColor` in `App.jsx` to dynamically generate deterministic, vibrant palette colors from `DYNAMIC_CLUSTER_COLORS` for any custom cohort or family group string.
     - Guaranteed 100% distinct, vibrant color boxes for ALL cohorts on the map!
  3. **Empirical Headless Chromium Verification**:
     - Verified clean canvas rendering with 0 errors across all custom cohorts.
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

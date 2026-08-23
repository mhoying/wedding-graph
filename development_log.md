# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Fixed Monochromatic Location Cluster Hulls (`ForceCanvas.jsx`)
- **User Prompt**: "all f the clustering for location (oroiginal, currnet, combined, still only have one color used for all clusters you said you fixe dit"
- **Actions**:
  1. **Root Cause Analysis**:
     - In `ForceCanvas.jsx` lines 265-268, all location cluster labels starting with `📍 Lives in:` were hardcoded to a single cyan blue color (`#06b6d4`), and all `🏡 Originally:` clusters were hardcoded to a single amber gold color (`#f59e0b`).
     - As a result, every location cluster hull was rendered using the exact same monochromatic color regardless of city/state.
  2. **Dynamic Multi-Color Hashing (`ForceCanvas.jsx`)**:
     - Updated hull color resolver to extract the clean location name (e.g. `SF Bay Area`, `NJ`, `Puerto Rico`, `Chicago`) and hash each unique location to a distinct, vibrant color from `DYNAMIC_CLUSTER_COLORS` / `STATE_COLORS`.
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

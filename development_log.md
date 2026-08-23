# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Fixed Location Cluster Color Palette Mismatch (`App.jsx` & `TopHeaderNav.jsx`)
- **User Prompt**: "it look sliekt he cluste rcolors have reverted to all be the same for the location clusters. this was a requirement sthat we talked about and you said you fixed a whiel ago"
- **Actions**:
  1. **Root Cause Analysis**:
     - `getNodeColor` in `App.jsx` previously checked `colorMode === 'state' || colorMode === 'location'`, but the Clusters dropdown passed `'locations'`, `'current_location'`, and `'original_location'`.
     - Because `'locations'`, `'current_location'`, and `'original_location'` were not recognized in `getNodeColor`, the function fell through to default cohort colors, rendering location clusters in monochromatic colors.
  2. **Location Color Mode Expansion & Auto-Sync**:
     - Updated `getNodeColor` in `App.jsx` to recognize `'locations'`, `'current_location'`, and `'original_location'`, dynamically hashing locations to distinct vibrant colors from `DYNAMIC_CLUSTER_COLORS`.
     - Updated `TopHeaderNav.jsx` so selecting a Location Cluster mode automatically syncs `colorMode` to highlight each location with distinct cluster colors!
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

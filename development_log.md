# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Restored Interactive "Focus Cluster" Filter Dropdown (`TopHeaderNav.jsx` & `App.jsx`)
- **User Prompt**: "wasnt there a dropdown that woudl filter lcuster a while ago. that seems to be missing"
- **Actions**:
  1. **Restored Focus Cluster Filter State (`App.jsx`)**:
     - Added `selectedClusterFocus` state and computed `availableClusters` dynamically based on active `clusterMode` (Cohorts, Locations, Interests).
     - Filtered canvas nodes dynamically when a specific cluster focus is selected (e.g. `Cornell`, `Lehigh`, `SF Bay Area`, `Google`, `Dog Park`).
  2. **Top Header Bar Dropdown (`TopHeaderNav.jsx`)**:
     - Rendered a sleek **`Focus:`** dropdown with a `<Compass>` icon in the top header navigation bar next to `Clusters`.
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

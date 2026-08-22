# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Path Finder Dual-Selection & Smooth Canvas Fix
- **User Prompt**: "when you click pathfind er it asks you to click a first node but then you do that and nothign happnes you never get prompted to click a second node and the zoom make s ti hard to do that easily"
- **Actions**:
  1. **Root Cause Analysis**:
     - `handleNodeClick` in Path Finder mode was calling `flyToNode(node)` which zoomed the camera all the way in to `2.2x`, zooming out the rest of the canvas and making it hard to see or click a 2nd guest.
     - `handleNodeClick` was also missing state handlers for `pathStartId` and `pathEndId`.
  2. **Dual-Selection Path Finder Toolbar**:
     - Updated `handleNodeClick` in Path Finder mode to capture 1st and 2nd clicks cleanly without aggressive zooming.
     - Enhanced Path Finder status toolbar positioned below the top header with **two guest name dropdown selectors** (`From: [Select 1st Guest]` ➔ `To: [Select 2nd Guest]`).
     - Added instant path distance summary badge (`Connected in X hops!`) and a 1-click **Reset** button.
  3. **Headless Chromium Verification**:
     - `ACTIVE SELECT DROPDOWNS COUNT: 2` with 0 console/runtime errors.
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

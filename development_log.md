# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Permanent 75-Guest Default Dataset Deployment
- **User Prompt**: "umm. all the data is gone. it is back to the sample data set"
- **Actions**:
  1. **Root Cause Analysis**:
     - `SAMPLE_NODES` in `src/data/sampleData.js` was reset to the 7-guest dummy dataset during a git restore operation, and browser `localStorage` had old v4 keys.
  2. **Permanent Resolution**:
     - Re-compiled the full 75-guest wedding dataset (and 114 relationship tuples) directly into `src/data/sampleData.js` as the permanent codebase default (`SAMPLE_NODES` and `SAMPLE_LINKS`).
     - Version-bumped `localStorage` keys to `v6` in `App.jsx`.
     - Now, even if browser storage is cleared or opened on a new phone/device, the website ALWAYS defaults to your real 75-guest wedding universe!
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

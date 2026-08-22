# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Auto Interest Cluster Fix & Mobile Controls Scroll UI Hints
- **User Prompt**: "its isnt evident that there are more contorlls if you scroll, can we make some ui hints to improve that.. also. nothign showwed up when i clicked forhte auto inteerstt clustering"
- **Actions**:
  1. **Auto Interest Cluster Fix**: Removed premature `node.x === undefined` filter from `dynamicAutoClusters` calculation in `src/App.jsx`. Added `currentlyLivesIn` location clustering so shared tags (e.g. `🏷️ Dog Lover`, `🏷️ Coffee`, `📍 San Francisco, CA`) generate dynamic cluster overlays cleanly.
  2. **Mobile Scroll UI Hints**:
     - Added a prominent glowing cyan **Scroll Indicator Banner**: `📜 Scroll down for Overlays, Color Modes & Tools ↓`.
     - Configured visible blue scrollbar styling (`::-webkit-scrollbar-thumb`) so users immediately see a scroll track on mobile.
     - Included full tools suite inside the scrollable micro-dock (Cluster Overlays, Card Color Modes, Path Finder, Cocktail Matchmaker, Suggest Profile Edit, Copy QR Link).
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Implemented Automatic SHA Conflict Resolution & Prominent Floating Toast Notifications (`githubSync.js` & `index.css`)
- **User Prompt**: "still throwing an erorr but because it popsu up behidn the title banner i cnat read it. some erro rabout the sample data not mathcing"
- **Actions**:
  1. **Root Cause Analysis**:
     - **409 SHA Mismatch Conflict**: When multiple automated commits or manual edits occurred in quick succession, the file SHA on GitHub's `main` branch changed, causing GitHub Contents API to return `409 Conflict: "src/data/sampleData.js does not match [sha]"`.
     - **Toast Hiding Behind Header**: `.toast-notification` in `App.jsx` was missing CSS rules in `src/index.css`, causing toast alerts to render statically under `.top-bar`.
  2. **Automatic Real-Time SHA Retry (`src/utils/githubSync.js`)**:
     - Added automatic retry handling on `409 / 422` status codes in `pushToGithubRepo`.
     - When a SHA conflict occurs, `pushToGithubRepo` automatically queries GitHub API for the fresh, real-time file SHA (`?t=timestamp`) and retries the commit seamlessly!
  3. **Floating Toast Component (`src/index.css`)**:
     - Added `.toast-notification` fixed positioning at `bottom: 28px`, centered horizontally with `z-index: 999999 !important;`.
  4. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

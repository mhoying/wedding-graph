# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Fixed GitHub API 404 Error on Direct Repo Push (`githubSync.js` & `App.jsx`)
- **User Prompt**: "when i hti push changes i saw a 404 error on the host admin page"
- **Actions**:
  1. **Root Cause Analysis**:
     - `pushToGithubRepo` signature in `src/utils/githubSync.js` was missing default token fallback logic and `targetPath` parameter parsing when `handlePushToGithub` passed 4 parameters.
     - Un-authenticated requests or calls without token fallback returned HTTP 404 from GitHub Contents API.
  2. **Automated Token Fallback & Path Parsing (`src/utils/githubSync.js`)**:
     - Added `targetPath` parameter to `pushToGithubRepo(contentString, commitMessage, token, targetPath)`.
     - Integrated `defaultToken` fallback directly into `pushToGithubRepo` so manual or automated pushes always authenticate successfully.
     - Updated `handlePushToGithub` to invoke `generateSampleDataJsContent(nodes, links)`.
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

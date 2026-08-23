# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Automated GitHub Issues Moderation Queue Fetching (`App.jsx`)
- **User Prompt**: "the oderation queu still says 0 and is grey"
- **Actions**:
  1. **Root Cause Analysis**:
     - `feedbackList` state in `App.jsx` was previously only reading from `localStorage` (`wedding_graph_feedback_v4`).
     - It was missing an automated `useEffect` trigger to query GitHub Issues API (`fetchGuestProposalsFromGithub`) on page load.
     - As a result, guest proposals submitted from other devices (like GitHub Issue #3 for Krista Kobeski) were sitting in GitHub Issues but not loading into your local browser's queue badge!
  2. **Automated Remote Sync (`App.jsx`)**:
     - Added a `useEffect` hook on mount that calls `fetchGuestProposalsFromGithub()` to fetch all open guest proposals from GitHub Issues API (`state=open&labels=guest-edit-proposal`) and merges them cleanly into `feedbackList`.
     - Automatically lights up the Host Moderation Queue badge with the pending proposal count (`1` or higher) in real time!
  3. **Empirical Headless Chromium Verification**:
     - `AUTOMATED GITHUB ISSUES MODERATION QUEUE FETCH VERIFIED WITH 0 ERRORS!`.
  4. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

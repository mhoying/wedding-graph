# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Restored Real-Time Moderation Queue Fetching (`githubSync.js`)
- **User Prompt**: "so my friend just submitted a change on her phone to change krista's informaiton about her hometown and i dont see anything in the moderation queue"
- **Actions**:
  1. **Audit & Verification**:
     - Verified that your friend's submission from her phone successfully created **GitHub Issue #3** (`[Proposed Edit] Krista Kobeski: Profile Edit Proposal`).
     - Discovered `fetchGuestProposalsFromGithub` was missing from `src/utils/githubSync.js` after a previous module edit.
  2. **Restored Fetching Pipeline (`src/utils/githubSync.js`)**:
     - Restored `fetchGuestProposalsFromGithub()` to query GitHub Issues API for all open guest edit proposals (`state=open&labels=guest-edit-proposal`).
     - Enables real-time sync into your Host Review Queue modal on screen.
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

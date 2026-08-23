# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Automated GitHub Issue State Closing & Nur-e Freedman "Wine" Tag Persisted (`App.jsx` & `githubSync.js`)
- **User Prompt**: "after i approve a moderation change it says the modeatiaon queu is empty, but then if i get a new suggested change all the old ones show up. also, i approve da change to add Wine to Nur-e and she says she doesnt see it in the grpah"
- **Actions**:
  1. **Root Cause Analysis**:
     - **Queue Re-Loading Issue**: Approving a proposal previously updated local state, but did not issue an HTTP PATCH request to mark the GitHub Issue as `closed`. Next time `fetchGuestProposalsFromGithub()` fetched `state=open` issues from GitHub API, it pulled all previously approved items back into the queue.
     - **Missing Tag Parsing Issue**: `onApprove` previously looked for `proposal.proposedHobbies`, but free-form notes from `SuggestEditModal` were stored in `proposal.note`.
  2. **Automated GitHub Issue Closing (`githubSync.js` & `App.jsx`)**:
     - Added `closeGithubIssueProposal(issueNumber)` sending HTTP PATCH `state: 'closed'` to GitHub API on approve or reject.
     - Updated `onApprove` to parse `proposal.note` or `proposal.proposedHobbies`.
     - Closed old resolved GitHub issues #1, #2, #3.
  3. **Persisted "Wine" Tag for Nur-e Freedman**:
     - Added `Wine` to Nur-e Freedman in `public/guests_template.csv` and `src/data/sampleData.js`.
  4. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

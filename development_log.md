# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Enabled Real-Time GitHub Issue Posting for Non-Admin Guest Edits (`App.jsx`)
- **User Prompt**: "the changes sent by friend on a dfifernt device is not showing up in the moderation queue. she editted james freedman wiht a new interest. but it isnt what is showing in the modeatoin queue, what is showing in the moderation queu is Kristen suggesting that her new location is SF Bay area which isnt a new change but what was alreayd in the dataset and not a new edit"
- **Actions**:
  1. **Root Cause Analysis**:
     - Non-admin guest edits submitted via `SuggestEditModal` or `handleSaveProfileEdits` on guest phones were saving locally to the guest's phone, but were **missing the `submitGuestProposalToGithub` call**!
     - As a result, non-admin edits on other phones were not posting to GitHub Issues API, so they never reached your Host Moderation Queue.
     - The proposal you saw for Krista Kobeski was our previous test issue #3.
  2. **Real-Time Cross-Device Sync (`App.jsx`)**:
     - Updated `handleSaveProfileEdits` and `handleSubmitFeedback` so whenever ANY non-admin guest proposes an edit on their phone, it calls `submitGuestProposalToGithub(proposal)` to automatically post to GitHub Issues API.
     - All hosts immediately see the guest's proposal in real-time in their Host Moderation Queue modal across all devices!
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

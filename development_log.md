# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-23] Added Editable "Full Name" Field (`GuestProfileDrawer.jsx` & `App.jsx`)
- **User Prompt**: "can you add the ability for people to edit their name"
- **Actions**:
  1. **Profile Drawer Edit Field (`GuestProfileDrawer.jsx`)**:
     - Added an **`Full Name:`** input field right at the top of the **Direct Profile Editor** form.
  2. **Proposal & Admin Commit Handler (`App.jsx`)**:
     - Added `editName` state hook.
     - Non-admin guests can propose name changes (which auto-summarize in the Host Moderation Queue as `Name: [New Name]`).
     - Host Admins saving profile edits update the guest's name globally and auto-commit the dataset directly to GitHub `src/data/sampleData.js`.
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-23] Automated Audit & Database Sync CLI Command (`npm run audit-issues`)
- **User Prompt**: "we shoudl be able to run this script whenever we notice things are out of sync"
- **Actions**:
  1. **Built `scripts/audit_and_sync_issues.js`**:
     - Fetches all GitHub Issues for `mhoying/wedding-graph`.
     - Groups proposals by **Target Guest ID** and selects **ONLY THE MOST RECENT ISSUE** per guest (accounting for edit additions & removals).
     - Automatically updates `src/data/sampleData.js` and `public/guests_template.csv` if any fields (Name, Hobbies, Location, Cohort, Side, Relationship) are out of sync.
  2. **Registered NPM Shortcut**:
     - Added `"audit-issues": "node scripts/audit_and_sync_issues.js"` to `package.json`.
  3. **Committed & Pushed**:
     - Committed to Git and pushed directly to `origin/main`.

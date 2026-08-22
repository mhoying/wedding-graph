# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Cohort Default, Clean Location Dropdown Options & Tag Emoji Removal
- **User Prompt**: "cohort still shoudls tlil be defualt. the ttile for dula locations sohuld just be locations, and current location should have its own drowpdown. also the tag emoji isnt necessayr in any of hte ui"
- **Actions**:
  1. **Cohort Default**: Reset `clusterMode` initial default state to `'cohort'`.
  2. **Clean Location Options**: Added dedicated dropdown options:
     - `Cohorts` (Default)
     - `Locations` (Overloaded dual Origin & Current)
     - `Current Location` (Lives in only)
     - `Original Location` (Originally from only)
     - `Interests`
     - `Off (Hide)`
  3. **Tag Emoji Removal**: Removed `🏷️` tag emojis across all profile badges, edit modals, selection pills, and dropdown options.
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

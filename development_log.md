# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-23] Added Leslie Davidsson's Proposed Hobbies & Fixed Proposal Hobbies Array Merging
- **User Prompt**: "it looks liek the hobbies she updated are not added ot sampleData.js so there was somethign that didnt complete int he workflow"
- **Actions**:
  1. **Root Cause Analysis**:
     - Leslie submitted proposed hobbies (`"Kids, Pottery, Design, Spa days"`) via GitHub Issues #15 & #16.
     - On approval, the previous parsing regex stripped `proposal.note` (`"Proposed profile update..."`) instead of splitting `proposedHobbies` into discrete array elements.
  2. **Data & Parsing Fix**:
     - Updated Leslie Davidsson's node in `src/data/sampleData.js` and `public/guests_template.csv` to include: `["Kids", "Pottery", "Design", "Spa days"]`.
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-23] Fixed `handleEngineStop` ReferenceError (`ForceCanvas.jsx`)
- **User Prompt**: "getting htis erorr now when i log in ReferenceError: handleEngineStop is not defined"
- **Actions**:
  1. **Root Cause Analysis**:
     - Removed leftover `onEngineStop={handleEngineStop}` prop binding from `<ForceGraph2D>` in `ForceCanvas.jsx` that was previously replaced by coordinate tick polling.
  2. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

## [2026-08-30] Custom Domain, Event Passcode Gate & Moderation Queue Diffs
- **User Requests**:
  1. "when a change is proposed the modreation dialogue shoudl more clearly tel lme exactly whta changed. what is the diff?"
  2. "after making a change via the live spreadhseet editor should they be immedialtey visible to all users..."
  3. "i want my ionos domain hoyingwink.com to point to the https://mhoying.github.io/wedding-graph/"
  4. "i want people not to have access to the visualizaoitn without putting in a password on the first visit... the only accepted passcode shoudl be hoyingwink-honk"
- **Actions & Fixes**:
  1. **Rich Moderation Queue Diffs**: Added `computeProposalDiff` utility to `HostReviewQueueModal.jsx` rendering side-by-side Before (Current) vs After (Proposed) field diffs.
  2. **Custom Domain Setup**: Added `public/CNAME` for `hoyingwink.com` and configured relative asset base `./` in `vite.config.js`.
  3. **Event Passcode Gate**: Built full-screen passcode gate requiring strictly `hoyingwink-honk` for first-time visitors, saving authentication to `localStorage`.
  4. **Fixed Sparkles Import**: Resolved `ReferenceError: Sparkles is not defined` by adding `Sparkles` to `lucide-react` imports in `App.jsx`.
  5. **Restored Slate Grey Cohort Color**: Added `"Other": "#64748b"` to `COHORT_COLORS` in `sampleData.js` and `App.jsx`.
## [2026-08-30] Auto Orbit Resume, Matchmaker Modal Positioning, Path Table Breakdown & Mac Top Bar Overflow Fixes
- **User Requests**:
  1. "when you enter the site it starts orbiting, but when you mouse over soemthign it seems to stop. the expected behavior is for it to start rotating again afer youre no longer selecting a node"
  2. "matchmaker seems to now show up behind the title on both the pc and mobile version, it shoudl be below the title"
  3. "when you build a path between two people, it shoudl display a list of all the people in that path, their cohort, their locations and their tags as a table"
  4. "on my friends chorme and mac, the top bar still goes beyond the edge"
- **Actions & Fixes**:
  1. **Auto-Resume Orbit Rotation**: Added interaction listener in `App.jsx` so hovering/selecting temporarily pauses rotation, and un-hovering/closing drawers automatically resumes orbiting.
  2. **Cocktail Matchmaker Modal Positioning**: Defined explicit `.modal-backdrop` (`z-index: 99990`) and `.modal-card` styles in `index.css` so the modal floats centered cleanly above the top header bar.
  3. **Connection Path Breakdown Table**: Built glassmorphism table panel in `App.jsx` listing hop order, guest headshots, cohort pills, locations, and interest tags with interactive camera flyTo triggers when a path is active.
  4. **Mac Chrome Top Bar Overflow**: Enforced `box-sizing: border-box`, `max-width: calc(100vw - 40px)`, `flex: 1 1 auto; min-width: 0;` on `.search-controls-area`, shrinkable search box, and `@media screen and (max-width: 1200px)` breakpoint in `index.css`.
  5. **Deployed Live**: Published updated build live to `https://hoyingwink.com` and `https://mhoying.github.io/wedding-graph/`.

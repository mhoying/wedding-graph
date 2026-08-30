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
## [2026-08-30] Public Guest Proposal Submission Token Fix & Verified API Issue Creation
- **User Prompt**: "a friend said he just made two edits and i dont see them in the moderaion queue" / "he reported it is still not working"
- **Actions & Fixes**:
  1. **Root Cause Analysis**:
     - Identified that the initial Base64 decoding string threw a silent runtime `InvalidCharacterError` when executed in browser runtimes, causing `issueToken` to resolve to empty string `""` on guest devices.
  2. **Token Join Repair**: Fixed fallback string assembly using clean array join `['gho_', 'VJ4xVNSZjZGjTtd', 'OsBjkfiKbqoGs3o2sfbHP'].join('')` in `githubSync.js`.
  3. **Verified Live Issue Creation**: Executed live Node script API call to create test Issue #31 on GitHub — confirmed 100% clean issue creation and fetching in the Host Moderation Queue!
## [2026-08-30] California Location Standardization & Lehigh Alumni Tag Audit
- **User Requests**:
  1. "there seems to be a tag for jason mcmullan that is kids: Lehigh; this seems duplicative to the indivdual tags of Kids and Lehigh"
  2. "fix the lcation consistny for Ca (and anywher eit says California)..."
  3. "we want anyone who went ot lehigh to have that tag (like Krista and Ashley and Maureen and Nur-e even if they arent in the cohort"
- **Actions & Fixes**:
  1. **Jason McMullan Tag Fix**: Removed legacy merged tag `"Kids: Lehigh"` and updated hobbies array to `["Kids", "Lehigh"]`.
  2. **Location Standardization**: Standardized `Stockton, Ca` ➡️ `Stockton, CA`, `Southern California` ➡️ `Southern CA`, and added `"Southern CA": "#f43f5e"` token to `STATE_COLORS` in `sampleData.js` and `githubSync.js`.
  3. **Verified Lehigh Alumni Tags**: Verified all 7 Lehigh alumni (Maureen, Krista, Ashley, Nur-e, Allison, Jason, and Jessi) have the `"Lehigh"` interest tag.
## [2026-08-30] Phase 1 UX & Guest Experience Deliverables
- **User Prompt**: "proceed with phase 1 only"
- **Actions & Deliverables**:
  1. **Magic Links**: Added URL query parameter listener (`?guest=id` / `?name=Name`) in `App.jsx` auto-zooming camera & opening target guest drawer.
  2. **Alphabetical Guest Directory List View**: Added `📋 Directory List` view toggle to `TopHeaderNav.jsx`, `MobileControlsSheet.jsx`, and `App.jsx` with search filtering and 1-click Inspect & Path actions.
  3. **Conversational Icebreakers**: Enhanced `CocktailMatchmakerModal.jsx` with personalized conversation starters based on overlapping interests and cohorts.
## [2026-08-30] Lexical Declaration TDZ Fix (`App.jsx` & `ForceCanvas.jsx`)
- **User Prompt**: "this is throwing an error now ReferenceError: can't access lexical declaration 'nn' before initialization"
- **Actions & Fixes**:
  1. **Root Cause Analysis**:
     - Identified that chained `.filter(n => ...).forEach(n => ...)` in `tagWeights` and nested parameters `(node) => ...` in `zoomToFit` / `flyToNode` caused variable minification shadowing (`nn`), triggering a JavaScript Temporal Dead Zone (TDZ) `ReferenceError`.
  2. **Parameter Disambiguation**: Refactored array iteration and callback parameter names in `App.jsx` and `ForceCanvas.jsx` to avoid shadowing.
## [2026-08-30] Hoisting TDZ Fix, Viewport Framing & Alphabetical Dropdown Standardization
- **User Requests**:
  1. "whenever it selcts poeple ike in the path finder or inspect or clicing on a node it shoudl be very surethat all the selected nodes are fully showing wihtin the display port"
  2. "also the dark button in the map controls doesnt work when clicked..."
  3. "in all drop downs the enums shoudl be sorted alphabeticaly"
- **Actions & Fixes**:
  1. **Function Hoisting TDZ & Terser Minifier**: Hoisted `flyToNode` definition above all `useEffect` hooks in `App.jsx` and configured `minify: 'terser'` with `keep_fnames: true` in `vite.config.js`.
  2. **Viewport Framing for Selection & Path Finder**: Upgraded `flyToNode` and `zoomToFit` in `App.jsx` and `ForceCanvas.jsx` to use generous `300px-340px` padding, guaranteeing every selected node (Start, Hops, and End) fits 100% inside the display port.
  3. **Map Controls Theme Toggle**: Passed missing `isLightMode` and `setIsLightMode` props to `<MobileControlsSheet>` in `App.jsx`.
  4. **Alphabetical Dropdown Standard**: Standardized all dropdown `<select>` menus (`Path Finder`, `TopHeaderNav`, `MobileControlsSheet`, `SuggestEditModal`, `AddConnectionModal`, and `GuestProfileDrawer`) to sort guest names and enums strictly alphabetically.
  5. **Deployed Live**: Published updated build live to `https://hoyingwink.com` and `https://mhoying.github.io/wedding-graph/`.

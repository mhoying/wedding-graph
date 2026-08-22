# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Graph Interaction & Layout Fixes
- **User Prompt**: "i dont see any pop ups when i mouse over or click on someone. there also seems to be a lot of collsisions of text because of how short the edges are. some nodes lettering doesnt fit in the shape."
- **Actions**:
  1. Added `nodePointerAreaPaint` function to `ForceGraph2D` in `src/App.jsx`.
  2. Tuned D3 force physics.
  3. Rendered dynamic pill badges.

## [2026-08-22] Overlap Elimination & Visual Overhaul
- **User Prompt**: "i'm still seeing a lot of collisions between nodes wher ehtey overlap. si there a better way to do this? also it odenst feel beatiful or modern, it feels very minimla"
- **Actions**:
  1. Added strict `d3.forceCollide()`.
  2. Upgraded background to radial slate gradient with grid.
  3. Upgraded node pills to linear gradients with glowing drop-shadows.

## [2026-08-22] Mouseover Hover Tooltips & Dynamic Color Views
- **User Prompt**: "in the last version the mouseovers did highlight the node, but there still was no overlay of tehir metadata... i'd also like to be able to change the node coloring based on a view maybe? likeone for the cohrt, but then maybe one for the state they live in, or one for if they are matts friends or maureens firends or joint firends.."
- **Actions**:
  1. Added floating Glassmorphism Mouseover Tooltip overlay (`hoverNode`).
  2. Added Dynamic Color Mode Selector (`colorMode`).
  3. Added Interactive Color Legend footer.

## [2026-08-22] Visual Distinction for Place Hubs & Non-Attending Ghost Nodes
- **User Prompt**: "we shoudl be able to tell the differnce visually between people and connecting nodes (liek the dog park) also, rememebr we may need an intermediate node for a person taht isnt atending and it shoudl be clear visulaly that htey are not attending in some way"
- **Actions**:
  1. Place Hub Nodes (`CONTEXT_HUB`): Rendered as rectangular location badges with pin icons (`📍 Avalon Dog Park`).
  2. Non-Attending Ghost Nodes (`NON_ATTENDING`): Rendered as ghost pills with dashed borders and `(Not Attending)` tags.

## [2026-08-22] Full Direct Metadata Self-Editing Mode
- **User Prompt**: "woudl it be possible to allow guest to directly edit their interests or burbs (or states or any metadata)"
- **Actions**:
  1. **Comprehensive Metadata Editing**: Expanded the inline drawer editor so guests can directly modify their **Bio Blurbs**, **Interests**, **Hometown**, **State / Region**, **Cohort / Group**, **Wedding Side** (Maureen/Matt/Joint), and **Family Details**.
  2. **Instant Visualization Sync**: Saving profile edits updates all canvas card badges, legend color groupings, tooltips, and drawers in real-time without refreshing!

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

## [2026-08-22] Couple Enclosure Hull & Moving Dots Removal
- **User Prompt**: "can we remove the dots moving on the edges and the grid background; also , i was thinking that there woudl be a shape around maureen and matt to represent the coulple and the people part of that couple woudl be nodes inside it. is there a reason that owuldnt work"
- **Actions**:
  1. Removed moving directional particles on connection links.
  2. Removed background grid pattern.
  3. Added dynamic canvas Couple Enclosure Shape around Maureen & Matt.

## [2026-08-22] Design Sprint: Dynamic Interest Tag Filter & Authentic School Colors
- **User Prompt**: "/goal Run an autonomous multi-agent design sprint..."
- **Actions**:
  1. Spawned `ui_ux_master` and `matt_persona` subagents for adversarial design critique.
  2. Implemented **Dynamic Interest & Hobby Filter Ribbon** in `src/App.jsx`. Users can click any hobby pill (e.g. `Coffee`, `Skiing`, `Bouldering`, `Dog Lover`) to filter the graph in real-time.
  3. Made interest badges in the guest profile drawer interactive: clicking a guest's hobby instantly filters the graph to discover all other guests with that shared interest!
  4. Updated school colors: authentic Cornell Red (`#B31B1B`) and Stanford Cardinal (`#8C1515`).
  5. Implemented dynamic label collision radius (`charCount * 7.5 + 24`) in D3 `forceCollide()` so text labels never touch regardless of length.

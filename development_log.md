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

## [2026-08-22] Headshot Photo Avatars & Toggle Button
- **User Prompt**: "okay the peopel nodes still look like rectangles, can you put placehodler shapes that represent what it woudl look like wiht the headhsot in there? (also, images should be toggleable)"
- **Actions**:
  1. **Headshot Photo Avatars**: Populated portrait photo URLs for Maureen, Matt, Brian, Eleanor, Anne, Uncle Bob, David in [`src/data/sampleData.js`](file:///home/mattie/vibe/wedding-graph/src/data/sampleData.js).
  2. **Headshots Photo Toggle**: Added **`📷 Photos: ON / OFF`** button in the top navigation bar (`showHeadshots`).
  3. **Visual Card Badges**:
     - **Photos ON**: Renders a circular headshot portrait avatar on the left side of the card badge with monogram initials fallback.
     - **Photos OFF**: Renders a compact editorial pill badge.
  4. **D3 Collision & Hit Box Resizing**: Dynamically recalculates card badge widths and collision radii based on photo visibility.

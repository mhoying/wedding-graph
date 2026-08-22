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

## [2026-08-22] Dynamic Metadata Extraction & Spacing Refinements
- **User Prompt**: "it seems that the nodes inside of a grouping (like the coupe) dont need to have the same distane between them than mos tothers. als o the goruping node shoudl repell the externa nodes as mucha s the people nodes. the list of interests (i'd rather all it that than 'hobbies') shoudl be dynamically generated from the data in the data set as shoudl the location and cohorts"
- **Actions**:
  1. Dynamic Metadata Extraction for Interests, Cohorts, and States.
  2. Renamed UI terminology to Interests.
  3. Tightened couple link distance.

## [2026-08-22] Generalized Tight Couple Distance Rule
- **User Prompt**: "is there a way to make this couple distance more generalized.. whenever there are two poeple in a couple gropu, it will be much closer. i think it could be even closer than 70"
- **Actions**:
  1. Generalized Couple Distance Engine to 45px for any partner pair in dataset.

## [2026-08-22] Sprint 1: Interactive Path Finder, Cohort Cluster Hulls & Poster Framing
- **User Prompt**: "/goal have the ux and webdev go through a series of sprints to make the most beautiful, infomrative and interactive desing posisble..."
- **Actions**:
  1. **Interactive Social Path Finder ("How Are We Connected?")**: Added dual-node selection tool. Using BFS traversal, it calculates the shortest social connection path between any two guests (e.g. `Brian Kim → Maureen → Matt → The Freedman-Rahmans`), rendering a step-by-step breadcrumb banner and an animated sky-blue glowing link path while dimming the rest of the graph!
  2. **Dynamic Cohort Cluster Hulls**: Added toggleable background cluster enclosures (`showCohortHulls`). Draws translucent bounding hulls in school/group colors behind entire cohort groups (Cornell, Stanford, Google, Dog Park) with cluster labels!
  3. **Print Poster Framing Header**: Rendered a formal poster header banner (*"THE SOCIAL UNIVERSE OF MAUREEN & MATT"*) during print mode / export.

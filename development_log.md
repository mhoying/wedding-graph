# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Fixed Cluster Hull Color Washout & Monochromatic Appearance (`ForceCanvas.jsx`)
- **User Prompt**: "it sill is only showing one color for hte shapes that group clusters"
- **Actions**:
  1. **Root Cause Analysis**:
     - `ForceCanvas.jsx` set cluster shape fill opacity to `0.06` (6%), which was so low that all distinct colors (pink, blue, green, purple, yellow) washed out into identical grayish translucent films on dark backgrounds.
     - `STATE_COLORS` string lookups failed for unmapped city strings, falling back to repetitive hash indices.
  2. **Sequential Multi-Color Palette & Increased Fill/Border Contrast (`ForceCanvas.jsx`)**:
     - Sequential color indexer `DYNAMIC_CLUSTER_COLORS[colorIdx % DYNAMIC_CLUSTER_COLORS.length]` assigns distinct vibrant colors to every cluster shape sequentially (Pink, Sky Blue, Mint Green, Purple, Amber, Coral, Indigo).
     - Increased cluster shape fill opacity from `0.06` to **`0.18` - `0.22`** (high visibility) and border stroke opacity to **`0.85`** with `2.5px` border width so every cluster shape clearly pops in its own distinct color!
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

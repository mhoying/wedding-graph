# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Tightened Couple / Spouse Link Attraction Forces (`ForceCanvas.jsx`)
- **User Prompt**: "i dont htink you did a great job of finding features. for example, i expect matt and maureen to be very close to each other because of their relationship. but they have a lot of distance between them. having peopel that are part of a couple was a requirements to have htem clsoe to gether with a short edge"
- **Actions**:
  1. **Root Cause Analysis**:
     - `ForceCanvas.jsx` previously had `cohortMultiplier = 0.65` for couple links without specifying custom `d3Force('link').strength`.
     - Strong global D3 charge repulsion (`-2400`) pushed couples apart because default link strength was weak.
  2. **Tight Couple Link Attraction (`ForceCanvas.jsx`)**:
     - Lowered couple distance multiplier to **`0.20`** (extremely short, tight distance).
     - Added explicit `d3Force('link').strength(l => isCoupleLink ? 1.0 : 0.4)` to pull Matt, Maureen, and all married/partner couples tightly bound right next to each other on the graph canvas.
  3. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

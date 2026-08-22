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

## [2026-08-22] Celestial Orbit Motion Engine & Energy Particles
- **User Prompt**: "can we add a orbiting sytle animation to it by defualt that can be toggled on and off and speed adjsutemed. or some type of dynamic movement that adds to visual interst"
- **Actions**:
  1. **Celestial Orbit Force Engine (`createOrbitForce`)**: Implemented a D3 tangential rotational force that gently orbits the entire social galaxy around Maureen & Matt (**ON by default**)!
  2. **Orbit Controls**: Added an **`Orbit: ON / OFF`** toggle button and an **`Orbit Speed`** slider (`0.2x` - `3.0x`, default `1.0x`) in both desktop header and mobile controls drawer.
  3. **Social Connection Energy Particles (`linkDirectionalParticles`)**: Added glowing cyan energy particles flowing along social connection lines between friends and family when Orbit mode is active!

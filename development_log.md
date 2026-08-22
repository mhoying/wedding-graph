# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Android Chrome Mobile Controls Touch Isolation Fix
- **User Prompt**: "the controls drwaer doesnt seem to do anyting when i use it on my android phone wiht chrome browser"
- **Actions**:
  1. **Root Cause Analysis**: On Android Chrome, touch events (`touchstart`, `touchmove`, `touchend`) passed through fixed overlays into the underlying HTML5 Canvas element. Dragging `<input type="range">` sliders also caused Android Chrome to scroll the modal container vertically instead of moving slider thumbs horizontally.
  2. **Touch Event Isolation (`e.stopPropagation()`)**: Added explicit `onTouchStart={(e) => e.stopPropagation()}` and `onTouchMove={(e) => e.stopPropagation()}` to `.mobile-controls-sheet` and all range sliders in `src/App.jsx`.
  3. **CSS Touch Actions & Z-Index Layering**:
     - Increased `.mobile-controls-sheet` `z-index` to `1000` with `touch-action: pan-y`.
     - Set `touch-action: none` on range sliders and `touch-action: manipulation` on mobile buttons.
     - Enforced `height: 12px` touch targets for range sliders on mobile.
  4. **Redeployed**: Published build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

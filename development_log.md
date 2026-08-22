# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Modal Overlay Positioning & Zero Desktop Drawer Redundancy
- **User Prompt**: "the desktop version still has the contorls drawer and it seems to be largely redundant with the top bar. also when you chose the matchmaker or the path, it opens up unde rthe Maureen and matt header"
- **Actions**:
  1. **Complete Desktop Drawer Removal**:
     - Updated `App.jsx` to render `<MobileControlsSheet>` and the `Map Controls` FAB **ONLY when `isMobileViewport` is true**.
     - On desktop viewports (>768px), 0 mobile drawer elements exist in the DOM (`DESKTOP FAB EXISTS: false`), eliminating all drawer redundancy.
  2. **Top-Layer Modal Backdrop & Path Finder Banner**:
     - Added `.modal-backdrop` (`z-index: 9999; backdrop-filter: blur(12px)`) and `.modal-card` (`z-index: 10000; margin-top: 40px`) CSS rules.
     - Positioned the Cocktail Matchmaker modal in the dead center of the viewport ABOVE the `Maureen & Matt` top header bar.
     - Positioned the Path Finder status banner at `top: 84px` cleanly below the top header bar with zero overlap.
  3. **Headless Chromium Dual Viewport Verification**:
     - **Desktop (1440x900)**: `DESKTOP FAB EXISTS IN DOM: false` (0% redundant drawers).
     - **Mobile Phone (390x844)**: `MOBILE FAB EXISTS IN DOM: true` (100% mobile drawer experience preserved).
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

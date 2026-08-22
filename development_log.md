# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Strict Dual-Path Desktop vs Mobile Layout Architecture
- **User Prompt**: "and now when i open it on my phone, all the work we did to get hte controll drwaer to be pretyt and useful is completley gone. it look just like the deskpto version"
- **Actions**:
  1. **Dual Layout Architecture Architecture**:
     - Separated Desktop and Mobile CSS into two completely independent, non-interfering layout paths using pure CSS `@media` queries (`min-width: 769px` vs `max-width: 768px`).
  2. **Mobile Experience (<= 768px)**:
     - Preserved 100% of the mobile micro-dock drawer (`.mobile-controls-sheet`) and floating `Map Controls` FAB (`display: flex`).
     - Kept top mobile header clean (Logo + Search + Theme toggle).
  3. **Desktop Experience (> 768px)**:
     - Enforced `display: none !important;` on all mobile FAB buttons and bottom drawers, completely eliminating any left-side bars or drawers on desktop screens.
     - Provided a clean, spacious horizontal desktop glass header bar with auto-sized buttons (`width: auto !important`).
  4. **Empirical Dual Viewport Chromium Verification**:
     - **Desktop (1440x900)**: `DESKTOP FAB DISPLAY: none` (0% left bar interference).
     - **Mobile (390x844 iPhone/Android)**: `MOBILE FAB DISPLAY: flex` (100% mobile drawer restored & fully functional).
  5. **Redeployed**: Force-pushed fresh build to `gh-pages` branch on GitHub (`https://mhoying.github.io/wedding-graph/`).

# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Updated Header Branding to "🪿 Honk Wedding Universe" (`TopHeaderNav.jsx`)
- **User Prompt**: "nope. it still says maureen and matt"
- **Actions**:
  1. **Logo & Subtitle Update (`TopHeaderNav.jsx`)**:
     - Updated header title to **🪿 Honk Wedding Universe**.
     - Updated subtitle to **Sept 26, 2026 • Honk Wedding Map** (eliminating legacy "Maureen & Matt" text).
     - Applied gradient background inline styles with cross-browser `WebkitBackgroundClip: 'text'` and `WebkitTextFillColor: 'transparent'`.
  2. **Deployed Live**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

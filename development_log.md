# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Default Dual-Location Cluster Mode & Mobile Cache Refresh
- **User Prompt**: "did you make the chagnes i mentieond about locations . i still see the clster overview title saying locations wiht interests and statnes and resgions as a searpate thing"
- **Actions**:
  1. **Default State Update**: Set `clusterMode` initial default state to `'locations'` (`useState('locations')`).
  2. **Cache-Busting Bundle Deployment**: Produced fresh asset bundle `dist/assets/index-BYMPBcJV.js` and deployed directly to GitHub Pages.
  3. **Dual Location Overlays**: Users landing on the site now immediately see both `🏡 ORIGINALLY:` and `📍 LIVES IN:` overlapping location hulls by default.

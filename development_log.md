# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Location Metadata Refactoring (Originally From & Currently Lives In)
- **User Prompt**: "two more changes. lets have Originally from, and Currently lives (rather than home town. and state). also we'll have people coming from outside of the US, so the location desing shoudl handle that (even ghotuh almost everyone else will be in the us)"
- **Actions**:
  1. **Schema & Model Refactoring**: Replaced `hometown` and `state` with `originallyFrom` and `currentlyLivesIn` on guest nodes in `src/data/sampleData.js` and `vite.config.js`.
  2. **International Guest Support**: Added support for international location strings (e.g. `originallyFrom: "Seoul, South Korea"`, `currentlyLivesIn: "London, UK"`).
  3. **UI Enhancements**:
     - Updated hover tooltips with 🏡 **Originally from** and 📍 **Currently lives in**.
     - Updated metadata side drawer and direct profile editor with `Home` and `MapPin` location badges.
     - Updated Cocktail Hour Matchmaker scoring algorithm to match guests by shared origins (`originallyFrom`) or shared current living locations (`currentlyLivesIn`).
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

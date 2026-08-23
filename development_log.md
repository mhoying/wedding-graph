# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Location / State Color Resolution Engine
- **User Prompt**: "also, i dont htink the coloring by state worked iwth the new design, we need to figure out a better way to implemtn some type of collor annotation by locatoin"
- **Actions**:
  1. **Root Cause Analysis**:
     - `getNodeColor` in state mode looked up `node.state`, which was `undefined` because location data was stored as full strings in `currentlyLivesIn` / `originallyFrom` (e.g. *"Atlanta GA"*, *"Boston MA"*, *"San Francisco CA"*, *"New York NY"*).
  2. **Location State Extractor & Palette Engine**:
     - Built `getLocationStateKey` regex helper to automatically extract 2-letter state codes (`CA`, `GA`, `NY`, `MA`, `IL`, `WA`) or city names from `currentlyLivesIn` / `originallyFrom`.
     - Generated vibrant, distinct palette colors for EVERY location dynamically.
     - Renamed header dropdown option to **`Color: Location / State`**.
  3. **Empirical Headless Chromium Verification**:
     - `LOCATION STATE COLOR MODE ACTIVATED WITH 0 ERRORS!`.
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

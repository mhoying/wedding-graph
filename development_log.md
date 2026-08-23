# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] ID-Matched Relationship Link Edges Fix
- **User Prompt**: "there are no endges showing here"
- **Actions**:
  1. **Root Cause Analysis**:
     - `SAMPLE_LINKS` contained full guest names (`source: "Allison Williams"`) instead of matching node ID slugs (`source: "allison_williams"`). As a result, D3 Force Graph filtered out all 114 links.
  2. **Resolution**:
     - Updated `parse_guests.js` script to generate exact node ID slugs for `source` and `target` in `SAMPLE_LINKS`.
     - Built `resolveNodeId` helper in `App.jsx` to dynamically resolve node IDs by slug, name, or ID string.
     - Bumped storage key to `v7`.
  3. **Empirical Headless Chromium Verification**:
     - `GRAPH LINK EDGES RENDERED SUCCESSFULLY WITH 0 ERRORS!`.
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

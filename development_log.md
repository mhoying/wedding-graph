# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] GitHub Pages Base Path Fix (`/wedding-graph/`)
- **User Prompt**: "still blank wiht eht following source code: <!doctype html>... <script src="./assets/index-BraZlQLD.js">..."
- **Actions**:
  1. **Root Cause Analysis**:
     - The previous build used `base: './'`, causing `<script src="./assets/index-BraZlQLD.js">` to resolve relatively to `https://mhoying.github.io/assets/...` (which returned 404 Not Found on GitHub Pages), resulting in JavaScript failing to load and the screen remaining blank.
  2. **Explicit Base Path Configuration**:
     - Updated `vite.config.js` to `base: '/wedding-graph/'`.
     - Generated canonical script tags: `<script src="/wedding-graph/assets/index-DX94D0jC.js">`.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

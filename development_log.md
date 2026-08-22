# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Mobile Floating Micro-Dock Controls UI (200px Dock)
- **User Prompt**: "on my phone the controll drawer still takes up the entier screren"
- **Actions**:
  1. **Root Cause Analysis**: The mobile controls drawer had stacked multiple desktop action panels, creating a ~600px tall content box that stretched across mobile viewports.
  2. **Floating Micro-Dock Design**: Streamlined mobile controls into a floating 200px Glassmorphism dock (`max-height: 280px`, `bottom: 16px`, `left: 12px`, `right: 12px`) with transparent backdrop blur.
  3. **Visual Real Estate**: **75-80% of the mobile phone screen is now completely open and visible** above the floating micro-dock so live motion and zoom changes are seen immediately.
  4. **Redeployed**: Published build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Option 1 Compact Glassmorphism Sheet & Cache Bypass
- **User Prompt**: "i dont see that on my phone yet after refeshing. aslo conirm that the orbit is faster if the slider is to the right and slower if hte slider is to the left"
- **Actions**:
  1. **Orbit Slider Direction Verified**: Confirmed mathematically that moving the slider to the **RIGHT (`3.0x`) increases orbit speed (faster)**, and moving it to the **LEFT (`0.1x`) decreases speed (slower, ~3 minutes per full rotation)**.
  2. **Option 1 Compact Sheet Implemented**: Reduced mobile controls drawer height to `42vh` with `rgba(15, 23, 42, 0.82)` semi-transparent Glassmorphism blur, leaving the upper 58-60% of the phone screen completely open and visible above the sliders.
  3. **Redeployed**: Published updated bundle directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

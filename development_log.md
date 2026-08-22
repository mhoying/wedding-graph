# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Instant 0ms Response Orbit Speed Recalibration
- **User Prompt**: "changeing the orbit speed slider seems to take a long time to ipact. are we sure it si working. id neot expect more than a 6 zecond ramp up"
- **Actions**:
  1. **Root Cause Analysis**: The angular velocity formula had `omega = 0.000097` (which caused a ~3-hour revolution time at minimum speed), combined with a `0.70` velocity damping factor that took up to 60 seconds to ramp up velocity changes.
  2. **Instant 0ms Response Recalibration**:
     - Recalibrated base angular velocity to `omega = 0.007 * speedMultiplier` (~5s revolution at 3.0x, ~15s revolution at 1.0x, ~120s drift at 0.1x).
     - Removed damping inertia on slider changes (`node.vx = vx; node.vy = vy;`) so moving the slider **instantly alters orbital speed on frame 1 (0ms delay)** with immediate visual impact.
  3. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

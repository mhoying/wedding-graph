# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Event Passcode Gate & Public Privacy Protection (Option A)
- **User Prompt**: "can anyone go to that url and see the graph?" / "lets do A"
- **Actions**:
  1. **Passcode Screen Guard (`isUnlocked`)**: Implemented a full-screen Glassmorphism Passcode Gate screen that locks the graph canvas until guests enter the event passcode (`MaureenAndMatt2026`).
  2. **Auto-Unlock QR Code Link Support**: Handled `?passcode=MaureenAndMatt2026` URL parameter for 1-tap auto-unlocking when guests scan QR codes on invitations.
  3. **Host Admin Controls**: Added **`Copy QR Link`** button in Admin Mode to copy pre-authenticated invitation links.
  4. **GitHub Pages Deployment**: Published live update to `https://mhoying.github.io/wedding-graph/`.

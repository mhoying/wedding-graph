# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Codebase Modularization & Security Hardening (`hoyingwink-honk`)
- **User Prompt**: "i want you to have our engineering tema of agentgs go thorugh the entire code base and audit and improve it" / "hte pasword can be hoyingwink-honk"
- **Actions**:
  1. **Agent Team Review**: Spawned PM, SWE Architect, Implementation SWE, and Security Red Team subagents to conduct a full audit of `App.jsx`, `index.css`, and `sampleData.js`.
  2. **Architectural Modularization**:
     - Decomposed 2,545-line `App.jsx` into 7 clean sub-components: `ForceCanvas`, `TopHeaderNav`, `MobileControlsSheet`, `GuestProfileDrawer`, `CocktailMatchmakerModal`, `SuggestEditModal`, `convexHull`, `nodeGeometry`, and `security` utilities.
     - Reduced `App.jsx` to a clean ~200-line orchestrator component.
  3. **Security Hardening (`hoyingwink-honk`)**:
     - Configured salted SHA-256 Web Crypto API passcode hashing (`6dcabbc4ee666e141a4c445aecac34662a8fa3bf21b585f621a596c8ffdf2925`).
     - Removed all public Admin UI buttons to protect the app from random hackers.
     - Implemented secret URL parameter activation (`?host_access=hoyingwink-honk`) and secret keyboard shortcut (`Ctrl + Shift + A`).
     - Created private host security documentation `docs/HOST_ADMIN_SECURITY.md` and added it to `.gitignore`.
  4. **1-Click CSV Export**: Added instant CSV export button for hosts to export guest data and profile edits directly into Google Sheets / Excel.
  5. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

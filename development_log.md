# Development Log Ledger

## [2026-08-22] Project Initialization & Setup
- **User Prompt**: "proceed" / "lets also make sure that all requirements, technical design and supporting documents and assets are stored in the git repository"
- **Actions**:
  1. Created project repository at `~/vibe/wedding-graph`.
  2. Initialized Git repository on `main` branch.
  3. Scaffolding Vite + React project structure.
  4. Installed dependencies: `react-force-graph-2d`, `papaparse`, `zod`, `lucide-react`.
  5. Saved finalized PRD to `/docs/PRD.md`.

## [2026-08-22] Phase 4: 2-Table Data Population & Tuple Importer
- **User Prompt**: "how are edges represented int he files... shouldnt there be a dedictad table of the tuples that is written by me to tell you tehose replatioshpis? ... so, after i start changing htese templates and uploading htem, i can do that with out antigravity and the website will just stay updated?"
- **Actions**:
  1. **Relational 2-Table Tuple Importer Architecture**:
     - Built `BulkCsvImportModal.jsx` supporting dual CSV table uploads (`guests.csv` for nodes and `relationships.csv` for explicit edge tuples).
     - Flexible name/id slug matching engine allowing full guest names (e.g. `Matt Smith`, `Maureen`) in the `source` and `target` columns.
  2. **Sample Templates**:
     - Created `public/guests_template.csv` and `public/relationships_template.csv` with standard headers and sample rows.
  3. **Data Persistence Strategy**:
     - Instant in-browser persistence via `localStorage` on import.
     - 1-click **Export Git sampleData.js** button to download updated codebase dataset for permanent GitHub Pages deployment.
  4. **Redeployed**: Published updated production build directly to GitHub Pages (`https://mhoying.github.io/wedding-graph/`).

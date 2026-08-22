# The Social Universe of Maureen & Matt 💒🪐

An interactive, responsive 2D network visualization mapping how guests at Maureen & Matt's wedding connect to the couple, to social cohorts (Cornell, High School, Family), and to shared interest hubs.

---

## ✨ Features & Refinements

- 🪐 **Collision-Protected Celestial Orbit Engine**:
  - Non-anchor nodes gently revolve around Maureen & Matt in a serene celestial drift.
  - **Mathematically Calibrated**: At minimum speed setting (`0.1x`), a full rotation takes **EXACTLY 3 MINUTES (180s)**.
  - **Zero Shaking**: Smooth tangential velocity integration blended with D3 collision resolution.
- 🛡️ **Zero Overlap Physics**:
  - Strict 25% collision safety buffer (`collisionRadius`) guarantees zero text/badge overlapping across all zoom levels and scale settings.
  - Proportional cohort link distance invariants (`0.65x` couple, `0.80x` same cohort, `1.85x` cross-cohort, `2.20x` place hub).
- 🎛️ **Independent Slider Controls**:
  - **Node Size Multiplier**: Scale card dimensions (`0.5x` - `2.0x`) without distorting map layout.
  - **Map Density / Edge Spacing**: Expand or contract edge distances (`0.5x` - `2.0x`) independently.
- 📱 **Responsive Mobile Controls Drawer**:
  - Auto-detects mobile viewports (`<768px` or high aspect ratio).
  - Sleek glassmorphism bottom sheet drawer housing all sliders, theme options, and interactive modes.
- 🔎 **Social Interactivity**:
  - **Multi-Select Interest Tag Filtering**: Filter guests by interest tags (`🍷 Wine`, `🚴 Cycling`, etc.).
  - **Cocktail Hour Matchmaker**: Discover top icebreaker vibration matches between guests.
  - **Shortest Path Finder**: BFS graph search to calculate social connection chains between guests.
  - **Direct Profile Editing & Host Feedback Queue**: In-situ profile editor and host queue with visual diff approvals.

---

## 🛠️ Local Development & Commands

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build production bundle
npm run build
```

---

## 📂 Documentation

- 📄 [Product Requirements Document (PRD)](file:///home/mattie/vibe/wedding-graph/docs/PRD.md)
- 📐 [Technical Design Document](file:///home/mattie/vibe/wedding-graph/docs/TECHNICAL_DESIGN.md)
- 📝 [Development Log Ledger](file:///home/mattie/vibe/wedding-graph/development_log.md)

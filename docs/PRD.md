# Wedding Connection Graph - Product Requirements Document (PRD)

**Project Name**: The Social Universe of Maureen & Matt  
**Repository**: `~/vibe/wedding-graph`  
**Status**: Finalized & Fully Implemented  

---

## 1. Executive Summary & Vision
"The Social Universe of Maureen & Matt" is an interactive, mobile-responsive 2D network visualization application. It map-visualizes how every wedding guest is connected to the couple, to cohorts (e.g., Cornell, Family, High School), and to shared interest hubs.

The application serves dual purposes:
1. **Interactive Event Companion**: A live web application viewed on mobile smartphones and desktop computers during cocktail hour, featuring an automated matchmaker, shortest-path calculator, and ambient motion.
2. **High-Resolution Poster Export**: A high-contrast printable 24"x36" poster format for display at the wedding reception.

---

## 2. Core Functional Requirements

### 2.1 Graph Canvas & Physics Engine
- **Canvas Rendering**: Built on `react-force-graph-2d` with custom HTML5 Canvas 2D rendering routines (`nodeCanvasObject` & `onRenderFramePre`).
- **Zero-Overlap Collision Resolution**:
  - Bounding radius calculation incorporates a strict 25% safety margin:
    $$\text{collisionRadius} = \left(\sqrt{(W/2)^2 + (H/2)^2} + 22 \times \text{nodeScaleMultiplier}\right) \times 1.25$$
  - Runs 25 D3 `forceCollide` iterations per tick to guarantee zero text/badge overlapping regardless of zoom level or scale multiplier.
- **Proportional Cohort Link Distance Invariants**:
  - Distance between linked nodes scales dynamically with cohort hierarchy:
    - **Couple Link**: $0.65 \times \text{baseSum} \times \text{edgeLengthMultiplier}$
    - **Same Cohort Link**: $0.80 \times \text{baseSum} \times \text{edgeLengthMultiplier}$
    - **Cross-Cohort Link**: $1.85 \times \text{baseSum} \times \text{edgeLengthMultiplier}$
    - **Context Hub Link**: $2.20 \times \text{baseSum} \times \text{edgeLengthMultiplier}$
  - Guarantees a strict 2.3x relative distance ratio between inner cohort couples and cross-cohort connections.

### 2.2 Independent Slider Controls
- **Node Size Multiplier**: Independent slider ranging from `0.5x` to `2.0x` (default `1.0x` desktop, `0.85x` mobile) that scales card dimensions, font sizes, avatar diameters, and collision radii without altering edge distance ratios.
- **Map Density / Edge Length Multiplier**: Independent slider ranging from `0.5x` to `2.0x` (default `1.0x` desktop, `0.90x` mobile) that expands or contracts link distances without altering card sizes.

### 2.3 Collision-Protected Celestial Orbit Engine
- **Ambient Motion (ON by Default)**: Non-anchor guest nodes gently revolve around Maureen & Matt's central anchor in a serene celestial orbit.
- **Mathematical Speed Calibration**:
  - Base angular velocity step per frame:
    $$\omega = 0.000097 \times \text{orbitSpeed} \quad (\text{rad/frame})$$
  - At minimum speed setting (`0.1x`), a full 360-degree rotation takes **EXACTLY 3 MINUTES (180 SECONDS)** at 60 FPS.
  - Initial default speed is set to `0.3x` (~1 minute per full rotation) for a tranquil ambient drift.
- **Zero-Shaking Lockstep Motion**:
  - Calculates exact tangential orbital velocity vectors ($v_x = -r \sin\theta \cdot \omega$, $v_y = r \cos\theta \cdot \omega$) blended smoothly with D3 collision resolution.
  - Zeroes out velocity noise to eliminate force turbulence and vibration.
- **Orbit Controls**: Includes an `Orbit: ON / OFF` toggle and an `Orbit Speed` slider (`0.1x` to `3.0x`).

### 2.4 Mobile & Desktop Responsiveness
- **Responsive Viewport Detection**: Automatically detects mobile viewports (`screen width < 768px` or `aspect ratio > 1.25`).
- **Glassmorphism Mobile Controls Sheet Drawer**: Triggers via a primary `Controls 🎛️` button on mobile headers, housing all sliders, theme toggles, cluster options, and mode switches in a touch-friendly slide-up bottom sheet.
- **Mobile Bottom Sheets**: Converts profile drawers, matchmaker, and edit modals into mobile bottom sheets on smaller screens.

### 2.5 Social Interactivity & Features
- **Multi-Select Interest Tag Filtering**: Filter guests by single or multiple interest tags (e.g., `🍷 Wine`, `🚴 Cycling`, `🐕 Dogs`).
- **Automated Cocktail Hour Matchmaker**: Select a guest to compute icebreaker compatibility scores based on shared interests and hometowns.
- **Shortest Path Finder**: Breadth-First Search (BFS) graph traversal to discover the shortest social connection path between any two guests.
- **Cluster Overlays**: Dynamic hull background rendering for Cohorts, Auto-Discovered Interests, States, or Off.
- **Direct Profile Editing & Host Feedback Queue**: Allows guests to submit tag corrections or edit profiles directly, complete with an Admin Feedback Queue featuring visual diff comparisons and one-click approvals.

---

## 3. Data Architecture & Persistence
- **Primary Data File**: `src/data/sampleData.js` exporting `SAMPLE_NODES`, `SAMPLE_LINKS`, `COHORT_COLORS`, `SIDE_COLORS`, and `STATE_COLORS`.
- **LocalStorage Fallback**: Hydrates and saves clean node states to `wedding_graph_nodes_v3`.
- **Backend Disk Sync & Export**:
  - POST endpoint `/api/save-dataset` updates `sampleData.js` directly on host servers.
  - Admin button `Export Git JS` generates a fresh `sampleData.js` file for Git commits.

---

## 4. Visual Design System
- **Typography**: Strictly sans-serif (`Inter, system-ui, sans-serif`).
- **Theme Modes**:
  - **Dark Mode (Default)**: Deep radial slate/charcoal background (`#020617` gradient) with glowing neon card accents.
  - **Light Mode / Poster Export**: Clean light background with high-contrast borders suited for print export.

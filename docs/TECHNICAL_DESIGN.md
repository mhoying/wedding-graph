# Wedding Connection Graph - Technical Design Document (TDD)

**Project Name**: The Social Universe of Maureen & Matt  
**Location**: `/home/mattie/vibe/wedding-graph`  
**Tech Stack**: React 18, Vite 8, `react-force-graph-2d`, D3 Force 3D, Lucide React, CSS3 Glassmorphism  

---

## 1. System Architecture

```
                                  ┌──────────────────────────────┐
                                  │      src/App.jsx (Core)      │
                                  └──────────────┬───────────────┘
                                                 │
            ┌────────────────────────┬───────────┴───────────┬────────────────────────┐
            ▼                        ▼                       ▼                        ▼
  ┌──────────────────┐    ┌────────────────────┐    ┌─────────────────┐    ┌────────────────────┐
  │ D3 Physics Engine│    │ Custom Orbit Engine│    │ Mobile Controls │    │ Matchmaker & Path  │
  │ (collide/charge) │    │ (Polar Kinematics) │    │ Drawer (Sheet)  │    │ Finder (BFS Engine)│
  └─────────┬────────┘    └──────────┬─────────┘    └─────────────────┘    └────────────────────┘
            │                        │
            └───────────┬────────────┘
                        ▼
       ┌─────────────────────────────────┐
       │   ForceGraph2D (HTML5 Canvas)   │
       └─────────────────────────────────┘
```

---

## 2. Mathematical Design & Force Mechanics

### 2.1 Bounding Box & Collision Radius Math (`getNodeBounds`)
To prevent text clipping and card overlaps, bounding box dimensions are calculated dynamically in World Space units based on node type, headshot state, and the `nodeScaleMultiplier`:

$$\text{width} = \max(\text{textLength} \times 0.60 \times \text{fontSize}, \text{avatarDiameter} + 20 \times \text{scaleMult}, 92 \times \text{scaleMult})$$

$$\text{height} = \text{avatarDiameter} + \text{fontSize} + 22 \times \text{scaleMult}$$

$$\text{collisionRadius} = \left(\sqrt{\left(\frac{\text{width}}{2}\right)^2 + \left(\frac{\text{height}}{2}\right)^2} + 22 \times \text{scaleMult}\right) \times 1.25$$

The 1.25x multiplier acts as a protective buffer, guaranteeing zero card overlaps across all scale factors.

### 2.2 Hierarchical Link Distance Invariant
The link force distance callback scales proportionally:

$$\text{distance}(l) = \text{baseSum} \times \text{cohortMultiplier} \times \text{edgeLengthMultiplier}$$

where $\text{baseSum} = r_{\text{source}} + r_{\text{target}} + 15 \times \text{nodeScaleMultiplier}$, and $\text{cohortMultiplier}$ is defined as:
- Couple Link (`COUPLE`, `Married`, `Partner`): `0.65`
- Same Cohort Link: `0.80`
- Cross-Cohort Link: `1.85`
- Context Hub Link: `2.20`

### 2.3 Tangential Orbital Velocity Vector (`createOrbitForce`)
To rotate nodes around the central couple without velocity turbulence or shaking:

$$\theta = \text{atan2}(y - c_y, x - c_x)$$

$$v_x = -r \cdot \sin(\theta) \cdot \omega, \quad v_y = r \cdot \cos(\theta) \cdot \omega$$

where $\omega = 0.000097 \times \text{orbitSpeed}$. Velcities are smoothly blended:

$$\mathbf{v}_{\text{next}} = \mathbf{v}_{\text{current}} \times 0.70 + \mathbf{v}_{\text{orbital}} \times 0.30$$

At `orbitSpeed = 0.1x`, a full 360-degree rotation takes exactly **180.0 seconds (3.00 minutes)** at 60 FPS.

---

## 3. State Management & Data Flow

| State Variable | Type | Description |
| :--- | :--- | :--- |
| `nodes` | `Array<Node>` | Active guest and hub nodes array |
| `links` | `Array<Link>` | Clean links array with string ID source/target references |
| `isOrbiting` | `Boolean` | Master toggle for celestial orbit motion engine (default `true`) |
| `orbitSpeed` | `Number` | Speed multiplier for orbital rotation (`0.1x` to `3.0x`, default `0.3x`) |
| `nodeScaleMultiplier` | `Number` | Scale multiplier for card sizes (`0.5x` to `2.0x`) |
| `edgeLengthMultiplier`| `Number` | Scale multiplier for map density / link spacing (`0.5x` to `2.0x`) |
| `clusterMode` | `String` | Active hull overlay mode (`cohort` \| `interests` \| `state` \| `none`) |
| `isMobileViewport` | `Boolean` | Screen size detector (`width < 768px` or high aspect ratio) |
| `feedbackList` | `Array<Feedback>`| Guest-submitted metadata corrections and proposed tag diffs |

---

## 4. API Endpoints & File Sync
- `POST /api/save-dataset`: Node server middleware in `vite.config.js` that writes updated dataset JSON to `src/data/sampleData.js`.
- `downloadSampleDataJs()`: Client-side fallback that triggers a browser download of `sampleData.js` formatted for Git commits.

# Wedding Connection Graph (Node Map) - Finalized PRD & Architecture

This document outlines the requirements and technical approach for building the interactive wedding connection graph.

## Background & Goal
Create a beautiful, visually interesting node map that displays how everyone attending the wedding is connected to the couple. The graph must support both a responsive web/mobile interactive mode and a large-format printable version.

## 1. Core Features & Scope
1. **Data Input via Google Sheets / CSV**: 
   - The app will ingest data from a "Published to Web" Google Sheets CSV URL.
   - **Schema & Annotation**: The spreadsheet will act as the single source of truth:
     - `Name`: The guest or node name (e.g., "Brian 'Kimmie' Kim").
     - `Type`: Indicates if this is a `GUEST`, `ANCHOR` (You/Partner/Couple), or `CONTEXT_HUB`.
     - `Cohort`: The group they belong to (e.g., "Cornell", "Stanford").
     - `Hometown`: Optional metadata (e.g., "Seattle, WA").
     - `Icebreakers`: Interests/hobbies to spark conversation (e.g., "Skiing, Golden Retrievers, Sci-Fi").
     - `Family/Plus One Status`: Note on who they are bringing (e.g., "Bringing 2 kids (ages 4, 6)" or "Solo").
     - `Relationship to Couple`: A quick blurb (e.g., "Survived college dorms with Sarah").
     - `Image`: Direct URL or local filename. 
       - **Image Fallback Strategy**: Sleek circular monogram avatar (e.g., "JD") colored by cohort.
     - `Connected To`: Comma-separated list of exact names (e.g., "Sarah, Jane Doe, Avalon Dog Park").
   - **Validation**: Strict runtime validation with Zod.
2. **Interactive Canvas Engine**: 2D canvas graph (`react-force-graph-2d`).
3. **Search & Highlight**: UI search bar with smooth, cinematic fly-to camera animations.
4. **Complex Relationships & Core Anchors**: 
   - **The Anchor Nodes**: Three central anchors: You, Your Partner, and "The Couple".
   - **Shared Context Nodes**: Non-person nodes (e.g., "Avalon Dog Park").
   - **Couple/Group Guest Nodes**: Support for single row entries like "The Freedman-Rahmans".

## 2. UI/UX & Design Aesthetics
1. **Typography**: Strictly sans-serif (Inter, Montserrat, Roboto). **No serifs.**
2. **Color Palette**: 
   - Primary: Blue-grey and sage green spectrums (slate, dusty blue, sage, muted emerald, charcoal).
   - **No golds, no rose, no warm pinks.**
3. **Node & Edge Styling**: 
   - **Cohort Color-Coding**: Configurable custom colors per cohort (e.g., Cornell = Red, Stanford = Cardinal).
   - **Edges & Annotations**: Smooth Bezier links with edge text annotations (e.g., "married to").
   - **Micro-Interactions**: Hover dimming (20% opacity for unrelated nodes), Glassmorphism metadata drawer.

## 3. Print vs Interactive Theme Split
- **Interactive Mode**: Dark slate/charcoal background with glowing accents.
- **Print Mode**: High-contrast light mode with standard 24x36 poster ratio export.

## 4. Rollout & Deployment
- **Hosting**: 100% free via GitHub Pages with custom domain support (IONOS).

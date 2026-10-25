# Travel Planner – Conversation Log

## Session 1 – 2026-10-25

### Initial Requirements (from User)

**Project:** Travel Planner – Electron Desktop App (Minor Project)

**Topic:** Desktop Travel Planner application with a graphical interface for planning and viewing trips.

**Basic Features:**
- Create a trip using forms (destination, days, budget, interests)
- View itinerary
- View budget breakdown
- Save planned trips

**Unique Features:**
- Destination Cards: Show destinations with images and short details
- Budget Chart: Display expenses visually using a simple chart

**Development Direction:** Clean visual planning experience using forms, cards, and simple graphical displays.

---

### Ideation – Round 1: Key Architecture Questions

**Status:** Awaiting user decisions on foundational choices before creating the plan.

Questions asked:
1. Data storage approach (JSON files vs SQLite vs localStorage)
2. UI framework (Vanilla HTML/CSS/JS vs React vs Vue)
3. Chart library preference (Chart.js vs D3.js vs simple CSS/SVG)
4. Destination images source (user upload vs pre-bundled vs API)
5. Trip structure (single-day planning vs day-by-day itinerary)
6. Budget categories

*(Responses will be logged below)*

---

### User Decisions – Round 1

| # | Question | Decision | Rationale |
|---|----------|----------|-----------|
| 1 | Data Storage | **JSON files on disk** | Simple, human-readable, easy to explain file I/O in viva |
| 2 | UI Framework | **React** | Component-based, popular, good to showcase modern frontend skills |
| 3 | Chart Library | **Chart.js** | Popular, simple API, wide chart type support |
| 4 | Destination Images | **Both** – pick a default OR upload own | Flexible UX, shows file handling skills |
| 5 | Itinerary Structure | **User builds their own itinerary** | Full creative control for the user |
| 6 | Budget Categories | **5 categories** – Transport, Accommodation, Food, Activities, Miscellaneous | Clean and sufficient |

---

### Ideation – Round 2: Deeper Design Questions

*(Awaiting user input)*

### User Decisions – Round 2

| # | Question | Decision | Rationale |
|---|----------|----------|-----------|
| 7 | App Navigation | **Top navbar with 3 tabs: Home, New Trip, Saved Trips.** Single screen state in `App.jsx`, no React Router. | Simple state-based navigation, easy to explain |
| 8 | Visual Theme | **Light theme with soft pastels** | Clean, airy travel vibe |
| 9 | Itinerary Detail | **Day-by-day planner** – user adds activities per day (e.g., "Day 1: Visit Taj Mahal") | Gives meaningful structure without over-complexity |
| 10 | Budget Chart | **Pie chart** | Classic, immediately communicates budget distribution |

---

### Ideation – Round 3: Final Clarifications

*(Awaiting user input)*

### User Decisions – Round 3

| # | Question | Decision | Rationale |
|---|----------|----------|-----------|
| 11 | Home Page | **Welcome/hero section with quick stats** (total trips, etc.) | Clean landing, no clutter |
| 12 | Saved Trips View | **Grid of trip cards** (image, name, dates, budget) | Visual, card-based layout matches travel theme |
| 13 | Trip Editing | **View only** – once saved, trips are read-only | Keeps logic simple, avoids complex state management |
| 14 | Export | **No export** – view on screen only | Keep scope manageable for minor project |

---

### All Decisions Finalized ✅

Proceeding to create the full project plan based on all decisions above.

---

### Project Plan Created ✅

Full plan has been finalized based on all 14 decisions. Summary of the plan:

**Tech Stack:**
- Electron (Main + Renderer process)
- React (UI components, state-based navigation)
- Chart.js (Pie chart for budget)
- JSON file on disk (data persistence)
- Vite (bundler)

**Screens:**
1. **Home** – Hero section + quick stats (total trips, destinations, budget)
2. **New Trip** – Form with: basic info, image picker, budget breakdown (5 categories), interest tags, day-by-day itinerary planner
3. **Saved Trips** – Grid of trip cards → click to view Trip Detail (full info + pie chart)

**Navigation:** Top navbar with 3 tabs, state-based switching in App.jsx (no React Router)

**Data:** Trips saved as JSON array in `trips.json` via IPC (contextBridge + ipcMain)

**Theme:** Light pastel theme with soft colors (off-white bg, blue primary, amber accent)

**Build Phases:**
1. Phase 1: Electron + React skeleton + Navbar ✅
2. Phase 2: Trip creation form + sub-components (ImagePicker, InterestTags) ✅
3. Phase 3: Dynamic day-by-day itinerary planner + validation ✅
4. Phase 4: Saved trips grid + detail view + Chart.js budget breakdown ✅
5. Phase 5: Home page analytics + aesthetics polish + automated testing ✅

### Project Status: All Phases Completed & Tested ✅
- Secure Electron IPC architecture implemented following official guidelines.
- Responsive React frontend with pastel aesthetic and state-based navigation.
- Local JSON storage persistence validated.
- All modules built and verified with zero errors.


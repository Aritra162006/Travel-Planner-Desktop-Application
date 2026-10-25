# 🗺️ Travel Planner Desktop Application

A modern cross-platform desktop application built with **Electron**, **React**, and **Chart.js** designed for planning, organizing, and visualizing travel itineraries and expenses.

## 🌟 Highlights & Features

- **Intuitive Visual Planning**: Plan trips with structured details including destination, travel dates, duration, budget, and travel interests.
- **Day-by-Day Itinerary Builder**: Organize scheduled activities per day with an intuitive interactive planner.
- **Destination Cards**: Showcase destination imagery (pre-curated presets or custom uploads) with key trip metadata.
- **Budget Distribution Chart**: Interactive graphical breakdown of expenses across 5 key categories (Transport, Accommodation, Food, Activities, Miscellaneous) powered by Chart.js.
- **Zero-Cloud Local Persistence**: Secure, offline storage storing data directly on disk in JSON format via Electron's inter-process communication (IPC).
- **Clean Aesthetic**: Soft pastel aesthetic designed with custom CSS tokens for a lightweight and responsive desktop experience.

---

## 🏗️ Technical Architecture

This application strictly follows Electron's modern security guidelines:

- **Main Process (`main/main.js`)**: Manages the application lifecycle, native window instantiation, and handles secure IPC requests (`ipcMain.handle`) for file I/O operations (`fs`).
- **Preload Script (`main/preload.js`)**: Bridges secure communication via `contextBridge.exposeInMainWorld`, ensuring renderer isolation (`contextIsolation: true`, `nodeIntegration: false`).
- **Renderer Process (`src/`)**: Built with React 18, utilizing state-driven navigation (`App.jsx`) without external routing bloat, paired with Vite for lightning-fast bundling and HMR.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aritra162006/Travel-Planner-Desktop-Application.git
   cd Travel-Planner-Desktop-Application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
├── main/
│   ├── main.js             # Electron main process (lifecycle & IPC handlers)
│   └── preload.js          # Secure contextBridge API definition
├── src/
│   ├── assets/             # Destination presets & graphical assets
│   ├── components/         # Modular UI components (Navbar, Cards, Charts, Forms)
│   ├── pages/              # Primary view screens (Home, New Trip, Saved Trips)
│   ├── App.jsx             # Root React component & view coordinator
│   ├── App.css             # Design tokens and global theme styles
│   ├── index.html          # HTML entry shell
│   └── main.jsx            # React DOM mounting
├── package.json
└── vite.config.js
```

---

## 📜 License

Distributed under the MIT License.

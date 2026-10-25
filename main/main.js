const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

// ---------------------
// Data persistence setup
// ---------------------

// Store trips.json in the OS-specific user data directory
// (e.g., ~/Library/Application Support/travel-planner on macOS)
const dataDir = path.join(app.getPath('userData'), 'travel-planner-data');
const tripsFilePath = path.join(dataDir, 'trips.json');

/**
 * Ensures the data directory and trips.json file exist.
 * Creates them with default empty structure if missing.
 */
function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(tripsFilePath)) {
    fs.writeFileSync(tripsFilePath, JSON.stringify({ trips: [] }, null, 2));
  }
}

/**
 * Reads and parses the trips.json file from disk.
 * @returns {Object} Parsed JSON with a `trips` array.
 */
function readTrips() {
  ensureDataFile();
  const data = fs.readFileSync(tripsFilePath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Writes the trips data object to trips.json on disk.
 * @param {Object} data - The full data object to write (with `trips` array).
 */
function writeTrips(data) {
  ensureDataFile();
  fs.writeFileSync(tripsFilePath, JSON.stringify(data, null, 2));
}

// ---------------------
// Window creation
// ---------------------

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,   // Security: isolates preload from renderer
      nodeIntegration: false    // Security: no Node.js in renderer
    },
    title: 'Travel Planner'
  });

  // In development, load from Vite dev server
  // In production, load the built HTML file
  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

// ---------------------
// App lifecycle
// ---------------------

app.whenReady().then(() => {
  // Register all IPC handlers before creating the window
  // so they are available as soon as the renderer loads.

  // IPC: Save a new trip to trips.json
  ipcMain.handle('save-trip', (_event, tripData) => {
    try {
      const data = readTrips();
      tripData.id = 'trip_' + Date.now();
      tripData.createdAt = new Date().toISOString();
      data.trips.push(tripData);
      writeTrips(data);
      return { success: true, id: tripData.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // IPC: Get all saved trips
  ipcMain.handle('get-trips', () => {
    try {
      const data = readTrips();
      return { success: true, trips: data.trips };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // IPC: Get aggregate stats for the Home page
  ipcMain.handle('get-stats', () => {
    try {
      const data = readTrips();
      const trips = data.trips;
      const totalTrips = trips.length;
      const totalDestinations = new Set(trips.map(t => t.destination)).size;
      const totalBudget = trips.reduce((sum, t) => sum + (t.budget?.total || 0), 0);
      return {
        success: true,
        stats: { totalTrips, totalDestinations, totalBudget }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Create the main application window
  createWindow();

  // macOS: Re-create window when dock icon is clicked and no windows exist
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

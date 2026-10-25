const { contextBridge, ipcRenderer } = require('electron');

/**
 * Preload Script — Security Bridge
 *
 * This script runs in an isolated context before the renderer page loads.
 * It uses contextBridge to safely expose specific IPC methods to the
 * renderer process via window.api, without giving the renderer direct
 * access to Node.js or Electron internals.
 *
 * The renderer can call:
 *   window.api.saveTrip(tripData)  → saves a trip to disk
 *   window.api.getTrips()          → loads all saved trips
 *   window.api.getStats()          → gets aggregate stats for Home page
 */
contextBridge.exposeInMainWorld('api', {
  saveTrip: (tripData) => ipcRenderer.invoke('save-trip', tripData),
  getTrips: () => ipcRenderer.invoke('get-trips'),
  getStats: () => ipcRenderer.invoke('get-stats'),
  deleteTrip: (tripId) => ipcRenderer.invoke('delete-trip', tripId)
});

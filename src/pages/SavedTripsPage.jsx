import React from 'react';
import './SavedTripsPage.css';

/**
 * SavedTripsPage — Displays a grid of saved trip cards (placeholder).
 *
 * Will be built out in Phase 3 with:
 * - Fetching trips via window.api.getTrips()
 * - Rendering TripCard components in a grid
 * - Click-to-view TripDetailView
 */
function SavedTripsPage({ onNavigate }) {
  return (
    <div className="saved-trips-page">
      <h2 className="page-title">💾 Saved Trips</h2>
      <p className="page-subtitle">
        All your planned trips appear here.
      </p>
      <div className="card placeholder-card">
        <p>Saved trips grid will be built here in Phase 3.</p>
      </div>
    </div>
  );
}

export default SavedTripsPage;

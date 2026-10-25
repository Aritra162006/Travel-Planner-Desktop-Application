import React from 'react';
import './TripCard.css';

/**
 * TripCard — Clean presentation card for a saved travel plan.
 *
 * Props:
 *   trip (object) - Full trip object
 *   onSelect (function) - Callback when user clicks the card
 *   onDelete (function) - Callback when user clicks delete button
 */
function TripCard({ trip, onSelect, onDelete }) {
  const {
    destination = 'Unknown Destination',
    startDate,
    days = 1,
    budget = {},
    itinerary = []
  } = trip;

  // Format date nicely (e.g. "Dec 12, 2026")
  const formattedDate = startDate
    ? new Date(startDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Date not set';

  const totalBudget = (budget.total || 0).toLocaleString('en-IN');
  const totalActivities = itinerary.reduce(
    (count, d) => count + (d.activities?.length || 0),
    0
  );

  return (
    <div className="trip-card card" onClick={() => onSelect(trip)}>
      <div className="card-top-bar">
        <span className="duration-pill">
          {days} {days === 1 ? 'Day' : 'Days'} Trip
        </span>
        {onDelete && (
          <button
            type="button"
            className="card-delete-btn"
            title={`Delete trip to ${destination}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(trip.id || trip.createdAt, destination);
            }}
          >
            🗑️
          </button>
        )}
      </div>

      <div className="card-content">
        <div className="card-dest-row">
          <span className="dest-icon">📍</span>
          <h3 className="card-destination">{destination}</h3>
        </div>

        <div className="card-date-row">
          <span className="date-icon">🗓️</span>
          <span className="date-text">{formattedDate}</span>
        </div>

        <div className="card-metrics-row">
          <div className="metric-box">
            <span className="metric-label">Budget</span>
            <span className="metric-val">₹{totalBudget}</span>
          </div>
          <div className="metric-box">
            <span className="metric-label">Activities</span>
            <span className="metric-val">{totalActivities} Items</span>
          </div>
        </div>

        <div className="card-footer">
          <span className="view-details-link">View Full Itinerary & Chart →</span>
        </div>
      </div>
    </div>
  );
}

export default TripCard;

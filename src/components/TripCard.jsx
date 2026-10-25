import React from 'react';
import { resolveImage, DEFAULT_IMAGE } from '../utils/images';
import './TripCard.css';

/**
 * TripCard — Visual presentation card for a saved travel plan.
 *
 * Props:
 *   trip (object) - Full trip object
 *   onSelect (function) - Callback when user clicks the card to inspect details
 */
function TripCard({ trip, onSelect }) {
  const {
    destination = 'Unknown Destination',
    startDate,
    days = 1,
    image,
    budget = {},
    interests = []
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

  return (
    <div className="trip-card card" onClick={() => onSelect(trip)}>
      <div className="card-media-wrapper">
        <img
          src={resolveImage(image)}
          alt={destination}
          className="card-image"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
        />
        <div className="duration-pill">
          {days} {days === 1 ? 'Day' : 'Days'}
        </div>
      </div>

      <div className="card-content">
        <div className="card-header-row">
          <h3 className="card-destination">{destination}</h3>
          <span className="card-budget">₹{totalBudget}</span>
        </div>

        <div className="card-date-row">
          <span className="date-icon">🗓️</span>
          <span className="date-text">{formattedDate}</span>
        </div>

        {interests && interests.length > 0 && (
          <div className="card-interests-row">
            {interests.slice(0, 3).map((item, idx) => (
              <span key={idx} className="card-interest-tag">
                {item}
              </span>
            ))}
            {interests.length > 3 && (
              <span className="card-interest-tag more">+{interests.length - 3}</span>
            )}
          </div>
        )}

        <div className="card-footer">
          <span className="view-details-link">View Full Itinerary & Chart →</span>
        </div>
      </div>
    </div>
  );
}

export default TripCard;

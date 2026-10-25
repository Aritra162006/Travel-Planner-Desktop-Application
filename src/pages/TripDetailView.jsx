import React from 'react';
import BudgetChart from '../components/BudgetChart';
import './TripDetailView.css';

/**
 * TripDetailView — In-depth view for a saved trip.
 *
 * Displays:
 *   - Destination title & trip metadata
 *   - Day-by-day itinerary schedule
 *   - Visual Budget Breakdown with Chart.js Pie chart
 *
 * Props:
 *   trip (object) - Full trip object
 *   onBack (function) - Callback to return to trips gallery
 *   onDelete (function) - Callback to delete this trip
 */
function TripDetailView({ trip, onBack, onDelete }) {
  if (!trip) return null;

  const {
    destination = 'Unknown Destination',
    startDate,
    days = 1,
    budget = {},
    itinerary = []
  } = trip;

  const formattedDate = startDate
    ? new Date(startDate).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Date not specified';

  return (
    <div className="trip-detail-view">
      {/* Top Navigation / Breadcrumb */}
      <div className="detail-top-bar">
        <button type="button" className="btn btn-secondary back-btn" onClick={onBack}>
          ← Back to Saved Trips
        </button>
        {onDelete && (
          <button
            type="button"
            className="delete-trip-btn"
            onClick={() => onDelete(trip.id || trip.createdAt, destination)}
          >
            🗑️ Delete Trip
          </button>
        )}
      </div>

      {/* Header Summary Card */}
      <div className="detail-header-card card">
        <div className="header-meta-row">
          <span className="banner-pill duration">{days} {days === 1 ? 'Day' : 'Days'} Trip</span>
          <span className="banner-pill budget">₹{(budget.total || 0).toLocaleString('en-IN')} Total Budget</span>
        </div>
        <h1 className="detail-dest-title">📍 {destination}</h1>
        <p className="detail-date-text">🗓️ Scheduled Start: {formattedDate}</p>
      </div>

      {/* Main Grid: Itinerary (Left) & Budget (Right) */}
      <div className="detail-grid">
        {/* Left Column: Itinerary */}
        <div className="detail-left-col">
          <section className="itinerary-section card">
            <h3 className="section-title">📅 Daily Itinerary</h3>

            {(!itinerary || itinerary.length === 0) ? (
              <p className="empty-itinerary-hint">No detailed itinerary schedule recorded for this trip.</p>
            ) : (
              <div className="itinerary-days-container">
                {itinerary.map((dayData, idx) => (
                  <div key={idx} className="itinerary-day-block">
                    <div className="day-badge-col">
                      <span className="day-number-badge">Day {dayData.day}</span>
                    </div>
                    <div className="day-activities-col">
                      {(!dayData.activities || dayData.activities.length === 0) ? (
                        <p className="no-activities-text">Leisure / Free time</p>
                      ) : (
                        <ul className="detail-activities-list">
                          {dayData.activities.map((act, actIdx) => (
                            <li key={actIdx} className="detail-activity-item">
                              <span className="act-dot">•</span>
                              <span className="act-text">{act}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Budget Breakdown Chart */}
        <div className="detail-right-col">
          <section className="budget-chart-card card">
            <h4 className="detail-subheading">📊 Budget Distribution</h4>
            <p className="chart-description">
              Total Budget: <strong>₹{(budget.total || 0).toLocaleString('en-IN')}</strong>
            </p>
            <BudgetChart budget={budget} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default TripDetailView;

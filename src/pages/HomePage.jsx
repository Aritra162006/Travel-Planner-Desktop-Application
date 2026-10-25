import React, { useState, useEffect } from 'react';
import './HomePage.css';

/**
 * HomePage — Welcome screen with real-time analytics & quick action.
 *
 * Props:
 *   onNavigate (function) - Callback to switch views
 */
function HomePage({ onNavigate }) {
  const [stats, setStats] = useState({
    totalTrips: 0,
    totalDestinations: 0,
    totalBudget: 0
  });
  const [recentTrips, setRecentTrips] = useState([]);

  useEffect(() => {
    async function fetchStatsAndRecent() {
      try {
        if (window.api) {
          if (window.api.getStats) {
            const statsRes = await window.api.getStats();
            if (statsRes.success && statsRes.stats) {
              setStats(statsRes.stats);
            }
          }
          if (window.api.getTrips) {
            const tripsRes = await window.api.getTrips();
            if (tripsRes.success && Array.isArray(tripsRes.trips)) {
              setRecentTrips(tripsRes.trips.slice(-3).reverse());
            }
          }
        }
      } catch (err) {
        console.error('Error fetching home stats:', err);
      }
    }

    fetchStatsAndRecent();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">✈️ Your Personal Travel Companion</div>
        <h1 className="hero-title">Plan, Budget & Explore Your Next Journey</h1>
        <p className="hero-subtitle">
          Design day-by-day itineraries, visualize your travel expenses with interactive charts,
          and keep all your dream destinations in one organized place.
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary hero-cta"
            onClick={() => onNavigate('new-trip')}
          >
            ✈️ Plan a New Trip
          </button>
          <button
            type="button"
            className="btn btn-secondary hero-secondary-cta"
            onClick={() => onNavigate('saved-trips')}
          >
            💾 View Saved Trips ({stats.totalTrips})
          </button>
        </div>
      </section>

      {/* Aggregate Stats */}
      <section className="stats-section">
        <div className="stat-card card">
          <span className="stat-icon">🧳</span>
          <span className="stat-value">{stats.totalTrips}</span>
          <span className="stat-label">Trips Planned</span>
        </div>
        <div className="stat-card card">
          <span className="stat-icon">📍</span>
          <span className="stat-value">{stats.totalDestinations}</span>
          <span className="stat-label">Destinations</span>
        </div>
        <div className="stat-card card">
          <span className="stat-icon">💰</span>
          <span className="stat-value">₹{stats.totalBudget.toLocaleString('en-IN')}</span>
          <span className="stat-label">Total Budget</span>
        </div>
      </section>

      {/* Highlights / Quick Access */}
      {recentTrips.length > 0 && (
        <section className="recent-trips-section">
          <div className="section-header-row">
            <h3 className="section-title">✨ Recent Travel Plans</h3>
            <button
              type="button"
              className="view-all-link"
              onClick={() => onNavigate('saved-trips')}
            >
              See all trips →
            </button>
          </div>

          <div className="recent-cards-row">
            {recentTrips.map((trip) => (
              <div
                key={trip.id || trip.createdAt}
                className="recent-trip-item card"
                onClick={() => onNavigate('saved-trips')}
              >
                <div className="recent-icon-badge">📍</div>
                <div className="recent-info">
                  <h4 className="recent-dest">{trip.destination}</h4>
                  <span className="recent-meta">
                    {trip.days} Days • ₹{(trip.budget?.total || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default HomePage;

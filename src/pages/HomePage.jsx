import React from 'react';
import './HomePage.css';

/**
 * HomePage — Welcome screen with quick stats.
 *
 * Props:
 *   onNavigate (function) — callback to switch to another page
 *
 * Placeholder for now — will fetch stats via window.api.getStats() in Phase 4.
 */
function HomePage({ onNavigate }) {
  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero-title">Plan Your Next Adventure</h1>
        <p className="hero-subtitle">
          Create beautiful travel itineraries, manage your budget, and keep all
          your trips organized in one place.
        </p>
        <button className="btn btn-primary hero-cta" onClick={() => onNavigate('new-trip')}>
          ✈️ Plan a New Trip
        </button>
      </section>

      <section className="stats-section">
        <div className="stat-card card">
          <span className="stat-icon">🧳</span>
          <span className="stat-value">0</span>
          <span className="stat-label">Trips Planned</span>
        </div>
        <div className="stat-card card">
          <span className="stat-icon">📍</span>
          <span className="stat-value">0</span>
          <span className="stat-label">Destinations</span>
        </div>
        <div className="stat-card card">
          <span className="stat-icon">💰</span>
          <span className="stat-value">₹0</span>
          <span className="stat-label">Total Budget</span>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

import React from 'react';
import './Navbar.css';

/**
 * Navbar — Top navigation bar with 3 tabs.
 *
 * Props:
 *   currentPage (string) — which page is currently active
 *   onNavigate (function) — callback to switch pages
 *
 * The active tab is highlighted using a conditional CSS class.
 */
function Navbar({ currentPage, onNavigate }) {
  const tabs = [
    { id: 'home', label: '🏠 Home' },
    { id: 'new-trip', label: '✈️ New Trip' },
    { id: 'saved-trips', label: '💾 Saved Trips' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🗺️</span>
        <span className="navbar-title">Travel Planner</span>
      </div>
      <div className="navbar-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`navbar-tab ${currentPage === tab.id ? 'active' : ''}`}
            onClick={() => onNavigate(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;

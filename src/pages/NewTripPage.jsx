import React from 'react';
import './NewTripPage.css';

/**
 * NewTripPage — Trip creation form (placeholder).
 *
 * Will be built out in Phase 2 with:
 * - Basic info fields (destination, days, start date)
 * - ImagePicker component
 * - Budget breakdown inputs
 * - InterestTags component
 * - DayPlanner component
 */
function NewTripPage({ onNavigate }) {
  return (
    <div className="new-trip-page">
      <h2 className="page-title">✈️ Plan a New Trip</h2>
      <p className="page-subtitle">
        Fill in the details below to create your travel plan.
      </p>
      <div className="card placeholder-card">
        <p>Trip creation form will be built here in Phase 2.</p>
      </div>
    </div>
  );
}

export default NewTripPage;

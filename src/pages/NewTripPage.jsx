import React, { useState, useEffect } from 'react';
import DayPlanner from '../components/DayPlanner';
import './NewTripPage.css';

/**
 * NewTripPage — Streamlined trip creation form.
 *
 * Allows entering destination details, dates, interactive day-by-day
 * activities, and structured budget breakdown.
 *
 * Props:
 *   onNavigate (function) - Callback to switch active view
 */
function NewTripPage({ onNavigate }) {
  // Form State
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(3);

  // Dynamic Day-by-Day Itinerary State
  const [itinerary, setItinerary] = useState([
    { day: 1, activities: ['Arrival and hotel check-in', 'Evening local market walk'] },
    { day: 2, activities: ['City sightseeing tour', 'Dinner at traditional restaurant'] },
    { day: 3, activities: ['Souvenir shopping & departure'] }
  ]);

  // Adjust itinerary length if user changes days input
  useEffect(() => {
    const numDays = parseInt(days, 10);
    if (!numDays || numDays < 1) return;

    setItinerary((prev) => {
      return Array.from({ length: numDays }, (_, i) => {
        const dayNum = i + 1;
        const existing = prev.find((d) => d.day === dayNum);
        return existing || { day: dayNum, activities: [] };
      });
    });
  }, [days]);

  // Budget Breakdown State (5 Categories agreed in planning)
  const [budget, setBudget] = useState({
    transport: 5000,
    accommodation: 8000,
    food: 4000,
    activities: 3000,
    miscellaneous: 2000
  });

  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute total budget automatically from categories
  const calculatedTotal = Object.values(budget).reduce(
    (acc, val) => acc + (Number(val) || 0),
    0
  );

  const handleBudgetChange = (category, value) => {
    if (value === '') {
      setBudget((prev) => ({
        ...prev,
        [category]: ''
      }));
      return;
    }
    const numericValue = Math.max(0, parseInt(value, 10));
    setBudget((prev) => ({
      ...prev,
      [category]: isNaN(numericValue) ? '' : numericValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!destination.trim()) {
      setNotification({ type: 'error', message: 'Please enter a destination name.' });
      return;
    }

    if (!startDate) {
      setNotification({ type: 'error', message: 'Please select a trip start date.' });
      return;
    }

    const numericDays = parseInt(days, 10);
    if (!numericDays || numericDays < 1) {
      setNotification({ type: 'error', message: 'Duration must be at least 1 day.' });
      return;
    }

    setIsSubmitting(true);

    const tripData = {
      destination: destination.trim(),
      startDate,
      days: numericDays,
      budget: {
        total: calculatedTotal,
        transport: Number(budget.transport) || 0,
        accommodation: Number(budget.accommodation) || 0,
        food: Number(budget.food) || 0,
        activities: Number(budget.activities) || 0,
        miscellaneous: Number(budget.miscellaneous) || 0
      },
      itinerary
    };

    try {
      if (window.api && window.api.saveTrip) {
        const response = await window.api.saveTrip(tripData);
        if (response.success) {
          setNotification({ type: 'success', message: 'Trip planned and saved successfully!' });
          setTimeout(() => {
            onNavigate('saved-trips');
          }, 1200);
        } else {
          setNotification({ type: 'error', message: response.error || 'Failed to save trip.' });
        }
      } else {
        // Fallback for development browser testing outside Electron
        console.log('Saved trip data (dev preview):', tripData);
        setNotification({ type: 'success', message: 'Trip created (Development Mode)!' });
        setTimeout(() => onNavigate('saved-trips'), 1200);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'An unexpected error occurred while saving.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-trip-page">
      <div className="page-header">
        <h2 className="page-title">✈️ Plan a New Trip</h2>
        <p className="page-subtitle">
          Design your custom itinerary, set travel goals, and budget your journey.
        </p>
      </div>

      {notification && (
        <div className={`notification-banner ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <form className="trip-form" onSubmit={handleSubmit}>
        {/* Section 1: Basic Information */}
        <section className="form-section card">
          <h3 className="section-title">📍 Destination & Dates</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="destination" className="form-label">
                Destination *
              </label>
              <input
                id="destination"
                type="text"
                className="form-input"
                placeholder="e.g. Kyoto, Manali, Paris, Goa"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="startDate" className="form-label">
                Start Date *
              </label>
              <input
                id="startDate"
                type="date"
                className="form-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="days" className="form-label">
                Duration (Days) *
              </label>
              <input
                id="days"
                type="number"
                min="1"
                max="60"
                className="form-input"
                placeholder="e.g. 5"
                value={days}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setDays('');
                  } else {
                    const parsed = parseInt(val, 10);
                    setDays(isNaN(parsed) ? '' : parsed);
                  }
                }}
                onBlur={() => {
                  if (!days || Number(days) < 1) {
                    setDays(1);
                  }
                }}
                required
              />
            </div>
          </div>
        </section>

        {/* Section 2: Day-by-Day Itinerary Planner */}
        <section className="form-section card">
          <DayPlanner days={days} itinerary={itinerary} onChange={setItinerary} />
        </section>

        {/* Section 3: Budget Allocation */}
        <section className="form-section card">
          <div className="budget-header">
            <div>
              <h3 className="section-title">💰 Budget Breakdown</h3>
              <p className="form-help-text">
                Allocate your estimated expenses across 5 essential travel categories:
              </p>
            </div>
            <div className="total-budget-badge">
              <span className="total-label">Total Estimated Budget</span>
              <span className="total-amount">₹{calculatedTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="budget-inputs-grid">
            <div className="budget-field">
              <label className="form-label">🚆 Transport (Flights, Trains, Cabs)</label>
              <div className="currency-input-wrap">
                <span className="currency-prefix">₹</span>
                <input
                  type="number"
                  min="0"
                  className="form-input"
                  value={budget.transport}
                  onChange={(e) => handleBudgetChange('transport', e.target.value)}
                />
              </div>
            </div>

            <div className="budget-field">
              <label className="form-label">🏨 Accommodation (Hotels, Resorts)</label>
              <div className="currency-input-wrap">
                <span className="currency-prefix">₹</span>
                <input
                  type="number"
                  min="0"
                  className="form-input"
                  value={budget.accommodation}
                  onChange={(e) => handleBudgetChange('accommodation', e.target.value)}
                />
              </div>
            </div>

            <div className="budget-field">
              <label className="form-label">🍲 Food & Dining</label>
              <div className="currency-input-wrap">
                <span className="currency-prefix">₹</span>
                <input
                  type="number"
                  min="0"
                  className="form-input"
                  value={budget.food}
                  onChange={(e) => handleBudgetChange('food', e.target.value)}
                />
              </div>
            </div>

            <div className="budget-field">
              <label className="form-label">🎟️ Activities & Sightseeing</label>
              <div className="currency-input-wrap">
                <span className="currency-prefix">₹</span>
                <input
                  type="number"
                  min="0"
                  className="form-input"
                  value={budget.activities}
                  onChange={(e) => handleBudgetChange('activities', e.target.value)}
                />
              </div>
            </div>

            <div className="budget-field">
              <label className="form-label">🛍️ Miscellaneous & Shopping</label>
              <div className="currency-input-wrap">
                <span className="currency-prefix">₹</span>
                <input
                  type="number"
                  min="0"
                  className="form-input"
                  value={budget.miscellaneous}
                  onChange={(e) => handleBudgetChange('miscellaneous', e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onNavigate('home')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving Plan...' : '💾 Save Trip Plan'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTripPage;

import React, { useState } from 'react';
import './DayPlanner.css';

/**
 * DayPlanner — Dynamic day-by-day itinerary builder.
 *
 * Allows users to add, edit, and remove activities for each day of their journey.
 *
 * Props:
 *   days (number) - Total number of trip days
 *   itinerary (Array<{ day: number, activities: string[] }>) - Current itinerary data
 *   onChange (function) - Callback when itinerary updates
 */
function DayPlanner({ days, itinerary = [], onChange }) {
  const [activeDayTab, setActiveDayTab] = useState(1);
  const [newActivityText, setNewActivityText] = useState('');

  // Safely parse total days (handles empty string while user is typing)
  const totalDays = Math.max(1, parseInt(days, 10) || 1);

  // Find activities for currently active tab
  const currentDayData = itinerary.find((d) => d.day === activeDayTab) || {
    day: activeDayTab,
    activities: []
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivityText.trim()) return;

    const updated = Array.from({ length: totalDays }, (_, i) => {
      const dayNum = i + 1;
      const existing = itinerary.find((d) => d.day === dayNum);
      const activities = existing ? [...existing.activities] : [];

      if (dayNum === activeDayTab) {
        activities.push(newActivityText.trim());
      }

      return { day: dayNum, activities };
    });

    onChange(updated);
    setNewActivityText('');
  };

  const handleRemoveActivity = (dayNum, activityIndex) => {
    const updated = itinerary.map((d) => {
      if (d.day === dayNum) {
        return {
          ...d,
          activities: d.activities.filter((_, idx) => idx !== activityIndex)
        };
      }
      return d;
    });

    onChange(updated);
  };

  return (
    <div className="day-planner-container">
      <div className="day-planner-header">
        <div>
          <h3 className="section-title">📅 Day-by-Day Itinerary Planner</h3>
          <p className="form-help-text">
            Add custom sights, meals, and adventures planned for each day:
          </p>
        </div>
      </div>

      {/* Days Tabs */}
      <div className="day-tabs-scroll">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((dayNum) => {
          const dayItems = itinerary.find((d) => d.day === dayNum)?.activities || [];
          return (
            <button
              type="button"
              key={dayNum}
              className={`day-tab-btn ${activeDayTab === dayNum ? 'active' : ''}`}
              onClick={() => setActiveDayTab(dayNum)}
            >
              Day {dayNum}
              {dayItems.length > 0 && (
                <span className="activity-count-badge">{dayItems.length}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Current Day Activity Manager */}
      <div className="day-content-card">
        <h4 className="day-heading">
          Day {activeDayTab} Schedule
        </h4>

        {currentDayData.activities.length === 0 ? (
          <p className="empty-day-hint">No activities added for Day {activeDayTab} yet.</p>
        ) : (
          <ul className="activities-list">
            {currentDayData.activities.map((activity, idx) => (
              <li key={idx} className="activity-item">
                <span className="activity-bullet">📍</span>
                <span className="activity-name">{activity}</span>
                <button
                  type="button"
                  className="activity-delete-btn"
                  onClick={() => handleRemoveActivity(activeDayTab, idx)}
                  title="Remove activity"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Add Activity Form */}
        <form onSubmit={handleAddActivity} className="add-activity-row">
          <input
            type="text"
            className="form-input activity-input"
            placeholder={`Add an activity for Day ${activeDayTab}...`}
            value={newActivityText}
            onChange={(e) => setNewActivityText(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary add-btn">
            + Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default DayPlanner;

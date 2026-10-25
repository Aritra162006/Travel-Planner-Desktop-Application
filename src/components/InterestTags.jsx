import React from 'react';
import './InterestTags.css';

// Predefined travel interest categories
const AVAILABLE_INTERESTS = [
  { id: 'Adventure', label: '🧗 Adventure' },
  { id: 'Culture', label: '🏛️ Culture' },
  { id: 'Food', label: '🍜 Food' },
  { id: 'Nature', label: '🌲 Nature' },
  { id: 'Shopping', label: '🛍️ Shopping' },
  { id: 'Relaxation', label: '🏖️ Relaxation' },
  { id: 'Photography', label: '📸 Photography' },
  { id: 'Nightlife', label: '🌃 Nightlife' }
];

/**
 * InterestTags — Interactive multi-select chips for travel interests.
 *
 * Props:
 *   selectedInterests (string[]) - Array of selected interest IDs
 *   onChange (function) - Callback invoked with updated array
 */
function InterestTags({ selectedInterests = [], onChange }) {
  const toggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      onChange(selectedInterests.filter((id) => id !== interestId));
    } else {
      onChange([...selectedInterests, interestId]);
    }
  };

  return (
    <div className="interest-tags-container">
      <label className="form-label">Travel Interests</label>
      <p className="form-help-text">Select one or more interests to personalize your itinerary:</p>
      <div className="interest-chips">
        {AVAILABLE_INTERESTS.map(({ id, label }) => {
          const isSelected = selectedInterests.includes(id);
          return (
            <button
              type="button"
              key={id}
              className={`chip ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleInterest(id)}
              aria-pressed={isSelected}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default InterestTags;

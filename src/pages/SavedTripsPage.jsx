import React, { useState, useEffect } from 'react';
import TripCard from '../components/TripCard';
import './SavedTripsPage.css';

/**
 * SavedTripsPage — Displays all planned trips in a responsive card grid.
 *
 * Props:
 *   onNavigate (function) - Callback to switch active view
 */
function SavedTripsPage({ onNavigate }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Fetch saved trips from local disk on component mount
  useEffect(() => {
    async function loadTrips() {
      try {
        if (window.api && window.api.getTrips) {
          const res = await window.api.getTrips();
          if (res.success && Array.isArray(res.trips)) {
            setTrips(res.trips);
          }
        } else {
          // Sample mock trips for development preview
          setTrips([
            {
              id: 'sample_1',
              destination: 'Manali, Himachal Pradesh',
              startDate: '2026-11-15',
              days: 5,
              image: './assets/defaults/mountain.svg',
              interests: ['Adventure', 'Nature', 'Photography'],
              budget: {
                total: 28000,
                transport: 9000,
                accommodation: 10000,
                food: 4500,
                activities: 3000,
                miscellaneous: 1500
              },
              itinerary: [
                { day: 1, activities: ['Arrival in Manali', 'Check-in & Mall Road stroll'] },
                { day: 2, activities: ['Solang Valley paragliding', 'Atal Tunnel excursion'] },
                { day: 3, activities: ['Hadimba Temple visit', 'Old Manali cafes'] },
                { day: 4, activities: ['Jogini Waterfall trek', 'Vashisht hot springs'] },
                { day: 5, activities: ['Local souvenir shopping', 'Departure'] }
              ]
            },
            {
              id: 'sample_2',
              destination: 'Goa Beaches',
              startDate: '2026-12-05',
              days: 4,
              image: './assets/defaults/beach.svg',
              interests: ['Relaxation', 'Food', 'Nightlife'],
              budget: {
                total: 22000,
                transport: 7000,
                accommodation: 8000,
                food: 4000,
                activities: 2000,
                miscellaneous: 1000
              },
              itinerary: [
                { day: 1, activities: ['Flight to Goa', 'North Goa resort check-in'] },
                { day: 2, activities: ['Calangute beach water sports', 'Sunset dinner'] },
                { day: 3, activities: ['Old Goa churches', 'Chapora Fort exploration'] },
                { day: 4, activities: ['Anjuna flea market', 'Flight home'] }
              ]
            }
          ]);
        }
      } catch (err) {
        console.error('Failed to load trips:', err);
      } finally {
        setLoading(false);
      }
    }

    loadTrips();
  }, []);

  // Filter trips based on search query
  const filteredTrips = trips.filter((trip) => {
    const q = searchQuery.toLowerCase();
    const matchesDest = trip.destination?.toLowerCase().includes(q);
    const matchesInterests = trip.interests?.some((i) => i.toLowerCase().includes(q));
    return matchesDest || matchesInterests;
  });

  return (
    <div className="saved-trips-page">
      <div className="saved-trips-header">
        <div>
          <h2 className="page-title">💾 Saved Trips</h2>
          <p className="page-subtitle">
            Browse through your saved itineraries, budgets, and travel plans.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onNavigate('new-trip')}
        >
          + Plan New Trip
        </button>
      </div>

      {/* Filter / Search Bar */}
      {trips.length > 0 && (
        <div className="trips-search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search trips by destination or interest..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Content State */}
      {loading ? (
        <div className="loading-state card">
          <p>Loading your saved travel plans...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="empty-trips-card card">
          <span className="empty-icon">🧳</span>
          <h3 className="empty-title">No Trips Planned Yet</h3>
          <p className="empty-description">
            Your travel bucket list is waiting! Start planning your first itinerary with budgets and destination visuals.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate('new-trip')}
          >
            ✈️ Plan Your First Trip
          </button>
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className="no-matches-card card">
          <p>No trips match "{searchQuery}". Try a different search term.</p>
        </div>
      ) : (
        <div className="trips-grid">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id || trip.createdAt}
              trip={trip}
              onSelect={setSelectedTrip}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedTripsPage;

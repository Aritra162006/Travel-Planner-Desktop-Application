import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NewTripPage from './pages/NewTripPage';
import SavedTripsPage from './pages/SavedTripsPage';

/**
 * App — Root Component
 *
 * Manages the current page via a `currentPage` state variable.
 * The Navbar calls onNavigate to switch pages.
 * No React Router — just conditional rendering based on state.
 */
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Render the active page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'new-trip':
        return <NewTripPage onNavigate={setCurrentPage} />;
      case 'saved-trips':
        return <SavedTripsPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;

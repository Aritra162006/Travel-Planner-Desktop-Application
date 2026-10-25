import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

// Mount the React app into the #root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

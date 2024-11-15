import React from 'react';
import ReactDOM from 'react-dom/client';  // Use this import instead of 'react-dom'
import './index.css';
import App from './App';

// Create a root element and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Home component
const Home = () => (
  <div className="container">
    <h1>Welcome to ISRO Spacecraft Explorer</h1>
    <p>Explore the fascinating world of Indian Space Research Organisation's spacecraft and missions.</p>
  </div>
);

// Spacecrafts component
const Spacecrafts = () => {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://isro.vercel.app/api/spacecrafts')
      .then(response => response.json())
      .then(data => {
        setSpacecrafts(data.spacecrafts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching spacecrafts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h2>ISRO Spacecrafts</h2>
      <div className="spacecraft-grid">
        {spacecrafts.map(spacecraft => (
          <div key={spacecraft.id} className="spacecraft-card">
            <h3>{spacecraft.name}</h3>
            <p>ID: {spacecraft.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <div className="container">
            <Link to="/" className="logo">ISRO Explorer</Link>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/spacecrafts">Spacecrafts</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spacecrafts" element={<Spacecrafts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import MapPage from './pages/MapPage';
import TablePage from './pages/TablePage';
import './index.css'; // Import custom styles
import { EarthquakeProvider } from './state/EarthquakeContext';

function App() {
  return (
    <EarthquakeProvider>
      <div className="app-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Earthquake Info</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Daftar Gempa</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/map">Pinpoint Gempa</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<TablePage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </EarthquakeProvider>
  );
}

export default App;

import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import EarthquakeTable from './components/EarthquakeTable';
import EarthquakeMap from './components/EarthquakeMap';

function App() {
  return (
    <div className="container mt-4">
      <nav>
        <Link to="/">Daftar Gempa</Link>
        {' '}
        |
        <Link to="/map">Pinpoint Gempa</Link>
      </nav>
      <Routes>
        <Route path="/" element={<EarthquakeTable />} />
        <Route path="/map" element={<EarthquakeMap />} />
      </Routes>
    </div>
  );
}

export default App;

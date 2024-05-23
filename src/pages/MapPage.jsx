import React from 'react';
import EarthquakeMap from '../components/EarthquakeMap';

function MapPage() {
  return (
    <div className="container mt-4 earthquake-map-container">
      <h2 className="text-center mb-4">Pinpoint Gempa di Indonesia</h2>
      <EarthquakeMap />
    </div>
  );
}

export default MapPage;

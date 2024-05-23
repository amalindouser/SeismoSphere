import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json')
      .then((response) => {
        console.log('API response:', response.data.Infogempa.gempa);
        setEarthquakes(response.data.Infogempa.gempa);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const getCoordinates = (locationString) => {
    if (!locationString) return [0, 0];
    const coords = locationString.split(',');
    if (coords.length !== 2) return [0, 0];
    const latitude = parseFloat(coords[0]);
    const longitude = parseFloat(coords[1]);
    console.log('Parsed coordinates:', latitude, longitude);
    return [latitude, longitude];
  };

  return (
    <div className="container mt-4">
      <h2>Pinpoint Gempa di Indonesia</h2>
      <MapContainer center={[-2.5489, 118.0149]} zoom={5} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {earthquakes.map((gempa) => {
          const coordinates = getCoordinates(gempa.Coordinates);
          if (coordinates[0] === 0 && coordinates[1] === 0) return null;
          return (
            <Marker key={gempa.DateTime} position={coordinates}>
              <Popup>
                <strong>{gempa.Wilayah}</strong>
                <br />
                Tanggal:
                {' '}
                {gempa.Tanggal}
                <br />
                Waktu:
                {' '}
                {gempa.Jam}
                <br />
                Magnitude:
                {' '}
                {gempa.Magnitude}
                <br />
                Kedalaman:
                {' '}
                {gempa.Kedalaman}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default EarthquakeMap;

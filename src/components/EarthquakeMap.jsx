import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import '../index.css'; // Import custom styles

// Custom icon for pinpoint
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const cachedData = localStorage.getItem('earthquakes');
        if (cachedData) {
          setEarthquakes(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
          setEarthquakes(response.data.Infogempa.gempa);
          localStorage.setItem('earthquakes', JSON.stringify(response.data.Infogempa.gempa));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  const getCoordinates = (locationString) => {
    if (!locationString) return [0, 0];
    const coords = locationString.split(',');
    if (coords.length !== 2) return [0, 0];
    const latitude = parseFloat(coords[0]);
    const longitude = parseFloat(coords[1]);
    return [latitude, longitude];
  };

  const indonesiaBounds = [
    [-11, 95], // Southwest coordinates
    [6, 141], // Northeast coordinates
  ];

  return (
    <div className="earthquake-map-container">
      <h2 className="text-center mb-4">Pinpoint Gempa di Indonesia</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <ProgressBar animated now={100} label="Loading..." style={{ width: '50%' }} />
        </div>
      ) : (
        <MapContainer
          center={[-2.5489, 118.0149]}
          zoom={5}
          minZoom={5}
          maxZoom={15}
          className="map"
          maxBounds={indonesiaBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {earthquakes.map((gempa) => {
            const coordinates = getCoordinates(gempa.Coordinates);
            if (coordinates[0] === 0 && coordinates[1] === 0) return null;
            return (
              <Marker key={gempa.DateTime} position={coordinates} icon={customIcon}>
                <Popup className="custom-popup">
                  <div className="popup-content">
                    <h4>{gempa.Wilayah}</h4>
                    <div>
                      <strong>Tanggal:</strong>
                      {' '}
                      {gempa.Tanggal}
                    </div>
                    <div>
                      <strong>Waktu:</strong>
                      {' '}
                      {gempa.Jam}
                    </div>
                    <div>
                      <strong>Magnitude:</strong>
                      {' '}
                      {gempa.Magnitude}
                    </div>
                    <div>
                      <strong>Kedalaman:</strong>
                      {' '}
                      {gempa.Kedalaman}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
}

export default EarthquakeMap;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function EarthquakeTable() {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json')
      .then((response) => setEarthquakes(response.data.Infogempa.gempa))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Daftar Gempa di Indonesia</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Waktu</th>
            <th>Magnitude</th>
            <th>Kedalaman</th>
            <th>Lokasi</th>
          </tr>
        </thead>
        <tbody>
          {earthquakes.map((gempa) => (
            <tr key={gempa.DateTime}>
              <td>{gempa.Tanggal}</td>
              <td>{gempa.Jam}</td>
              <td>{gempa.Magnitude}</td>
              <td>{gempa.Kedalaman}</td>
              <td>{gempa.Wilayah}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EarthquakeTable;

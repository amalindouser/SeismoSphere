import React from 'react';
import EarthquakeTable from '../components/EarthquakeTable';

function TablePage() {
  return (
    <div className="container mt-4 earthquake-table-container">
      <h2 className="text-center mb-4">Daftar Gempa di Indonesia</h2>
      <EarthquakeTable />
    </div>
  );
}

export default TablePage;

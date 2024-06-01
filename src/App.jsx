import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { EarthquakeProvider } from './state/EarthquakeContext';
import MapPage from './pages/MapPage';
import './index.css'; // Import custom styles
import HeaderNav from './components/HeaderNav';

function App() {
  return (
    <ChakraProvider>
      <EarthquakeProvider>
        <HeaderNav />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<MapPage />} />
          </Routes>
        </div>
      </EarthquakeProvider>
    </ChakraProvider>
  );
}

export default App;

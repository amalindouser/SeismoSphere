import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, Tbody, Td, Th, Thead, Tr, Spinner, Box, Badge, HStack,
} from '@chakra-ui/react';
import { BsTsunami } from 'react-icons/bs';

function EarthquakeTable() {
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

  const getBadgeColorScheme = (magnitude) => {
    if (magnitude >= 7) return 'red';
    if (magnitude >= 5) return 'orange';
    return 'green';
  };

  const colorPalette = {
    background: '#FAFAFA',
    secondary: '#C7EEFF',
    highlight: '#0077C0',
    accent: '#1D242B',
  };

  return (
    <Box p={4}>
      <Box as="h2" fontSize="xl" textAlign="center" mb={4} color={colorPalette.accent}>Daftar Gempa di Indonesia</Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner size="xl" color={colorPalette.accent} label="Loading..." />
        </Box>
      ) : (
        <Table variant="simple" size="sm">
          <Thead bg={colorPalette.secondary}>
            <Tr>
              <Th color={colorPalette.accent}>Tanggal</Th>
              <Th color={colorPalette.accent}>Waktu</Th>
              <Th color={colorPalette.accent}>Magnitude</Th>
              <Th color={colorPalette.accent}>Kedalaman</Th>
              <Th color={colorPalette.accent}>Lokasi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {earthquakes.map((gempa) => (
              <Tr key={gempa.DateTime}>
                <Td color={colorPalette.accent}>{gempa.Tanggal}</Td>
                <Td color={colorPalette.accent}>{gempa.Jam}</Td>
                <Td>
                  <HStack>
                    <Badge colorScheme={getBadgeColorScheme(gempa.Magnitude)}>
                      {gempa.Magnitude}
                    </Badge>
                    {gempa.Potensi === 'Tsunami' && (
                      <BsTsunami color={colorPalette.highlight} size="20px" />
                    )}
                  </HStack>
                </Td>
                <Td color={colorPalette.accent}>{gempa.Kedalaman}</Td>
                <Td color={colorPalette.accent}>{gempa.Wilayah}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default EarthquakeTable;

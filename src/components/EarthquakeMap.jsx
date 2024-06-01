import React, { useEffect, useState, useRef } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, useMap,
} from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported
import {
  Box, VStack, Heading, HStack, Divider, Icon, Text, Badge, Grid, GridItem,
} from '@chakra-ui/react';
import {
  FaClock, FaCalendarAlt, FaMapMarkerAlt, FaRulerVertical,
} from 'react-icons/fa';
import PropTypes from 'prop-types'; // Import PropTypes
import Legend from './Legend'; // Import the Legend component

const getColor = (magnitude) => {
  if (magnitude >= 7) {
    return 'red';
  } if (magnitude >= 6) {
    return 'orange';
  } if (magnitude >= 5.5) {
    return 'yellow';
  } if (magnitude >= 4.5) {
    return 'green';
  }
  return 'blue';
};

const createIcon = (magnitude) => {
  const color = getColor(magnitude);
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -20],
  });
};

function CenterMapOnPopupOpen({ position }) {
  const map = useMap();
  const initialCenter = [-2.5489, 118.0149];

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), {
        animate: true,
        pan: {
          duration: 0.5,
        },
      });
    } else {
      map.setView(initialCenter, map.getZoom(), {
        animate: true,
        pan: {
          duration: 0.5,
        },
      });
    }
  }, [position, map]);

  return null;
}

// Add prop types validation
CenterMapOnPopupOpen.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [popupPosition, setPopupPosition] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        nprogress.start();
        const cachedData = localStorage.getItem('earthquakes');
        if (cachedData) {
          setEarthquakes(JSON.parse(cachedData));
        } else {
          const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
          setEarthquakes(response.data.Infogempa.gempa);
          localStorage.setItem('earthquakes', JSON.stringify(response.data.Infogempa.gempa));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        nprogress.done();
      }
    };

    fetchEarthquakes();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, [earthquakes]);

  const getCoordinates = (locationString) => {
    if (!locationString) return [0, 0];
    const coords = locationString.split(',');
    if (coords.length !== 2) return [0, 0];
    const latitude = parseFloat(coords[0]);
    const longitude = parseFloat(coords[1]);
    return [latitude, longitude];
  };

  const getBadgeColor = (magnitude) => {
    if (magnitude >= 7) return 'red';
    if (magnitude >= 5) return 'orange';
    return 'green';
  };

  const indonesiaBounds = [
    [-11, 95], // Southwest coordinates (approx)
    [6, 141], // Northeast coordinates (approx)
  ];

  return (
    <Box p={4} mb={4} bg="white" borderRadius="md" boxShadow="lg" position="relative">
      <Heading as="h2" size="lg" textAlign="center" mb={4} color="gray.700">Pinpoint Gempa di Indonesia</Heading>
      <Box style={{
        height: '500px', width: '100%', borderRadius: '8px', overflow: 'hidden',
      }}
      >
        <MapContainer
          center={[-2.5489, 118.0149]}
          zoom={5}
          minZoom={5}
          maxZoom={15}
          style={{ height: '100%', width: '100%' }}
          whenCreated={(mapInstance) => { mapRef.current = mapInstance; mapInstance.invalidateSize(); }}
          maxBounds={indonesiaBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>
            OpenStreetMap</a> contributors"
          />
          {earthquakes.map((gempa) => {
            const coordinates = getCoordinates(gempa.Coordinates);
            if (coordinates[0] === 0 && coordinates[1] === 0) return null;
            const icon = createIcon(gempa.Magnitude);
            return (
              <Marker
                key={gempa.DateTime}
                position={coordinates}
                icon={icon}
              >
                <Popup
                  className="custom-popup"
                  maxWidth={300}
                  minWidth={200}
                  autoPan // Ensure the map pans to keep the popup in view
                  autoPanPadding={L.point(100, 100)} // Add padding to the auto-pan
                  keepInView // Ensure the popup stays in view
                  onOpen={() => setPopupPosition(coordinates)}
                  onClose={() => setPopupPosition(null)} // Reset the position when popup is closed
                >
                  <VStack align="start" spacing={2}>
                    <Heading as="h4" size="sm" textAlign="center">{gempa.Wilayah}</Heading>
                    <Divider />
                    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                      <GridItem>
                        <HStack spacing={1}>
                          <Icon as={FaCalendarAlt} color="gray.500" />
                          <Text fontSize="sm">
                            <strong>Tanggal:</strong>
                          </Text>
                        </HStack>
                        <Text fontSize="sm" ml={5}>{gempa.Tanggal}</Text>
                      </GridItem>
                      <GridItem>
                        <HStack spacing={1}>
                          <Icon as={FaClock} color="gray.500" />
                          <Text fontSize="sm">
                            <strong>Waktu:</strong>
                          </Text>
                        </HStack>
                        <Text fontSize="sm" ml={5}>{gempa.Jam}</Text>
                      </GridItem>
                      <GridItem>
                        <HStack spacing={1}>
                          <Icon as={FaMapMarkerAlt} color="gray.500" />
                          <Text fontSize="sm">
                            <strong>Magnitude:</strong>
                          </Text>
                        </HStack>
                        <Badge colorScheme={getBadgeColor(gempa.Magnitude)} ml={5}>{gempa.Magnitude}</Badge>
                      </GridItem>
                      <GridItem>
                        <HStack spacing={1}>
                          <Icon as={FaRulerVertical} color="gray.500" />
                          <Text fontSize="sm">
                            <strong>Kedalaman:</strong>
                          </Text>
                        </HStack>
                        <Text fontSize="sm" ml={5}>{gempa.Kedalaman}</Text>
                      </GridItem>
                    </Grid>
                  </VStack>
                </Popup>
              </Marker>
            );
          })}
          <CenterMapOnPopupOpen position={popupPosition || [-2.5489, 118.0149]} />
        </MapContainer>
      </Box>
      <Legend />
      {' '}
      {/* Add the Legend component */}
    </Box>
  );
}

export default EarthquakeMap;

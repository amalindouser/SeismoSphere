import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

function CenterMapOnPopupOpen({ position }) {
  const map = useMap();
  const initialCenter = [-2.5489, 118.0149];

  useEffect(() => {
    const updateView = debounce(() => {
      if (position) {
        const currentCenter = map.getCenter();
        if (currentCenter.lat !== position[0] || currentCenter.lng !== position[1]) {
          map.setView(position, map.getZoom(), {
            animate: true,
            pan: { duration: 0.5 },
          });
        }
      } else {
        map.setView(initialCenter, map.getZoom(), {
          animate: true,
          pan: { duration: 0.5 },
        });
      }
    }, 300); // Delay in milliseconds

    updateView();

    return () => {
      updateView.cancel();
    };
  }, [position, map]);

  return null;
}

CenterMapOnPopupOpen.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default CenterMapOnPopupOpen;

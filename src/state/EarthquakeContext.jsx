import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const EarthquakeContext = createContext();

const initialState = {
  earthquakes: [],
  selectedEarthquake: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EARTHQUAKES':
      return { ...state, earthquakes: action.payload };
    case 'SET_SELECTED_EARTHQUAKE':
      return { ...state, selectedEarthquake: action.payload };
    default:
      return state;
  }
};

export function EarthquakeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EarthquakeContext.Provider value={{ state, dispatch }}>
      {children}
    </EarthquakeContext.Provider>
  );
}

EarthquakeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EarthquakeContext;

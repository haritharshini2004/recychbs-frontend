import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationDisplay = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: null,
    error: null,
    permissionStatus: null
  });

  useEffect(() => {
    const geoSuccess = async (position) => {
      const { latitude, longitude } = position.coords;

      setLocation(prevState => ({
        ...prevState,
        latitude,
        longitude,
        error: null,
        permissionStatus: 'granted'
      }));

      // Use OpenStreetMap Nominatim API to reverse geocode
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            format: 'json',
            lat: latitude,
            lon: longitude
          }
        });

        const address = response.data?.display_name || 'Address not found';
        setLocation(prevState => ({
          ...prevState,
          address
        }));
      } catch (error) {
        console.error('Error fetching address:', error);
        setLocation(prevState => ({
          ...prevState,
          error: 'Error fetching address'
        }));
      }
    };

    const geoError = (error) => {
      console.error('Geolocation error:', error);
      setLocation({
        latitude: null,
        longitude: null,
        address: null,
        error: error.message,
        permissionStatus: 'error'
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
      setLocation(prevState => ({
        ...prevState,
        error: 'Geolocation is not supported by this browser.',
        permissionStatus: 'unsupported'
      }));
    }
  }, []);

  const { address, error, permissionStatus } = location;

  return (
    <div>
      {permissionStatus === 'unsupported' && <p>{error}</p>}
      {permissionStatus === 'error' && <p>Error: {error}</p>}
      {permissionStatus === 'granted' && (
        <>
          
          {address && (
            <p style={{ color: "#fff", padding: "0", margin: "0",fontSize:"16px" }}>
              {address}
            </p>
          )}
        </>
      )}
      {permissionStatus === null && <p>Fetching location...</p>}
    </div>
  );
};

export default LocationDisplay;

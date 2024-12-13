import React, { useEffect } from 'react';

const UserLocation = () => {
  // Function to get CSRF token from cookies


  const csrfToken = getCookie('csrftoken');
  
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
    }
  const updateLocation = (latitude, longitude) => {
    // fetch('http://127.0.0.1:8000/update-location/', {
    fetch('http://127.0.0.1:8000/update-location/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify({ latitude, longitude }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Location updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error updating location:', error);
      });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      <h1>User Location</h1>
      <p>Your location is being sent to the server.</p>
    </div>
  );
};

export default UserLocation;

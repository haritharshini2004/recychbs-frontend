import React, { useEffect, useState } from 'react';

const NearbyUsers = () => {
    const [nearbyUsers, setNearbyUsers] = useState([]);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const fetchNearbyUsers = async () => {
            try {
                // const response = await fetch('http://127.0.0.1:8000/nearby-users/', {
                const response = await fetch('http://127.0.0.1:8000/nearbyUsers/', {
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-CSRFToken': csrfToken
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                if (data.nearby_users) {
                    setNearbyUsers(data.nearby_users);
                } else {
                    setError(data.error || 'Error fetching nearby users');
                }
            } catch (err) {
                console.error('Error fetching nearby users:', err);
                setError('An error occurred while fetching nearby users.');
            }
        };

        fetchNearbyUsers();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            <h1>Nearby Users</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {nearbyUsers.length > 0 ? (
                <ul>
                    {nearbyUsers.map((username, index) => (
                        <li key={index}>{username}</li>
                    ))}
                </ul>
            ) : (
                <p>No nearby users found.</p>
            )}
        </div>
    );
};


export default NearbyUsers;

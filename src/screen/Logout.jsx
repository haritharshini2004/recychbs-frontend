import { useEffect } from 'react';
import { useAuth } from './AuthContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logOut(); // Log out the user
    navigate('/login', { replace: true }); // Redirect to the login page
  }, [logOut, navigate]);

  return null; // Return null to avoid rendering anything
};

export default Logout;

import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, userRole } = useAuth();

  // if (!isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  // // Check if the required role matches the user's role
  // if (requiredRole && requiredRole !== userRole) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default ProtectedRoute;

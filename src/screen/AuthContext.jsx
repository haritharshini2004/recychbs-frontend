import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return sessionStorage.getItem('userRole') || null;
  });

  const logIn = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userRole', role);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../useAuth';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = useAuth();

  // If isAuthenticated is still null, don't render anything (or render a loading spinner)
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;

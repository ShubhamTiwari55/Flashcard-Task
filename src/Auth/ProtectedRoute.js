import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Authcontext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Check if user is authenticated and has the required role
  const isAdmin = currentUser?.email.includes('@admin.com'); // Example check

  return (
    isAdmin ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/" state={{ from: location }} />
    )
  );
};

export default ProtectedRoute;

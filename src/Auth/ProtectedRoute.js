// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Authcontext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get currentUser from context

  // If there's no currentUser, redirect to login page
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children; // Render children if authenticated
};

export default ProtectedRoute;

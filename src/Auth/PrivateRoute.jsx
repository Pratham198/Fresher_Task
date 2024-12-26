import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const authToken = localStorage.getItem('token'); // Retrieve token from localStorage

  if (!authToken) {
    // If there's no token, redirect to login page
    return <Navigate to="/login" />;
  }

  return element; // Allow access to protected route
};

export default PrivateRoute;

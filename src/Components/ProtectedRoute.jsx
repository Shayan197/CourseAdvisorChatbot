
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="404" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;

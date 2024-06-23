// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from './authService';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = authService.getCurrentUser();
  return currentUser ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

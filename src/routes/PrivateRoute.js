// PrivateRoute.js
import React, { useContext } from 'react';
import {Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({children  }) => {
  const { user } = useContext(AuthContext);;

  // Verificar si el usuario está autenticado y tiene el rol adecuado
  const isAuthorized = () => {
    if (!user) return false;
    return true;
  };

  if (!isAuthorized()) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const userLoggedIn = Cookies.get('token') !== undefined;

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Return the children as JSX directly
  return <>{children}</>;
};

export default Protected;

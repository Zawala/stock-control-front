import React from "react";
import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import  AuthContext from '../AuthContext'; // Assuming AuthContext is in the same directory

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const checkAuth = () => {
  const { authState } = useContext(AuthContext);
  }
  return (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? (  // Call the function to check auth
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
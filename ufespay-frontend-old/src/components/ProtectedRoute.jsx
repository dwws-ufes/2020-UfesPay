import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const ProtectedRoute = ({ path, component: Component }) => {
  const { user } = useAuth();
  console.log(!!user);

  return (
    <>
      {!user ? (
        <Route path={path} component={Component} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;

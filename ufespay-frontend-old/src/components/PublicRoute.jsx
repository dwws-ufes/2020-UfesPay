import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const PublicRoute = ({ path, component }) => {
  const { user } = useAuth();

  return (
    <>
      {!user ? (
        <Route path={path} component={component} />
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
};

export default PublicRoute;

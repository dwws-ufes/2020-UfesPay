import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

// const ProtectedRoute = ({ path, component: Component }) => {
function ProtectedRoute(props) {
  const { user } = useAuth();

  return (
    <>
      {user != undefined ? (
          <Route path={props.path}>
            {props.element}
          </Route>
        ) : (
          <Redirect to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import Navtop from './navtop';

function ProtectedRoute(props) {
  const { user } = useAuth();

  return (
    <>
      {user != undefined ? (
            <Route path={props.path}>
              
              {props.hasNav ? <Navtop /> : <></>}

              {props.element}
              
            </Route>
        ) : (
          <Redirect to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;

import React from 'react';
import Navtop from '../navtop';

import './style.css';

function Layout({ children }) {
  return (
    <div className="layout-container">
      <Navtop />
      <div>{children}</div>
    </div>
  );
}

export default Layout;

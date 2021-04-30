import React from 'react';
import './landing-page.css';

import Login from '../../components/login';
import CreateAcc from '../../components/create-acc';

function LandingPage() {
  return (
    <div id="landing-page">
      <CreateAcc />
      <Login />
    </div>
  );
}

export default LandingPage;

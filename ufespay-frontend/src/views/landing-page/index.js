import React from 'react';
import './landing-page.css';

import Login from '../../components/login';
import CreateAcc from '../../components/create-acc';
import LanguagePicker from '../..//components/language-picker';

function LandingPage() {
  return (
    <div id="landing-page">
      <LanguagePicker />
      <CreateAcc />
      <Login />
    </div>
  );
}

export default LandingPage;

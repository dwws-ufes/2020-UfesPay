/* eslint-disable no-unused-vars */
import React from 'react';

// import '../modal.css';
import './home.css';

import News from '../../components/news';
import Profile from '../../components/profile';

export default function Home() {
  return (
    <div className="content">
      <div className="timeline">
        <News />
      </div>
      <div className="profile">
        <Profile />
      </div>
    </div>
  );
}

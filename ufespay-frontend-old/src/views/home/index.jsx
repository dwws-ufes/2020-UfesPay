import React from 'react';
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

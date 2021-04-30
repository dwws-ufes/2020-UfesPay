import React from 'react';

import '../modal.css'

import Navtop from '../../components/navtop'
import News from '../../components/news'
import Profile from '../../components/profile'

export default function Home() {

    return (
        <div id="home">

            <Navtop />

            <div className="body">

                <div className="left-side">
                    <News />
                </div>

                <div className="right-side">
                    <Profile />
                </div>

            </div>
            
        </div>
    )
}
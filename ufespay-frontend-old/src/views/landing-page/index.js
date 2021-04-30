import React from 'react';

import './styles.css'

import Login from '../../components/login'
import CreateAcc from '../../components/create-acc'

function LandingPage(props) {

    return (
        <div id="landing-page">

            <CreateAcc />

            <Login auth={(login) => {props.callback(login)}}/>

        </div>
    )
}

export default LandingPage;
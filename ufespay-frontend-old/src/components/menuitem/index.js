import React from 'react';

import './styles.css'

export default function MenuItem(props) {

    function handleClick() {

        if(props.whereTo === "") {
            localStorage.setItem("autoriza", false)
            return;
        }

        // "switch case" para outras possibilidades
        
    }

    return (
        <div>

            <a href={"/"+props.whereTo} className="menu-item" onClick={handleClick}>
                <span className="icon-left"> {props.leftIcon}</span>

                { props.children }

                <span className="icon-right"> {props.rightIcon}</span>
            </a>

        </div>
    )
}
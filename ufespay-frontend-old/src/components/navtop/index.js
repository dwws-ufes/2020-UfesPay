import React from 'react';

import NavItem from '../navitem'
import Menu from '../menu'

import './styles.css'

import MenuIcon from '@material-ui/icons/Menu';

export default function Navtop(props) {

    return (
        <nav className='navbar'>

            <ul className='navbar-nav'>

                <a href="/home" id="go-home">UfesPay</a>

                <NavItem className="nav-item" icon={<MenuIcon />}>
                    <Menu />
                </NavItem>
            </ul>
        </nav>
    )
}


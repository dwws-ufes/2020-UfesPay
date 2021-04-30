import React, { useState } from 'react';

import './styles.css'

export default function NavItem(props) {

    const [open, setOpen] = useState(false)

    return (
        <li className="nav-item">
            <a href="#!" className="icon-button" onClick={() => {
                setOpen(!open)
            }}>
                { props.icon }
            </a>

            { open && props.children }
        </li>
    )
}
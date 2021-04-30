import React from 'react';

import MenuItem from '../menuitem'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PaymentIcon from '@material-ui/icons/Payment';
import HomeIcon from '@material-ui/icons/Home';

import './styles.css'

export default function Menu(props) {

    return (
        <div className="menu">

            <MenuItem
                whereTo="home"
                leftIcon={<HomeIcon />}
                >Página Inicial
            </MenuItem>

            <MenuItem
                whereTo="transfer"
                leftIcon={<PaymentIcon />}
                >Realizar Transferência
            </MenuItem>


            <MenuItem
                whereTo=""
                leftIcon={<ExitToAppIcon />}
                >Sair
            </MenuItem>

        </div>
    )
}
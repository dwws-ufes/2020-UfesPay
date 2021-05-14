import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ExitToApp, AttachMoney } from '@material-ui/icons';

import './navtop.css';
import { useAuth } from '../../hooks/auth';
import { useLang } from '../../hooks/lang';
import translate from '../../lang';

export default function Navtop() {
  const { logOut } = useAuth();
  const { language } = useLang();

  return (
    <div className="navbar">
      <Link to="/home" id="go-home">
        UfesPay
      </Link>

      <div className="actions">
        <Link className="action" to="/home">
          <Home />
          <span className="action-label">{translate[language].navtop.home}</span>
        </Link>
        <Link className="action" to="/transfer">
          <AttachMoney />
          <span className="action-label">{translate[language].navtop.pay}</span>
        </Link>
        <button type="button" className="action" onClick={logOut}>
          <ExitToApp />
          <span className="action-label">{translate[language].navtop.logout}</span>
        </button>
      </div>
    </div>
  );
}

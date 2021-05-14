/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './login.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../../hooks/auth';
import { useLang } from '../../hooks/lang';
import translate from '../../lang';


const Login = () => {
  const { language } = useLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    logIn(email, password).then(() => history.push('/home'));
  };

  return (
    <div id="login">
      <div id="form-login">
        <h1>{translate[language].login.welcomeBack}</h1>

        <form onSubmit={handleSubmit}>
          <div className="TextField">
            <TextField
              className="TextField"
              variant="outlined"
              color="primary"
              label={translate[language].login.email}
              placeholder={translate[language].login.emailPlaceholder}
              type="text"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="TextField">
            <TextField
              className="TextField"
              variant="outlined"
              color="primary"
              label={translate[language].login.password}
              placeholder={translate[language].login.password}
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <Button
            className="Button"
            variant="contained"
            color="primary"
            type="submit"
          >
            {translate[language].login.login}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

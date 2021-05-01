/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './login.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../../hooks/auth';

const Login = () => {
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
        <h1>Bem vindo de volta</h1>

        <form onSubmit={handleSubmit}>
          <div className="TextField">
            <TextField
              className="TextField"
              variant="outlined"
              color="primary"
              label="Email"
              placeholder="exemplo@exemplo.com"
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
              label="Senha"
              placeholder="Senha"
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
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Button, 
  TextField, 
  makeStyles,
} from '@material-ui/core';

import './login.css';
import { useAuth } from '../../hooks/auth';
import { useLang } from '../../hooks/lang';
import translate from '../../lang';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: 0,
    marginBottom: 10,
    width: 500,
  }
}));

const Login = () => {
  const classes = useStyles();
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
            <TextField
              className={classes.input}
              variant="outlined"
              color="primary"
              label={translate[language].login.email}
              placeholder={translate[language].login.emailPlaceholder}
              type="text"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

          <TextField
            className={classes.input}
            variant="outlined"
            color="primary"
            label={translate[language].login.password}
            placeholder={translate[language].login.password}
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

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

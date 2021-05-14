import React, { useCallback, useState } from 'react';

import './create-acc.css';

import { Button, TextField } from '@material-ui/core';
import { createUser } from '../../services/UserService';
import { fireToastAlert } from '../../services/AlertService';
import { useLang } from '../../hooks/lang';
import translate from '../../lang';

const CreateAcc = () => {
  const { language } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');

  const handleSubmit = useCallback(
    event => {
      event.preventDefault(); // evitar que abra uma nova pagina
      createUser(name, email, password).then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setRepPassword('');

        fireToastAlert('success', translate[language].createAcc.successMessage);
      });
    },
    [name, email, password],
  );

  return (
    <div id="create-acc">
      <div id="form-create-acc">
        <h1>UfesPay</h1>

        <h3>{translate[language].createAcc.createAccount}</h3>

        <form onSubmit={handleSubmit}>
          <div className="TextField">
            <TextField
              className="TextField"
              variant="outlined"
              color="primary"
              label={translate[language].createAcc.name}
              placeholder={translate[language].createAcc.name}
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="TextField">
            <TextField
              className="TextField"
              variant="outlined"
              color="primary"
              label={translate[language].createAcc.email}
              placeholder="johndoe@email.com"
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
              label={translate[language].createAcc.password}
              placeholder={translate[language].createAcc.password}
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="TextField">
            <TextField
              className="TextField"
              variant="outlined"
              color="primary"
              label={translate[language].createAcc.confirmPassword}
              placeholder={translate[language].createAcc.confirmPassword}
              type="password"
              required
              value={repPassword}
              onChange={e => setRepPassword(e.target.value)}
            />
          </div>

          <Button
            className="Button"
            variant="contained"
            color="primary"
            type="submit"
          >
            {translate[language].createAcc.signUp}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAcc;

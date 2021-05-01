import React, { useCallback, useState } from 'react';

import './create-acc.css';

import { Button, TextField } from '@material-ui/core';
import { createUser } from '../../services/UserService';
import { fireToastAlert } from '../../services/AlertService';

const CreateAcc = () => {
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

        fireToastAlert('success', 'Cadastro realizado com sucesso!');
      });
    },
    [name, email, password],
  );

  return (
    <div id="create-acc">
      <div id="form-create-acc">
        <h1>UfesPay</h1>

        <h3>Cadastre-se!</h3>

        <form onSubmit={handleSubmit}>
          <div className="TextField">
            <TextField
              className="TextField"
              variant="outlined"
              color="primary"
              label="Nome"
              placeholder="Nome completo"
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

          <div className="TextField">
            <TextField
              className="TextField"
              variant="outlined"
              color="primary"
              label="Confirme a senha"
              placeholder="Confirme a senha"
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
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAcc;

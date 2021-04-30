import React, { useCallback, useState } from 'react';

import './styles.css';

import { Button, TextField } from '@material-ui/core';

import { blue } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../hooks/auth';
import { updateUser } from '../../services/UserService';
import { fireToastAlert } from '../../services/AlertService';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    marginTop: 10,
    marginBottom: 10,
  },
  media: {
    WebkitMaxInlineSize: 10,
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: blue[500],
    height: 150,
    width: 150,
    fontSize: 80,
    fontWeight: 'bold',
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { user, refreshUser } = useAuth();

  const [edit, setEdit] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [repPassword, setRepPassword] = useState();
  const [currentPassword, setCurrentPassword] = useState();

  const erasePassword = () => {
    setPassword(undefined);
    setRepPassword(undefined);
    setCurrentPassword(undefined);
  };

  const handleCancel = () => {
    setEdit(false);
    erasePassword();
  };

  const saveProfileChanges = useCallback(
    e => {
      e.preventDefault();
      if (password !== repPassword) {
        fireToastAlert('error', 'Password confirmation do not match.');
        return;
      }
      updateUser(name, email, password, currentPassword).then(() => {
        handleCancel();
        fireToastAlert('success', 'User updated.');
        refreshUser();
      });
    },
    [name, email, password, repPassword, currentPassword],
  );

  return (
    <div className="profile-container">
      {!edit ? (
        <div className="show-profile">
          <Avatar aria-label="recipe" className={classes.avatar} id="avatar">
            {user.name[0]}
          </Avatar>

          <br />

          <div className="names">
            <h3>{user.name}</h3>

            <h3>{user.email}</h3>

            <h1>
              {user.wallet.balance.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </h1>
          </div>

          <Button
            className="Button"
            variant="contained"
            color="primary"
            type="button"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Editar Perfil
          </Button>
        </div>
      ) : (
        <div className="edit-profile">
          <h1>Editar Perfil</h1>

          <form onSubmit={saveProfileChanges}>
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
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="TextField">
              <TextField
                className="TextField"
                variant="outlined"
                color="primary"
                label="Nova Senha"
                placeholder="Nova Senha"
                type="password"
                disabled={!currentPassword}
                required={!!currentPassword}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="TextField">
              <TextField
                className="TextField"
                variant="outlined"
                color="primary"
                label="Repita a Senha"
                placeholder="Repita a Senha"
                type="password"
                disabled={!currentPassword}
                required={!!currentPassword}
                value={repPassword}
                onChange={e => setRepPassword(e.target.value)}
              />
            </div>

            <div className="botao">
              <Button
                className="Button"
                variant="contained"
                color="primary"
                type="submit"
              >
                Salvar
              </Button>
            </div>

            <div className="botao">
              <Button
                className="Button"
                variant="contained"
                color="primary"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

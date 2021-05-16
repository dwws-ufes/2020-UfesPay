import React, { useCallback, useState } from 'react';

import './profile.css';

import { Button, TextField } from '@material-ui/core';

import { blue } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../hooks/auth';
import { updateUser } from '../../services/UserService';
import { fireToastAlert } from '../../services/AlertService';
import { useLang } from '../../hooks/lang';
import translate from '../../lang';

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
  const { language } = useLang();
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
              {
                (translate[language].exchangeRate * user.wallet.balance)
                  .toLocaleString(translate[language].lang, {
                    style: 'currency',
                    currency: translate[language].currency,
                  })
              }
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
            {translate[language].profile.editProfile}
          </Button>
        </div>
      ) : (
        <div className="edit-profile">
          <h1>{translate[language].profile.editProfile}</h1>

          <form onSubmit={saveProfileChanges}>
            <div className="TextField">
              <TextField
                className="TextField"
                variant="outlined"
                color="primary"
                label={translate[language].profile.name}
                placeholder={translate[language].profile.name}
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
                label={translate[language].profile.email}
                placeholder={translate[language].profile.email}
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
                label={translate[language].profile.password}
                placeholder={translate[language].profile.password}
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
                label={translate[language].profile.newPassword}
                placeholder={translate[language].profile.newPassword}
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
                label={translate[language].profile.confirmPassword}
                placeholder={translate[language].profile.confirmPassword}
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
                {translate[language].profile.save}
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
                {translate[language].profile.cancel}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

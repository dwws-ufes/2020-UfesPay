/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useCallback, useEffect, useState } from 'react';
import { AttachMoney } from '@material-ui/icons';

import './transfer.css';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { getUsers } from '../../services/UserService';
import {
  fireConfimationAlert,
  fireToastAlert,
} from '../../services/AlertService';
import { pay } from '../../services/TransactionService';

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    height: '100%',
  },
}));

export default function Transaction() {
  const classes = useStyles();
  const { user, refreshUser } = useAuth();
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [value, setValue] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    getUsers().then(resp => setUsers(resp.users));
  }, []);

  const handlePay = useCallback(
    async e => {
      e.preventDefault();
      const isConfirmed = await fireConfimationAlert(
        `Depois dessa transferência, sua carteira ficará com um saldo de ${(
          user.wallet.balance - value
        ).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}. Deseja confirma a transferência?`,
      );
      if (isConfirmed) {
        pay(receiver._id, value, message).then(() => {
          fireToastAlert('success', 'Success!');
          refreshUser();
          history.push('/home');
        });
      }
    },
    [receiver, value, message, history],
  );

  return (
    <div className="transaction-container">
      <div className="transaction-content">
        <Card className={classes.card}>
          <CardHeader
            title="Faça uma tranferência"
            subheader={`Você tem ${user.wallet.balance.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })} na carteira`}
          />
          <CardContent>
            <form className="" onSubmit={handlePay}>
              <Autocomplete
                className="TextField transaction-field"
                id="combo-box-demo"
                options={users}
                value={receiver}
                onChange={(event, newValue) => {
                  setReceiver(newValue);
                }}
                getOptionSelected={(op, e) => op._id === e._id}
                getOptionLabel={option => option.name}
                renderOption={option => (
                  <>
                    <strong>{option.name}</strong>
                    {', '}
                    <span className="email">{option.email}</span>
                  </>
                )}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Destinatário"
                    variant="outlined"
                    required
                  />
                )}
              />
              <TextField
                className="TextField transaction-field"
                variant="outlined"
                type="number"
                required
                value={value}
                onChange={e => setValue(e.target.value)}
                label="Valor"
              />

              <TextField
                className="TextField transaction-field"
                variant="outlined"
                multiline
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                label="Escreva um comentário"
                type="text"
              />

              <Button
                type="submit"
                aria-label="pay"
                variant="contained"
                color="primary"
              >
                <AttachMoney />
                Pagar
              </Button>
            </form>
          </CardContent>

          <CardActions disableSpacing />
        </Card>
      </div>
    </div>
  );
}

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
import { useLang } from '../../hooks/lang';
import translate from '../../lang';

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    height: '100%',
  },
}));

export default function Transaction() {
  const { language } = useLang();
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
        `${translate[language].transfer.afterTransferYouWillHave} ${(
          (translate[language].exchangeRate * user.wallet.balance) - value
        ).toLocaleString(translate[language].lang, {
          style: 'currency',
          currency: translate[language].currency,
        })}. ${translate[language].transfer.confirmTransfer}`,
      );
      if (isConfirmed) {
        pay(receiver.id, (value/translate[language].exchangeRate), message).then(() => {
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
            title={translate[language].transfer.makeATransfer}
            subheader={`${translate[language].transfer.youHave}
            ${(translate[language].exchangeRate * user.wallet.balance)
              .toLocaleString(
                translate[language].lang,
                {
                  style: 'currency',
                  currency: translate[language].currency,
                }
            )} ${translate[language].transfer.onYourWallet}`}
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
                    label={translate[language].transfer.receiver}
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
                label={translate[language].transfer.value}
              />

              <TextField
                className="TextField transaction-field"
                variant="outlined"
                multiline
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                label={translate[language].transfer.addMessage}
                type="text"
              />

              <Button
                type="submit"
                aria-label={translate[language].transfer.pay}
                variant="contained"
                color="primary"
              >
                <AttachMoney />
                {translate[language].transfer.pay}
              </Button>
            </form>
          </CardContent>

          <CardActions disableSpacing />
        </Card>
      </div>
    </div>
  );
}

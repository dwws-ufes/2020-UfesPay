import React, { useCallback, useState } from 'react';
import { 
  Button, 
  TextField, 
  makeStyles,
  FormControl,
  InputLabel, 
  Select, 
  MenuItem 
} from '@material-ui/core';

import './create-acc.css';
import { createUser } from '../../services/UserService';
import { fireToastAlert } from '../../services/AlertService';
import { useLang } from '../../hooks/lang';
import translate from '../../lang';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: 0,
    marginBottom: 10,
    width: 500,
  }
}));

const CreateAcc = () => {
  const classes = useStyles();
  const { language } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [country, setCountry] = useState('');
  
  const handleSubmit = useCallback(
    event => {
      event.preventDefault(); // evitar que abra uma nova pagina
      createUser(name, email, password, country).then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setRepPassword('');
        setCountry('');

        fireToastAlert('success', translate[language].createAcc.successMessage);
      });
    },
    [name, email, password, country],
  );

  return (
    <div id="create-acc">
      <div id="form-create-acc">
        <h1>UfesPay</h1>

        <h3>{translate[language].createAcc.createAccount}</h3>

        <form onSubmit={handleSubmit}>

          <TextField
            className={classes.input}
            variant="outlined"
            color="primary"
            label={translate[language].createAcc.name}
            placeholder={translate[language].createAcc.name}
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <TextField
            className={classes.input}
            variant="outlined"
            color="primary"
            label={translate[language].createAcc.email}
            placeholder={translate[language].createAcc.emailPlaceholder}
            type="text"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          
          <FormControl variant="outlined" className={classes.input}>
            <InputLabel id="language-select-label">{translate[language].createAcc.country}</InputLabel>
            <Select
              labelId="country-select-label"
              label="Country"
              required
              value={country}
              onChange={e => setCountry(e.target.value)}
            >

              <MenuItem value={"Brazil"}>Brasil</MenuItem>
              <MenuItem value={"USA"}>USA</MenuItem>
              {/* add more countries (?) */}
            </Select>
          </FormControl>

          <TextField
            className={classes.input}
            variant="outlined"
            color="primary"
            label={translate[language].createAcc.password}
            placeholder={translate[language].createAcc.password}
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <TextField
            className={classes.input}
            variant="outlined"
            color="primary"
            label={translate[language].createAcc.confirmPassword}
            placeholder={translate[language].createAcc.confirmPassword}
            type="password"
            required
            value={repPassword}
            onChange={e => setRepPassword(e.target.value)}
          />

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

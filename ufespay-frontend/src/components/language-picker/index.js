import React from 'react';
import {
  Card,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useLang } from '../../hooks/lang';
import translate from '../../lang';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 2,
    margin: 5,
  }
}));

const LanguagePicker = () => {
  const classes = useStyles();
  const { options, language, setLanguage } = useLang();

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Card className={classes.card}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="language-select-label">{translate[language].languagePicker.label}</InputLabel>
        <Select
          labelId="language-select-label"
          label={translate[language].languagePicker.label}
          value={language}
          onChange={handleChange}
        >
          {options && options.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Card>
  );
}

export default LanguagePicker;

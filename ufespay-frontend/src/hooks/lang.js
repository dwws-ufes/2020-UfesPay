import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import lang from '../lang';

import { useAuth } from './auth';

const LangContext = createContext();

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
  const options = useMemo(() => Object.keys(lang), [lang]);
  const { user } = useAuth();

  const [language, setLang] = useState(() => {
    const persistedLang = localStorage.getItem("@ufespay:lang");
    return persistedLang || "pt-br";
  });

  useEffect(() => {
    if(user !== undefined) {
      let lang = user.language + ''
      lang = lang.substring(28, lang.length);

      switch (lang) {
        case 'Portuguese_language':
          setLang('pt-br');
          break;
        default:
          setLang('en-us');
      };
    }
  }, [user]);

  const setLanguage = useCallback((op) => {
    setLang(op);
    localStorage.setItem("@ufespay:lang", op);
  }, []);

  return (
    <LangContext.Provider value={{ options, language, setLanguage }}>
      {children}
    </LangContext.Provider>
  );
};

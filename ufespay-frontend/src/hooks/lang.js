/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import lang from '../lang';

const LangContext = createContext();

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
  const options = useMemo(() => Object.keys(lang), [lang]);

  const [language, setLang] = useState(() => {
    const persistedLang = localStorage.getItem("@ufespay:lang");
    return persistedLang || "pt-br";
  });

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

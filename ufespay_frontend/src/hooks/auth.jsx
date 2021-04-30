import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { signOut, signIn } from '../services/SessionService';
import { getUser } from '../services/UserService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState(() => {
    const accessToken = localStorage.getItem('@ufespay:authToken');
    const userString = localStorage.getItem('@ufespay:user');
    api.defaults.headers.common.authorization = `Bearer ${accessToken}`;

    return userString ? JSON.parse(userString) : undefined;
  }, []);

  const logIn = useCallback(async (email, password) => {
    const resp = await signIn(email, password);
    const { user: userLogged, token } = resp;
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    localStorage.setItem('@ufespay:authToken', token);
    localStorage.setItem('@ufespay:user', JSON.stringify(userLogged));
    setUser(userLogged);
  }, []);

  const refreshUser = useCallback(async () => {
    const resp = await getUser();
    localStorage.setItem('@ufespay:user', JSON.stringify(resp.user));
    setUser(resp.user);
  }, []);

  const logOut = useCallback(async () => {
    await signOut();
    api.defaults.headers.common.authorization = undefined;
    localStorage.removeItem('@ufespay:authToken');
    localStorage.removeItem('@ufespay:user');
    history.push('/');
    setUser(undefined);
  }, [history]);

  return (
    <AuthContext.Provider value={{ user, logOut, logIn, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

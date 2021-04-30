import api from './api';

export const signIn = async (email, password) => {
  return api.post('/session/sign-in', { email, password }).then(resp => resp.data);
};

export const signOut = async () => {
  return api.delete('/session/sign-out').then(resp => resp.data);
};

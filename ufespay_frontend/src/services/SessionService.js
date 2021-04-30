import api from './api';

export const signIn = async (email, password) => {
  return api.post('/sign-in', { email, password }).then(resp => resp.data);
};

export const signOut = async () => {
  return api.delete('/sign-out').then(resp => resp.data);
};

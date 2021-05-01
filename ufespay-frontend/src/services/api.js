import axios from 'axios';
import { fireToastAlert } from './AlertService';

const api = axios.create({ baseURL: 'http://localhost:3003' });

api.interceptors.request.use(
  async config => {
    // config.headers.Authorization = `Bearer ${userToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const message =
      error.response.data.message || 'Sorry, something went wrong!';
    fireToastAlert('error', message);
    return Promise.reject(error);
  },
);

export default api;

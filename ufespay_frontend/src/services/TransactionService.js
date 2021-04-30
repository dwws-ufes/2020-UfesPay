import api from './api';

export const listTransactions = async () => {
  return api.get('/transaction').then(resp => resp.data);
};

export const pay = async (receiverId, value, message) => {
  return api
    .post('/transaction', { receiverId, value, message })
    .then(resp => resp.data);
};

export const addComment = async (transactionId, text) => {
  return api.post('/comment', { transactionId, text }).then(resp => resp.data);
};

export const deleteComment = async id => {
  return api.delete(`/comment?id=${id}`).then(resp => resp.data);
};

export const toggleLike = async transactionId => {
  return api.put('/like', { transactionId }).then(resp => resp.data);
};

import api from './api';

export const create = (body) => {
  return api.post('/transactions', body);
};

export const getAll = () => {
  return api.get('/transactions');
};

export const getOne = (id) => {
  return api.get(`/transactions/${id}`);
};

export const update = (id, body) => {
  return api.put(`/transactions/${id}`, body);
};

export const remove = (id) => {
  return api.delete(`/transactions/${id}`);
};

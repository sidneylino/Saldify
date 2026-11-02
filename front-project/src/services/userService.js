import api from './api';

export const login = (email, password) => {
  return api.post('/users/auth', {
    email,
    password
  });
};

export const signup = (name, email, password) => {
  return api.post('/users/', {
    name,
    email,
    password
  });
};

export const getOne = (id) => {
  return api.get(`/users/${id}`);
};

export const update = (id, data) => {
  const { name, email } = data;
  return api.put(`/users/${id}`, {
    name,
    email,
  });
};

export const getUsers = () => {
  return api.get('/users');
};
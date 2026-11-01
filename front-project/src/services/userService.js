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

export const getUsers = () => {
  return api.get('/users');
};
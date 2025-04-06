import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getProfile = (token) =>
  API.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  export const updateProfile = (token, updates) =>
    API.patch('/auth/profile', updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
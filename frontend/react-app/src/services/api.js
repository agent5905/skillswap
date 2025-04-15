import axios from 'axios';

const NODEAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL_NODE + '/api/auth', 
});

const FASTAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL_FASTAPI, // FastAPI runs here
});

//Node.js backend
export const register = (data) => NODEAPI.post('/register', data);

export const login = (data) => NODEAPI.post('/login', data);

export const getProfile = (token) =>
  NODEAPI.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const updateProfile = (token, updates) =>
  NODEAPI.patch('/profile', updates, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

//FastAPI backend
export const getAllMentors = (token) =>
  FASTAPI.get('/mentors', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const bookSession = (token, data) =>
  FASTAPI.post('/bookings', data, {
    headers: { Authorization: `Bearer ${token}` },
});

export const getMyBookings = (token) =>
  FASTAPI.get('/bookings/me', {
    headers: { Authorization: `Bearer ${token}` },
});

export const getAllUsers = (token) =>
  FASTAPI.get('/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
});
  
export const getAllBookings = (token) =>
  FASTAPI.get('/admin/bookings', {
    headers: { Authorization: `Bearer ${token}` },
});

export const updateUserRole = (token, userId, newRole) =>
  FASTAPI.put(`/admin/users/${userId}/role?new_role=${newRole}`, null, {
    headers: { Authorization: `Bearer ${token}` },
});

export const deleteBooking = (token, bookingId) =>
  FASTAPI.delete(`/admin/bookings/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
});
    
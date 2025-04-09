import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

const BOOKING_API = axios.create({
  baseURL: 'http://localhost:8000', // FastAPI runs here
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

//FastAPI backend    
export const bookSession = (token, data) =>
  BOOKING_API.post('/bookings', data, {
    headers: { Authorization: `Bearer ${token}` },
});

export const getMyBookings = (token) =>
  BOOKING_API.get('/bookings/me', {
    headers: { Authorization: `Bearer ${token}` },
});

export const getAllUsers = (token) =>
  BOOKING_API.get('/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
});
  
export const getAllBookings = (token) =>
  BOOKING_API.get('/admin/bookings', {
    headers: { Authorization: `Bearer ${token}` },
});

export const updateUserRole = (token, userId, newRole) =>
  BOOKING_API.put(`/admin/users/${userId}/role?new_role=${newRole}`, null, {
    headers: { Authorization: `Bearer ${token}` },
});

export const deleteBooking = (token, bookingId) =>
  BOOKING_API.delete(`/admin/bookings/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
});
    
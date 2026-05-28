import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Auth endpoints
export const loginApi = (email, password) => API.post('/users/login', { email, password });
export const registerApi = (username, email, password) => API.post('/users/register', { username, email, password });
export const logoutApi = () => API.post('/users/logout');
export const getMeApi = () => API.get('/users/me');

export default API;

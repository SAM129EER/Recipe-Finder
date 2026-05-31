import API from '../../../shared/api/client';

export const loginApi = (email, password) => API.post('/users/login', { email, password });

export const registerApi = (username, email, password) =>
  API.post('/users/register', { username, email, password });

export const logoutApi = () => API.post('/users/logout');

export const getMeApi = () => API.get('/users/me');

export const forgotPasswordApi = (email) => API.post('/users/forgot-password', { email });

export const resetPasswordApi = (token, password) =>
  API.post(`/users/reset-password/${token}`, { password });

export const verifyEmailApi = (token) => API.get(`/users/verify-email/${token}`);

export const resendVerificationApi = (email) => API.post('/users/resend-verification', { email });

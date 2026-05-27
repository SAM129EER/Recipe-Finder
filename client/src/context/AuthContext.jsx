import React, { createContext, useState, useEffect } from 'react';
import { loginApi, registerApi } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage on mount
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginApi(email, password);
      const { token: userToken, id, username, email: userEmail, message } = response.data;
      
      const userData = { id, username, email: userEmail };
      setUser(userData);
      setToken(userToken);

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userToken);

      return { success: true, message };
    } catch (error) {
      console.error('Login error:', error);
      const errMsg = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, message: errMsg };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await registerApi(username, email, password);
      const { token: userToken, id, username: registeredName, email: registeredEmail, message } = response.data;

      const userData = { id, username: registeredName, email: registeredEmail };
      setUser(userData);
      setToken(userToken);

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userToken);

      return { success: true, message };
    } catch (error) {
      console.error('Registration error:', error);
      const errMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, message: errMsg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

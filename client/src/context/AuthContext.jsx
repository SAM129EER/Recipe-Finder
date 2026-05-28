import React, { createContext, useState, useEffect } from 'react';
import { loginApi, registerApi, logoutApi, getMeApi } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await getMeApi();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginApi(email, password);
      const { id, username, email: userEmail, message } = response.data;
      
      const userData = { id, username, email: userEmail };
      setUser(userData);

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
      const { id, username: registeredName, email: registeredEmail, message } = response.data;

      const userData = { id, username: registeredName, email: registeredEmail };
      setUser(userData);

      return { success: true, message };
    } catch (error) {
      console.error('Registration error:', error);
      const errMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, message: errMsg };
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

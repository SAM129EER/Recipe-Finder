import React, { useState, useEffect } from 'react';

import { loginApi, registerApi, logoutApi, getMeApi } from '../api/authApi';
import { AuthContext } from './AuthContext.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await getMeApi();
        setUser(response.data);
      } catch {
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
      const isVerified = error.response?.data?.isVerified;
      const email = error.response?.data?.email;
      return { success: false, message: errMsg, isVerified, email };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await registerApi(username, email, password);
      // Do not auto-login; the user needs to verify email first.
      return { success: true, message: response.data.message, email: response.data.email };
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

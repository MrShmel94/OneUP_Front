"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/me');
        setUser(response.data);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error('Auth check failed:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const updateUser = async () => {
    try {
      const response = await axiosInstance.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
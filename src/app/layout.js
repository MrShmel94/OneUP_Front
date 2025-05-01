"use client";

import './globals.css';
import { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import Sidebar from '../components/global/Sidebar';
import axiosInstance from '../lib/axios';

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('heroes');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, []);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900">
        {/* <Header user={user} setView={setCurrentView} /> */}
        <div className="flex">
          {user && <Sidebar currentView={currentView} setView={setCurrentView} />}
          <main className={`flex-1 ${user ? 'ml-64' : ''}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

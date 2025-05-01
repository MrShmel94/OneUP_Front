"use client";

import React from 'react';
import axiosInstance from '../../lib/axios';
import Image from 'next/image';

export default function Header({ user, setUser, setView }) {
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      setUser(null);
      setView('dummy');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-20 flex items-center gap-4 px-8 bg-gradient-to-r from-blue-700/50 via-purple-700/50 to-pink-600/50 backdrop-blur-md border-b border-gray-800 z-10">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
          <span className="text-blue-700 text-2xl font-black">1UP</span>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-widest">1UP Power</h1>
          <p className="text-sm text-white/80 font-mono">Call of Dragons Guild</p>
        </div>
      </div>
      
      {user && (
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {user.avatar && (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={user.avatar}
                  alt={user.fullName}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-white font-medium">{user.fullName}</span>
              <span className="text-white/80 text-sm">{user.nickname}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/50 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
} 
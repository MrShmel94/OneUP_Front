"use client";

import React from 'react';
import Header from '../global/Header';
import Sidebar from '../global/Sidebar';

export default function BaseView({ children, user, currentView, setCurrentView, setUser }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <Header user={user} setUser={setUser} setView={setCurrentView} />
      <main className="ml-64 pt-20 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
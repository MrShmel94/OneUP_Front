"use client";

import React, { useState } from 'react';
import Sidebar from '../global/Sidebar';
import Header from '../global/Header';
import HeroesView from './views/HeroesView';

export default function GuildPage({ user, setView }) {
  const [currentView, setCurrentView] = useState('heroes');

  const renderView = () => {
    switch (currentView) {
      case 'heroes':
        return <HeroesView />;
      case 'members':
        return <div>Members View</div>;
      case 'events':
        return <div>Events View</div>;
      case 'settings':
        return <div>Settings View</div>;
      default:
        return <HeroesView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <Header user={user} setView={setView} />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">
          {renderView()}
        </div>
      </main>
    </div>
  );
} 
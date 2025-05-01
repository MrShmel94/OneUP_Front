"use client";

import React from 'react';

const menuItems = [
  { name: 'Heroes', view: 'heroes', icon: '👤' },
  { name: 'Members', view: 'members', icon: '👥' },
  { name: 'Events', view: 'events', icon: '📅' },
  { name: 'Quests', view: 'quests', icon: '🎯' },
  { name: 'Referral', view: 'referral', icon: '🤝' },
  { name: 'Support', view: 'support', icon: '❓' },
];

export default function Sidebar({ currentView, setView }) {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-8">1UP Power</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.view
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
} 
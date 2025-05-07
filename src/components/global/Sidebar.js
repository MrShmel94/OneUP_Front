"use client";

import React, { useState } from 'react';
import { useView } from '../../context/ViewContext';

const MyDataIcon = (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
);
const GuildIcon = (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M16 3.13a4 4 0 01.94 7.76M12 7v4m0 0l-2-2m2 2l2-2" /></svg>
);

const myDataItems = [
  { name: 'Heroes', view: 'heroes', icon: '🛡️' },
  { name: 'Artifacts', view: 'artifacts', icon: '🏺' }, 
  { name: 'Troops/Resources/Elixir', view: 'members-input', icon: '🏰' },
];
const guildItems = [
  { name: 'Guild Heroes', view: 'guild-heroes', icon: '🛡️' },
  { name: 'Guild Artifacts', view: 'guild-artifacts', icon: '🏺' },
  { name: 'Guild Main Info', view: 'guild-main-info', icon: '🏰' },
];

const otherMenuItems = [
  { name: 'Members', view: 'members', icon: '👥' },
  { name: 'Guild Map', view: 'guild-map', icon: '🌍' },
  { name: 'Plans', view: 'plans', icon: '🎯' },
  { name: 'Support Bank', view: 'support', icon: '❓' },
];

export default function Sidebar() {
  const { currentView, setCurrentView } = useView();
  const [open, setOpen] = useState({ myData: true, guild: true });

  return (
    <div className="hidden md:block w-64 bg-gray-900 border-r border-gray-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-8">1UP Power</h1>
        <nav className="space-y-2">
          <div>
            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors bg-gray-800/60 hover:bg-blue-900/40 mb-1`}
              onClick={() => setOpen(o => ({ ...o, myData: !o.myData }))}
            >
              {MyDataIcon}
              <span className="font-semibold text-white flex-1 text-left">My Data</span>
              <span className={`transition-transform ${open.myData ? 'rotate-90' : ''}`}>▶</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open.myData ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                 style={{willChange: 'max-height'}}>
              <div className="flex flex-col gap-1 overflow-y-auto">
                {myDataItems.map(item => (
                  <button
                    key={item.view}
                    onClick={() => setCurrentView(item.view)}
                    className={`flex items-center w-full pl-12 pr-4 py-2 rounded-lg transition-colors text-base font-medium ${
                      currentView === item.view
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-gray-300 hover:bg-blue-800/40'
                    }`}
                  >
                    <span className="mr-3 text-xl flex-shrink-0">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors bg-gray-800/60 hover:bg-blue-900/40 mb-1`}
              onClick={() => setOpen(o => ({ ...o, guild: !o.guild }))}
            >
              {GuildIcon}
              <span className="font-semibold text-white flex-1 text-left">Guild</span>
              <span className={`transition-transform ${open.guild ? 'rotate-90' : ''}`}>▶</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open.guild ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                 style={{willChange: 'max-height'}}>
              <div className="flex flex-col gap-1 overflow-y-auto">
                {guildItems.map(item => (
                  <button
                    key={item.view}
                    onClick={() => setCurrentView(item.view)}
                    className={`flex items-center w-full pl-12 pr-4 py-2 rounded-lg transition-colors text-base font-medium ${
                      currentView === item.view
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-gray-300 hover:bg-blue-800/40'
                    }`}
                  >
                    <span className="mr-3 text-xl flex-shrink-0">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {otherMenuItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
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
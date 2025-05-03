'use client';

import { Dialog } from '@headlessui/react';
import { useView } from '../../context/ViewContext';

const menuItems = [
  { name: 'Heroes', view: 'heroes', icon: '👤' },
  { name: 'Members', view: 'members', icon: '👥' },
  { name: 'Events', view: 'events', icon: '📅' },
  { name: 'Quests', view: 'quests', icon: '🎯' },
  { name: 'Referral', view: 'referral', icon: '🤝' },
  { name: 'Support', view: 'support', icon: '❓' },
];

export default function MobileSidebar({ open, onClose }) {
  const { currentView, setCurrentView } = useView();

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-start">
        <Dialog.Panel className="w-64 bg-gray-900 border-r border-gray-800 shadow-xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-white mb-8">1UP Power</h1>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.view}
                    onClick={() => {
                      setCurrentView(item.view);
                      onClose();
                    }}
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
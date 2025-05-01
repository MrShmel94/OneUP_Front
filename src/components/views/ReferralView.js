"use client";

import React from 'react';
import BaseView from './BaseView';

export default function ReferralView({ user, currentView, setCurrentView }) {
  return (
    <BaseView user={user} currentView={currentView} setCurrentView={setCurrentView}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Referral Program</h2>
        <p className="text-gray-400">
          Invite friends and earn rewards
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-white">Referral program details coming soon...</p>
        </div>
      </div>
    </BaseView>
  );
} 
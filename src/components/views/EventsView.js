"use client";

import React from 'react';

export default function EventsView() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Events</h1>
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6">
        <p className="text-white/80">Upcoming events will be displayed here</p>
      </div>
    </div>
  );
} 
"use client";

import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="absolute text-white text-xl font-bold mt-24 animate-pulse">Loading...</span>
    </div>
  );
} 
"use client";

import React from 'react';
import { useLoader } from '../../context/LoaderContext';

export default function Loader() {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[100]">
      <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-transparent rounded-full animate-spin absolute inset-0"></div>
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-xl font-bold animate-pulse">Loading...</span>
      </div>
    </div>
  );
} 
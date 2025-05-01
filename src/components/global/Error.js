"use client";

import React from 'react';

export default function Error({ message = 'Something went wrong', onRetry }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 text-center">
        <div className="text-red-600 text-2xl mb-4 font-bold">Error</div>
        <p className="text-gray-800 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-bold"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
} 
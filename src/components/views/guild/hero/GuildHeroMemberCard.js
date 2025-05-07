import React from 'react';

export default function GuildHeroMemberCard({ nickname, heroData, abilities }) {
  const isMaxed = abilities.every(ab => Number(heroData[ab.id]) === 5) && Number(heroData.star) === 6;

  return (
    <div
      className={`relative flex flex-col items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 ${isMaxed ? 'golden-glow' : ''}`}
    >
      <div className="font-semibold text-gray-900 dark:text-white text-center">{nickname}</div>
      <div className="grid grid-cols-2 gap-2 w-full">
        {abilities.map(ab => (
          <span
            key={ab.id}
            className={`px-2 py-0.5 rounded text-xs text-center ${
              Number(heroData[ab.id]) === 5
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
            }`}
          >
            {ab.name}: {heroData[ab.id] || 0}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded text-xs">
          ★ {heroData.star || 0}
        </span>
      </div>
    </div>
  );
} 
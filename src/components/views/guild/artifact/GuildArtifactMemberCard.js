import React from 'react';

export default function GuildArtifactMemberCard({ nickname, artifactData, abilities }) {
  const isMaxed = abilities.every(ab => Number(artifactData[ab.id]) === 5) && Number(artifactData.star) === 6;
  const isRed = abilities.every(ab => Number(artifactData[ab.id]) === 6) && Number(artifactData.star) === 6;

  return (
    <div
      className={`relative flex flex-col items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 ${isMaxed ? 'golden-glow' : isRed ? 'red-glow' : ''}`}
    >
      <div className="font-semibold text-gray-900 dark:text-white text-center">{nickname}</div>

      <div className="flex justify-center w-full">
        {abilities.map(ab => (
          <span
            key={ab.id}
            className={`px-2 py-0.5 rounded text-xs text-center ${
              Number(artifactData[ab.id]) === 5
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                : Number(artifactData[ab.id]) === 6
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
            }`}
          >
            {ab.name}: {artifactData[ab.id] || 0}
          </span>
        ))}
      </div>

      <div className="flex justify-center w-full">
        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded text-xs">
          ★ {artifactData.star || 0}
        </span>
      </div>
    </div>
  );
}
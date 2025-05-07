import React, { useState } from 'react';
const HERO_PLACEHOLDER = '/images/heroes/placeholder.png';
export default function GuildHeroSimpleCard({ hero }) {
  const [src, setSrc] = useState(`/images/heroes/${hero.name}.webp`);
  const [errorCount, setErrorCount] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img
        src={src}
        alt={hero.name}
        className="w-32 h-32 object-contain bg-gray-800 rounded-xl mb-2"
        onError={() => {
          if (errorCount === 0) {
            setSrc(`/images/heroes/${hero.name}.png`);
            setErrorCount(1);
          } else {
            setSrc(HERO_PLACEHOLDER);
          }
        }}
        draggable={false}
      />
      <div className="text-xl font-bold text-gray-900 dark:text-white text-center mt-2">{hero.name}</div>
    </div>
  );
} 
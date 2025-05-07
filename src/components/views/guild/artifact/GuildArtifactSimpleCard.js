import React, { useState } from 'react';
const ARTIFACT_PLACEHOLDER = '/images/artifacts/placeholder.png';

export default function GuildArtifactSimpleCard({ artifact }) {
  const [src, setSrc] = useState(`/images/artifacts/${artifact.name}.webp`);
  const [errorCount, setErrorCount] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img
        src={src}
        alt={artifact.name}
        className="w-32 h-32 object-contain bg-gray-800 rounded-xl mb-2"
        onError={() => {
          if (errorCount === 0) {
            setSrc(`/images/artifacts/${artifact.name}.png`);
            setErrorCount(1);
          } else {
            setSrc(ARTIFACT_PLACEHOLDER);
          }
        }}
        draggable={false}
      />
      <div className="text-xl font-bold text-gray-900 dark:text-white text-center mt-2">{artifact.name}</div>
    </div>
  );
} 
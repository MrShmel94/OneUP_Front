"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

function ArtifactStars({ locked, value, onChange, maxStars }) {
  return (
    <div className="flex gap-1 justify-center mt-2">
      {[...Array(maxStars)].map((_, idx) => (
        <img
          key={idx}
          src={value > idx ? "/images/additional/star_fill.png" : "/images/additional/star.png"}
          alt={value > idx ? "Filled star" : "Empty star"}
          className={`w-6 h-6 cursor-pointer transition-transform ${locked ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
          onClick={() => !locked && onChange(idx + 1)}
        />
      ))}
    </div>
  );
}

export default function ArtifactCard({ artifact, isAvailable, initialAbilities, onArtifactChange }) {
  const [artifactState, setArtifactState] = useState(artifact);
  const [imageError, setImageError] = useState(false);
  const [artifactImage, setArtifactImage] = useState(artifact.image);

  useEffect(() => {
    setArtifactImage(`/images/artifacts/${artifact.name}.webp`);
  }, [artifact.name]);

  useEffect(() => {
    const updatedAbilities = artifactState.abilities.map(ability => ({
      ...ability,
      currentLevel: initialAbilities[ability.id] ? parseInt(initialAbilities[ability.id]) : 0
    }));
    setArtifactState(prev => ({ ...prev, abilities: updatedAbilities }));
  }, [initialAbilities]);

  const handleLevelSelect = useCallback((abilityIndex, level) => {
    if (!isAvailable) return;
    
    const ability = artifactState.abilities[abilityIndex];
    if (level >= 0 && level <= ability.maxLevel && level !== ability.currentLevel) {
      setArtifactState(prevArtifact => {
        const newArtifact = { ...prevArtifact };
        newArtifact.abilities[abilityIndex] = {
          ...ability,
          currentLevel: level
        };
        return newArtifact;
      });
      
      const allAbilitiesZero = artifactState.abilities.every(ability => 
        ability.id === artifactState.abilities[abilityIndex].id ? level === 0 : ability.currentLevel === 0
      );
      
      if (allAbilitiesZero) {
        onArtifactChange(artifact.id, {
          isAvailable: false,
          [ability.id]: '0'
        });
      } else {
        onArtifactChange(artifact.id, { [ability.id]: level.toString() });
      }
    }
  }, [isAvailable, artifact.id, artifactState.abilities, onArtifactChange]);

  const toggleAvailability = useCallback(() => {
    const newAvailability = !isAvailable;
    if (newAvailability) {
      const firstAbility = artifactState.abilities[0];
      onArtifactChange(artifact.id, {
        isAvailable: true,
        [firstAbility.id]: '1'
      });
    } else {
      const resetAbilities = {};
      artifactState.abilities.forEach(ability => {
        resetAbilities[ability.id] = '0';
      });
      onArtifactChange(artifact.id, {
        isAvailable: false,
        ...resetAbilities
      });
    }
  }, [isAvailable, artifact.id, artifactState.abilities, onArtifactChange]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setArtifactImage(`/images/artifacts/${artifact.name}.png`);
    } else {
      setArtifactImage(artifact.image);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 sm:h-64 md:h-80">
        <Image
          src={artifactImage}
          alt={artifactState.name}
          fill
          className="object-contain"
          style={{ objectPosition: 'center 25%', padding: '1rem' }}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">{artifactState.name}</h3>
            <button
              onClick={toggleAvailability}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isAvailable
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {isAvailable ? 'Available' : 'Locked'}
            </button>
          </div>
          <ArtifactStars
            locked={!isAvailable}
            value={!isAvailable ? 0 : Math.max(1, typeof artifactState.star === 'number' ? artifactState.star : 1)}
            maxStars={artifactState.maxStars}
            onChange={(newStar) => {
              setArtifactState(prev => ({ ...prev, star: newStar }));
              onArtifactChange(artifact.id, { star: newStar });
            }}
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {artifactState.abilities.map((ability, index) => (
            <div 
              key={ability.id} 
              className={`bg-gray-700/50 rounded-lg p-3 transition-opacity ${
                ability.currentLevel === 0 ? 'opacity-50' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <h4 className="text-base sm:text-lg font-semibold text-white">{ability.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-white/60">
                    Level {ability.currentLevel}/{ability.maxLevel}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <button
                  onClick={() => handleLevelSelect(index, 0)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                    ability.currentLevel === 0
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-600 text-gray-400 hover:bg-gray-500'
                  } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  0
                </button>
                {[...Array(ability.maxLevel)].map((_, level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelSelect(index, level + 1)}
                    disabled={!isAvailable}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                      level + 1 <= ability.currentLevel
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-600 text-gray-400 hover:bg-gray-500'
                    } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {level + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
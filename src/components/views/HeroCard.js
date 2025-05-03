"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function HeroCard({ hero, isAvailable, initialAbilities, onHeroChange }) {
  const [heroState, setHeroState] = useState(hero);
  const [imageError, setImageError] = useState(false);
  const [heroImage, setHeroImage] = useState(hero.image);

  useEffect(() => {
    setHeroImage(`/images/heroes/${hero.name}.webp`);
  }, [hero.name]);

  useEffect(() => {
    const updatedAbilities = heroState.abilities.map(ability => ({
      ...ability,
      currentLevel: initialAbilities[ability.id] ? parseInt(initialAbilities[ability.id]) : 0
    }));
    setHeroState(prev => ({ ...prev, abilities: updatedAbilities }));
  }, [initialAbilities]);

  const handleLevelSelect = useCallback((abilityIndex, level) => {
    if (!isAvailable) return;
    
    const ability = heroState.abilities[abilityIndex];
    if (level >= 0 && level <= ability.maxLevel && level !== ability.currentLevel) {
      setHeroState(prevHero => {
        const newHero = { ...prevHero };
        newHero.abilities[abilityIndex] = {
          ...ability,
          currentLevel: level
        };
        return newHero;
      });
      
      const allAbilitiesZero = heroState.abilities.every(ability => 
        ability.id === heroState.abilities[abilityIndex].id ? level === 0 : ability.currentLevel === 0
      );
      
      if (allAbilitiesZero) {
        onHeroChange(hero.id, {
          isAvailable: false,
          [ability.id]: '0'
        });
      } else {
        onHeroChange(hero.id, { [ability.id]: level.toString() });
      }
    }
  }, [isAvailable, hero.id, heroState.abilities, onHeroChange]);

  const toggleAvailability = useCallback(() => {
    const newAvailability = !isAvailable;
    if (newAvailability) {
      const firstAbility = heroState.abilities[0];
      onHeroChange(hero.id, {
        isAvailable: true,
        [firstAbility.id]: '1'
      });
    } else {
      const resetAbilities = {};
      heroState.abilities.forEach(ability => {
        resetAbilities[ability.id] = '0';
      });
      onHeroChange(hero.id, {
        isAvailable: false,
        ...resetAbilities
      });
    }
  }, [isAvailable, hero.id, heroState.abilities, onHeroChange]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setHeroImage(`/images/heroes/${hero.name}.png`);
    } else {
      setHeroImage(hero.image);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 sm:h-64 md:h-80">
        <Image
          src={heroImage}
          alt={heroState.name}
          fill
          className="object-contain"
          style={{ objectPosition: 'center 25%', padding: '1rem' }}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">{heroState.name}</h3>
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
          {/* <p className="text-white/80">{heroState.description}</p> */}
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {heroState.abilities.map((ability, index) => (
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
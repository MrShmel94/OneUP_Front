"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { heroes, heroCategories } from '../../resources/heroes';
import axiosInstance from '../../lib/axios';
import { useLoader } from '../../context/LoaderContext';
import Image from 'next/image';

export default function MemberHeroesView({ memberNickname }) {
  const [memberHeroes, setMemberHeroes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setIsLoading } = useLoader();

  const memoizedHeroes = useMemo(() => heroes, []);

  const fetchMemberHeroes = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/heroes/${memberNickname}`);
      
      const transformedHeroes = Object.entries(response.data)
        .map(([heroId, abilities]) => {
          const heroData = memoizedHeroes.find(h => h.id === parseInt(heroId));
          if (!heroData) return null;

          const hasActiveAbilities = Object.values(abilities).some(level => parseInt(level) > 0);
          if (!hasActiveAbilities) return null;

          return {
            id: heroId,
            name: heroData.name,
            category: heroData.category,
            image: `/images/heroes/${heroData.name}.webp`,
            abilities: heroData.abilities.map(ability => ({
              id: ability.id,
              name: ability.name,
              maxLevel: ability.maxLevel,
              currentLevel: parseInt(abilities[ability.id] || '0')
            }))
          };
        })
        .filter(Boolean);

      setMemberHeroes(transformedHeroes);
    } catch (error) {
      console.error('Error fetching member heroes:', error);
    } finally {
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchMemberHeroes();
  }, [memberNickname]);

  const availableCategories = useMemo(() => {
    const categories = new Set();
    memberHeroes.forEach(hero => {
      categories.add(hero.category);
    });
    return Array.from(categories).map(category => 
      heroCategories.find(c => c.id === category)
    ).filter(Boolean);
  }, [memberHeroes]);

  const filteredHeroes = useMemo(() => {
    if (!selectedCategory) return memberHeroes;
    return memberHeroes.filter(hero => hero.category === selectedCategory.id);
  }, [memberHeroes, selectedCategory]);

  if (isLoaded && memberHeroes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-200">No Heroes Information</h3>
          <p className="text-gray-400">
            {memberNickname} hasn't shared their heroes information yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {availableCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory?.id === category.id ? null : category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory?.id === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHeroes.map(hero => (
          <div key={hero.id} className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
              <Image
                src={hero.image}
                alt={hero.name}
                fill
                className="object-contain"
                style={{ objectPosition: 'center 25%', padding: '1rem' }}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white">{hero.name}</h3>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {hero.abilities.map(ability => (
                <div key={ability.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-200">{ability.name}</span>
                    <span className="text-sm font-medium text-white">
                      {ability.currentLevel}/{ability.maxLevel}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(ability.currentLevel / ability.maxLevel) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
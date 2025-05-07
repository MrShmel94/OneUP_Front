"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { heroes, heroCategories } from '../../../resources/heroes';
import HeroCard from './HeroCard';
import axiosInstance from '../../../lib/axios';
import { useLoader } from '../../../context/LoaderContext';

export default function HeroesView() {
  const [selectedCategory, setSelectedCategory] = useState('overal');
  const [isSaving, setIsSaving] = useState(false);
  const [heroStatuses, setHeroStatuses] = useState({});
  const [heroAbilities, setHeroAbilities] = useState({});
  const [heroStars, setHeroStars] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchHeroesData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/api/heroes');
        const serverData = response.data;
        
        const statuses = {};
        const abilities = {};
        const stars = {};
        
        heroes.forEach(hero => {
          const heroData = serverData[hero.id];
          if (heroData) {
            const hasActiveAbilities = Object.values(heroData).some(level => parseInt(level) > 0);
            statuses[hero.id] = hasActiveAbilities;
            abilities[hero.id] = heroData;
            stars[hero.id] = heroData.star ? parseInt(heroData.star) : (hasActiveAbilities ? 1 : 0);
          } else {
            statuses[hero.id] = false;
            abilities[hero.id] = {};
            hero.abilities.forEach(ability => {
              abilities[hero.id][ability.id] = '0';
            });
            stars[hero.id] = 0;
          }
        });
        
        setHeroStatuses(statuses);
        setHeroAbilities(abilities);
        setHeroStars(stars);
      } catch (error) {
        console.error('Error fetching heroes data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroesData();
  }, [setIsLoading]);

  const handleHeroChange = useCallback((heroId, changes) => {
    const { isAvailable, star, ...abilityChanges } = changes;
    
    if (isAvailable !== undefined) {
      if (isAvailable !== heroStatuses[heroId]) {
        setHeroStatuses(prev => ({
          ...prev,
          [heroId]: isAvailable
        }));
        setHasChanges(true);
      }
    }
    
    if (star !== undefined) {
      setHeroStars(prev => ({ ...prev, [heroId]: star }));
      setHasChanges(true);
    }
    
    if (Object.keys(abilityChanges).length > 0) {
      setHeroAbilities(prev => {
        const heroData = prev[heroId] || {};
        const newData = { ...heroData };
        
        Object.entries(abilityChanges).forEach(([abilityId, level]) => {
          if (level !== heroData[abilityId]) {
            newData[abilityId] = level;
          }
        });
        
        if (Object.keys(newData).length > 0) {
          const hasActiveAbilities = Object.values(newData).some(level => parseInt(level) > 0);
          setHeroStatuses(prev => ({
            ...prev,
            [heroId]: hasActiveAbilities
          }));
          
          setHasChanges(true);
          return {
            ...prev,
            [heroId]: newData
          };
        }
        return prev;
      });
    }
  }, [heroStatuses]);

  const saveChanges = async () => {
    setIsSaving(true);
    setIsLoading(true);
    try {
      const allHeroesData = {};
      
      heroes.forEach(hero => {
        const heroData = {};
        
        if (!heroStatuses[hero.id]) {
          hero.abilities.forEach(ability => {
            heroData[ability.id] = '0';
          });
          heroData.star = 0;
        } else {
          const currentAbilities = heroAbilities[hero.id] || {};
          hero.abilities.forEach(ability => {
            heroData[ability.id] = currentAbilities[ability.id] || '0';
          });
          heroData.star = heroStars[hero.id] || 1;
        }
        
        allHeroesData[hero.id] = heroData;
      });
    
      await axiosInstance.post('/api/heroes/save', allHeroesData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving hero changes:', error);
    } finally {
      setIsSaving(false);
      setIsLoading(false);
    }
  };

  const filteredHeroes = heroes.filter(hero => hero.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="bg-white/90 border border-blue-200 rounded-2xl shadow-xl p-4 w-fit mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          {heroCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap font-medium text-sm
                ${selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105 ring-2 ring-blue-400 ring-opacity-50'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow-md border border-gray-200'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHeroes.map(hero => (
          <HeroCard
            key={hero.id}
            hero={{ ...hero, star: heroStars[hero.id] }}
            isAvailable={heroStatuses[hero.id]}
            initialAbilities={heroAbilities[hero.id] || {}}
            onHeroChange={handleHeroChange}
          />
        ))}
      </div>

      {hasChanges && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={saveChanges}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
} 
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { heroes, heroCategories } from '../../resources/heroes';
import HeroCard from './HeroCard';
import axiosInstance from '../../lib/axios';

export default function HeroesView() {
  const [selectedCategory, setSelectedCategory] = useState('overal');
  const [isSaving, setIsSaving] = useState(false);
  const [heroStatuses, setHeroStatuses] = useState({});
  const [heroAbilities, setHeroAbilities] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchHeroesData = async () => {
      try {
        const response = await axiosInstance.get('/api/heroes');
        const serverData = response.data;
        console.log("serverData", serverData);
        
        const statuses = {};
        const abilities = {};
        
        heroes.forEach(hero => {
          const heroData = serverData[hero.id];
          if (heroData) {
            const hasActiveAbilities = Object.values(heroData).some(level => parseInt(level) > 0);
            statuses[hero.id] = hasActiveAbilities;
            abilities[hero.id] = heroData;
          } else {
            statuses[hero.id] = false;
            abilities[hero.id] = {};
            hero.abilities.forEach(ability => {
              abilities[hero.id][ability.id] = '0';
            });
          }
        });
        
        setHeroStatuses(statuses);
        setHeroAbilities(abilities);
      } catch (error) {
        console.error('Error fetching heroes data:', error);
      }
    };

    fetchHeroesData();
  }, []);

  const handleHeroChange = useCallback((heroId, changes) => {
    const { isAvailable, ...abilityChanges } = changes;
    
    if (isAvailable !== undefined) {
      if (isAvailable !== heroStatuses[heroId]) {
        setHeroStatuses(prev => ({
          ...prev,
          [heroId]: isAvailable
        }));
        setHasChanges(true);
      }
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
    try {
      const allHeroesData = {};
      
      heroes.forEach(hero => {
        const heroData = {};
        
        if (!heroStatuses[hero.id]) {
          hero.abilities.forEach(ability => {
            heroData[ability.id] = '0';
          });
        } else {
          const currentAbilities = heroAbilities[hero.id] || {};
          hero.abilities.forEach(ability => {
            heroData[ability.id] = currentAbilities[ability.id] || '0';
          });
        }
        
        allHeroesData[hero.id] = heroData;
      });
    
      await axiosInstance.post('/api/heroes/save', allHeroesData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving hero changes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredHeroes = heroes.filter(hero => hero.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        {heroCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHeroes.map(hero => (
          <HeroCard
            key={hero.id}
            hero={hero}
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
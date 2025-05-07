"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { artifacts, artifactCategories } from '../../../resources/artifacts';
import ArtifactCard from './ArtifactCard';
import axiosInstance from '../../../lib/axios';
import { useLoader } from '../../../context/LoaderContext';

export default function ArtifactsView() {
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [isSaving, setIsSaving] = useState(false);
  const [artifactStatuses, setArtifactStatuses] = useState({});
  const [artifactAbilities, setArtifactAbilities] = useState({});
  const [artifactStars, setArtifactStars] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchArtifactsData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/api/artifact');
        const serverData = response.data;
        
        const statuses = {};
        const abilities = {};
        const stars = {};
        
        artifacts.forEach(artifact => {
          const artifactData = serverData[artifact.id];
          if (artifactData) {
            const hasActiveAbilities = Object.values(artifactData).some(level => parseInt(level) > 0);
            statuses[artifact.id] = hasActiveAbilities;
            abilities[artifact.id] = artifactData;
            stars[artifact.id] = artifactData.star ? parseInt(artifactData.star) : (hasActiveAbilities ? 1 : 0);
          } else {
            statuses[artifact.id] = false;
            abilities[artifact.id] = {};
            artifact.abilities.forEach(ability => {
              abilities[artifact.id][ability.id] = '0';
            });
            stars[artifact.id] = 0;
          }
        });
        
        setArtifactStatuses(statuses);
        setArtifactAbilities(abilities);
        setArtifactStars(stars);
      } catch (error) {
        console.error('Error fetching artifacts data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtifactsData();
  }, [setIsLoading]);

  const handleArtifactChange = useCallback((artifactId, changes) => {
    const { isAvailable, star, ...abilityChanges } = changes;
    
    if (isAvailable !== undefined) {
      if (isAvailable !== artifactStatuses[artifactId]) {
        setArtifactStatuses(prev => ({
          ...prev,
          [artifactId]: isAvailable
        }));
        setHasChanges(true);
      }
    }
    
    if (star !== undefined) {
      setArtifactStars(prev => ({ ...prev, [artifactId]: star }));
      setHasChanges(true);
    }
    
    if (Object.keys(abilityChanges).length > 0) {
      setArtifactAbilities(prev => {
        const artifactData = prev[artifactId] || {};
        const newData = { ...artifactData };
        
        Object.entries(abilityChanges).forEach(([abilityId, level]) => {
          if (level !== artifactData[abilityId]) {
            newData[abilityId] = level;
          }
        });
        
        if (Object.keys(newData).length > 0) {
          const hasActiveAbilities = Object.values(newData).some(level => parseInt(level) > 0);
          setArtifactStatuses(prev => ({
            ...prev,
            [artifactId]: hasActiveAbilities
          }));
          
          setHasChanges(true);
          return {
            ...prev,
            [artifactId]: newData
          };
        }
        return prev;  
      });
    }
  }, [artifactStatuses]);

  const saveChanges = async () => {
    setIsSaving(true);
    setIsLoading(true);
    try {
      const allArtifactsData = {};
      
      artifacts.forEach(artifact => {
        const artifactData = {};
        
        if (!artifactStatuses[artifact.id]) {
          artifact.abilities.forEach(ability => {
            artifactData[ability.id] = '0';
          });
          artifactData.star = 0;
        } else {
          const currentAbilities = artifactAbilities[artifact.id] || {};
          artifact.abilities.forEach(ability => {
            artifactData[ability.id] = currentAbilities[ability.id] || '0';
          });
          artifactData.star = artifactStars[artifact.id] || 1;
        }
        
        allArtifactsData[artifact.id] = artifactData;
      });
    
      await axiosInstance.post('/api/artifact/save', allArtifactsData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving artifact changes:', error);
    } finally {
      setIsSaving(false);
      setIsLoading(false);
    }
  };

  const filteredArtifacts = artifacts.filter(artifact => artifact.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="bg-white/90 border border-blue-200 rounded-2xl shadow-xl p-4 w-fit mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          {artifactCategories.map(category => (
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
        {filteredArtifacts.map(artifact => (
          <ArtifactCard
            key={artifact.id}
            artifact={{ ...artifact, star: artifactStars[artifact.id] }}
            isAvailable={artifactStatuses[artifact.id]}
            initialAbilities={artifactAbilities[artifact.id] || {}}
            onArtifactChange={handleArtifactChange}
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
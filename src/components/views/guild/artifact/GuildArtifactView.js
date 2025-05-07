import React, { useState, useEffect } from 'react';
import { artifacts, artifactCategories } from '../../../../resources/artifacts';
import GuildArtifactSimpleCard from './GuildArtifactSimpleCard';
import GuildArtifactMemberCard from './GuildArtifactMemberCard';
import axiosInstance from '../../../../lib/axios';
import { useLoader } from '../../../../context/LoaderContext';
import Loader from '../../../global/Loader';

const ARTIFACT_PLACEHOLDER = '/images/artifacts/placeholder.png';

function GuildArtifactImage({ artifact }) {
  const [src, setSrc] = useState(`/images/artifacts/${artifact.name}.webp`);
  const [errorCount, setErrorCount] = useState(0);
  return (
    <img
      src={src}
      alt={artifact.name}
      className="w-full h-24 object-contain bg-gray-800"
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
  );
}

export default function GuildArtifactView() {
  const [selectedCategory, setSelectedCategory] = useState(artifactCategories[0].id);
  const [guildArtifacts, setGuildArtifacts] = useState({});
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const { isLoading, setIsLoading } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get('/api/artifact/getAllGuildArtifact');
        setGuildArtifacts(res.data.artifacts || res.data || {});
      } catch (e) {
        setGuildArtifacts({});
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setIsLoading]);

  const filteredArtifacts = artifacts.filter(artifact => artifact.category === selectedCategory);

  let artifactOwners = [];
  let maxTotal = 0;
  if (selectedArtifact) {
    artifactOwners = Object.entries(guildArtifacts)
      .map(([nickname, userArtifacts]) => {
        const artifactData = userArtifacts[selectedArtifact.id];
        if (!artifactData) return null;
        const abilitySum = selectedArtifact.abilities.reduce((sum, ab) => sum + (parseInt(artifactData[ab.id]) || 0), 0);
        if(abilitySum == 0) return null;
        const star = parseInt(artifactData.star) || 0;
        const total = abilitySum + star;
        if (total > maxTotal) maxTotal = total;
        return {
          nickname,
          artifactData,
          abilitySum,
          star,
          total,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.total - a.total || b.star - a.star);
  }

  return (
    <div className="space-y-6">
      <Loader />
      <div className="bg-white/90 border border-blue-200 rounded-2xl shadow-xl p-4 w-fit mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          {artifactCategories.map(category => (
            <button
              key={category.id}
              onClick={() => { setSelectedCategory(category.id); setSelectedArtifact(null); }}
              className={`px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap font-medium text-sm ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105 ring-2 ring-blue-400 ring-opacity-50'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow-md border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
        {filteredArtifacts.map(artifact => (
          <button
            key={artifact.id}
            onClick={() => setSelectedArtifact(artifact)}
            className={`rounded-xl overflow-hidden shadow hover:shadow-lg transition-all border-2 ${selectedArtifact?.id  === artifact.id ? 'border-blue-500' : 'border-transparent'}`}
          >
            <GuildArtifactImage artifact={artifact} />
            <div className="p-2 text-center text-sm font-medium text-gray-900 dark:text-white">{artifact.name}</div>
          </button>
        ))}
      </div>

      {selectedArtifact && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto flex flex-col items-center">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setSelectedArtifact(null)}
              aria-label="Close"
            >
              ×
            </button>
            <GuildArtifactSimpleCard artifact={selectedArtifact} />
            <h3 className="text-lg text-blue-500 font-bold mb-2 mt-2">Guild Members with this Artifact</h3>
            {artifactOwners.length === 0 ? (
              <div className="text-blue-400">No one in the guild has this artifact yet.</div>
            ) : (
              <div className="w-full flex flex-col gap-3 max-h-[50vh] overflow-y-auto scrollbar-hide">
                {artifactOwners.map(({ nickname, artifactData, total }) => (
                  <GuildArtifactMemberCard
                    key={nickname}
                    nickname={nickname}
                    artifactData={artifactData}
                    abilities={selectedArtifact.abilities}
                    isTop={total === maxTotal && maxTotal > 0}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
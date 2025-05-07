import React, { useState, useEffect } from 'react';
import { heroes, heroCategories } from '../../../../resources/heroes';
import GuildHeroSimpleCard from './GuildHeroSimpleCard';
import GuildHeroMemberCard from './GuildHeroMemberCard';
import axiosInstance from '../../../../lib/axios';
import { useLoader } from '../../../../context/LoaderContext';
import Loader from '../../../global/Loader';

const HERO_PLACEHOLDER = '/images/heroes/placeholder.png';

function GuildHeroImage({ hero }) {
  const [src, setSrc] = useState(`/images/heroes/${hero.name}.webp`);
  const [errorCount, setErrorCount] = useState(0);
  return (
    <img
      src={src}
      alt={hero.name}
      className="w-full h-24 object-contain bg-gray-800"
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
  );
}

export default function GuildHeroesView() {
  const [selectedCategory, setSelectedCategory] = useState(heroCategories[0].id);
  const [guildHeroes, setGuildHeroes] = useState({});
  const [selectedHero, setSelectedHero] = useState(null);
  const { isLoading, setIsLoading } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get('/api/heroes/getAllGuildHeroes');
        setGuildHeroes(res.data.heroes || res.data || {});
      } catch (e) {
        setGuildHeroes({});
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setIsLoading]);

  const filteredHeroes = heroes.filter(hero => hero.category === selectedCategory);

  let heroOwners = [];
  let maxTotal = 0;
  if (selectedHero) {
    heroOwners = Object.entries(guildHeroes)
      .map(([nickname, userHeroes]) => {
        const heroData = userHeroes[selectedHero.id];
        if (!heroData) return null;
        const abilitySum = selectedHero.abilities.reduce((sum, ab) => sum + (parseInt(heroData[ab.id]) || 0), 0);
        if(abilitySum == 0) return null;
        const star = parseInt(heroData.star) || 0;
        const total = abilitySum + star;
        if (total > maxTotal) maxTotal = total;
        return {
          nickname,
          heroData,
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
          {heroCategories.map(category => (
            <button
              key={category.id}
              onClick={() => { setSelectedCategory(category.id); setSelectedHero(null); }}
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
        {filteredHeroes.map(hero => (
          <button
            key={hero.id}
            onClick={() => setSelectedHero(hero)}
            className={`rounded-xl overflow-hidden shadow hover:shadow-lg transition-all border-2 ${selectedHero?.id === hero.id ? 'border-blue-500' : 'border-transparent'}`}
          >
            <GuildHeroImage hero={hero} />
            <div className="p-2 text-center text-sm font-medium text-gray-900 dark:text-white">{hero.name}</div>
          </button>
        ))}
      </div>

      {selectedHero && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto flex flex-col items-center">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setSelectedHero(null)}
              aria-label="Close"
            >
              ×
            </button>
            <GuildHeroSimpleCard hero={selectedHero} />
            <h3 className="text-lg text-blue-500 font-bold mb-2 mt-2">Guild Members with this Hero</h3>
            {heroOwners.length === 0 ? (
              <div className="text-blue-400">No one in the guild has this hero yet.</div>
            ) : (
              <div className="w-full flex flex-col gap-3 max-h-[50vh] overflow-y-auto scrollbar-hide">
                {heroOwners.map(({ nickname, heroData, total }) => (
                  <GuildHeroMemberCard
                    key={nickname}
                    nickname={nickname}
                    heroData={heroData}
                    abilities={selectedHero.abilities}
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
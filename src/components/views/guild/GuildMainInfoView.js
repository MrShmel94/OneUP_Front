import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../lib/axios';
import Loader from '../../global/Loader';
import { useLoader } from '../../../context/LoaderContext';
import { FaShieldAlt, FaLeaf, FaFlask } from 'react-icons/fa';

const TROOP_TYPES = [
  { id: 'Infantry', label: 'Infantry', img: '/images/additional/Infantry.png' },
  { id: 'Cavalry', label: 'Cavalry', img: '/images/additional/Cavalry.png' },
  { id: 'Marksman', label: 'Marksman', img: '/images/additional/Marksman.png' },
  { id: 'Mage', label: 'Mage', img: '/images/additional/Mage.png' },
  { id: 'Flying Cavalry', label: 'Flying Cavalry', img: '/images/additional/Cavalry_enemy.png' },
  { id: 'Flying Marksman', label: 'Flying Marksman', img: '/images/additional/Marksman_enemy.png' },
  { id: 'Flying Mage', label: 'Flying Mage', img: '/images/additional/Mage_enemy.png' },
];

const RESOURCES = [
  { id: 'Gold', label: 'Gold', img: '/images/additional/Gold.png' },
  { id: 'Wood', label: 'Wood', img: '/images/additional/Wood.png' },
  { id: 'Ore', label: 'Ore', img: '/images/additional/Ore.png' },
  { id: 'Mana', label: 'Mana', img: '/images/additional/Mana.png' },
];

const ELIXIR = [
  { id: 'hospital', label: 'Hospital', img: '/images/additional/Elixir.png' },
  { id: 'backpack', label: 'Backpack', img: '/images/additional/Elixir.png' },
];

const TABS = [
  { id: 'troops', label: 'Troops' },
  { id: 'resources', label: 'Resources' },
  { id: 'elixir', label: 'Elixir' },
];

const SECTION_CARDS = [
  {
    id: 'troops',
    label: 'Troops',
    icon: <FaShieldAlt className="w-8 h-8 text-purple-500" />,
    gradient: 'from-purple-600 to-purple-800',
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: <FaLeaf className="w-8 h-8 text-green-500" />,
    gradient: 'from-green-400 to-blue-500',
  },
  {
    id: 'elixir',
    label: 'Elixir',
    icon: <FaFlask className="w-8 h-8 text-cyan-400" />,
    gradient: 'from-cyan-400 to-blue-700',
  },
];

function formatNumber(num) {
  return Number(num).toLocaleString();
}

export default function GuildMainInfoView() {
  const [tab, setTab] = useState('troops');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topType, setTopType] = useState(null);
  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setLoading(true);
      try {
        const res = await axiosInstance.get('/api/guild/member/getMainInfoForAll');
        const arr = Object.entries(res.data || {}).map(([nickname, obj]) => ({ nickname, ...obj }));
        setData(arr);
      } catch (e) {
        setData([]);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setIsLoading]);

  const getTroopSums = () => {
    const sums = {};
    TROOP_TYPES.forEach(type => {
      sums[type.id] = { T4: 0, T5: 0 };
    });
    data.forEach(member => {
      if (member.troops) {
        TROOP_TYPES.forEach(type => {
          if (member.troops[type.id]) {
            sums[type.id].T4 += Number(member.troops[type.id].T4) || 0;
            sums[type.id].T5 += Number(member.troops[type.id].T5) || 0;
          }
        });
      }
    });
    return sums;
  };
  const getTroopTop = (typeId) => {
    return data
      .map(member => ({
        nickname: member.nickname,
        T4: Number(member.troops?.[typeId]?.T4) || 0,
        T5: Number(member.troops?.[typeId]?.T5) || 0,
      }))
      .filter(m => m.T4 > 0 || m.T5 > 0)
      .sort((a, b) => (b.T4 + b.T5) - (a.T4 + a.T5))
      .slice(0, 10);
  };

  const getResourceSums = () => {
    const sums = {};
    RESOURCES.forEach(r => { sums[r.id] = 0; });
    data.forEach(member => {
      if (member.resources) {
        RESOURCES.forEach(r => {
          sums[r.id] += Number(member.resources[r.id]) || 0;
        });
      }
    });
    return sums;
  };
  const getResourceTop = (resId) => {
    return data
      .map(member => ({
        nickname: member.nickname,
        value: Number(member.resources?.[resId]) || 0,
      }))
      .filter(m => m.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };

  const getElixirSums = () => {
    const sums = { hospital: 0, backpack: 0 };
    data.forEach(member => {
      if (member.elixir) {
        sums.hospital += Number(member.elixir.hospital) || 0;
        sums.backpack += Number(member.elixir.backpack) || 0;
      }
    });
    return sums;
  };
  const getElixirTop = (elixirId) => {
    return data
      .map(member => ({
        nickname: member.nickname,
        value: Number(member.elixir?.[elixirId]) || 0,
      }))
      .filter(m => m.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };

  const medal = [
    <span key="gold" className="inline-block text-2xl align-middle">🥇</span>,
    <span key="silver" className="inline-block text-2xl align-middle">🥈</span>,
    <span key="bronze" className="inline-block text-2xl align-middle">🥉</span>,
  ];

  const renderTop = (top, labelT4, labelT5) => (
    <div className="mt-6 w-full flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto rounded-2xl border-2 border-blue-300 bg-white/90 shadow-2xl p-0 overflow-hidden animate-fade-in">
        <table className="hidden md:table w-full text-center text-base">
          <thead>
            <tr className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Nickname</th>
              {labelT4 && <th className="px-4 py-3">{labelT4}</th>}
              {labelT5 && <th className="px-4 py-3">{labelT5}</th>}
              <th className="px-4 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {top.map((m, idx) => (
              <tr
                key={m.nickname}
                className={
                  idx === 0
                    ? 'bg-gradient-to-r from-yellow-100 via-yellow-50 to-white font-bold text-yellow-700'
                    : idx === 1
                    ? 'bg-gradient-to-r from-gray-200 via-gray-50 to-white font-semibold text-gray-700'
                    : idx === 2
                    ? 'bg-gradient-to-r from-amber-200 via-amber-50 to-white font-semibold text-amber-700'
                    : 'hover:bg-blue-50 transition'
                }
              >
                <td className="px-4 py-3 text-xl">{medal[idx] || idx + 1}</td>
                <td className="px-4 py-3 text-lg font-semibold flex items-center gap-2 justify-center">
                  <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-base font-bold shadow-sm">
                    {m.nickname}
                  </span>
                </td>
                {labelT4 && <td className="px-4 py-3">{formatNumber(m.T4)}</td>}
                {labelT5 && <td className="px-4 py-3">{formatNumber(m.T5)}</td>}
                <td className="px-4 py-3 font-bold text-lg text-blue-700">{formatNumber((m.T4 || 0) + (m.T5 || 0) + (m.value || 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:hidden flex flex-col gap-4 p-4">
          {top.map((m, idx) => (
            <div
              key={m.nickname}
              className={`rounded-xl p-4 flex flex-col gap-2 shadow-md border-2 ${
                idx === 0
                  ? 'bg-gradient-to-r from-yellow-100 via-yellow-50 to-white border-yellow-300'
                  : idx === 1
                  ? 'bg-gradient-to-r from-gray-200 via-gray-50 to-white border-gray-300'
                  : idx === 2
                  ? 'bg-gradient-to-r from-amber-200 via-amber-50 to-white border-amber-300'
                  : 'bg-white border-blue-100'
              } animate-fade-in`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{medal[idx] || idx + 1}</span>
                <span className="font-bold text-blue-700 text-base bg-blue-50 rounded-full px-3 py-1 shadow-sm">{m.nickname}</span>
              </div>
              <div className="flex flex-wrap gap-3 text-sm justify-center">
                {labelT4 && (
                  <span className="bg-purple-100 text-purple-700 rounded px-2 py-1 font-semibold">T4: {formatNumber(m.T4)}</span>
                )}
                {labelT5 && (
                  <span className="bg-amber-100 text-amber-700 rounded px-2 py-1 font-semibold">T5: {formatNumber(m.T5)}</span>
                )}
                <span className="bg-blue-100 text-blue-700 rounded px-2 py-1 font-bold">Total: {formatNumber((m.T4 || 0) + (m.T5 || 0) + (m.value || 0))}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative max-w-5xl mx-auto p-0 md:p-8 bg-gradient-to-br from-blue-900 via-blue-700 via-60% to-cyan-400 rounded-3xl shadow-[0_8px_40px_0_rgba(30,64,175,0.25)] border-4 border-blue-200/40 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cardGlow" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.10" />
              <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.04" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#cardGlow)" />
        </svg>
      </div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center py-6 md:py-10">
        <Loader />
        {/* Section selection cards */}
        <div className="w-full flex flex-col items-center mb-8 px-2 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl mx-auto justify-center">
            {SECTION_CARDS.map(card => (
              <button
                key={card.id}
                onClick={() => { setTab(card.id); setTopType(null); }}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl border-2 transition-all duration-200 cursor-pointer bg-gradient-to-br ${card.gradient} 
                  ${tab === card.id && !topType ? 'scale-105 ring-4 ring-white/60 shadow-2xl' : 'hover:scale-105 hover:ring-2 hover:ring-white/40'}
                `}
              >
                <div className="mb-2">{card.icon}</div>
                <span className="text-xl font-bold text-white mb-1">{card.label}</span>
                <span className="text-white/80 text-sm">
                  {card.id === 'troops' && (
                    <>
                      {Object.values(getTroopSums()).reduce((acc, t) => acc + t.T4 + t.T5, 0).toLocaleString()} total
                    </>
                  )}
                  {card.id === 'resources' && (
                    <>
                      {Object.values(getResourceSums()).reduce((acc, v) => acc + v, 0).toLocaleString()} total
                    </>
                  )}
                  {card.id === 'elixir' && (
                    <>
                      {Object.values(getElixirSums()).reduce((acc, v) => acc + v, 0).toLocaleString()} total
                    </>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center transition-all duration-300">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : tab === 'troops' ? (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow">Guild Troops Summary</h2>
              {!topType ? (
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] w-full px-4">
                  {TROOP_TYPES.map(type => {
                    const sums = getTroopSums()[type.id];
                    return (
                      <div key={type.id} className="flex flex-col items-center p-6 rounded-2xl bg-white/90 border border-blue-200 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]">
                        <img src={type.img} alt={type.label} className="w-16 h-16 object-contain mb-3" />
                        <span className="font-bold text-blue-700 text-center mb-4 text-lg">{type.label}</span>
                        <div className="flex flex-col gap-4 w-full">
                          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-4 shadow-lg">
                            <span className="text-xs text-white mb-1 block text-center">T4</span>
                            <span className="text-white font-bold text-center block text-lg">{formatNumber(sums.T4)}</span>
                          </div>
                          <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl p-4 shadow-lg">
                            <span className="text-xs text-white mb-1 block text-center">T5</span>
                            <span className="text-white font-bold text-center block text-lg">{formatNumber(sums.T5)}</span>
                          </div>
                        </div>
                        <button
                          className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md"
                          onClick={() => setTopType(type.id)}
                        >
                          View Top Players
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-8 w-full flex flex-col items-center">
                  <h3 className="text-lg font-bold mb-2 text-center text-white">Top by {TROOP_TYPES.find(t => t.id === topType)?.label}</h3>
                  {renderTop(getTroopTop(topType), 'T4', 'T5')}
                  <button 
                    className="mt-6 px-6 py-2 rounded-lg bg-white text-blue-700 font-semibold shadow-md hover:bg-blue-50 transition-colors fixed bottom-4 left-1/2 -translate-x-1/2 md:static md:translate-x-0" 
                    onClick={() => setTopType(null)}
                  >
                    Back to All Troops
                  </button>
                </div>
              )}
            </div>
          ) : tab === 'resources' ? (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow">Guild Resources Summary</h2>
              {!topType ? (
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] w-full px-4">
                  {RESOURCES.map(res => {
                    const sum = getResourceSums()[res.id];
                    return (
                      <div key={res.id} className="flex flex-col items-center p-6 rounded-2xl bg-white/90 border border-blue-200 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]">
                        <img src={res.img} alt={res.label} className="w-16 h-16 object-contain mb-3" />
                        <span className="font-bold text-blue-700 text-center mb-4 text-lg">{res.label}</span>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 shadow-lg w-full">
                          <span className="text-xs text-white mb-1 block text-center">Total</span>
                          <span className="text-white font-bold text-center block text-lg">{formatNumber(sum)}</span>
                        </div>
                        <button
                          className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md"
                          onClick={() => setTopType(res.id)}
                        >
                          View Top Players
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-8 w-full flex flex-col items-center">
                  <h3 className="text-lg font-bold mb-2 text-center text-white">Top by {RESOURCES.find(r => r.id === topType)?.label}</h3>
                  {renderTop(getResourceTop(topType))}
                  <button 
                    className="mt-6 px-6 py-2 rounded-lg bg-white text-blue-700 font-semibold shadow-md hover:bg-blue-50 transition-colors fixed bottom-4 left-1/2 -translate-x-1/2 md:static md:translate-x-0" 
                    onClick={() => setTopType(null)}
                  >
                    Back to All Resources
                  </button>
                </div>
              )}
            </div>
          ) : tab === 'elixir' ? (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow">Guild Elixir Summary</h2>
              {!topType ? (
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] w-full px-4">
                  {ELIXIR.map(e => {
                    const sum = getElixirSums()[e.id];
                    return (
                      <div key={e.id} className="flex flex-col items-center p-6 rounded-2xl bg-white/90 border border-blue-200 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]">
                        <img src={e.img} alt={e.label} className="w-16 h-16 object-contain mb-3" />
                        <span className="font-bold text-blue-700 text-center mb-4 text-lg">{e.label}</span>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 shadow-lg w-full">
                          <span className="text-xs text-white mb-1 block text-center">Total</span>
                          <span className="text-white font-bold text-center block text-lg">{formatNumber(sum)}</span>
                        </div>
                        <button
                          className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md"
                          onClick={() => setTopType(e.id)}
                        >
                          View Top Players
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-8 w-full flex flex-col items-center">
                  <h3 className="text-lg font-bold mb-2 text-center text-white">Top by {ELIXIR.find(e => e.id === topType)?.label}</h3>
                  {renderTop(getElixirTop(topType))}
                  <button 
                    className="mt-6 px-6 py-2 rounded-lg bg-white text-blue-700 font-semibold shadow-md hover:bg-blue-50 transition-colors fixed bottom-4 left-1/2 -translate-x-1/2 md:static md:translate-x-0" 
                    onClick={() => setTopType(null)}
                  >
                    Back to All Elixir
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
} 
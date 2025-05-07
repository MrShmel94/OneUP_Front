import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../lib/axios';
import { useAuth } from '../../../context/AuthContext';
import { useLoader } from '../../../context/LoaderContext';
import Tippy from '@tippyjs/react';
import Swal from 'sweetalert2';
import 'tippy.js/dist/tippy.css';
import '../../../styles/tippy-custom.css';
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

const SECTION_CARDS = [
  {
    id: 'troops',
    label: 'Troops',
    icon: <FaShieldAlt className="w-7 h-7 text-purple-500" />,
    gradient: 'from-purple-600 to-purple-800',
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: <FaLeaf className="w-7 h-7 text-green-500" />,
    gradient: 'from-green-400 to-blue-500',
  },
  {
    id: 'elixir',
    label: 'Elixir',
    icon: <FaFlask className="w-7 h-7 text-cyan-400" />,
    gradient: 'from-cyan-400 to-blue-700',
  },
];

export default function MembersInputView() {
  const { user } = useAuth();
  const { setIsLoading } = useLoader();
  const [selected, setSelected] = useState(TROOP_TYPES[0].id);
  const [troops, setTroops] = useState(Object.fromEntries(TROOP_TYPES.map(t => [t.id, { T4: '', T5: '' }])));
  const [resources, setResources] = useState(Object.fromEntries(RESOURCES.map(r => [r.id, ''])));
  const [elixir, setElixir] = useState({
    "hospital" : '',
    "backpack" : ''
  });
  const [section, setSection] = useState('troops');

  const formatNumber = (num) => {
    if (!num) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const unformatNumber = (str) => {
    return str.replace(/,/g, '');
  };

  const formatInputValue = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get('/api/guild/member/getMainInfo');
        if (res.data) {
          if (res.data.troops) {
            const formattedTroops = {};
            Object.entries(res.data.troops).forEach(([type, tiers]) => {
              formattedTroops[type] = {
                T4: formatNumber(tiers.T4),
                T5: formatNumber(tiers.T5)
              };
            });
            setTroops(formattedTroops);
          }
          if (res.data.resources) {
            const formattedResources = {};
            Object.entries(res.data.resources).forEach(([type, value]) => {
              formattedResources[type] = formatNumber(value);
            });
            setResources(formattedResources);
          }
          if (res.data.elixir) {
            setElixir({
              hospital: formatNumber(res.data.elixir.hospital),
              backpack: formatNumber(res.data.elixir.backpack)
            });
          }
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTroopInput = (typeId, tier, value) => {
    const formattedValue = formatInputValue(value);
    setTroops(prev => ({
      ...prev,
      [typeId]: {
        ...prev[typeId],
        [tier]: formattedValue,
      },
    }));
  };

  const handleResourceInput = async (id, value) => {
    const formattedValue = formatInputValue(value);
    const numericValue = parseInt(unformatNumber(formattedValue)) || 0;

    if (numericValue > 10000) {
      const result = await Swal.fire({
        title: 'Confirm Large Resource Amount',
        text: `Are you sure you have more than 10 billion ${id}? (${formatNumber(numericValue)} million)`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I\'m sure',
        cancelButtonText: 'No, let me check'
      });

      if (!result.isConfirmed) {
        setResources(prev => ({
          ...prev,
          [id]: prev[id]
        }));
        return;
      }
    }

    setResources(prev => ({
      ...prev,
      [id]: formattedValue,
    }));
  };

  const handleElixirInput = (id, value) => {
    const formattedValue = formatInputValue(value);
    setElixir(prev => ({
      ...prev,
      [id]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.nickname) return;
    setIsLoading(true);
    try {
      const unformattedTroops = {};
      Object.entries(troops).forEach(([type, tiers]) => {
        unformattedTroops[type] = {
          T4: parseInt(unformatNumber(tiers.T4)) || 0,
          T5: parseInt(unformatNumber(tiers.T5)) || 0
        };
      });

      const unformattedResources = {};
      Object.entries(resources).forEach(([type, value]) => {
        unformattedResources[type] = parseInt(unformatNumber(value)) || 0;
      });

      const unformattedElixir = {
        hospital: parseInt(unformatNumber(elixir.hospital)) || 0,
        backpack: parseInt(unformatNumber(elixir.backpack)) || 0
      };

      await axiosInstance.post('/api/guild/member/saveMainInfo', {
        nickname: user.nickname,
        troops: unformattedTroops,
        resources: unformattedResources,
        elixir: unformattedElixir,
      });
    } catch (e) {
      console.error('Error saving data:', e);
      Swal.fire({
        title: 'Error',
        text: 'Please make sure all fields contain valid numbers',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center p-0 md:p-8">
      <div className="relative w-full max-w-[100vw] sm:max-w-screen-sm md:max-w-screen-md lg:max-w-5xl overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-700 via-60% to-cyan-400 rounded-3xl shadow-[0_8px_40px_0_rgba(30,64,175,0.18)] border-4 border-blue-200/40 overflow-hidden min-h-[60vh] flex flex-col items-center justify-center px-2 sm:px-8 py-4 sm:py-12 mb-10">
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
          <div className="w-full flex flex-col items-center mb-8 px-2 sm:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl mx-auto justify-center">
              {SECTION_CARDS.map(card => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSection(card.id)}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl shadow-xl border-2 transition-all duration-200 cursor-pointer bg-gradient-to-br ${card.gradient} 
                    ${section === card.id ? 'scale-105 ring-4 ring-white/60 shadow-2xl' : 'hover:scale-105 hover:ring-2 hover:ring-white/40'}
                  `}
                >
                  <div className="mb-2">{card.icon}</div>
                  <span className="text-lg font-bold text-white mb-1">{card.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col items-center transition-all duration-300 px-2 sm:px-0">
            {section === 'troops' && (
              <div className="w-full">
                <div className="bg-white/90 border border-blue-200 rounded-2xl shadow-xl p-6 md:p-8 transition-all hover:shadow-2xl hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4 border-b border-blue-100 pb-2">
                    <h2 className="text-2xl text-blue-700 font-bold text-center flex-1">Troops</h2>
                    <Tippy 
                      content={<span>Enter the number of your troops that are NOT in the hospital.</span>} 
                      placement="left" 
                      trigger="focus mouseenter" 
                      theme="light-border tippy-blue" 
                      className="tippy-blue"
                      maxWidth={300}
                    >
                      <span
                        tabIndex={0}
                        className="ml-2 cursor-pointer bg-blue-600 text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-md"
                        aria-label="Info"
                      >
                        ❔
                      </span>
                    </Tippy>
                  </div>
                  <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] px-4">
                    {TROOP_TYPES.map(type => (
                      <div key={type.id} className="flex flex-col items-center w-full p-4 rounded-xl bg-blue-50 border border-blue-100 shadow-md">
                        <img src={type.img} alt={type.label} className="w-14 h-14 object-contain mb-2" />
                        <span className="font-bold text-blue-900 text-center mb-2">{type.label}</span>
                        <div className="flex flex-col gap-3 w-full mt-2">
                          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-3 shadow w-full">
                            <label className="text-xs font-bold text-white mb-1 block text-center">T4</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              className="w-full px-2 py-1 md:px-4 md:py-3 md:text-lg rounded border border-purple-300 bg-white/90 text-purple-900 text-center focus:ring-2 focus:ring-purple-400 outline-none"
                              value={troops[type.id].T4}
                              onChange={e => handleTroopInput(type.id, 'T4', e.target.value)}
                              placeholder="0"
                              autoComplete="off"
                            />
                          </div>
                          <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl p-3 shadow w-full">
                            <label className="text-xs font-bold text-white mb-1 block text-center">T5</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              className="w-full px-2 py-1 md:px-4 md:py-3 md:text-lg rounded border border-amber-300 bg-white/90 text-amber-900 text-center focus:ring-2 focus:ring-amber-400 outline-none"
                              value={troops[type.id].T5}
                              onChange={e => handleTroopInput(type.id, 'T5', e.target.value)}
                              placeholder="0"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {section === 'resources' && (
              <div className="w-full">
                <div className="bg-white/90 border border-blue-200 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 transition-all hover:shadow-2xl hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4 border-b border-blue-100 pb-2">
                    <h2 className="text-2xl text-blue-700 font-bold text-center flex-1">Resources</h2>
                    <Tippy 
                      content={<span>
                        Enter your resources in **millions**, rounded to the nearest million. <br />
                        For example, if you have <b>328,940,023</b>, enter <b>329</b>. <br />
                        Do not use <b>.</b> or <b>,</b>. If you have less than 1 million, enter <b>0</b>.
                      </span>} 
                      placement="left" 
                      trigger="focus mouseenter" 
                      theme="light-border tippy-blue" 
                      className="tippy-blue"
                      maxWidth={300}
                    >
                      <span
                        tabIndex={0}
                        className="ml-2 cursor-pointer bg-blue-600 text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-md"
                        aria-label="Info"
                      >
                        ❔
                      </span>
                    </Tippy>
                  </div>
                  <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
                    {RESOURCES.map(resource => (
                      <div key={resource.id} className="flex flex-col items-center p-3 rounded-xl bg-blue-50 border border-blue-100">
                        <img src={resource.img} alt={resource.label} className="w-14 h-14 object-contain mb-2" />
                        <span className="font-medium text-sm text-blue-900 text-center mb-2">{resource.label}</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-28 px-2 py-1 rounded border border-blue-300 bg-white text-blue-900 text-center focus:ring-2 focus:ring-blue-400 outline-none"
                          value={resources[resource.id]}
                          onChange={e => handleResourceInput(resource.id, e.target.value)}
                          placeholder="e.g. 100"
                          min="0"
                          autoComplete="off"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {section === 'elixir' && (
              <div className="w-full">
                <div className="bg-white/90 border border-blue-200 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 transition-all hover:shadow-2xl hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4 border-b border-blue-100 pb-2">
                    <h2 className="text-2xl text-blue-700 font-bold text-center flex-1">Elixir</h2>
                    <Tippy 
                      content={<span>Hospital — current elixir in hospital. Backpack — total elixir in backpack.</span>} 
                      placement="left" 
                      trigger="focus mouseenter" 
                      theme="light-border tippy-blue" 
                      className="tippy-blue"
                      maxWidth={300}
                    >
                      <span
                        tabIndex={0}
                        className="ml-2 cursor-pointer bg-blue-600 text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-md"
                        aria-label="Info"
                      >
                        ❔
                      </span>
                    </Tippy>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-blue-50 border border-blue-100 max-w-xs mx-auto">
                    <img src="/images/additional/Elixir.png" alt="Elixir" className="w-16 h-16 object-contain mb-4" />
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col items-center w-full">
                        <label className="text-xs text-blue-700 mb-1">Hospital</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-32 px-2 py-1 rounded border border-blue-300 bg-white text-blue-900 text-center focus:ring-2 focus:ring-blue-400 outline-none"
                          value={elixir.hospital}
                          onChange={e => handleElixirInput('hospital', e.target.value)}
                          placeholder="0"
                          autoComplete="off"
                        />
                      </div>
                      <div className="flex flex-col items-center w-full">
                        <label className="text-xs text-blue-700 mb-1">Backpack</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-32 px-2 py-1 rounded border border-blue-300 bg-white text-blue-900 text-center focus:ring-2 focus:ring-blue-400 outline-none"
                          value={elixir.backpack}
                          onChange={e => handleElixirInput('backpack', e.target.value)}
                          placeholder="0"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center px-2 sm:px-0">
        <div className="w-full max-w-2xl bg-white/90 border border-blue-200 rounded-2xl shadow-xl p-4 sm:p-8 flex items-center justify-center mt-2 mb-8">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
} 
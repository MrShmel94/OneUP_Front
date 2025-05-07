const ARTIFACT_PLACEHOLDER = '/images/artifacts/placeholder.png';

export const artifactCategories = [
  { id: 'overall', name: 'Overall' },
  { id: 'magic', name: 'Magic' },
  { id: 'marksman', name: 'Marksman' },
  { id: 'cavalry', name: 'Cavalry' },
  { id: 'infantry', name: 'Infantry' }
];

export const artifacts = [
  {
    id: 1,
    name: 'Shadowblades',
    category: 'marksman',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '1_1',
        name: 'Shadow Games',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 2,
    name: 'Heart of Kamasi',
    category: 'marksman',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '2_1',
        name: 'Earthen Judgment',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 3,
    name: 'Viola\'s Bow',
    category: 'marksman',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '3_1',
        name: 'Termination Arrow',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 4,
    name: 'Rattle-Spear',
    category: 'marksman',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '4_1',
        name: 'Vicious Strike',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 5,
    name: 'Iron Tusk',
    category: 'marksman',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '5_1',
        name: 'Rapid Salvo',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 6,
    name: 'Goldcrest',
    category: 'marksman',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '6_1',
        name: 'Shadowflight',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 7,  
    name: 'Gilded Crossbow',
    category: 'marksman',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '7_1',
        name: 'Glittering Bolt',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 8,  
    name: 'Kingslayer',
    category: 'cavalry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '8_1',
        name: 'Royal Punishment',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 9,  
    name: 'Lunaris',
    category: 'cavalry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '9_1',
        name: 'Moon\'s Judgment',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 10,  
    name: 'Oath of Stormpeak',
    category: 'cavalry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '10_1',
        name: 'Hallowed Covenant',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 11,  
    name: 'Sorland\'s Blade',
    category: 'cavalry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '11_1',
        name: 'Sword Oath',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 12,  
    name: 'Springblades',
    category: 'cavalry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '12_1',
        name: 'Cyclone Blade',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 13,  
    name: 'Storm Arrows',
    category: 'cavalry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '13_1',
        name: 'Blink',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 14,  
    name: 'Wolf Woman of Haelor',
    category: 'cavalry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '14_1',
        name: 'Wolfshadow',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 15,  
    name: 'Wolf-Howl Horn',
    category: 'cavalry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '15_1',
        name: 'Terrible Howl',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 16,  
    name: 'Springs of Silence',
    category: 'infantry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '16_1',
        name: 'Fleeting Beauty',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 17,  
    name: 'Spiritbone Torc',
    category: 'infantry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '17_1',
        name: 'Mocking Chorus',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 18,  
    name: 'Shield of Sturdiness',
    category: 'infantry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '18_1',
        name: 'Courageous Rush',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 19,  
    name: 'Greymar\'s Warhammer',
    category: 'infantry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '19_1',
        name: 'Ground Pound',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 20,  
    name: 'Dragonscale Armor',
    category: 'infantry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '20_1',
        name: 'Entangling Flames',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 21,  
    name: 'Dragonrift',
    category: 'infantry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '21_1',
        name: 'Dragon Tamer',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 22,  
    name: 'Deathless Vines',
    category: 'infantry',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '22_1',
        name: 'Ancient Entanglement',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 23,  
    name: 'Breath of Jargentis',
    category: 'magic',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '23_1',
        name: 'Acid Breath',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 24,  
    name: 'Infernal Flame',
    category: 'magic',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '24_1',
        name: 'Terrifying Inferno',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 25,  
    name: 'Mirage Orb',
    category: 'magic',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '25_1',
        name: 'Nightmarish Reverie',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 26,  
    name: 'Phoenix Eye',
    category: 'magic',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '26_1',
        name: 'Burst Strike',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 27,  
    name: 'Staff of the Prophet',
    category: 'magic',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '27_1',
        name: 'Toward the Light',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 28,  
    name: 'Tear of Arbon',
    category: 'magic',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '28_1',
        name: 'Divine Mercy',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 29,  
    name: 'Thunder Elegy',
    category: 'magic',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '29_1',
        name: 'Thunderfield',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 30,  
    name: 'Fang of Ashkari',
    category: 'overall',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '30_1',
        name: 'Thundershadow',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 31,  
    name: 'Visage of the Sanctus',
    category: 'overall',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '31_1',
        name: 'Strike of the Light',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 32,  
    name: 'Bloodblade Banner',
    category: 'overall',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '32_1',
        name: 'Warrior Spirit',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 33,  
    name: 'Breath of the Forest',
    category: 'overall',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '33_1',
        name: 'Deepwood Symphony',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
  {
    id: 34,  
    name: 'Springbird Feather',
    category: 'overall',
    image: ARTIFACT_PLACEHOLDER,
    maxStars: 6,
    abilities: [
      {
        id: '34_1',
        name: 'Mighty Tailwind',
        currentLevel: 0,
        maxLevel: 6
      }
    ]
  },
]; 
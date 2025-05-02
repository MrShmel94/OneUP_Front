const HERO_PLACEHOLDER = '/images/heroes/placeholder.png';

export const heroCategories = [
  { id: 'overall', name: 'Overall' },
  { id: 'magic', name: 'Magic' },
  { id: 'marksman', name: 'Marksman' },
  { id: 'cavalry', name: 'Cavalry' },
  { id: 'infantry', name: 'Infantry' }
];

export const heroes = [
  {
    id: 1,
    name: 'Maggrat',
    category: 'marksman',
    image: HERO_PLACEHOLDER,
    description: 'Maggrat is a legendary marksman hero from the Wilderburg faction, known for her ability to inflict debuffs and control the battlefield.',
    abilities: [
      {
        id: '1_1',
        name: 'Peech\'s Dream',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '1_2',
        name: 'Truth Teller',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '1_3',
        name: 'Spore Stupor',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '1_4',
        name: 'Fungal Fervor',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 2,
    name: 'Zayda',
    category: 'marksman',
    image: HERO_PLACEHOLDER,
    description: 'Zayda is a legendary marksman hero from the League of Order faction, celebrated for her rapid attacks and mobility on the battlefield.',
    abilities: [
      {
        id: '2_1',
        name: 'Shining Star Shot',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '2_2',
        name: 'Decisive Duel',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '2_3',
        name: 'Tactial Adjustment',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '2_4',
        name: 'Silver Tongue',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 3,
    name: 'Falgrim',
    category: 'marksman',
    image: HERO_PLACEHOLDER,
    description: 'Falgrim is a legendary marksman hero from the Wilderburg faction, renowned for his precision and devastating ranged attacks.',
    abilities: [
      {
        id: '3_1',
        name: 'Public Punishment',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '3_2',
        name: 'Criminal Underwold',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '3_3',
        name: 'Professional Principles',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '3_4',
        name: 'Contract Killer',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 4,
    name: 'Sibyl',
    category: 'marksman',
    image: HERO_PLACEHOLDER,
    description: 'Sibyl is a legendary marksman hero from the Springwardens faction, known for her powerful area-of-effect spells and crowd control abilities.',
    abilities: [
      {
        id: '4_1',
        name: 'Dragonhunter Arrow',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '4_2',
        name: 'Blue Blood',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '4_3',
        name: 'Getaway Plan',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '4_4',
        name: 'Explosive Potential',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  ,
  {
    id: 5,
    name: 'Syndrion',
    category: 'marksman',
    image: HERO_PLACEHOLDER,
    description: 'Syndrion is a legendary marksman hero from the Springwardens faction, excelling in rallying and delivering precise attacks.',
    abilities: [
      {
        id: '5_1',
        name: 'Greenfeather',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '5_2',
        name: 'Soaring Ambition',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '5_3',
        name: 'Feather Strike',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '5_4',
        name: 'Forest Shadow',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  ,
  {
    id: 6,
    name: 'Ffraegar',
    category: 'marksman',
    image: HERO_PLACEHOLDER,
    description: 'Ffraegar is a legendary marksman hero from the Springwardens faction, celebrated for her precision and long-range attacks.',
    abilities: [
      {
        id: '6_1',
        name: 'Squall Shot',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '6_2',
        name: 'Nocked and Loaded',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '6_3',
        name: 'Storm Barrage',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '6_4',
        name: 'Falconer Charge',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 7,
    name: 'Kinnara',
    category: 'marksman',
    image: HERO_PLACEHOLDER,
    description: 'Kinnara is a legendary marksman hero from the Wilderburg faction, known for her precision and control over the battlefield.',
    abilities: [
      {
        id: '7_1',
        name: 'Rattlesnake Strike',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '7_2',
        name: 'Provocation',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '7_3',
        name: 'Hunter\'s Pace',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '7_4',
        name: 'Gratuitous Violence',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 8,
    name: 'Nico',
    category: 'marksman',
    image: HERO_PLACEHOLDER,
    description: 'Nico is a legendary marksman hero from the League of Order faction, renowned for his engineering prowess and precision strikes on the battlefield.',
    abilities: [
      {
        id: '8_1',
        name: 'Piercing Shot',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '8_2',
        name: 'Expert Mechanic',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '8_3',
        name: 'Agile Deployment',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '8_4',
        name: 'Greymar\'s Ballista',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 9,
    name: 'Gwanwyn',
    category: 'marksman',
    image: HERO_PLACEHOLDER,
    description: 'Gwanwyn is an epic marksman hero from the Springwardens faction, renowned for her precision and effectiveness in peacekeeping operations.',
    abilities: [
      {
        id: '9_1',
        name: 'Chaotic Arrows',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '9_2',
        name: 'Aspiring Queensguard',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '9_3',
        name: 'Green Boats Master',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '9_4',
        name: 'Preemptive Strike',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  }, 
  {
    id: 10,
    name: 'Kregg',
    category: 'marksman',
    image: HERO_PLACEHOLDER,
    description: 'Kregg is an epic marksman hero from the League of Order faction, known for his explosive attacks and mobility.',
    abilities: [
      {
        id: '10_1',
        name: 'Fragmentation Bolt',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '10_2',
        name: 'Wyvern Rider',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '10_3',
        name: 'Aerial Formation',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '10_4',
        name: 'Building Frenzy',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  }, 
  {
    id: 11,
    name: 'Liliya',
    category: 'magic',
    image: HERO_PLACEHOLDER,
    description: 'Liliya is a legendary mage from the League of Order faction, renowned for her devastating area-of-effect (AoE) fire magic. Specializing in magic, peacekeeping, and skill talents, she excels in both PvE and PvP scenarios, making her a versatile and powerful hero on the battlefield.',
    abilities: [
      {
        id: '11_1',
        name: 'Flames of Vengeance',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '11_2',
        name: 'Dazzling Inferno',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '11_3',
        name: 'Deep Burn',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '11_4',
        name: 'Witchy Wiles',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 12,
    name: 'Velyn',
    category: 'magic',
    image: HERO_PLACEHOLDER,
    description: 'Velyn is a legendary mage from the Springwardens faction, known for his exceptional area-of-effect damage and crowd control abilities.',
    abilities: [
      {
        id: '12_1',
        name: 'Frozen Star',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '12_2',
        name: 'Perfection of Form',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '12_3',
        name: 'Bitter Cold',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '12_4',
        name: 'Icy Interdiction',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 13,
    name: 'Thundelyn',
    category: 'magic',
    image: HERO_PLACEHOLDER,
    description: 'Thundelyn is a legendary mage from the Springwardens faction, excelling in area-of-effect attacks and providing shields and healing to her allies.',
    abilities: [
      {
        id: '13_1',
        name: 'Skyfury',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '13_2',
        name: 'Forbidden Healing',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '13_3',
        name: 'Player of Lucia',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '13_4',
        name: 'Thunderclap',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 14,
    name: 'Thaleia',
    category: 'magic',
    image: HERO_PLACEHOLDER,
    description: 'Thaleia is a legendary mage from the League of Order faction, known for her supportive abilities that enhance allies and mitigate enemy damage.',
    abilities: [
      {
        id: '14_1',
        name: 'Sounds of Nature',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '14_2',
        name: 'Good Tidings',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '14_3',
        name: 'Blessing of Life',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '14_4',
        name: 'Musical Inspiration',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 15,
    name: 'Bertrand',
    category: 'magic',
    image: HERO_PLACEHOLDER,
    description: 'Bertrand is a legendary magic hero from the League of Order faction, known for his ability to accumulate Golden Marks and unleash powerful attacks.',
    abilities: [
      {
        id: '15_1',
        name: 'Entitled Rage',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '15_2',
        name: 'Compound Interest',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '15_3',
        name: 'Magic Circle',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '15_4',
        name: 'Blue Blood',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 16,
    name: 'Tohar',
    category: 'magic',
    image: HERO_PLACEHOLDER,
    description: 'Tohar is a legendary magic hero from the Wilderburg faction, renowned for his defensive capabilities and support skills.',
    abilities: [
      {
        id: '16_1',
        name: 'Earth Conduit',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '16_2',
        name: 'Defensive Fortifications',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '16_3',
        name: 'Shamanic Mastery',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '16_4',
        name: 'Plateau Protection',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 17,
    name: 'Waldyr',
    category: 'magic',
    image: HERO_PLACEHOLDER,
    description: 'Waldyr is an epic magic hero from the League of Order faction, excelling in area-of-effect damage and debuffing enemies.',
    abilities: [
      {
        id: '17_1',
        name: 'Ice Breath',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '17_2',
        name: 'Royal Court Mage',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '17_3',
        name: 'Frostbite',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '17_4',
        name: 'Icy Veins',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 18,
    name: 'Atheus',
    category: 'magic',
    image: HERO_PLACEHOLDER,
    description: 'Atheus is an epic magic hero from the League of Order faction, known for his mobility and support capabilities.',
    abilities: [
      {
        id: '18_1',
        name: 'Smite',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '18_2',
        name: 'Eye of Insight',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '18_3',
        name: 'Sanctified Wings',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '18_4',
        name: 'Winged Embrace',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 19,
    name: 'Alwyn',
    category: 'magic',
    image: HERO_PLACEHOLDER,
    description: 'Alwyn is an epic magic hero from the Springwardens faction, specializing in poison-based attacks and control.',
    abilities: [
      {
        id: '19_1',
        name: 'Venomous Overgrowth',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '19_2',
        name: 'Wealdshield',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '19_3',
        name: 'Oath of the Wellspring',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '19_4',
        name: 'Friend of the Hemlock',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 20,
    name: 'Goresh',
    category: 'infantry',
    image: HERO_PLACEHOLDER,
    description: 'Goresh is a legendary infantry hero from the Wilderburg faction, known for his exceptional tanking abilities and counterattack damage.',
    abilities: [
      {
        id: '20_1',
        name: 'Wild Blood',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '20_2',
        name: 'Steel Skin',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '20_3',
        name: 'Ruthless',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '20_4',
        name: 'Ravaging Army',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 21,
    name: 'Skogul',
    category: 'infantry',
    image: HERO_PLACEHOLDER,
    description: 'Skogul is a legendary infantry hero from the Wilderburg faction, excelling in counterattack damage and sustaining prolonged battles.',
    abilities: [
      {
        id: '21_1',
        name: 'Bloodsoaked Battle',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '21_2',
        name: 'Unshakeable',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '21_3',
        name: 'Guerilla Tactics',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '21_4',
        name: 'Tough as Nails',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 22,
    name: 'Mogro',
    category: 'infantry',
    image: HERO_PLACEHOLDER,
    description: 'Mogro is a legendary infantry hero from the Wilderburg faction, known for his debuffing capabilities and area-of-effect damage.',
    abilities: [
      {
        id: '22_1',
        name: 'Ashes of Rage',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '22_2',
        name: 'Rancorous Rampage',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '22_3',
        name: 'Gold Dust',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '22_4',
        name: 'Unflinching',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 23,
    name: 'Danfel',
    category: 'infantry',
    image: HERO_PLACEHOLDER,
    description: 'Danfel is a legendary infantry hero from the League of Order faction, specializing in shielding allies and reducing incoming damage.',
    abilities: [
      {
        id: '23_1',
        name: 'Shield Strike',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '23_2',
        name: 'Greymar\'s Aegis',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '23_3',
        name: 'Brothers in Arms',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '23_4',
        name: 'Halfling Fury',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 24,
    name: 'Garwood',
    category: 'infantry',
    image: HERO_PLACEHOLDER,
    description: 'Garwood is a legendary infantry hero from the Springwardens faction, renowned for his exceptional healing abilities and defensive capabilities.',
    abilities: [
      {
        id: '24_1',
        name: 'Revitalizing Rune',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '24_2',
        name: 'Tempered Bark',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '24_3',
        name: 'Call of the Ancient Tree',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '24_4',
        name: 'Thistles and Thorns',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 25,
    name: 'Nika',
    category: 'infantry',
    image: HERO_PLACEHOLDER,
    description: 'Nika is a legendary infantry hero from the League of Order faction, excelling in counterattack damage and battlefield control.',
    abilities: [
      {
        id: '25_1',
        name: 'Shimmerstrike',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '25_2',
        name: 'Assassin\'s Covenant',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '25_3',
        name: 'Night Prowler',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '25_4',
        name: 'Blade Maelstrom',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 26,
    name: 'Madeline',
    category: 'infantry',
    image: HERO_PLACEHOLDER,
    description: 'Madeline is a legendary infantry hero from the League of Order faction, known for her robust defense and ability to shield allies.',
    abilities: [
      {
        id: '26_1',
        name: 'Blessed Blade',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '26_2',
        name: 'Glorious Bloodline',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '26_3',
        name: 'Steel Sentinel',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '26_4',
        name: 'Piercing Gaze',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 27,
    name: 'Bakhar',
    category: 'infantry',
    image: HERO_PLACEHOLDER,
    description: 'Bakhar is an epic infantry hero from the Wilderburg faction, specializing in garrison defense and counterattack strategies.',
    abilities: [
      {
        id: '27_1',
        name: 'Grayclaw Fury',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '27_2',
        name: 'Boiling Blood',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '27_3',
        name: 'Fearsome Roar',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '27_4',
        name: 'Tireless Will',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 28,
    name: 'Naernin',
    category: 'infantry',
    image: HERO_PLACEHOLDER,
    description: 'Naernin is a legendary infantry hero from the Springwardens faction, adept at gathering and supporting allied units.',
    abilities: [
      {
        id: '28_1',
        name: 'Black Claw',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '28_2',
        name: 'Druidic Teachings',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '28_3',
        name: 'Feline Instincts',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '28_4',
        name: 'Shadow Ambush',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 29,
    name: 'Neya',
    category: 'cavalry',
    image: HERO_PLACEHOLDER,
    description: 'Neya is a legendary cavalry hero from the Springwardens faction, known for her stealth tactics and rapid strikes.',
    abilities: [
      {
        id: '29_1',
        name: 'Spearhead',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '29_2',
        name: 'Moonlight Blessing',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '29_3',
        name: 'Frontline Commander',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '29_4',
        name: 'Relentless Advance',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 30,
    name: 'Lieh-Shan-Yen',
    category: 'cavalry',
    image: HERO_PLACEHOLDER,
    description: 'Lieh-Shan-Yen is a legendary cavalry hero from the League of Order faction, excelling in swift movements and precise attacks.',
    abilities: [
      {
        id: '30_1',
        name: 'Scarlet Inferno',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '30_2',
        name: 'Lieh-Shan\'s Command',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '30_3',
        name: 'Stars Aligned',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '30_4',
        name: 'Ironclad Defense',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 31,
    name: 'Tobin',
    category: 'cavalry',
    image: HERO_PLACEHOLDER,
    description: 'Tobin is a legendary cavalry hero from the League of Order faction, known for his defensive prowess and rally leadership.',
    abilities: [
      {
        id: '31_1',
        name: 'EOS',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '31_2',
        name: 'Light of the Tower',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '31_3',
        name: 'Oath of the Heart',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '31_4',
        name: 'All-Piercing Light',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 32,
    name: 'Urag',
    category: 'cavalry',
    image: HERO_PLACEHOLDER,
    description: 'Urag is a legendary cavalry hero from the Wilderburg faction, specializing in rapid assaults and debuffing enemies.',
    abilities: [
      {
        id: '32_1',
        name: 'Lead the Charge',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '32_2',
        name: 'Wolf Lord\'s Will',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '32_3',
        name: 'Forever Onwards',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '32_4',
        name: 'Fearsome Flail',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 33,
    name: 'Theodore',
    category: 'cavalry',
    image: HERO_PLACEHOLDER,
    description: 'Theodore is a legendary cavalry hero from the League of Order faction, excelling in garrison defense and skill-based attacks.',
    abilities: [
      {
        id: '33_1',
        name: 'Shadowed Spite',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '33_2',
        name: 'Traitor\'s Ambition',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '33_3',
        name: 'Royal Writ',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '33_4',
        name: 'Coup de Grace',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 34,
    name: 'Forondil',
    category: 'cavalry',
    image: HERO_PLACEHOLDER,
    description: 'Forondil is a legendary cavalry hero from the Springwardens faction, known for his flying units and control abilities.',
    abilities: [
      {
        id: '34_1',
        name: 'Shattering Screech',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '34_2',
        name: 'Death From Above',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '34_3',
        name: 'Song of Swiftness',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '34_4',
        name: 'Aiming High',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 35,
    name: 'Emrys',
    category: 'cavalry',
    image: HERO_PLACEHOLDER,
    description: 'Emrys is a legendary cavalry hero from the Springwardens faction, specializing in high burst damage and mobility.',
    abilities: [
      {
        id: '35_1',
        name: 'Shattering Blow',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '35_2',
        name: 'Watcher\'s Blade',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '35_3',
        name: 'Penumbra',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '35_4',
        name: 'Shadow Raid',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 36,
    name: 'Bakshi',
    category: 'cavalry',
    image: HERO_PLACEHOLDER,
    description: 'Bakshi is a legendary cavalry hero from the Wilderburg faction, known for his rage generation and survivability.',
    abilities: [
      {
        id: '36_1',
        name: 'Wolf-Spirit Binds',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '36_2',
        name: 'Sense Weakness',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '36_3',
        name: 'Quickened Blood',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '36_4',
        name: 'Shaman\'s Call',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 37,
    name: 'Alistair',
    category: 'cavalry',
    image: HERO_PLACEHOLDER,
    description: 'Alistair is an epic cavalry hero from the Springwardens faction, providing area-of-effect damage and cavalry buffs.',
    abilities: [
      {
        id: '37_1',
        name: 'Spear of Judgement',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '37_2',
        name: 'Devotion',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '37_3',
        name: 'Hold the Line',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '37_4',
        name: 'Light of Sorland',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 38,
    name: 'Hosk',
    category: 'overall',
    image: HERO_PLACEHOLDER,
    description: 'Hosk is a legendary hero from the Wilderburg faction, known for his rally leadership and enhancing legion capabilities.',
    abilities: [
      {
        id: '38_1',
        name: 'No Quarter',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '38_2',
        name: 'A Dream of Peace',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '38_3',
        name: 'Battle-Scarred',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '38_4',
        name: 'Plateau Tactics',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 39,
    name: 'Theia',
    category: 'overall',
    image: HERO_PLACEHOLDER,
    description: 'Theia is a legendary hero from the League of Order faction, excelling in providing shields and enhancing skill damage.',
    abilities: [
      {
        id: '39_1',
        name: 'Arbiter\'s Ward',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '39_2',
        name: 'Oracle\'s Grace',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '39_3',
        name: 'Purging Wind',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '39_4',
        name: 'Lex Lucis',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 40,
    name: 'Mu Hsiang',
    category: 'overall',
    image: HERO_PLACEHOLDER,
    description: 'Mu Hsiang is a legendary support hero from the League of Order faction, specializing in healing and damage mitigation.',
    abilities: [
      {
        id: '40_1',
        name: 'Demon Tamer Fan',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '40_2',
        name: 'Miracle Cure',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '40_3',
        name: 'Food as Medicine',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '40_4',
        name: 'Field Surgery',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 41,
    name: 'Bahorn',
    category: 'overall',
    image: HERO_PLACEHOLDER,
    description: 'Bahorn is a legendary hero from the Wilderburg faction, known for his area-of-effect damage and enhancing flying legions.',
    abilities: [
      {
        id: '41_1',
        name: 'Exhaust Fumes',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '41_2',
        name: 'Mechanized Army',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '41_3',
        name: 'Chief Machinist',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '41_4',
        name: 'Just You Wait',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 42,
    name: 'Indis',
    category: 'overall',
    image: HERO_PLACEHOLDER,
    description: 'Indis is a legendary hero from the Springwardens faction, offering defensive buffs and healing to her legions.',
    abilities: [
      {
        id: '42_1',
        name: 'Axiom of Glory',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '42_2',
        name: 'Earthen Balance',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '42_3',
        name: 'Rejuvenating Blessing',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '42_4',
        name: 'Purge',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 43,
    name: 'Eliana',
    category: 'overall',
    image: HERO_PLACEHOLDER,
    description: 'Eliana is an epic hero from the League of Order faction, providing shields and healing to support her allies.',
    abilities: [
      {
        id: '43_1',
        name: 'Benediction of Aurora',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '43_2',
        name: 'Purifying Touch',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '43_3',
        name: 'Leosa\'s Brilliance',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '43_4',
        name: 'Holy Heart',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 44,
    name: 'Tarra',
    category: 'overall',
    image: HERO_PLACEHOLDER,
    description: 'Tarra is an epic hero from the League of Order faction, excelling in support roles with her healing and buffing abilities.',
    abilities: [
      {
        id: '44_1',
        name: 'Healing Devotion',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '44_2',
        name: 'Enlightenment',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '44_3',
        name: 'Gatherer and Provider',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '44_4',
        name: 'Gilda\'s Blessing',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 45,
    name: 'Pan',
    category: 'overall',
    image: HERO_PLACEHOLDER,
    description: 'Pan is an epic hero from the Wilderburg faction, known for her gathering efficiency and healing support.',
    abilities: [
      {
        id: '45_1',
        name: 'Foremother\'s Blessing',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '45_2',
        name: 'Secret of the Trees',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '45_3',
        name: 'Song of Protection',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '45_4',
        name: 'Dream Omen',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  }
]; 
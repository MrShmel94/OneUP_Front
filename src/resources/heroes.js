const HERO_PLACEHOLDER = '/images/heroes/placeholder.png';

export const heroCategories = [
  { id: 'overal', name: 'Overal' },
  { id: 'mage', name: 'Mage' },
  { id: 'archer', name: 'Archer' },
  { id: 'cavalry', name: 'Cavalry' },
  { id: 'infantry', name: 'Infantry' }
];

export const heroes = [
  {
    id: 1,
    name: 'Atheus',
    category: 'overal',
    image: HERO_PLACEHOLDER,
    description: 'Master of arcane arts, wielding powerful elemental magic.',
    abilities: [
      {
        id: '1_1',
        name: 'Arcane Blast',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '1_2',
        name: 'Elemental Shield',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 2,
    name: 'Lilith',
    category: 'overal',
    image: HERO_PLACEHOLDER,
    description: 'Deadly archer with unmatched precision and speed.',
    abilities: [
      {
        id: '2_1',
        name: 'Precision Shot',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '2_2',
        name: 'Rapid Fire',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 3,
    name: 'Gwalchmai',
    category: 'overal',
    image: HERO_PLACEHOLDER,
    description: 'Swift cavalry commander with exceptional mobility.',
    abilities: [
      {
        id: '3_1',
        name: 'Charge',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '3_2',
        name: 'Swift Strike',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 4,
    name: 'Theoden',
    category: 'overal',
    image: HERO_PLACEHOLDER,
    description: 'Stalwart infantry leader with unmatched defensive capabilities.',
    abilities: [
      {
        id: '4_1',
        name: 'Shield Wall',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '4_2',
        name: 'Battle Cry',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 5,
    name: 'Liliya',
    category: 'mage',
    image: HERO_PLACEHOLDER,
    description: 'Liliya is a legendary mage from the League of Order faction, renowned for her devastating area-of-effect (AoE) fire magic. Specializing in magic, peacekeeping, and skill talents, she excels in both PvE and PvP scenarios, making her a versatile and powerful hero on the battlefield. ',
    abilities: [
      {
        id: '2_1',
        name: 'Flames of Vengeance',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '2_2',
        name: 'Dazzling Inferno',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '2_3',
        name: 'Deep Burn',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '2_4',
        name: 'Witchy Wiles',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 6,
    name: 'Hosk',
    category: 'overall',
    image: HERO_PLACEHOLDER,
    description: 'Hosk is a legendary hero from the Wilderburg faction, renowned for his exceptional rallying capabilities and precision. With talents in overall leadership, rallying, and precision, he excels in orchestrating powerful attacks against formidable foes. His skills enhance legion capacity and damage output, making him a top-tier choice for players focusing on large-scale battles.',
    abilities: [
      {
        id: '3_1',
        name: 'Rallying Cry',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '3_2',
        name: 'Precision Strike',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '3_3',
        name: 'Battlefield Command',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '3_4',
        name: 'Unyielding Spirit',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 7,
    name: 'Bakhar',
    category: 'infantry',
    image: HERO_PLACEHOLDER,
    description: 'Bakhar is an Epic Infantry hero from the Wilderburg faction, known for his resilience and defensive capabilities. Specializing in infantry and garrison roles, he excels in fortifying positions and leading troops with unwavering strength.',
    abilities: [
      {
        id: '4_1',
        name: 'Grayclaw Fury',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '4_2',
        name: 'Boiling Blood',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '4_3',
        name: 'Fearsome Roar',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '4_4',
        name: 'Tireless Will',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 8,
    name: 'Alistair',
    category: 'cavalry',
    image: HERO_PLACEHOLDER,
    description: 'Alistair is an Epic Cavalry hero from the League of Order faction, distinguished by his area-of-effect damage and tanking abilities. With talents in cavalry, rallying, and tanking, he is a reliable choice for leading swift and powerful charges.',
    abilities: [
      {
        id: '5_1',
        name: 'Spear of Judgement',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '5_2',
        name: 'Devotion',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '5_3',
        name: 'Hold the Line',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '5_4',
        name: 'Light of Sorland',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  },
  {
    id: 9,
    name: 'Indis',
    category: 'overall',
    image: HERO_PLACEHOLDER,
    description: 'Indis is a Legendary hero from the Springwardens faction, revered for her exceptional support abilities. Specializing in overall leadership, she enhances her legions with healing, defense boosts, and debuff cleansing, making her invaluable in prolonged engagements.',
    abilities: [
      {
        id: '6_1',
        name: 'Axiom of Glory',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '6_2',
        name: 'Earthen Balance',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '6_3',
        name: 'Rejuvenating Blessing',
        currentLevel: 0,
        maxLevel: 5
      },
      {
        id: '6_4',
        name: 'Indis Purge',
        currentLevel: 0,
        maxLevel: 5
      }
    ]
  }
]; 
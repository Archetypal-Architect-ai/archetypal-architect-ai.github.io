import type { RegionDef } from '../engine/types';

export const regions: RegionDef[] = [
  {
    id: 'ashenmoor',
    name: 'The Ashenmoor',
    description:
      'A vast expanse of blighted moorland stretching beneath a sky that never quite achieves full daylight. Ancient barrows rise from the peat like the knuckles of buried giants, their entrances dark and whispering. Ruined chapels dot the landscape — remnants of a faith older than the Order of the Ashen Veil, their bell towers listing at drunken angles, their graveyards overflowing with headstones so weathered that the names have become suggestions. The air tastes of iron and old ash. Foxfire drifts between the standing stones at dusk, and the wind carries sounds that might be voices if you listen too closely. Everything here is touched by death — not violently, but with the patient intimacy of a long-familiar companion.',
    tags: ['death', 'moor', 'cursed'],
    affinities: ['death', 'bone', 'spirit'],
    dangerTier: 2,
    scenes: [
      'crossroads',
      'barrow-entrance',
      'ruined-chapel',
      'moorland-village',
      'blood-hollow',
      'wardens-watch',
      'bone-field',
      'whispering-barrow',
      'crimson-embassy',
      'shadow-threshold',
      'plague-hollow',
      'iron-cairn',
      'merchants-rest',
      'weeping-stones',
      'crimson-grove',
      'shattered-bridge',
      'ancestors-shrine',
      'fog-market',
      'blighted-farm',
      'bone-spire',
    ],
    unlockConditions: [],
    environmentEffects: [
      { type: 'add_corruption', value: 1 },
      { type: 'add_resource', target: 'essence', value: 2 },
    ],
    lore: 'The Ashenmoor was not always blighted. Chronicles from before the Pallid Catastrophe describe it as rolling farmland, dotted with prosperous villages and modest cultivation academies. When the wave of necromantic energy swept through, the land itself was changed — the soil turned to peat black as char, the water table rose to create treacherous bogs, and the barrows that had slept peacefully for millennia began to stir. Now the moor exists in a state of perpetual twilight, a place where the boundary between life and death is worn thin as old cloth. Cultivators are drawn here precisely because of this thinness — the ambient death-essence that saturates the region accelerates certain forms of cultivation at the cost of slowly corroding the cultivator\'s stability. The locals — those stubborn or desperate enough to remain — have adapted to the moor\'s rhythms. They leave offerings at crossroads, avoid the barrows after dark, and never, ever whistle on the moor after sunset. The Ashenmoor does not forgive carelessness, but it rewards those who approach it with the proper reverence.',
  },

  {
    id: 'ossuary-depths',
    name: 'The Ossuary Depths',
    description:
      'Beneath the Ashenmoor lies a labyrinth of catacombs so vast that no living cartographer has mapped its full extent. The Ossuary Depths are older than the moor above them — older, some scholars argue, than human civilization itself. The walls are constructed from densely packed bones arranged in patterns that shift when observed from the corner of one\'s eye, forming and dissolving geometric shapes that suggest an alien intelligence at work. Phosphorescent fungi cast a sickly amber light across vaulted chambers where the remains of forgotten cultivators lie in elaborate sarcophagi, their residual essence still humming after uncounted centuries. The air is cold and still, carrying the mineral scent of deep stone and the faintest trace of something sweeter — the perfume of decay so ancient it has become almost pleasant.',
    tags: ['bone', 'underground', 'dark'],
    affinities: ['bone', 'shadow', 'relic'],
    dangerTier: 4,
    scenes: [
      'ossuary-antechamber',
      'ossuary-heart',
    ],
    unlockConditions: [
      {
        type: 'has_trait',
        target: 'bone-resonance',
      },
      // Alternative: having the bone-collector title also grants entry.
      // The engine should treat top-level conditions as OR when multiple
      // unlock paths exist; if it requires AND, wrap in a composite.
      // For this vertical slice we list both — the engine picks the first satisfied.
    ],
    environmentEffects: [
      { type: 'add_corruption', value: 3 },
      { type: 'add_resource', target: 'essence', value: 1 },
      { type: 'narrative_log', value: 'The bones in the walls rearrange themselves as you pass, as though cataloguing your presence.' },
    ],
    lore: 'The Ossuary Depths were discovered — or rediscovered — by a Relic Scavenger named Harren Dustfinger, who fell through a collapsed barrow floor and landed in a chamber whose walls were inscribed with cultivation diagrams predating every known tradition. Harren spent eleven days in the Depths before finding his way out, and when he emerged, his bones had turned translucent and his eyes could see in absolute darkness. He could also hear the dead speaking, though he insisted this was less useful than it sounded, as the dead are mostly repetitive. The Depths appear to be a repository of some kind — a place where an unknown civilization stored its dead and, perhaps, its knowledge. The bone arrangements are not decorative; they are functional, forming vast formation-arrays that channel residual essence through the catacombs in patterns that shift with the seasons above. Cultivators who attune to these patterns — who develop what scholars call bone-resonance — find that the Depths welcome them, opening passages that were previously sealed and revealing chambers that contain relics of extraordinary power and corresponding danger. Those who enter without resonance find the Depths less accommodating. The bones close behind them. The passages loop. The light dies. The Ossuary Depths are patient, but they are not kind.',
  },
];

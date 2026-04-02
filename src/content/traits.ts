import type { TraitDef } from '../engine/types';

export const traits: TraitDef[] = [
  // ── Permanent / Origin Traits ──────────────────────────────────────────

  {
    id: 'death-touched',
    name: 'Death-Touched',
    description: 'Attuned to death energy. The boundary between living and dead feels thin around you.',
    tags: ['death', 'attunement'],
    permanent: true,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'essence',
        value: 2,
      },
    ],
    conditions: [],
    lore: 'Some are born with one foot in the grave. They do not fear the dark — the dark knows their name.',
  },

  {
    id: 'noble-blood',
    name: 'Noble Blood',
    description:
      'Latent blood power flows through your veins, a heritage of sanguine cultivation.',
    tags: ['blood', 'noble', 'heritage'],
    permanent: true,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'reputation',
        value: 1,
      },
    ],
    conditions: [],
    lore: 'The old bloodlines carry more than memory. Each pulse is a whisper of the ancestors who refined themselves into something more.',
  },

  {
    id: 'oathbound',
    name: 'Oathbound',
    description:
      'Sworn to ancient vows that bind your cultivation. Stability is bolstered, but corruption finds less purchase.',
    tags: ['oath', 'binding', 'iron'],
    permanent: true,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'stability',
        value: 3,
      },
    ],
    conditions: [],
    mutations: [
      {
        targetTraitId: 'oath-scarred',
        conditions: [
          { type: 'min_resource', target: 'corruption', value: 50 },
          { type: 'world_flag', target: 'oath_broken', value: 'true' },
        ],
        description:
          'When sacred vows are shattered, the oaths scar the soul rather than fortify it.',
      },
    ],
    lore: 'The First Wardens swore oaths so deep they became part of the body. Iron words etched into iron bones.',
  },

  {
    id: 'oath-scarred',
    name: 'Oath-Scarred',
    description:
      'Your broken vows have left invisible scars. Stability is weakened, but raw power seeps through the cracks.',
    tags: ['oath', 'scarred', 'corruption'],
    permanent: true,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'stability',
        value: -2,
      },
      {
        type: 'add_resource',
        target: 'essence',
        value: 2,
      },
    ],
    conditions: [
      { type: 'has_trait', target: 'oathbound' },
      { type: 'world_flag', target: 'oath_broken', value: 'true' },
    ],
    lore: 'A broken oath does not simply vanish. It festers, it twists, it becomes something else entirely.',
  },

  {
    id: 'tomb-sense',
    name: 'Tomb Sense',
    description:
      'An instinct for buried things — hidden chambers, sealed graves, forgotten relics.',
    tags: ['death', 'perception', 'exploration'],
    permanent: true,
    passiveEffects: [
      {
        type: 'narrative_log',
        value: 'Your tomb sense tingles — something is buried nearby.',
      },
    ],
    conditions: [],
    lore: 'The earth speaks to those who listen with the right kind of silence.',
  },

  {
    id: 'corpse-pale',
    name: 'Corpse Pale',
    description:
      'Your skin has taken on a deathly pallor. The living recoil; the undead regard you as kin.',
    tags: ['undead', 'visible', 'death'],
    permanent: true,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'reputation',
        value: -2,
      },
    ],
    conditions: [],
    lore: 'Color drains from the flesh when one lingers too long among the tombs. It never comes back.',
  },

  // ── Gained Traits (Cultivation Progress) ───────────────────────────────

  {
    id: 'blood-awakened',
    name: 'Blood Awakened',
    description:
      'Blood cultivation is active — your sanguine methods are enhanced and blood techniques cost less.',
    tags: ['blood', 'cultivation', 'awakening'],
    permanent: false,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'essence',
        value: 1,
      },
    ],
    conditions: [
      { type: 'has_path', target: 'path_blood_sovereignty' },
      { type: 'min_rank', value: 2 },
    ],
    lore: 'The blood remembers what the mind forgets. Once awakened, it hungers.',
  },

  {
    id: 'bone-resonance',
    name: 'Bone Resonance',
    description:
      'Your bones vibrate with accumulated power. Bone methods are enhanced.',
    tags: ['bone', 'resonance', 'cultivation'],
    permanent: false,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'stability',
        value: 2,
      },
    ],
    conditions: [
      { type: 'min_method_mastery', target: 'ossuary-meditation', value: 5 },
    ],
    lore: 'Deep in the ossuary, the bones of saints sing. Those who master the meditation learn to sing back.',
  },

  {
    id: 'spirit-sight',
    name: 'Spirit Sight',
    description:
      'You can perceive the dead and other spirits invisible to mortal eyes.',
    tags: ['spirit', 'perception', 'death'],
    permanent: false,
    passiveEffects: [
      {
        type: 'narrative_log',
        value: 'Ghostly shapes flicker at the edge of your vision — the dead are near.',
      },
    ],
    conditions: [
      { type: 'min_method_mastery', target: 'spirit-communion', value: 5 },
    ],
    lore: 'The veil is not a wall. It is a curtain, and some learn to draw it aside.',
  },

  {
    id: 'iron-constitution',
    name: 'Iron Constitution',
    description:
      'Your body has been hardened by the weight of oaths. Maximum vitality is increased.',
    tags: ['oath', 'iron', 'body'],
    permanent: false,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'maxVitality',
        value: 20,
      },
    ],
    conditions: [
      { type: 'has_method', target: 'oath-tempering' },
      { type: 'min_method_mastery', target: 'oath-tempering', value: 3 },
    ],
    lore: 'Flesh becomes as iron when conviction runs deep enough. The Wardens knew this well.',
  },

  {
    id: 'shadow-touched',
    name: 'Shadow Touched',
    description:
      'Part of you exists in the shadow realm. You flicker between worlds.',
    tags: ['shadow', 'liminal', 'stealth'],
    permanent: false,
    passiveEffects: [
      {
        type: 'narrative_log',
        value: 'Shadows bend toward you, as though drawn by invisible threads.',
      },
    ],
    conditions: [
      { type: 'min_method_mastery', target: 'shadow-walk', value: 5 },
    ],
    lore: 'Walk too long in shadow and shadow walks in you.',
  },

  {
    id: 'corruption-scarred',
    name: 'Corruption Scarred',
    description:
      'Marked by prolonged exposure to corruption. The scars are visible and disturbing.',
    tags: ['corruption', 'visible', 'scarred'],
    permanent: false,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'reputation',
        value: -1,
      },
    ],
    conditions: [
      { type: 'min_resource', target: 'corruption', value: 40 },
    ],
    mutations: [
      {
        targetTraitId: 'corruption-embraced',
        conditions: [
          { type: 'min_resource', target: 'corruption', value: 80 },
          { type: 'world_flag', target: 'embraced_corruption', value: 'true' },
        ],
        description:
          'When corruption is not merely endured but welcomed, the scars bloom into something darker.',
      },
    ],
    lore: 'Corruption leaves its mark on everything it touches. Some marks go deeper than skin.',
  },

  {
    id: 'corruption-embraced',
    name: 'Corruption Embraced',
    description:
      'You have welcomed corruption into your cultivation. Power flows freely, but at terrible cost.',
    tags: ['corruption', 'dark', 'power'],
    permanent: false,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'essence',
        value: 5,
      },
      {
        type: 'add_resource',
        target: 'stability',
        value: -3,
      },
    ],
    conditions: [
      { type: 'has_trait', target: 'corruption-scarred' },
      { type: 'min_resource', target: 'corruption', value: 80 },
    ],
    lore: 'There is a moment when resistance becomes acceptance, and acceptance becomes hunger.',
  },

  {
    id: 'relic-bonded',
    name: 'Relic Bonded',
    description:
      'You are attuned to an ancient artifact. Equipped relics resonate more powerfully with you.',
    tags: ['relic', 'bond', 'attunement'],
    permanent: false,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'focus',
        value: 2,
      },
    ],
    conditions: [
      { type: 'has_tag', target: 'relic_attuned' },
    ],
    lore: 'Relics choose their bearers as much as bearers choose their relics. The bond is mutual.',
  },

  {
    id: 'dread-aura',
    name: 'Dread Aura',
    description:
      'You passively emanate an aura of dread. Others feel uneasy in your presence.',
    tags: ['fear', 'aura', 'social'],
    permanent: false,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'reputation',
        value: -1,
      },
      {
        type: 'add_resource',
        target: 'momentum',
        value: 1,
      },
    ],
    conditions: [
      { type: 'min_resource', target: 'dread', value: 30 },
    ],
    lore: 'Fear is a weapon that needs no edge. It cuts without being drawn.',
  },

  {
    id: 'grave-blessed',
    name: 'Grave Blessed',
    description:
      'The dead have bestowed their blessing upon you. A rare mark of sanctified death cultivation.',
    tags: ['death', 'sanctity', 'blessing'],
    permanent: false,
    passiveEffects: [
      {
        type: 'add_resource',
        target: 'essence',
        value: 3,
      },
      {
        type: 'add_resource',
        target: 'stability',
        value: 2,
      },
    ],
    conditions: [
      { type: 'has_path', target: 'path_grave_saint' },
      { type: 'min_rank', value: 4 },
      { type: 'min_resource', target: 'sanctity', value: 50 },
    ],
    lore: 'To be blessed by the dead is to carry their silence like armor. It is the rarest gift of the Grave Saints.',
  },
];

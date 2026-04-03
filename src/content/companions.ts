import type { CompanionDef } from '../engine/types';

export const companions: CompanionDef[] = [
  {
    id: 'bone-familiar',
    name: 'Bone Familiar',
    description: 'A small construct of animated bones — a ribcage that walks on finger-bone legs, its eye sockets glowing with faint spirit-light. It clicks and rattles as it moves, cataloguing the dead with an archivist\'s obsession.',
    tags: ['bone', 'construct', 'death'],
    affinities: ['bone', 'death'],
    passiveEffects: [
      { type: 'add_resource', target: 'focus', value: 3 },
    ],
    conditions: [
      { type: 'has_method', target: 'bone-shaping' },
      { type: 'min_rank', value: 2 },
    ],
    growthStages: [
      {
        stage: 1,
        name: 'Bone Sprite',
        description: 'A fragile construct that follows you, clicking curiously at remains.',
        conditions: [],
        effects: [{ type: 'add_resource', target: 'focus', value: 2 }],
      },
      {
        stage: 2,
        name: 'Ossuary Attendant',
        description: 'The familiar grows larger, incorporating new bones. It can now carry small items and sense buried remains.',
        conditions: [{ type: 'min_method_mastery', target: 'bone-shaping', value: 3 }],
        effects: [{ type: 'add_resource', target: 'focus', value: 3 }, { type: 'set_world_flag', target: 'familiar-detects-bones', value: true }],
      },
      {
        stage: 3,
        name: 'Bone Revenant',
        description: 'A towering construct of interlocked bones that fights alongside you. Its eye sockets blaze with pale fire.',
        conditions: [{ type: 'min_rank', value: 3 }],
        effects: [{ type: 'add_resource', target: 'focus', value: 5 }, { type: 'add_resource', target: 'momentum', value: 3 }],
      },
    ],
    lore: 'The first bone familiar was created by accident — a student of ossuary meditation left a half-finished construct near a spirit well, and it stood up on its own. Since then, bone cultivators have learned that with the right arrangement, bones remember how to live. The familiar is not truly alive, but it is not merely a tool either. It learns. It remembers. And sometimes, late at night, it arranges the bones of the dead into patterns that no one taught it.',
  },
  {
    id: 'spirit-wisp',
    name: 'Spirit Wisp',
    description: 'A luminous fragment of a departed spirit, bound not by force but by mutual agreement. It drifts at your shoulder like a cold candle flame, whispering warnings in a language that sounds like wind through hollow bones.',
    tags: ['spirit', 'light', 'guide'],
    affinities: ['spirit', 'death'],
    passiveEffects: [
      { type: 'add_resource', target: 'essence', value: 2 },
    ],
    conditions: [
      { type: 'has_method', target: 'spirit-communion' },
    ],
    growthStages: [
      {
        stage: 1,
        name: 'Flickering Wisp',
        description: 'A faint light that sometimes whispers useful things.',
        conditions: [],
        effects: [{ type: 'add_resource', target: 'essence', value: 1 }],
      },
      {
        stage: 2,
        name: 'Guiding Flame',
        description: 'The wisp grows brighter and more articulate. It can now warn you of dangers and reveal hidden paths.',
        conditions: [{ type: 'min_method_mastery', target: 'spirit-communion', value: 3 }],
        effects: [{ type: 'add_resource', target: 'essence', value: 2 }, { type: 'set_world_flag', target: 'wisp-reveals-hidden', value: true }],
      },
      {
        stage: 3,
        name: 'Ancestor Lantern',
        description: 'The wisp has absorbed enough spiritual energy to manifest as a small lantern of ghostly fire. It speaks clearly and can interact with other spirits on your behalf.',
        conditions: [{ type: 'has_trait', target: 'spirit-sight' }],
        effects: [{ type: 'add_resource', target: 'essence', value: 3 }, { type: 'add_resource', target: 'focus', value: 2 }],
      },
    ],
    lore: 'Not all spirits want to move on. Some linger because they have unfinished business. Others linger because they are curious about the living. A spirit wisp is one of the latter — a fragment of someone who died with questions unanswered. By bonding with a cultivator, the wisp gets to keep asking those questions. In return, it shares what the dead know, which is considerably more than the living suspect.',
  },
  {
    id: 'blood-hound',
    name: 'Blood Hound',
    description: 'A beast that looks almost like a wolf, except for the too-many teeth, the eyes that glow like coals, and the way it seems to drink the scent of blood from the air like wine. It found you. Not the other way around.',
    tags: ['blood', 'beast', 'hunter'],
    affinities: ['blood', 'beast'],
    passiveEffects: [
      { type: 'add_resource', target: 'momentum', value: 3 },
    ],
    conditions: [
      { type: 'has_tag', target: 'blood' },
      { type: 'world_flag', target: 'blood-hound-encountered' },
    ],
    growthStages: [
      {
        stage: 1,
        name: 'Blood Pup',
        description: 'It follows you at a distance, watching. Learning your scent.',
        conditions: [],
        effects: [{ type: 'add_resource', target: 'momentum', value: 2 }],
      },
      {
        stage: 2,
        name: 'Crimson Hunter',
        description: 'The hound has accepted you as pack leader. It hunts at your side, bringing you prey and materials.',
        conditions: [{ type: 'min_rank', value: 2 }],
        effects: [{ type: 'add_resource', target: 'momentum', value: 3 }, { type: 'add_resource', target: 'vitality', value: 2 }],
      },
      {
        stage: 3,
        name: 'Sanguine Alpha',
        description: 'The hound has grown immense, its blood cultivation mirroring your own. It can track anything that bleeds across any distance.',
        conditions: [{ type: 'min_rank', value: 3 }, { type: 'has_trait', target: 'blood-awakened' }],
        effects: [{ type: 'add_resource', target: 'momentum', value: 5 }, { type: 'set_world_flag', target: 'blood-tracking-active', value: true }],
      },
    ],
    lore: 'Blood hounds are not natural animals. They are what happens when a beast lives too long near a blood cultivator\'s practice ground and begins to change. The old texts call them sympathetic mutations — creatures that evolve in response to ambient cultivation energy. A blood hound does not merely smell blood; it understands blood the way a sommelier understands wine. It knows your health, your power, your lineage, and your intent, all from a single sniff. They are loyal to those whose blood sings loudest.',
  },
  {
    id: 'iron-sentinel',
    name: 'Iron Sentinel',
    description: 'A small iron automaton, roughly the size of a cat, forged from oath-tempered metal and animated by the weight of broken promises. It stands guard while you sleep and never blinks.',
    tags: ['iron', 'construct', 'guard'],
    affinities: ['iron', 'oath'],
    passiveEffects: [
      { type: 'add_stability', value: 3 },
    ],
    conditions: [
      { type: 'has_trait', target: 'oathbound' },
      { type: 'has_method', target: 'oath-tempering' },
    ],
    growthStages: [
      {
        stage: 1,
        name: 'Iron Watchling',
        description: 'A small sentinel that watches and warns.',
        conditions: [],
        effects: [{ type: 'add_stability', value: 2 }],
      },
      {
        stage: 2,
        name: 'Oath Guardian',
        description: 'The sentinel grows as you swear more oaths, becoming a formidable protector.',
        conditions: [{ type: 'min_rank', value: 3 }],
        effects: [{ type: 'add_stability', value: 5 }, { type: 'add_resource', target: 'maxStability', value: 5 }],
      },
    ],
    lore: 'The Covenant of Unbroken Words once had entire legions of iron sentinels guarding their fortress-monastery. When the Covenant fell, most of the sentinels went dormant. But the metal remembers. An oathbound cultivator who knows the old tempering techniques can sometimes coax a sentinel back to wakefulness. It will follow the oath-keeper until the oath-keeper breaks a vow, at which point the sentinel will leave. Permanently.',
  },
  {
    id: 'shadow-cat',
    name: 'Shadow Cat',
    description: 'A creature that might be a cat if cats were made of concentrated darkness and disdain. It appears and disappears without warning, purrs like distant thunder, and occasionally deposits dead things from other dimensions at your feet.',
    tags: ['shadow', 'beast', 'stealth'],
    affinities: ['shadow', 'liminal'],
    passiveEffects: [
      { type: 'add_resource', target: 'essence', value: 2 },
    ],
    conditions: [
      { type: 'has_trait', target: 'shadow-touched' },
    ],
    growthStages: [
      {
        stage: 1,
        name: 'Shadow Kitten',
        description: 'It watches you from the corners of reality. Sometimes you can feel it rubbing against your ankle even when nothing is there.',
        conditions: [],
        effects: [{ type: 'add_resource', target: 'essence', value: 1 }],
      },
      {
        stage: 2,
        name: 'Penumbral Stalker',
        description: 'The cat has grown, and so has its connection to the shadow realm. It can now guide you through dark places and find hidden passages.',
        conditions: [{ type: 'min_method_mastery', target: 'shadow-walk', value: 3 }],
        effects: [{ type: 'add_resource', target: 'essence', value: 2 }, { type: 'set_world_flag', target: 'shadow-paths-revealed', value: true }],
      },
      {
        stage: 3,
        name: 'Void Panther',
        description: 'A magnificent predator of living darkness. It can swallow light, walk between worlds, and is absolutely not interested in being petted.',
        conditions: [{ type: 'min_rank', value: 3 }],
        effects: [{ type: 'add_resource', target: 'essence', value: 4 }, { type: 'add_resource', target: 'momentum', value: 3 }],
      },
    ],
    lore: 'Shadow cats are not from this reality. They are from the place behind shadows, the world that exists when no one is looking. They choose their companions based on criteria that no one has ever successfully identified — shadow attunement helps, but shadow cats have been known to ignore powerful shadow cultivators and bond with children, hermits, and on one memorable occasion, a particularly interesting rock. They are useful, unpredictable, and absolutely convinced of their own superiority.',
  },
];

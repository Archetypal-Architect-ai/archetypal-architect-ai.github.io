import type { ItemDef } from '../engine/types';

export const items: ItemDef[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // RELICS (5) — Unique artifacts of power
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'mourners-lantern',
    name: "Mourner's Lantern",
    description:
      'A lantern that burns with pale ghostfire. It reveals spirits hidden from mortal sight.',
    category: 'relic',
    tags: ['spirit', 'light', 'death', 'perception'],
    affinities: ['spirit', 'death'],
    effects: [
      {
        type: 'add_tag',
        target: 'spirit_sight_active',
      },
      {
        type: 'narrative_log',
        value: 'The lantern flickers — unseen presences are drawn to its cold glow.',
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'off_hand',
    lore: 'Carried by the mourners of the Ashen Procession. The flame was lit at the first funeral and has never gone out.',
  },

  {
    id: 'bloodthorn-crown',
    name: 'Bloodthorn Crown',
    description:
      'A circlet of thorns that drinks the wearer\'s blood. Blood methods gain terrible potency.',
    category: 'relic',
    tags: ['blood', 'domination', 'relic', 'crown'],
    affinities: ['blood', 'domination'],
    effects: [
      {
        type: 'add_resource',
        target: 'essence',
        value: 5,
      },
      {
        type: 'add_resource',
        target: 'vitality',
        value: -3,
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'head',
    lore: 'The Sovereign of Thorns wore this crown for three hundred years. When it was removed, there was nothing left beneath it.',
  },

  {
    id: 'oathchain-first-warden',
    name: 'Oathchain of the First Warden',
    description:
      'Heavy iron links inscribed with primordial oaths. Each link represents a vow that cannot be broken.',
    category: 'relic',
    tags: ['oath', 'iron', 'binding', 'relic'],
    affinities: ['oath', 'iron'],
    effects: [
      {
        type: 'add_resource',
        target: 'stability',
        value: 10,
      },
      {
        type: 'add_resource',
        target: 'momentum',
        value: -2,
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'accessory',
    lore: 'The First Warden forged these links from her own resolve. Each oath added another, until the chain could bind even death.',
  },

  {
    id: 'skull-of-whispers',
    name: 'Skull of Whispers',
    description:
      'An ancient skull that murmurs secrets of the dead. Commune with spirits long departed.',
    category: 'relic',
    tags: ['bone', 'spirit', 'death', 'communion'],
    affinities: ['bone', 'spirit', 'death'],
    effects: [
      {
        type: 'add_tag',
        target: 'communing_with_dead',
      },
      {
        type: 'add_resource',
        target: 'focus',
        value: 3,
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'off_hand',
    lore: 'Whose skull it was is lost to time. But its voice carries the echoes of ten thousand deaths.',
  },

  {
    id: 'shadow-veil',
    name: 'Shadow Veil',
    description:
      'A shroud woven from captured shadows. Wraps the wearer in near-invisibility.',
    category: 'relic',
    tags: ['shadow', 'concealment', 'stealth'],
    affinities: ['shadow', 'liminal'],
    effects: [
      {
        type: 'add_tag',
        target: 'shadow_concealed',
      },
      {
        type: 'add_resource',
        target: 'momentum',
        value: 3,
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'cloak',
    lore: 'Shadow weavers say the veil is not worn — it is inhabited. The shadows within have their own desires.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // IMPLEMENTS (4) — Tools of craft and ritual
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ritual-knife',
    name: 'Ritual Knife',
    description:
      'A curved blade etched with sigils. Essential for blood crafting rituals.',
    category: 'implement',
    tags: ['ritual', 'blood', 'craft', 'blade'],
    affinities: ['blood', 'ritual'],
    effects: [
      {
        type: 'add_tag',
        target: 'blood_crafting_ready',
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'implement',
    lore: 'Every cut is a covenant. The blade knows which wounds seal bargains and which merely bleed.',
  },

  {
    id: 'bone-chisel',
    name: 'Bone Chisel',
    description:
      'A chisel carved from the thighbone of a cultivator. Used in bone shaping and inscription.',
    category: 'implement',
    tags: ['bone', 'craft', 'shaping'],
    affinities: ['bone', 'craft'],
    effects: [
      {
        type: 'add_tag',
        target: 'bone_crafting_ready',
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'implement',
    lore: 'The bone remembers what it was. A good chisel convinces it to become something new.',
  },

  {
    id: 'spirit-bell',
    name: 'Spirit Bell',
    description:
      'A small bell whose tone resonates in the spirit world. Enhances communion with the dead.',
    category: 'implement',
    tags: ['spirit', 'ritual', 'communion', 'sound'],
    affinities: ['spirit', 'ritual'],
    effects: [
      {
        type: 'add_tag',
        target: 'spirit_communion_enhanced',
      },
      {
        type: 'add_resource',
        target: 'focus',
        value: 2,
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'implement',
    lore: 'Ring it once and the living hear a chime. Ring it twice and the dead begin to listen.',
  },

  {
    id: 'rune-stylus',
    name: 'Rune Stylus',
    description:
      'A fine-tipped instrument for inscribing runes onto surfaces and artifacts.',
    category: 'implement',
    tags: ['rune', 'craft', 'inscription'],
    affinities: ['rune', 'craft'],
    effects: [
      {
        type: 'add_tag',
        target: 'rune_crafting_ready',
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'implement',
    lore: 'Runes are older than language. The stylus does not write — it remembers.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // VESTMENTS (3) — Worn garments of power
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'gravecloth-wraps',
    name: 'Gravecloth Wraps',
    description:
      'Wrappings taken from sanctified burial sites. They resist decay and protect against death energy.',
    category: 'vestment',
    tags: ['death', 'defense', 'burial', 'cloth'],
    affinities: ['death', 'defense'],
    effects: [
      {
        type: 'add_resource',
        target: 'maxVitality',
        value: 10,
      },
      {
        type: 'add_resource',
        target: 'stability',
        value: 2,
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'body',
    lore: 'The dead are wrapped in cloth that remembers silence. Wearing it, you carry that silence with you.',
  },

  {
    id: 'blood-soaked-mantle',
    name: 'Blood-Soaked Mantle',
    description:
      'A heavy cloak perpetually damp with blood that never dries. Radiates menace.',
    category: 'vestment',
    tags: ['blood', 'intimidation', 'social'],
    affinities: ['blood', 'intimidation'],
    effects: [
      {
        type: 'add_resource',
        target: 'momentum',
        value: 2,
      },
      {
        type: 'add_resource',
        target: 'reputation',
        value: -1,
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'cloak',
    lore: 'The blood is not the wearer\'s. It is not anyone\'s, anymore. It simply is.',
  },

  {
    id: 'wardens-iron-coat',
    name: "Warden's Iron Coat",
    description:
      'A coat lined with iron threads and inscribed with oaths. Heavy but immensely protective.',
    category: 'vestment',
    tags: ['oath', 'iron', 'defense', 'warden'],
    affinities: ['oath', 'iron', 'defense'],
    effects: [
      {
        type: 'add_resource',
        target: 'maxVitality',
        value: 15,
      },
      {
        type: 'add_resource',
        target: 'stability',
        value: 5,
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'body',
    lore: 'Each Warden forges their own coat. The iron comes from the earth; the oaths come from the heart.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CONSUMABLES (8) — Single-use or limited-use items
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'blood-phial',
    name: 'Blood Phial',
    description:
      'A small vial of refined cultivator blood. Restores essence when consumed.',
    category: 'consumable',
    tags: ['blood', 'essence', 'restoration'],
    affinities: ['blood'],
    effects: [
      {
        type: 'add_resource',
        target: 'essence',
        value: 15,
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'Blood freely given holds more power than blood taken. But both will serve.',
  },

  {
    id: 'bone-dust',
    name: 'Bone Dust',
    description:
      'Powdered remains of the cultivated dead. Useful in crafting and as a cultivation aid.',
    category: 'consumable',
    tags: ['bone', 'craft', 'cultivation'],
    affinities: ['bone', 'death'],
    effects: [
      {
        type: 'add_resource',
        target: 'essence',
        value: 5,
      },
      {
        type: 'add_resource',
        target: 'focus',
        value: 3,
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'What remains when flesh and spirit depart still holds echoes of what was cultivated within.',
  },

  {
    id: 'spirit-candle',
    name: 'Spirit Candle',
    description:
      'A candle of corpse tallow that, when lit, grants temporary sight into the spirit realm.',
    category: 'consumable',
    tags: ['spirit', 'perception', 'temporary'],
    affinities: ['spirit', 'death'],
    effects: [
      {
        type: 'add_tag',
        target: 'spirit_sight_active',
      },
      {
        type: 'narrative_log',
        value: 'The candle sputters to life with a pale flame. The spirit world bleeds through.',
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'The tallow remembers living. The flame remembers dying. Between the two, sight is born.',
  },

  {
    id: 'iron-tonic',
    name: 'Iron Tonic',
    description:
      'A bitter draught infused with grave iron. Restores stability and steadies the mind.',
    category: 'consumable',
    tags: ['iron', 'stability', 'restoration'],
    affinities: ['iron', 'oath'],
    effects: [
      {
        type: 'add_resource',
        target: 'stability',
        value: 15,
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'Iron in the blood, iron in the will. The Wardens drank this before every oath.',
  },

  {
    id: 'memory-leaf',
    name: 'Memory Leaf',
    description:
      'A preserved leaf from the Tree of Recollection. Reveals hidden lore and forgotten truths.',
    category: 'consumable',
    tags: ['lore', 'perception', 'memory'],
    affinities: ['spirit', 'knowledge'],
    effects: [
      {
        type: 'set_world_flag',
        target: 'lore_revealed',
        value: 'true',
      },
      {
        type: 'narrative_log',
        value: 'The leaf crumbles as you press it to your temple. Forgotten knowledge floods in.',
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'The tree grows in the space between memory and forgetting. Its leaves carry what was lost.',
  },

  {
    id: 'corpse-wax',
    name: 'Corpse Wax',
    description:
      'A thick waxy substance rendered from embalmed remains. Seals wounds and restores vitality.',
    category: 'consumable',
    tags: ['death', 'healing', 'restoration'],
    affinities: ['death', 'body'],
    effects: [
      {
        type: 'add_resource',
        target: 'vitality',
        value: 20,
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'The living recoil from its origin. But wounds do not care what heals them.',
  },

  {
    id: 'shadow-ink',
    name: 'Shadow Ink',
    description:
      'Ink distilled from shadow essence. Used in crafting shadow-aspected items and inscriptions.',
    category: 'consumable',
    tags: ['shadow', 'craft', 'inscription'],
    affinities: ['shadow', 'craft'],
    effects: [
      {
        type: 'add_tag',
        target: 'shadow_crafting_ready',
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'It does not reflect light. Words written in shadow ink can only be read in darkness.',
  },

  {
    id: 'oath-stone',
    name: 'Oath Stone',
    description:
      'A smooth stone inscribed with binding runes. Consumed during oath rituals to seal vows.',
    category: 'consumable',
    tags: ['oath', 'ritual', 'binding'],
    affinities: ['oath', 'iron'],
    effects: [
      {
        type: 'add_resource',
        target: 'stability',
        value: 5,
      },
      {
        type: 'add_tag',
        target: 'oath_ritual_active',
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'An oath sworn on stone endures longer than one sworn on breath. The stone remembers even when the speaker forgets.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MATERIALS (8) — Crafting components, all stackable to 99
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'grave-iron',
    name: 'Grave Iron',
    description:
      'Dark metal mined from deep burial sites, saturated with residual death energy.',
    category: 'material',
    tags: ['iron', 'death', 'metal', 'craft'],
    affinities: ['iron', 'death'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'Iron buried with the dead absorbs something from them. Smiths say it rings with a different tone — lower, sadder.',
  },

  {
    id: 'ancient-bone-fragment',
    name: 'Ancient Bone Fragment',
    description:
      'A fragment of bone from remains so old they have begun to crystallize with residual power.',
    category: 'material',
    tags: ['bone', 'death', 'ancient', 'craft'],
    affinities: ['bone', 'death'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'The oldest bones are the strongest. Time does not weaken them — it refines them.',
  },

  {
    id: 'congealed-blood-crystal',
    name: 'Congealed Blood Crystal',
    description:
      'Blood essence that has crystallized under immense spiritual pressure.',
    category: 'material',
    tags: ['blood', 'crystal', 'essence', 'craft'],
    affinities: ['blood', 'cultivation'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'When blood cultivators push beyond their limits, sometimes the excess hardens into crystal. Each one is a frozen scream.',
  },

  {
    id: 'spirit-amber',
    name: 'Spirit Amber',
    description:
      'Solidified ectoplasm, translucent and faintly luminous. Spirits are sometimes visible within.',
    category: 'material',
    tags: ['spirit', 'ectoplasm', 'craft'],
    affinities: ['spirit', 'death'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'Not truly amber, but named for the resemblance. The spirits within are not trapped — they are resting.',
  },

  {
    id: 'void-silk-thread',
    name: 'Void Silk Thread',
    description:
      'Thread spun from fibers harvested in the shadow realm. Absorbs light.',
    category: 'material',
    tags: ['shadow', 'textile', 'liminal', 'craft'],
    affinities: ['shadow', 'craft'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'The shadow realm has its own ecology. The silk comes from creatures that have never known light.',
  },

  {
    id: 'relic-shard',
    name: 'Relic Shard',
    description:
      'A fragment of a shattered artifact. Still thrums with fading power.',
    category: 'material',
    tags: ['relic', 'fragment', 'power', 'craft'],
    affinities: ['relic', 'attunement'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'Even broken, a relic remembers what it was. Skilled crafters can coax that memory into new forms.',
  },

  {
    id: 'sanctified-ash',
    name: 'Sanctified Ash',
    description:
      'Ash from remains that were properly sanctified before cremation. Carries traces of holy power.',
    category: 'material',
    tags: ['death', 'sanctity', 'ash', 'craft'],
    affinities: ['death', 'sanctity'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'The rites of sanctification are nearly lost. Ash prepared in the old way is worth more than gold.',
  },

  {
    id: 'tomb-jade',
    name: 'Tomb Jade',
    description:
      'A deep green stone found only in the most ancient burial chambers, veined with dark energy.',
    category: 'material',
    tags: ['stone', 'death', 'burial', 'craft'],
    affinities: ['death', 'earth'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'Tomb jade forms over centuries in the presence of concentrated death energy. It is cold to the touch, always.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // RELICS (3) — Additional artifacts of power
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'plague-doctors-mask',
    name: "Plague Doctor's Mask",
    description:
      'A beaked mask of lacquered bone and dark leather, fitted with filters of sanctified herb and grave ash. It was worn by cultivators who walked among the dying without fear.',
    category: 'relic',
    tags: ['death', 'disease', 'protection'],
    affinities: ['death', 'disease'],
    effects: [
      {
        type: 'add_corruption',
        value: -2,
      },
      {
        type: 'add_resource',
        target: 'stability',
        value: 3,
      },
      {
        type: 'narrative_log',
        value: 'The mask settles over your face. The air tastes of old herbs and silence. The corruption in the world around you feels distant, muffled.',
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'head',
    lore: 'The Plague Cultivators were not healers. They were students of decay, walking the blighted lands to understand how corruption moves through living systems. Their masks were not protection — they were instruments of observation.',
  },

  {
    id: 'chain-of-binding-oaths',
    name: 'Chain of Binding Oaths',
    description:
      'A heavy chain of interlocking iron links, each inscribed with a different oath in a script that predates written language. It hums with the weight of promises kept.',
    category: 'relic',
    tags: ['oath', 'iron', 'binding'],
    affinities: ['oath', 'iron'],
    effects: [
      {
        type: 'add_resource',
        target: 'stability',
        value: 8,
      },
      {
        type: 'add_tag',
        target: 'oath_method_empowered',
      },
      {
        type: 'narrative_log',
        value: 'The chain settles around your neck with a weight that is more than physical. You feel your own oaths resonate in response.',
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'neck',
    lore: 'Every link was forged at the moment an oath was sworn and kept unto death. The chain grows heavier with each generation, and yet those who wear it say it feels like certainty rather than burden.',
  },

  {
    id: 'mirror-of-liminal',
    name: 'Mirror of the Liminal',
    description:
      'A small hand mirror whose surface shows not the viewer but the space behind reality. Things hidden by shadow, illusion, or will become visible in its reflection.',
    category: 'relic',
    tags: ['shadow', 'liminal', 'perception'],
    affinities: ['shadow', 'liminal'],
    effects: [
      {
        type: 'add_tag',
        target: 'liminal_sight_active',
      },
      {
        type: 'add_resource',
        target: 'focus',
        value: 5,
      },
      {
        type: 'narrative_log',
        value: 'The mirror shows you the world as it truly is — layered, shifting, full of hidden doors and watching eyes.',
      },
    ],
    stackable: false,
    maxStack: 1,
    equipSlot: 'accessory',
    lore: 'The mirror was found at a crossroads between three realms, lying in the dust as though someone had simply set it down and walked away. No one knows who made it. The reflection it shows has never been wrong.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CONSUMABLES (5) — Additional single-use items
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'bone-marrow-tonic',
    name: 'Bone Marrow Tonic',
    description:
      'A thick, ivory-colored tonic brewed from rendered marrow and cultivated bone essence. It floods the body with deep, structural vitality.',
    category: 'consumable',
    tags: ['bone', 'healing'],
    affinities: ['bone', 'body'],
    effects: [
      {
        type: 'add_resource',
        target: 'vitality',
        value: 30,
      },
      {
        type: 'add_resource',
        target: 'focus',
        value: 10,
      },
      {
        type: 'narrative_log',
        value: 'The tonic is warm and tastes of marrow and earth. Strength floods into your bones, radiating outward.',
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'The body is built on bone. Heal the bone and the rest follows. Ancient cultivators understood this before they understood anything else.',
  },

  {
    id: 'essence-condensate',
    name: 'Essence Condensate',
    description:
      'A shimmering, near-weightless droplet of pure condensed essence, suspended in a crystal vial. Consuming it floods the meridians with raw power.',
    category: 'consumable',
    tags: ['essence', 'cultivation'],
    affinities: ['essence', 'cultivation'],
    effects: [
      {
        type: 'set_resource',
        target: 'essence',
        value: 'maxEssence',
      },
      {
        type: 'narrative_log',
        value: 'The condensate dissolves on your tongue like liquid light. Your essence channels blaze with restored power.',
      },
    ],
    stackable: true,
    maxStack: 5,
    lore: 'Essence in its purest form is neither liquid nor solid — it is potential, distilled. One drop holds what a cultivator gathers in a week of meditation.',
  },

  {
    id: 'stability-elixir',
    name: 'Stability Elixir',
    description:
      'A clear, faintly golden elixir that steadies the spirit and purges minor corruption from the cultivator\'s foundation.',
    category: 'consumable',
    tags: ['stability', 'purification'],
    affinities: ['sanctity', 'stability'],
    effects: [
      {
        type: 'add_resource',
        target: 'stability',
        value: 25,
      },
      {
        type: 'add_corruption',
        value: -3,
      },
      {
        type: 'narrative_log',
        value: 'The elixir spreads through you like calm water. The trembling in your foundation quiets, and something dark recedes.',
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'Stability is not the absence of chaos — it is the choice to remain whole despite it. This elixir does not remove the chaos. It reminds you of who you were before it arrived.',
  },

  {
    id: 'spirit-incense',
    name: 'Spirit Incense',
    description:
      'A cone of compressed spirit residue and sacred herbs that, when burned, suffuses the area with spiritual energy. Methods attuned to the spirit realm grow potent in its smoke.',
    category: 'consumable',
    tags: ['spirit', 'ritual'],
    affinities: ['spirit', 'ritual'],
    effects: [
      {
        type: 'add_tag',
        target: 'spirit_methods_boosted',
      },
      {
        type: 'add_resource',
        target: 'focus',
        value: 5,
      },
      {
        type: 'narrative_log',
        value: 'The incense smolders with pale smoke. The boundary between the living and the dead thins. Your spirit methods feel sharper, more resonant.',
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'Spirits are drawn to the smoke not because it summons them, but because it reminds them of incense burned at their funerals. Nostalgia is the most powerful binding.',
  },

  {
    id: 'blood-wine',
    name: 'Blood Wine',
    description:
      'A dark, viscous wine fermented from cultivated blood sap and rare fruits. It restores the body and spirit but carries a whisper of corruption.',
    category: 'consumable',
    tags: ['blood', 'consumption'],
    affinities: ['blood', 'nature'],
    effects: [
      {
        type: 'add_resource',
        target: 'vitality',
        value: 20,
      },
      {
        type: 'add_resource',
        target: 'essence',
        value: 15,
      },
      {
        type: 'add_corruption',
        value: 2,
      },
      {
        type: 'narrative_log',
        value: 'The wine is sweet and iron-tanged. Power floods through you — but something else rides with it, subtle and dark.',
      },
    ],
    stackable: true,
    maxStack: 10,
    lore: 'Blood wine was the preferred draught of the old blood courts. They drank it at every feast, every ritual, every celebration. By the end, they could not stop drinking it.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MATERIALS (7) — Additional crafting components
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'plague-spore',
    name: 'Plague Spore',
    description:
      'A sickly green-black spore harvested from blighted areas where corruption has taken root in the soil itself.',
    category: 'material',
    tags: ['disease', 'corruption'],
    affinities: ['disease', 'corruption'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'Where plague cultivators walked, the ground remembered their passage. These spores are not the disease — they are the memory of it, crystallized into something useful.',
  },

  {
    id: 'iron-filings',
    name: 'Iron Filings',
    description:
      'Fine dust of grave iron, ground down for use in inscription and delicate crafting work.',
    category: 'material',
    tags: ['iron', 'craft'],
    affinities: ['iron', 'craft'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'Whole iron resists. Ground iron cooperates. There is a lesson in that, if you care to learn it.',
  },

  {
    id: 'spirit-residue',
    name: 'Spirit Residue',
    description:
      'A faintly luminescent ectoplasmic substance left behind when spirits pass through the material world.',
    category: 'material',
    tags: ['spirit', 'essence'],
    affinities: ['spirit', 'essence'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'Spirits leave traces the way the living leave footprints. Spirit residue is the mark of a presence that was never quite here.',
  },

  {
    id: 'dark-sap',
    name: 'Dark Sap',
    description:
      'Blood-red sap tapped from trees that grow in soil enriched by old battlefields and burial grounds. It pulses with faint, borrowed vitality.',
    category: 'material',
    tags: ['blood', 'nature'],
    affinities: ['blood', 'nature'],
    effects: [],
    stackable: true,
    maxStack: 99,
    lore: 'The trees do not know what nourishes them. They simply drink and grow, their sap darkening season by season until it runs the color of old blood.',
  },

  {
    id: 'ancestor-bone',
    name: 'Ancestor Bone',
    description:
      'A bone fragment from a cultivator of notable achievement, still carrying traces of their accumulated power and insight.',
    category: 'material',
    tags: ['bone', 'ancient', 'spirit'],
    affinities: ['bone', 'spirit', 'death'],
    effects: [],
    stackable: true,
    maxStack: 20,
    lore: 'The bones of the accomplished dead are not inert. They remember every breakthrough, every insight, every moment of transcendence. Handled properly, they will share.',
  },

  {
    id: 'fog-pearl',
    name: 'Fog Pearl',
    description:
      'A rare, opalescent pearl that forms in the depths of the Fog Market, where the boundaries between realms are thin and commerce follows different rules.',
    category: 'material',
    tags: ['shadow', 'liminal', 'rare'],
    affinities: ['shadow', 'liminal'],
    effects: [],
    stackable: true,
    maxStack: 10,
    lore: 'Fog pearls cannot be farmed or manufactured. They appear in the pockets of those who wander the Fog Market long enough to lose track of which world they came from.',
  },

  {
    id: 'oath-fragment',
    name: 'Oath Fragment',
    description:
      'A crystallized shard of vow energy, formed when an oath of extraordinary conviction is broken or fulfilled with such force that the energy solidifies.',
    category: 'material',
    tags: ['oath', 'will'],
    affinities: ['oath', 'will'],
    effects: [],
    stackable: true,
    maxStack: 20,
    lore: 'Oaths have weight. The strongest ones leave physical remnants — jagged crystals that hum with the conviction that created them. Broken oaths and fulfilled oaths produce fragments of different character, but equal power.',
  },
];

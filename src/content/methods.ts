// ============================================================================
// Dragonsloft Cultivation RPG — Method Definitions (Dark Cultivation Vertical Slice)
// ============================================================================

import type { MethodDef } from '../engine/types';

export const methods: MethodDef[] = [
  // ==========================================================================
  // COMBAT METHODS
  // ==========================================================================
  {
    id: 'blood-lance',
    name: 'Blood Lance',
    description:
      'Condense vitae into a razor-thin spear of crystallized blood and hurl it at a foe. The lance detonates on impact, shredding flesh and draining residual life force back to the caster.',
    category: 'combat',
    tags: ['blood', 'combat', 'ranged'],
    affinities: ['blood', 'destruction'],
    resourceCost: { essence: 15 },
    masteryLevels: 5,
    masteryBonuses: [
      {
        level: 1,
        description: 'Blood Lance can be formed without an open wound.',
        effects: [{ type: 'add_tag', target: 'blood_lance_stable' }],
      },
      {
        level: 2,
        description: 'Lance fragments linger, inflicting bleeding over time.',
        effects: [{ type: 'damage', value: 5 }],
      },
      {
        level: 3,
        description: 'A portion of damage dealt is returned as vitality.',
        effects: [{ type: 'add_resource', target: 'vitality', value: 8 }],
      },
      {
        level: 4,
        description: 'Twin lances can be formed simultaneously.',
        effects: [{ type: 'damage', value: 12 }],
      },
      {
        level: 5,
        description: 'Blood Lance evolves into Crimson Annihilation — a spiraling vortex of vitae shards.',
        effects: [
          { type: 'damage', value: 25 },
          { type: 'add_resource', target: 'vitality', value: 15 },
        ],
      },
    ],
    effects: [
      { type: 'damage', value: 18 },
    ],
    conditions: [
      { type: 'min_rank', value: 2 },
    ],
    upgradeInto: ['crimson-annihilation'],
    lore: 'First devised by the Crimson Court surgeon-warriors, the Blood Lance was originally a battlefield triage technique — cauterizing wounds by expelling tainted blood at lethal velocity. The Court saw its martial potential and refined it into a signature killing art.',
  },
  {
    id: 'bone-ward',
    name: 'Bone Ward',
    description:
      'Summon fragments of ossified essence to orbit the body in a protective lattice. Each bone shard intercepts incoming force, splintering on impact to absorb damage before reforming.',
    category: 'combat',
    tags: ['bone', 'defense'],
    affinities: ['bone', 'protection', 'death'],
    resourceCost: { essence: 10, focus: 8 },
    masteryLevels: 4,
    masteryBonuses: [
      {
        level: 1,
        description: 'Ward persists for an additional round after summoning.',
        effects: [{ type: 'add_tag', target: 'bone_ward_extended' }],
      },
      {
        level: 2,
        description: 'Shattered ward fragments deal retaliatory damage.',
        effects: [{ type: 'damage', value: 4 }],
      },
      {
        level: 3,
        description: 'Ward can be shaped from ambient remains, reducing essence cost.',
        effects: [{ type: 'add_resource', target: 'essence', value: 5 }],
      },
      {
        level: 4,
        description: 'Ossified Shell — the ward fuses into full bone armor briefly.',
        effects: [
          { type: 'add_tag', target: 'bone_armor_active' },
          { type: 'add_stability', value: 10 },
        ],
      },
    ],
    effects: [
      { type: 'add_stability', value: 15 },
      { type: 'add_tag', target: 'bone_ward_active' },
    ],
    conditions: [
      { type: 'has_tag', target: 'bone' },
    ],
    lore: 'The Hollow Watch teach that bones remember. Every skeleton interred in consecrated ground retains an echo of its owner\'s will to endure. The Bone Ward calls upon that stubbornness, weaving it into a barrier that refuses to yield.',
  },
  {
    id: 'shadow-strike',
    name: 'Shadow Strike',
    description:
      'Dissolve partially into nearby darkness and re-materialize behind the target, delivering a blow imbued with umbral essence. The strike is nearly silent and leaves lingering shadow toxin in the wound.',
    category: 'combat',
    tags: ['shadow', 'combat', 'stealth'],
    affinities: ['shadow', 'stealth', 'death'],
    resourceCost: { momentum: 12, essence: 8 },
    masteryLevels: 5,
    masteryBonuses: [
      {
        level: 1,
        description: 'Reduced detection chance during approach.',
        effects: [{ type: 'add_tag', target: 'shadow_approach' }],
      },
      {
        level: 2,
        description: 'Shadow toxin slows the target\'s reactions.',
        effects: [{ type: 'add_tag', target: 'shadow_toxin_slow' }],
      },
      {
        level: 3,
        description: 'Can chain into a second strike if the first lands undetected.',
        effects: [{ type: 'damage', value: 10 }],
      },
      {
        level: 4,
        description: 'Shadow residue clings to the wound, preventing natural healing.',
        effects: [{ type: 'add_tag', target: 'shadow_wound_linger' }],
      },
      {
        level: 5,
        description: 'Umbral Execution — strike from complete darkness for massive damage.',
        effects: [{ type: 'damage', value: 35 }],
      },
    ],
    effects: [
      { type: 'damage', value: 20 },
    ],
    conditions: [
      { type: 'min_rank', value: 2 },
      { type: 'has_tag', target: 'shadow' },
    ],
    lore: 'Liminal cultivators discovered that the boundary between light and dark is not merely optical — it is a membrane between states of being. Shadow Strike exploits that membrane, letting the practitioner slip halfway into un-being to reach the enemy\'s blind spot.',
  },
  {
    id: 'iron-oath-blow',
    name: 'Iron Oath Blow',
    description:
      'Channel the weight of sworn vows into a devastating physical strike. The blow lands with supernatural force proportional to the oaths the cultivator has honored — broken vows weaken it, kept vows empower it beyond mortal limits.',
    category: 'combat',
    tags: ['oath', 'iron', 'combat'],
    affinities: ['oath', 'iron', 'discipline'],
    resourceCost: { focus: 12, momentum: 10 },
    masteryLevels: 5,
    masteryBonuses: [
      {
        level: 1,
        description: 'Strike ignores light physical barriers.',
        effects: [{ type: 'add_tag', target: 'oath_blow_piercing' }],
      },
      {
        level: 2,
        description: 'Honored oaths grant a stacking damage bonus.',
        effects: [{ type: 'damage', value: 8 }],
      },
      {
        level: 3,
        description: 'The blow resonates, stunning targets of lower rank.',
        effects: [{ type: 'add_tag', target: 'oath_stun' }],
      },
      {
        level: 4,
        description: 'Vow-weight extends to weapon, making it unblockable by mundane means.',
        effects: [{ type: 'add_tag', target: 'oath_unblockable' }],
      },
      {
        level: 5,
        description: 'Covenant Hammer — a single blow carrying the full gravity of every oath ever sworn.',
        effects: [
          { type: 'damage', value: 40 },
          { type: 'add_resource', target: 'momentum', value: 10 },
        ],
      },
    ],
    effects: [
      { type: 'damage', value: 22 },
    ],
    conditions: [
      { type: 'has_title', target: 'oathkeeper' },
    ],
    lore: 'The Iron Vanguard believe that words have mass. Every promise kept adds weight to the cultivator\'s spirit. The Iron Oath Blow is not learned so much as earned — only those who have stacked enough vow-weight can bring it to bear. Oathbreakers who attempt the technique find their fists light as air.',
  },
  // ==========================================================================
  // CULTIVATION METHODS
  // ==========================================================================
  {
    id: 'vein-furnace-breathing',
    name: 'Vein Furnace Breathing',
    description:
      'A forbidden internal refinement technique that treats the cultivator\'s circulatory system as a crucible. Blood is superheated through controlled essence cycling, burning away impurities and converting raw vitality into refined essence.',
    category: 'cultivation',
    tags: ['blood', 'cultivation', 'internal'],
    affinities: ['blood', 'fire', 'refinement'],
    resourceCost: { vitality: 20 },
    masteryLevels: 5,
    masteryBonuses: [
      {
        level: 1,
        description: 'Reduced vitality cost as the body adapts to internal heat.',
        effects: [{ type: 'add_resource', target: 'vitality', value: 5 }],
      },
      {
        level: 2,
        description: 'Blood impurities are expelled, granting temporary corruption resistance.',
        effects: [{ type: 'add_corruption', value: -3 }],
      },
      {
        level: 3,
        description: 'Essence yield increases as veins develop heat-resistant channels.',
        effects: [{ type: 'add_resource', target: 'essence', value: 8 }],
      },
      {
        level: 4,
        description: 'The furnace can process ambient blood (from defeated foes or offerings).',
        effects: [{ type: 'add_resource', target: 'essence', value: 12 }],
      },
      {
        level: 5,
        description: 'Crimson Crucible — the entire body becomes a living refinery, passively converting excess vitality.',
        effects: [
          { type: 'add_resource', target: 'essence', value: 20 },
          { type: 'add_tag', target: 'crimson_crucible_active' },
        ],
      },
    ],
    effects: [
      { type: 'add_resource', target: 'essence', value: 15 },
      { type: 'add_corruption', value: 2 },
    ],
    conditions: [
      { type: 'min_rank', value: 1 },
    ],
    lore: 'Originally a Crimson Court emergency technique for field cultivators cut off from external essence sources. The practitioner literally burns their own blood to fuel cultivation. Prolonged use stains the eyes permanently crimson — a mark the Court considers beautiful.',
  },
  {
    id: 'ossuary-meditation',
    name: 'Ossuary Meditation',
    description:
      'Enter a deep trance among bones and remains, drawing upon the residual essence trapped within dead matter. The cultivator\'s spirit resonates with the calcified memories of the departed, absorbing their lingering power.',
    category: 'cultivation',
    tags: ['bone', 'death', 'cultivation'],
    affinities: ['bone', 'death', 'meditation'],
    resourceCost: { focus: 15 },
    masteryLevels: 4,
    masteryBonuses: [
      {
        level: 1,
        description: 'Can meditate with fewer remains present.',
        effects: [{ type: 'add_tag', target: 'ossuary_sensitivity' }],
      },
      {
        level: 2,
        description: 'Glimpse fragmentary memories from the bones, occasionally yielding useful knowledge.',
        effects: [{ type: 'narrative_log', value: 'Bone-memories surface: fragments of forgotten techniques and places.' }],
      },
      {
        level: 3,
        description: 'Essence absorption deepens, drawing from older and more powerful remains.',
        effects: [{ type: 'add_resource', target: 'essence', value: 10 }],
      },
      {
        level: 4,
        description: 'Charnel Resonance — the cultivator becomes a living ossuary, passively absorbing death essence from any nearby remains.',
        effects: [
          { type: 'add_resource', target: 'essence', value: 18 },
          { type: 'add_tag', target: 'charnel_resonance' },
        ],
      },
    ],
    effects: [
      { type: 'add_resource', target: 'essence', value: 12 },
      { type: 'add_stability', value: 5 },
    ],
    conditions: [
      { type: 'has_tag', target: 'death' },
    ],
    lore: 'The Hollow Watch maintain vast ossuaries beneath their watchtowers — not from sentiment, but from pragmatism. Each bone is a battery of residual essence, and the Watch cultivators who tend these vaults grow powerful indeed. The practice is viewed with horror by outsiders who do not understand that the dead give willingly.',
  },
  {
    id: 'spirit-communion',
    name: 'Spirit Communion',
    description:
      'Open the cultivator\'s perception to the liminal layer where spirits of the recently and anciently dead linger. Communication is possible but taxing — each exchange frays the boundary between living and dead within the practitioner.',
    category: 'cultivation',
    tags: ['spirit', 'death', 'communion'],
    affinities: ['spirit', 'death', 'perception'],
    resourceCost: { focus: 12, stability: 10 },
    masteryLevels: 5,
    masteryBonuses: [
      {
        level: 1,
        description: 'Spirits are less hostile during initial contact.',
        effects: [{ type: 'add_tag', target: 'spirit_rapport' }],
      },
      {
        level: 2,
        description: 'Can commune with older spirits that have partially faded.',
        effects: [{ type: 'add_tag', target: 'deep_communion' }],
      },
      {
        level: 3,
        description: 'Stability loss from communion is reduced as the mind acclimates.',
        effects: [{ type: 'add_stability', value: 5 }],
      },
      {
        level: 4,
        description: 'Spirits may voluntarily share essence or knowledge as gifts.',
        effects: [
          { type: 'add_resource', target: 'essence', value: 10 },
          { type: 'narrative_log', value: 'A spirit shares a fragment of its cultivated knowledge.' },
        ],
      },
      {
        level: 5,
        description: 'Deathless Dialogue — maintain permanent communion without stability drain; spirits seek the cultivator out.',
        effects: [
          { type: 'add_tag', target: 'deathless_dialogue' },
          { type: 'add_resource', target: 'essence', value: 15 },
        ],
      },
    ],
    effects: [
      { type: 'add_resource', target: 'essence', value: 8 },
      { type: 'narrative_log', value: 'The veil thins. Whispers of the departed fill the air.' },
    ],
    conditions: [
      { type: 'min_rank', value: 2 },
      { type: 'has_tag', target: 'spirit' },
    ],
    lore: 'Spirit Communion is the foundational practice of the Order of the Ashen Veil. They believe the dead are not gone but merely translated — existing in a parallel layer of reality. The Order\'s greatest cultivators maintain councils of spirit advisors accumulated over centuries of communion.',
  },
  {
    id: 'oath-tempering',
    name: 'Oath Tempering',
    description:
      'Strengthen the physical body by swearing binding vows and enduring the pain of their enforcement. Each oath carved into the cultivator\'s spirit manifests as iron-like reinforcement of flesh and bone. Breaking a vow reverses the benefit catastrophically.',
    category: 'cultivation',
    tags: ['oath', 'iron', 'body'],
    affinities: ['oath', 'iron', 'endurance'],
    resourceCost: { stability: 15 },
    masteryLevels: 4,
    masteryBonuses: [
      {
        level: 1,
        description: 'Minor vows grant meaningful physical reinforcement.',
        effects: [{ type: 'add_resource', target: 'vitality', value: 8 }],
      },
      {
        level: 2,
        description: 'Oath-scars become visible on the skin as metallic lines — intimidating and protective.',
        effects: [
          { type: 'add_resource', target: 'vitality', value: 12 },
          { type: 'add_tag', target: 'oath_scarred' },
        ],
      },
      {
        level: 3,
        description: 'The body begins to passively regenerate as long as all oaths are maintained.',
        effects: [{ type: 'add_resource', target: 'vitality', value: 18 }],
      },
      {
        level: 4,
        description: 'Iron Constitution — the body becomes supernaturally dense and resilient. Weapons chip against oath-hardened flesh.',
        effects: [
          { type: 'add_resource', target: 'vitality', value: 25 },
          { type: 'add_tag', target: 'iron_constitution' },
        ],
      },
    ],
    effects: [
      { type: 'add_resource', target: 'vitality', value: 10 },
      { type: 'add_tag', target: 'oath_tempered' },
    ],
    conditions: [
      { type: 'has_tag', target: 'oath' },
    ],
    lore: 'The Iron Vanguard\'s most sacred practice. Recruits swear their first oath — usually to protect a specific person or place — and feel their bones harden in response. Veterans carry dozens of oaths, their bodies so reinforced they can shrug off blows that would shatter stone. The price of breaking even one oath, however, is the simultaneous failure of all reinforcement. Many oathbreakers simply collapse into boneless ruin.',
  },
  // ==========================================================================
  // CRAFTING METHODS
  // ==========================================================================
  {
    id: 'bone-shaping',
    name: 'Bone Shaping',
    description:
      'Manipulate ossified materials with cultivated essence, reshaping bones into tools, weapons, armor, and ritual implements. The resulting items retain spiritual resonance from their source remains.',
    category: 'crafting',
    tags: ['bone', 'craft'],
    affinities: ['bone', 'craft', 'death'],
    resourceCost: { essence: 8, focus: 5 },
    masteryLevels: 4,
    masteryBonuses: [
      {
        level: 1,
        description: 'Shaped bone items are more durable.',
        effects: [{ type: 'add_tag', target: 'bone_craft_durable' }],
      },
      {
        level: 2,
        description: 'Can work with ancient or petrified bones that resist normal shaping.',
        effects: [{ type: 'add_tag', target: 'bone_craft_ancient' }],
      },
      {
        level: 3,
        description: 'Items crafted retain stronger spiritual imprints, enhancing their effects.',
        effects: [{ type: 'add_tag', target: 'bone_craft_spirited' }],
      },
      {
        level: 4,
        description: 'Living Bone Craft — items crafted can grow, repair, and adapt over time.',
        effects: [{ type: 'add_tag', target: 'living_bone_craft' }],
      },
    ],
    effects: [
      { type: 'narrative_log', value: 'Bones yield beneath practiced hands, taking new and purposeful form.' },
    ],
    conditions: [
      { type: 'has_tag', target: 'bone' },
    ],
    lore: 'Before metal was common, the first cultivators shaped bone. The Hollow Watch never abandoned the art, arguing that bone remembers purpose better than any forged steel. A bone blade knows it was once a rib that protected a heart — and it protects still.',
  },
  {
    id: 'blood-inscription',
    name: 'Blood Inscription',
    description:
      'Write runes and sigils using the cultivator\'s own blood as ink. These inscriptions carry living essence and can enchant surfaces, bind agreements, ward areas, or store techniques for later activation.',
    category: 'crafting',
    tags: ['blood', 'ritual', 'craft'],
    affinities: ['blood', 'ritual', 'inscription'],
    resourceCost: { vitality: 8, essence: 10 },
    masteryLevels: 5,
    masteryBonuses: [
      {
        level: 1,
        description: 'Inscriptions last longer before fading.',
        effects: [{ type: 'add_tag', target: 'inscription_persistent' }],
      },
      {
        level: 2,
        description: 'Can inscribe on living flesh, creating temporary tattoo-enchantments.',
        effects: [{ type: 'add_tag', target: 'flesh_inscription' }],
      },
      {
        level: 3,
        description: 'Reduced vitality cost as efficiency of blood-to-ink conversion improves.',
        effects: [{ type: 'add_resource', target: 'vitality', value: 4 }],
      },
      {
        level: 4,
        description: 'Inscriptions can be layered for compound effects.',
        effects: [{ type: 'add_tag', target: 'inscription_layered' }],
      },
      {
        level: 5,
        description: 'Sanguine Scripture — inscriptions become semi-permanent and self-renewing, fed by ambient vitae.',
        effects: [
          { type: 'add_tag', target: 'sanguine_scripture' },
          { type: 'narrative_log', value: 'The blood-runes pulse with their own heartbeat, alive and enduring.' },
        ],
      },
    ],
    effects: [
      { type: 'narrative_log', value: 'Crimson symbols bloom across the surface, thrumming with bound power.' },
    ],
    conditions: [
      { type: 'has_tag', target: 'blood' },
      { type: 'min_rank', value: 2 },
    ],
    lore: 'The Crimson Court\'s contracts are all written in blood — not as metaphor, but as literal binding magic. A blood inscription carries the writer\'s will and vitality, making it nearly impossible to forge and extremely difficult to break. Court scholars spend decades perfecting their calligraphy, for a poorly drawn rune wastes blood without effect.',
  },
  {
    id: 'relic-attunement',
    name: 'Relic Attunement',
    description:
      'Reach into a dormant artifact with cultivated essence and awaken whatever sleeps within. Relics may contain bound spirits, fossilized techniques, or raw power sealed away by ancient cultivators. The process is unpredictable — not all relics wake gently.',
    category: 'crafting',
    tags: ['relic', 'spirit', 'craft'],
    affinities: ['relic', 'spirit', 'attunement'],
    resourceCost: { essence: 20, focus: 10 },
    masteryLevels: 4,
    masteryBonuses: [
      {
        level: 1,
        description: 'Can sense the nature of a relic before fully attuning, reducing surprises.',
        effects: [{ type: 'add_tag', target: 'relic_sense' }],
      },
      {
        level: 2,
        description: 'Attunement process is safer — hostile relic spirits are partially pacified.',
        effects: [{ type: 'add_stability', value: 8 }],
      },
      {
        level: 3,
        description: 'Can attune to more powerful relics that would overwhelm lesser practitioners.',
        effects: [{ type: 'add_tag', target: 'deep_attunement' }],
      },
      {
        level: 4,
        description: 'Relic Symbiosis — attuned relics bond more deeply, sharing their full power and occasionally acting autonomously to protect the bearer.',
        effects: [
          { type: 'add_tag', target: 'relic_symbiosis' },
          { type: 'add_resource', target: 'essence', value: 15 },
        ],
      },
    ],
    effects: [
      { type: 'narrative_log', value: 'Essence flows into the dormant artifact. Something stirs within.' },
    ],
    conditions: [
      { type: 'min_rank', value: 3 },
      { type: 'has_tag', target: 'spirit' },
    ],
    lore: 'Relics are the inheritance of dead cultivators — their techniques, grudges, and unfinished business crystallized into physical objects. The Order of the Ashen Veil considers Relic Attunement a sacred duty: awakening these artifacts honors the dead and preserves knowledge that would otherwise be lost to entropy.',
  },
  // ==========================================================================
  // SOCIAL METHODS
  // ==========================================================================
  {
    id: 'dread-presence',
    name: 'Dread Presence',
    description:
      'Project the accumulated weight of cultivated fear outward, causing weaker-willed beings to freeze, flee, or submit. The effect is not illusion — the dread is a tangible spiritual pressure that presses on the target\'s survival instincts.',
    category: 'social',
    tags: ['fear', 'social', 'domination'],
    affinities: ['fear', 'death', 'authority'],
    resourceCost: { dread: 10 },
    masteryLevels: 4,
    masteryBonuses: [
      {
        level: 1,
        description: 'Presence can be sustained passively without active concentration.',
        effects: [{ type: 'add_tag', target: 'passive_dread' }],
      },
      {
        level: 2,
        description: 'Affects cultivators up to one rank below the user.',
        effects: [{ type: 'add_tag', target: 'dread_cultivator_effective' }],
      },
      {
        level: 3,
        description: 'Dread lingers in an area after departure, marking territory.',
        effects: [{ type: 'add_tag', target: 'dread_territory' }],
      },
      {
        level: 4,
        description: 'Sovereign Dread — presence alone can halt armies and shatter the resolve of Domain Holders.',
        effects: [
          { type: 'add_tag', target: 'sovereign_dread' },
          { type: 'add_resource', target: 'reputation', value: 15 },
        ],
      },
    ],
    effects: [
      { type: 'add_resource', target: 'reputation', value: 5 },
      { type: 'narrative_log', value: 'A terrible weight settles over the area. Lesser beings tremble and avert their gaze.' },
    ],
    conditions: [
      { type: 'min_resource', target: 'dread', value: 10 },
      { type: 'min_rank', value: 3 },
    ],
    lore: 'Dread is not simply fear — it is the spiritual residue of witnessed death, absorbed suffering, and cultivated menace. The Dread Lords of old could depopulate villages simply by walking through them. Modern practitioners use it more judiciously, but the effect remains primal and devastating.',
  },
  {
    id: 'death-rite-officiant',
    name: 'Death Rite Officiant',
    description:
      'Perform the sacred funeral rites that ensure the dead pass cleanly to the next state. Proper rites prevent hauntings, pacify restless spirits, and earn the gratitude of communities. The officiant gains standing and spiritual clarity from the ceremony.',
    category: 'social',
    tags: ['death', 'ritual', 'social'],
    affinities: ['death', 'ritual', 'community'],
    resourceCost: { focus: 10, essence: 5 },
    masteryLevels: 3,
    masteryBonuses: [
      {
        level: 1,
        description: 'Rites can pacify mildly restless spirits that resist standard passage.',
        effects: [{ type: 'add_tag', target: 'rite_pacification' }],
      },
      {
        level: 2,
        description: 'The officiant can sense the cause of death during the rite, aiding investigations.',
        effects: [
          { type: 'add_tag', target: 'death_sight' },
          { type: 'narrative_log', value: 'The rite reveals echoes of the departed\'s final moments.' },
        ],
      },
      {
        level: 3,
        description: 'Grand Officiant — rites performed grant lasting protective blessings to attendees, and the officiant gains significant spiritual insight.',
        effects: [
          { type: 'add_resource', target: 'essence', value: 12 },
          { type: 'add_stability', value: 10 },
          { type: 'add_resource', target: 'reputation', value: 10 },
        ],
      },
    ],
    effects: [
      { type: 'add_resource', target: 'reputation', value: 8 },
      { type: 'add_stability', value: 5 },
      { type: 'narrative_log', value: 'The rites are performed with solemn precision. The dead find peace, and the living find comfort.' },
    ],
    conditions: [
      { type: 'has_tag', target: 'death' },
    ],
    lore: 'In a world where the improperly buried rise as hungry revenants, death rite officiants are both feared and desperately needed. The Hollow Watch trains all members in basic rites, but a true officiant — one who can ease even ancient, rage-filled spirits — is worth their weight in jade.',
  },
  // ==========================================================================
  // EXPLORATION METHODS
  // ==========================================================================
  {
    id: 'grave-sense',
    name: 'Grave Sense',
    description:
      'Extend cultivated perception into the earth and air to detect the presence of remains, lingering spirits, undead entities, and sites of mass death. The sense manifests differently for each practitioner — some smell decay, others hear whispers, a few see ghostly outlines.',
    category: 'exploration',
    tags: ['death', 'spirit', 'exploration'],
    affinities: ['death', 'spirit', 'perception'],
    resourceCost: { focus: 8 },
    masteryLevels: 4,
    masteryBonuses: [
      {
        level: 1,
        description: 'Detection range extends significantly.',
        effects: [{ type: 'add_tag', target: 'grave_sense_extended' }],
      },
      {
        level: 2,
        description: 'Can distinguish between types of undead and estimate their power.',
        effects: [{ type: 'add_tag', target: 'grave_sense_analysis' }],
      },
      {
        level: 3,
        description: 'Sense persists passively, providing constant awareness of nearby death-aligned entities.',
        effects: [{ type: 'add_tag', target: 'grave_sense_passive' }],
      },
      {
        level: 4,
        description: 'Deathsight — perceive the exact moment and manner of death of any remains detected, and sense hidden burial sites across vast distances.',
        effects: [
          { type: 'add_tag', target: 'deathsight' },
          { type: 'narrative_log', value: 'The world reveals its dead. Every buried body, every lingering shade — all visible to the cultivator\'s expanded perception.' },
        ],
      },
    ],
    effects: [
      { type: 'add_tag', target: 'grave_sense_active' },
      { type: 'narrative_log', value: 'The cultivator\'s senses sharpen. The dead make themselves known.' },
    ],
    conditions: [
      { type: 'has_tag', target: 'death' },
    ],
    lore: 'Every death leaves a stain. The Hollow Watch discovered that cultivators attuned to death can read these stains like a map — finding ancient battlefields, hidden tombs, and lurking undead before they become threats. Grave Sense is the first technique taught to Watch initiates, because you cannot guard against what you cannot perceive.',
  },
  {
    id: 'shadow-walk',
    name: 'Shadow Walk',
    description:
      'Step partially into the shadow-layer of reality, becoming difficult to perceive and able to move through darkened areas with supernatural speed and silence. The cultivator is not truly invisible but exists in a perceptual blind spot.',
    category: 'exploration',
    tags: ['shadow', 'stealth', 'exploration'],
    affinities: ['shadow', 'stealth', 'movement'],
    resourceCost: { essence: 10, focus: 5 },
    masteryLevels: 4,
    masteryBonuses: [
      {
        level: 1,
        description: 'Can maintain the walk for longer periods without fatigue.',
        effects: [{ type: 'add_tag', target: 'shadow_walk_endurance' }],
      },
      {
        level: 2,
        description: 'Movement through shadows is nearly instantaneous across short distances.',
        effects: [{ type: 'add_tag', target: 'shadow_dash' }],
      },
      {
        level: 3,
        description: 'Can carry one additional person into the shadow layer.',
        effects: [{ type: 'add_tag', target: 'shadow_escort' }],
      },
      {
        level: 4,
        description: 'Umbral Passage — slip between distant shadows, effectively teleporting between areas of deep darkness.',
        effects: [
          { type: 'add_tag', target: 'umbral_passage' },
          { type: 'narrative_log', value: 'The shadows part like curtains, revealing passages between distant darknesses.' },
        ],
      },
    ],
    effects: [
      { type: 'add_tag', target: 'shadow_walking' },
      { type: 'narrative_log', value: 'Reality dims at the edges. The cultivator slips into the spaces between light.' },
    ],
    conditions: [
      { type: 'has_tag', target: 'shadow' },
      { type: 'min_rank', value: 2 },
    ],
    lore: 'Shadows are not merely absence of light — they are a thinning of the world\'s fabric, places where the boundary between here and elsewhere grows gossamer-thin. Shadow walkers learn to exploit this thinning, stepping halfway out of reality to move unseen. The danger is going too deep and finding that the shadows have a geography of their own.',
  },
  // ==========================================================================
  // PASSIVE METHODS
  // ==========================================================================
  {
    id: 'corpse-resistance',
    name: 'Corpse Resistance',
    description:
      'Through prolonged exposure to death essence, decay, and necrotic environments, the cultivator\'s body develops a passive immunity to death-aligned damage. Poisons derived from corpses, necrotic blasts, and the chilling touch of undead all lose their effectiveness.',
    category: 'passive',
    tags: ['death', 'defense', 'passive'],
    affinities: ['death', 'endurance', 'body'],
    resourceCost: {},
    masteryLevels: 4,
    masteryBonuses: [
      {
        level: 1,
        description: 'Minor resistance to corpse-derived poisons and miasma.',
        effects: [{ type: 'add_tag', target: 'corpse_poison_resist' }],
      },
      {
        level: 2,
        description: 'Necrotic damage is halved. The cultivator can safely handle cursed remains.',
        effects: [{ type: 'add_tag', target: 'necrotic_resistance' }],
      },
      {
        level: 3,
        description: 'Undead instinctively avoid the cultivator, sensing a kindred deadness.',
        effects: [
          { type: 'add_tag', target: 'undead_avoidance' },
          { type: 'narrative_log', value: 'The lesser undead shy away, confused by the cultivator\'s death-touched essence.' },
        ],
      },
      {
        level: 4,
        description: 'Death Immunity — necrotic damage heals instead of harms. The cultivator can walk through plague zones unscathed and breathe freely in any charnel atmosphere.',
        effects: [
          { type: 'add_tag', target: 'death_immunity' },
          { type: 'add_tag', target: 'plague_immune' },
        ],
      },
    ],
    effects: [
      { type: 'add_tag', target: 'corpse_resistant' },
    ],
    conditions: [
      { type: 'has_tag', target: 'death' },
      { type: 'min_rank', value: 2 },
    ],
    lore: 'The body adapts to what it endures. Cultivators who work extensively with death essence find their flesh gradually becoming more corpse-like in certain respects — cooler to the touch, slower to bleed, resistant to the biological processes of decay. The Hollow Watch considers this a professional asset. Others find it deeply unsettling.',
  },
  // ==========================================================================
  // ADDITIONAL COMBAT METHOD (16th)
  // ==========================================================================
  {
    id: 'grave-shackle',
    name: 'Grave Shackle',
    description:
      'Summon spectral chains forged from death essence to bind a target in place. The chains anchor to the nearest concentration of death energy — graves, remains, or ambient necrotic fields — and tighten as the target struggles.',
    category: 'combat',
    tags: ['death', 'relic', 'combat', 'control'],
    affinities: ['death', 'binding', 'spirit'],
    resourceCost: { essence: 12, focus: 8 },
    masteryLevels: 3,
    masteryBonuses: [
      {
        level: 1,
        description: 'Chains persist longer and resist dispelling.',
        effects: [{ type: 'add_tag', target: 'grave_shackle_reinforced' }],
      },
      {
        level: 2,
        description: 'Bound targets suffer gradual vitality drain as the chains feed.',
        effects: [{ type: 'damage', value: 6 }],
      },
      {
        level: 3,
        description: 'Sepulchral Binding — chains multiply and can hold multiple targets or restrain a single powerful foe completely.',
        effects: [
          { type: 'add_tag', target: 'sepulchral_binding' },
          { type: 'damage', value: 12 },
        ],
      },
    ],
    effects: [
      { type: 'add_tag', target: 'grave_shackle_active' },
      { type: 'narrative_log', value: 'Spectral chains erupt from the ground, wrapping around the target with funereal finality.' },
    ],
    conditions: [
      { type: 'has_tag', target: 'death' },
      { type: 'min_rank', value: 2 },
    ],
    lore: 'The dead do not let go easily. Grave Shackle exploits this principle, calling upon the possessive nature of death essence to create bindings that grip with the tenacity of rigor mortis. The Order of the Ashen Veil uses this technique to restrain rogue spirits during exorcism, while less scrupulous cultivators employ it as a battlefield control tool.',
  },
];

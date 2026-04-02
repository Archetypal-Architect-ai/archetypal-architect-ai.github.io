// ============================================================================
// Dragonsloft Cultivation RPG — Title Definitions (Dark Cultivation Vertical Slice)
// ============================================================================

import type { TitleDef } from '../engine/types';

export const titles: TitleDef[] = [
  {
    id: 'gravedigger',
    name: 'Gravedigger',
    description:
      'One who labors among the dead — interring remains, maintaining burial grounds, and ensuring the boundary between living and dead remains intact. A humble title, but one that opens doors in communities plagued by the restless dead.',
    tags: ['death', 'labor', 'local'],
    sourceConditions: [
      { type: 'has_tag', target: 'death' },
      { type: 'has_method', target: 'death-rite-officiant' },
    ],
    recognitionScope: 'local',
    ranks: [
      {
        rank: 1,
        name: 'Digger',
        description: 'Recognized as someone willing to handle the dead.',
        conditions: [{ type: 'has_tag', target: 'death' }],
        effects: [
          { type: 'add_resource', target: 'reputation', value: 3 },
          { type: 'add_tag', target: 'gravedigger_1' },
        ],
      },
      {
        rank: 2,
        name: 'Sexton',
        description: 'Trusted keeper of burial grounds with authority over internment practices.',
        conditions: [
          { type: 'min_method_mastery', target: 'death-rite-officiant', value: 2 },
        ],
        effects: [
          { type: 'add_resource', target: 'reputation', value: 5 },
          { type: 'add_tag', target: 'gravedigger_2' },
        ],
      },
      {
        rank: 3,
        name: 'Keeper of the Deep',
        description: 'Master of burial arts, consulted on matters of the restless dead across the region.',
        conditions: [
          { type: 'min_method_mastery', target: 'death-rite-officiant', value: 3 },
          { type: 'min_rank', value: 3 },
        ],
        effects: [
          { type: 'add_resource', target: 'reputation', value: 10 },
          { type: 'add_tag', target: 'gravedigger_3' },
        ],
      },
    ],
    passiveEffects: [
      { type: 'add_resource', target: 'stability', value: 3 },
      { type: 'add_tag', target: 'death_work_experienced' },
    ],
    socialConsequences: [
      {
        factionId: 'faction_order_ashen_veil',
        standingModifier: 5,
        reaction: 'The Order respects those who tend the dead with proper care. A Gravedigger is always welcome at their gates.',
      },
      {
        factionId: 'faction_crimson_court',
        standingModifier: -2,
        reaction: 'The Court considers gravedigging menial labor beneath cultivation. They tolerate Gravediggers but do not respect them.',
      },
      {
        factionId: 'faction_hollow_watch',
        standingModifier: 8,
        reaction: 'The Hollow Watch sees Gravediggers as kindred spirits — practical workers who understand the necessity of death-work.',
      },
    ],
    evolutionPaths: [
      {
        targetTitleId: 'carrion-saint',
        conditions: [
          { type: 'min_rank', value: 4 },
          { type: 'has_tag', target: 'gravedigger_3' },
          { type: 'has_method', target: 'grave-sense' },
        ],
        description: 'A Gravedigger who has walked through death zones and emerged with identity intact may be recognized as a Carrion Saint.',
      },
    ],
    lore: 'Every settlement needs someone willing to dig. In the dark cultivation world, that someone must also be strong enough to put down anything that climbs back out. Gravediggers are the unsung foundation of civilized life — without them, the dead would overrun the living within a generation.',
  },
  {
    id: 'blood-drinker',
    name: 'Blood Drinker',
    description:
      'A cultivator who has incorporated the consumption of blood — whether their own or others\' — into their cultivation practice. The title carries stigma in most circles but commands respect among blood-path practitioners.',
    tags: ['blood', 'consumption', 'cultivation'],
    sourceConditions: [
      { type: 'has_method', target: 'vein-furnace-breathing' },
      { type: 'has_tag', target: 'blood' },
    ],
    recognitionScope: 'regional',
    ranks: [
      {
        rank: 1,
        name: 'Taster',
        description: 'Has consumed blood for cultivation purposes more than casually.',
        conditions: [
          { type: 'min_method_mastery', target: 'vein-furnace-breathing', value: 1 },
        ],
        effects: [
          { type: 'add_tag', target: 'blood_drinker_1' },
          { type: 'add_resource', target: 'reputation', value: 2 },
        ],
      },
      {
        rank: 2,
        name: 'Sanguine Adept',
        description: 'Blood consumption is a core part of the cultivation routine. The body has adapted to process vitae efficiently.',
        conditions: [
          { type: 'min_method_mastery', target: 'vein-furnace-breathing', value: 3 },
        ],
        effects: [
          { type: 'add_tag', target: 'blood_drinker_2' },
          { type: 'add_resource', target: 'essence', value: 5 },
        ],
      },
      {
        rank: 3,
        name: 'Crimson Sovereign',
        description: 'The cultivator\'s blood arts have reached a pinnacle. They can taste a drop and know its origin, age, and the cultivation level of its source.',
        conditions: [
          { type: 'min_method_mastery', target: 'vein-furnace-breathing', value: 5 },
          { type: 'min_rank', value: 4 },
        ],
        effects: [
          { type: 'add_tag', target: 'blood_drinker_3' },
          { type: 'add_resource', target: 'essence', value: 10 },
          { type: 'add_resource', target: 'reputation', value: 8 },
        ],
      },
    ],
    passiveEffects: [
      { type: 'add_resource', target: 'essence', value: 2 },
    ],
    socialConsequences: [
      {
        factionId: 'faction_order_ashen_veil',
        standingModifier: -5,
        reaction: 'The Order views blood consumption as a dangerous corruption of natural cultivation. Blood Drinkers are watched closely for signs of degeneracy.',
      },
      {
        factionId: 'faction_crimson_court',
        standingModifier: 10,
        reaction: 'The Crimson Court celebrates Blood Drinkers as practitioners of their most refined art. Higher ranks receive invitations to Court salons.',
      },
      {
        factionId: 'faction_hollow_watch',
        standingModifier: -3,
        reaction: 'The Watch finds blood consumption distasteful but acknowledges its effectiveness. Pragmatism wars with disgust.',
      },
    ],
    evolutionPaths: [],
    lore: 'Blood is the most personal of cultivation materials — it carries the drinker\'s history, emotions, and essence signature. To consume another\'s blood is to briefly know them at the deepest level. The Crimson Court has elevated this into high art, complete with vintage classifications and tasting ceremonies that would horrify outsiders.',
  },
  {
    id: 'oathkeeper',
    name: 'Oathkeeper',
    description:
      'A cultivator recognized for honoring their sworn vows without fail. In a world where words carry literal spiritual weight, an Oathkeeper\'s promise is considered unbreakable — and their wrath when others break faith is legendary.',
    tags: ['oath', 'honor', 'discipline'],
    sourceConditions: [
      { type: 'has_tag', target: 'oath' },
      { type: 'has_method', target: 'oath-tempering' },
    ],
    recognitionScope: 'regional',
    ranks: [
      {
        rank: 1,
        name: 'Sworn',
        description: 'Has maintained at least one significant oath without wavering.',
        conditions: [
          { type: 'has_tag', target: 'oath_tempered' },
        ],
        effects: [
          { type: 'add_tag', target: 'oathkeeper_1' },
          { type: 'add_resource', target: 'reputation', value: 5 },
        ],
      },
      {
        rank: 2,
        name: 'Iron Bound',
        description: 'Multiple oaths honored. The cultivator\'s word is known to carry weight throughout the region.',
        conditions: [
          { type: 'min_method_mastery', target: 'oath-tempering', value: 2 },
          { type: 'min_rank', value: 3 },
        ],
        effects: [
          { type: 'add_tag', target: 'oathkeeper_2' },
          { type: 'add_resource', target: 'reputation', value: 10 },
        ],
      },
      {
        rank: 3,
        name: 'Covenant Pillar',
        description: 'A living monument to the power of kept promises. Treaties and alliances are sealed by invoking the Covenant Pillar\'s name.',
        conditions: [
          { type: 'min_method_mastery', target: 'oath-tempering', value: 4 },
          { type: 'min_rank', value: 5 },
        ],
        effects: [
          { type: 'add_tag', target: 'oathkeeper_3' },
          { type: 'add_resource', target: 'reputation', value: 20 },
          { type: 'add_resource', target: 'vitality', value: 10 },
        ],
      },
    ],
    passiveEffects: [
      { type: 'add_resource', target: 'vitality', value: 3 },
      { type: 'add_stability', value: 5 },
    ],
    socialConsequences: [
      {
        factionId: 'faction_order_ashen_veil',
        standingModifier: 5,
        reaction: 'The Order values those who keep their word, seeing it as evidence of spiritual discipline and alignment with cosmic order.',
      },
      {
        factionId: 'faction_crimson_court',
        standingModifier: 3,
        reaction: 'The Court appreciates Oathkeepers as reliable partners in agreements, though they find the rigidity somewhat naive.',
      },
      {
        factionId: 'faction_hollow_watch',
        standingModifier: 10,
        reaction: 'The Watch holds Oathkeepers in the highest regard. Their entire organizational structure is built on sworn duty.',
      },
    ],
    evolutionPaths: [
      {
        targetTitleId: 'iron-vanguard',
        conditions: [
          { type: 'has_tag', target: 'oathkeeper_3' },
          { type: 'has_method', target: 'iron-oath-blow' },
          { type: 'min_rank', value: 5 },
        ],
        description: 'A Covenant Pillar who has proven unbroken in battle may ascend to the mantle of Iron Vanguard.',
      },
    ],
    lore: 'In the age before cultivation, oaths were symbolic. When the first cultivators discovered that spiritual energy could be bound by words of intent, oaths became literal chains of power. An Oathkeeper is not merely honest — they are someone whose very essence enforces their promises.',
  },
  {
    id: 'bone-collector',
    name: 'Bone Collector',
    description:
      'A cultivator who has gathered a significant collection of remains — not from morbidity, but from pragmatic recognition that bones are a valuable cultivation resource. Bone Collectors maintain personal ossuaries and are skilled at identifying the origin and power of skeletal remains.',
    tags: ['bone', 'collection', 'death'],
    sourceConditions: [
      { type: 'has_tag', target: 'bone' },
      { type: 'has_method', target: 'bone-shaping' },
    ],
    recognitionScope: 'local',
    ranks: [
      {
        rank: 1,
        name: 'Bone Picker',
        description: 'Has accumulated a notable collection of remains and can identify common bone types by touch.',
        conditions: [
          { type: 'has_tag', target: 'bone' },
          { type: 'min_method_mastery', target: 'bone-shaping', value: 1 },
        ],
        effects: [
          { type: 'add_tag', target: 'bone_collector_1' },
          { type: 'add_resource', target: 'reputation', value: 2 },
        ],
      },
      {
        rank: 2,
        name: 'Ossuary Keeper',
        description: 'Maintains a personal ossuary of curated remains. Can identify rare and ancient bones and extract maximum essence from them.',
        conditions: [
          { type: 'min_method_mastery', target: 'bone-shaping', value: 3 },
          { type: 'min_method_mastery', target: 'ossuary-meditation', value: 2 },
        ],
        effects: [
          { type: 'add_tag', target: 'bone_collector_2' },
          { type: 'add_resource', target: 'reputation', value: 5 },
          { type: 'add_resource', target: 'essence', value: 5 },
        ],
      },
    ],
    passiveEffects: [
      { type: 'add_tag', target: 'bone_identification' },
    ],
    socialConsequences: [
      {
        factionId: 'faction_order_ashen_veil',
        standingModifier: 2,
        reaction: 'The Order respects those who handle remains with knowledge and care, though they caution against treating bones as mere resources.',
      },
      {
        factionId: 'faction_crimson_court',
        standingModifier: -1,
        reaction: 'The Court finds bone collection pedestrian compared to blood arts. They tolerate it as a quaint hobby.',
      },
      {
        factionId: 'faction_hollow_watch',
        standingModifier: 6,
        reaction: 'The Watch actively recruits Bone Collectors. Their ossuaries are vital strategic resources.',
      },
    ],
    evolutionPaths: [],
    lore: 'Every bone tells a story. A femur from a fallen cultivator hums with residual technique. A skull from a beast-king radiates primal fury. Bone Collectors learn to read these stories and harness the power within. The best collectors can reconstruct entire cultivation histories from scattered remains.',
  },
  {
    id: 'carrion-saint',
    name: 'Carrion Saint',
    description:
      'One who has walked through zones of concentrated death — plague fields, ancient battlegrounds, necrotic wastes — and emerged with their identity and sanity intact. Carrion Saints are living proof that death can be endured, understood, and ultimately transcended.',
    tags: ['death', 'endurance', 'transcendence'],
    sourceConditions: [
      { type: 'has_tag', target: 'death' },
      { type: 'min_rank', value: 4 },
      { type: 'has_method', target: 'corpse-resistance' },
    ],
    recognitionScope: 'continental',
    ranks: [
      {
        rank: 1,
        name: 'Death-Touched',
        description: 'Has survived prolonged exposure to death zones that would kill or transform ordinary cultivators.',
        conditions: [
          { type: 'min_method_mastery', target: 'corpse-resistance', value: 2 },
          { type: 'min_rank', value: 4 },
        ],
        effects: [
          { type: 'add_tag', target: 'carrion_saint_1' },
          { type: 'add_resource', target: 'reputation', value: 10 },
        ],
      },
      {
        rank: 2,
        name: 'Carrion Pilgrim',
        description: 'Has deliberately sought out and traversed multiple death zones as a form of spiritual pilgrimage.',
        conditions: [
          { type: 'min_method_mastery', target: 'corpse-resistance', value: 3 },
          { type: 'has_method', target: 'grave-sense' },
          { type: 'min_rank', value: 5 },
        ],
        effects: [
          { type: 'add_tag', target: 'carrion_saint_2' },
          { type: 'add_resource', target: 'reputation', value: 15 },
          { type: 'add_stability', value: 10 },
        ],
      },
      {
        rank: 3,
        name: 'Carrion Saint Ascendant',
        description: 'Death holds no terror and little power over this cultivator. They walk through necrotic storms as others walk through rain.',
        conditions: [
          { type: 'min_method_mastery', target: 'corpse-resistance', value: 4 },
          { type: 'min_rank', value: 6 },
        ],
        effects: [
          { type: 'add_tag', target: 'carrion_saint_3' },
          { type: 'add_resource', target: 'reputation', value: 25 },
          { type: 'add_stability', value: 15 },
          { type: 'add_resource', target: 'vitality', value: 20 },
        ],
      },
    ],
    passiveEffects: [
      { type: 'add_stability', value: 5 },
      { type: 'add_tag', target: 'death_zone_resistant' },
    ],
    socialConsequences: [
      {
        factionId: 'faction_order_ashen_veil',
        standingModifier: 15,
        reaction: 'The Order reveres Carrion Saints as exemplars of their highest ideals — those who have faced death and returned enriched rather than diminished.',
      },
      {
        factionId: 'faction_crimson_court',
        standingModifier: 5,
        reaction: 'The Court respects the Carrion Saint\'s resilience, seeing it as evidence of superior cultivation, though they prefer blood arts to death-walking.',
      },
      {
        factionId: 'faction_hollow_watch',
        standingModifier: 12,
        reaction: 'The Watch considers Carrion Saints to be living legends — the proof that their mission of guarding against death is not futile.',
      },
    ],
    evolutionPaths: [
      {
        targetTitleId: 'ashen-hierophant',
        conditions: [
          { type: 'has_tag', target: 'carrion_saint_3' },
          { type: 'min_rank', value: 7 },
          { type: 'has_method', target: 'spirit-communion' },
          { type: 'min_method_mastery', target: 'spirit-communion', value: 5 },
        ],
        description: 'A Carrion Saint Ascendant who has mastered communion with the dead may transcend the boundary entirely, becoming an Ashen Hierophant — a living bridge between the worlds of the quick and the dead.',
      },
    ],
    lore: 'The first Carrion Saint was a nameless cultivator who wandered into the Ash Wastes during the Corpse Tide and walked out seven years later, unchanged. She spoke of having seen the architecture of death itself — vast, orderly, and strangely beautiful. Her accounts formed the philosophical foundation of the Order of the Ashen Veil.',
  },
  {
    id: 'shadow-walker',
    name: 'Shadow Walker',
    description:
      'A cultivator who has traversed the liminal spaces between light and darkness — the shadow layer where reality thins and other things move. Shadow Walkers see the world differently, aware of passages and presences invisible to ordinary perception.',
    tags: ['shadow', 'stealth', 'liminal'],
    sourceConditions: [
      { type: 'has_method', target: 'shadow-walk' },
      { type: 'has_tag', target: 'shadow' },
    ],
    recognitionScope: 'regional',
    ranks: [
      {
        rank: 1,
        name: 'Shade Treader',
        description: 'Has entered and returned from the shadow layer multiple times without losing coherence.',
        conditions: [
          { type: 'min_method_mastery', target: 'shadow-walk', value: 2 },
        ],
        effects: [
          { type: 'add_tag', target: 'shadow_walker_1' },
          { type: 'add_resource', target: 'reputation', value: 5 },
        ],
      },
      {
        rank: 2,
        name: 'Liminal Voyager',
        description: 'Has mapped shadow passages and can navigate the liminal layer with confidence. The darkness is a road, not a threat.',
        conditions: [
          { type: 'min_method_mastery', target: 'shadow-walk', value: 4 },
          { type: 'min_rank', value: 4 },
        ],
        effects: [
          { type: 'add_tag', target: 'shadow_walker_2' },
          { type: 'add_resource', target: 'reputation', value: 10 },
          { type: 'add_resource', target: 'essence', value: 8 },
        ],
      },
    ],
    passiveEffects: [
      { type: 'add_tag', target: 'shadow_perception' },
    ],
    socialConsequences: [
      {
        factionId: 'faction_order_ashen_veil',
        standingModifier: 3,
        reaction: 'The Order is intrigued by Shadow Walkers, viewing the liminal layer as adjacent to the death-realm they study.',
      },
      {
        factionId: 'faction_crimson_court',
        standingModifier: -2,
        reaction: 'The Court distrusts those who can move unseen. Shadow Walkers are potential spies and assassins in their eyes.',
      },
      {
        factionId: 'faction_hollow_watch',
        standingModifier: 5,
        reaction: 'The Watch values Shadow Walkers as scouts and infiltrators. Several Watch operations depend on shadow-layer reconnaissance.',
      },
    ],
    evolutionPaths: [],
    lore: 'The shadow layer was first documented by a blind cultivator who realized her other senses could perceive a world that sighted people missed entirely. What she described was a mirror of reality, dimmer but richer — full of passages, shortcuts, and things that preferred not to be seen. Shadow Walkers follow in her footsteps, navigating by feel through a world of perpetual twilight.',
  },
  {
    id: 'relic-bearer',
    name: 'Relic Bearer',
    description:
      'A cultivator who carries one or more awakened artifacts — relics imbued with the essence and will of dead cultivators. The relationship between Bearer and relic is symbiotic: the Bearer provides living essence, and the relic provides power and knowledge from beyond death.',
    tags: ['relic', 'spirit', 'artifact'],
    sourceConditions: [
      { type: 'has_method', target: 'relic-attunement' },
      { type: 'has_tag', target: 'relic' },
    ],
    recognitionScope: 'regional',
    ranks: [
      {
        rank: 1,
        name: 'Relic Keeper',
        description: 'Has successfully attuned to and carries an awakened artifact.',
        conditions: [
          { type: 'min_method_mastery', target: 'relic-attunement', value: 1 },
        ],
        effects: [
          { type: 'add_tag', target: 'relic_bearer_1' },
          { type: 'add_resource', target: 'reputation', value: 5 },
        ],
      },
      {
        rank: 2,
        name: 'Relic Warden',
        description: 'Carries multiple attuned relics and can mediate between their sometimes conflicting wills.',
        conditions: [
          { type: 'min_method_mastery', target: 'relic-attunement', value: 3 },
          { type: 'min_rank', value: 4 },
        ],
        effects: [
          { type: 'add_tag', target: 'relic_bearer_2' },
          { type: 'add_resource', target: 'reputation', value: 10 },
          { type: 'add_resource', target: 'essence', value: 8 },
        ],
      },
      {
        rank: 3,
        name: 'Relic Archon',
        description: 'The relics have fully bonded, their ancient wills aligned with the Bearer\'s purpose. The Archon wields the accumulated knowledge and power of multiple dead cultivators.',
        conditions: [
          { type: 'min_method_mastery', target: 'relic-attunement', value: 4 },
          { type: 'min_rank', value: 6 },
        ],
        effects: [
          { type: 'add_tag', target: 'relic_bearer_3' },
          { type: 'add_resource', target: 'reputation', value: 20 },
          { type: 'add_resource', target: 'essence', value: 15 },
        ],
      },
    ],
    passiveEffects: [
      { type: 'add_resource', target: 'essence', value: 3 },
      { type: 'add_tag', target: 'relic_resonance' },
    ],
    socialConsequences: [
      {
        factionId: 'faction_order_ashen_veil',
        standingModifier: 8,
        reaction: 'The Order considers relic preservation a sacred duty. Bearers who treat their relics with respect are honored.',
      },
      {
        factionId: 'faction_crimson_court',
        standingModifier: 4,
        reaction: 'The Court covets powerful relics and treats their Bearers as valuable assets — or acquisition targets.',
      },
      {
        factionId: 'faction_hollow_watch',
        standingModifier: 3,
        reaction: 'The Watch views relics as useful tools and respects those who can wield them effectively.',
      },
    ],
    evolutionPaths: [],
    lore: 'Relics choose their Bearers as much as Bearers choose their relics. An artifact containing the will of a dead Sovereign-rank cultivator will not submit to a mere Initiate. The relationship requires mutual respect — the Bearer honors the relic\'s origin, and the relic lends its power willingly rather than being forced.',
  },
  {
    id: 'dread-lord',
    name: 'Dread Lord',
    description:
      'A cultivator who has accumulated so much cultivated fear and spiritual menace that their very presence warps the behavior of those around them. Dread Lords rule through awe and terror rather than affection — their dominion is absolute but lonely.',
    tags: ['fear', 'domination', 'authority'],
    sourceConditions: [
      { type: 'has_method', target: 'dread-presence' },
      { type: 'min_resource', target: 'dread', value: 30 },
    ],
    recognitionScope: 'continental',
    ranks: [
      {
        rank: 1,
        name: 'Fear Monger',
        description: 'Known and feared in the local area. Common people avoid the cultivator\'s path.',
        conditions: [
          { type: 'min_resource', target: 'dread', value: 20 },
          { type: 'min_method_mastery', target: 'dread-presence', value: 1 },
        ],
        effects: [
          { type: 'add_tag', target: 'dread_lord_1' },
          { type: 'add_resource', target: 'reputation', value: 8 },
        ],
      },
      {
        rank: 2,
        name: 'Terror Sovereign',
        description: 'Fear radiates outward in waves. Even other cultivators feel unease in the Dread Lord\'s presence.',
        conditions: [
          { type: 'min_resource', target: 'dread', value: 50 },
          { type: 'min_method_mastery', target: 'dread-presence', value: 3 },
          { type: 'min_rank', value: 5 },
        ],
        effects: [
          { type: 'add_tag', target: 'dread_lord_2' },
          { type: 'add_resource', target: 'reputation', value: 15 },
        ],
      },
      {
        rank: 3,
        name: 'Dread Imperator',
        description: 'The cultivator\'s dread has become a domain-level force. Entire regions fall under the shadow of their fear, and lesser beings offer tribute preemptively to avoid drawing attention.',
        conditions: [
          { type: 'min_resource', target: 'dread', value: 80 },
          { type: 'min_method_mastery', target: 'dread-presence', value: 4 },
          { type: 'min_rank', value: 6 },
        ],
        effects: [
          { type: 'add_tag', target: 'dread_lord_3' },
          { type: 'add_resource', target: 'reputation', value: 30 },
          { type: 'add_resource', target: 'domainControl', value: 20 },
        ],
      },
    ],
    passiveEffects: [
      { type: 'add_tag', target: 'fear_aura' },
      { type: 'add_resource', target: 'reputation', value: 5 },
    ],
    socialConsequences: [
      {
        factionId: 'faction_order_ashen_veil',
        standingModifier: -10,
        reaction: 'The Order condemns the cultivation of fear as a corruption of spiritual power. Dread Lords are considered dangerous deviants who must be contained.',
      },
      {
        factionId: 'faction_crimson_court',
        standingModifier: 8,
        reaction: 'The Court admires power in all its forms. A Dread Lord who can control their terror is a valuable ally — one who cannot is a useful weapon.',
      },
      {
        factionId: 'faction_hollow_watch',
        standingModifier: -5,
        reaction: 'The Watch opposes Dread Lords on principle — cultivated fear destabilizes the communities the Watch protects. However, they acknowledge that fear can be an effective deterrent against worse threats.',
      },
    ],
    evolutionPaths: [],
    lore: 'Dread is not mere emotion — it is a cultivated spiritual substance, distilled from witnessed suffering, personal trauma, and the slow accumulation of menace. The first Dread Lords arose during the Corpse Tide, when cultivators discovered that concentrated fear could repel even mindless undead hordes. The technique saved thousands but corrupted its wielders. Modern Dread Lords walk a razor edge between useful deterrent and existential threat.',
  },
  {
    id: 'spirit-speaker',
    name: 'Spirit Speaker',
    description:
      'A cultivator who has communed with so many spirits of the dead that they have developed a permanent sensitivity to the liminal layer. Spirit Speakers hear the whispers of the departed at all times — a gift and a burden that sets them apart from ordinary cultivators.',
    tags: ['spirit', 'death', 'communion'],
    sourceConditions: [
      { type: 'has_method', target: 'spirit-communion' },
      { type: 'min_method_mastery', target: 'spirit-communion', value: 2 },
    ],
    recognitionScope: 'regional',
    ranks: [
      {
        rank: 1,
        name: 'Whisper Listener',
        description: 'Can hear and interpret the speech of recently dead spirits without entering formal communion.',
        conditions: [
          { type: 'min_method_mastery', target: 'spirit-communion', value: 2 },
        ],
        effects: [
          { type: 'add_tag', target: 'spirit_speaker_1' },
          { type: 'add_resource', target: 'reputation', value: 5 },
        ],
      },
      {
        rank: 2,
        name: 'Voice of the Dead',
        description: 'Can channel spirits, allowing the departed to speak through the cultivator\'s body. Sought out by those who need closure or information from the deceased.',
        conditions: [
          { type: 'min_method_mastery', target: 'spirit-communion', value: 4 },
          { type: 'min_rank', value: 4 },
        ],
        effects: [
          { type: 'add_tag', target: 'spirit_speaker_2' },
          { type: 'add_resource', target: 'reputation', value: 12 },
          { type: 'add_stability', value: 5 },
        ],
      },
    ],
    passiveEffects: [
      { type: 'add_tag', target: 'spirit_hearing' },
      { type: 'add_resource', target: 'essence', value: 2 },
    ],
    socialConsequences: [
      {
        factionId: 'faction_order_ashen_veil',
        standingModifier: 12,
        reaction: 'The Order considers Spirit Speakers to be exemplars of their faith — living proof that death is not an ending but a transformation. High-ranking Speakers are invited to join the Order\'s inner council.',
      },
      {
        factionId: 'faction_crimson_court',
        standingModifier: 1,
        reaction: 'The Court finds Spirit Speakers useful for extracting secrets from dead rivals but considers the practice somewhat morbid even by their standards.',
      },
      {
        factionId: 'faction_hollow_watch',
        standingModifier: 7,
        reaction: 'The Watch values Spirit Speakers for intelligence gathering — dead scouts can still deliver their reports through a Speaker.',
      },
    ],
    evolutionPaths: [],
    lore: 'The dead are not silent — they merely speak in frequencies the living cannot hear. Spirit Speakers have attuned their spiritual senses to receive these frequencies, opening a channel that never fully closes. Many Speakers report that the hardest part is not hearing the dead, but learning to filter the constant murmur into something manageable. The unprepared go mad. The prepared gain wisdom beyond their years.',
  },
  {
    id: 'iron-vanguard',
    name: 'Iron Vanguard',
    description:
      'A warrior-cultivator who has remained unbroken in battle through the power of sworn oaths. Iron Vanguards are the front line — the ones who stand when others fall, whose bodies are hardened by vow-weight and whose strikes carry the gravity of every promise kept.',
    tags: ['oath', 'iron', 'combat', 'defense'],
    sourceConditions: [
      { type: 'has_method', target: 'iron-oath-blow' },
      { type: 'has_method', target: 'oath-tempering' },
      { type: 'has_title', target: 'oathkeeper' },
    ],
    recognitionScope: 'regional',
    ranks: [
      {
        rank: 1,
        name: 'Iron Sentinel',
        description: 'Has held a defensive position through overwhelming odds without retreating or breaking an oath.',
        conditions: [
          { type: 'min_method_mastery', target: 'iron-oath-blow', value: 2 },
          { type: 'min_method_mastery', target: 'oath-tempering', value: 2 },
        ],
        effects: [
          { type: 'add_tag', target: 'iron_vanguard_1' },
          { type: 'add_resource', target: 'reputation', value: 8 },
          { type: 'add_resource', target: 'vitality', value: 10 },
        ],
      },
      {
        rank: 2,
        name: 'Bulwark of Oaths',
        description: 'The cultivator\'s oath-reinforced body can withstand attacks that would shatter stone. Their presence on a battlefield turns the tide.',
        conditions: [
          { type: 'min_method_mastery', target: 'iron-oath-blow', value: 4 },
          { type: 'min_method_mastery', target: 'oath-tempering', value: 3 },
          { type: 'min_rank', value: 5 },
        ],
        effects: [
          { type: 'add_tag', target: 'iron_vanguard_2' },
          { type: 'add_resource', target: 'reputation', value: 15 },
          { type: 'add_resource', target: 'vitality', value: 20 },
        ],
      },
      {
        rank: 3,
        name: 'Unbroken Colossus',
        description: 'A living monument to the power of kept oaths. The Unbroken Colossus has never retreated, never yielded, and never broken faith. Their oath-weight is so immense that the ground trembles beneath their steps.',
        conditions: [
          { type: 'min_method_mastery', target: 'iron-oath-blow', value: 5 },
          { type: 'min_method_mastery', target: 'oath-tempering', value: 4 },
          { type: 'min_rank', value: 6 },
          { type: 'has_tag', target: 'iron_constitution' },
        ],
        effects: [
          { type: 'add_tag', target: 'iron_vanguard_3' },
          { type: 'add_resource', target: 'reputation', value: 25 },
          { type: 'add_resource', target: 'vitality', value: 30 },
          { type: 'add_stability', value: 20 },
        ],
      },
    ],
    passiveEffects: [
      { type: 'add_resource', target: 'vitality', value: 5 },
      { type: 'add_stability', value: 5 },
      { type: 'add_tag', target: 'oath_reinforced' },
    ],
    socialConsequences: [
      {
        factionId: 'faction_order_ashen_veil',
        standingModifier: 5,
        reaction: 'The Order honors the Iron Vanguard\'s discipline, viewing their oath-keeping as a form of spiritual cultivation worthy of respect.',
      },
      {
        factionId: 'faction_crimson_court',
        standingModifier: 2,
        reaction: 'The Court finds Iron Vanguards tediously rigid but acknowledges their usefulness as allies in dangerous situations. Their inability to be bribed or swayed is both admired and annoying.',
      },
      {
        factionId: 'faction_hollow_watch',
        standingModifier: 15,
        reaction: 'The Watch considers the Iron Vanguard to be the pinnacle of their martial tradition. Unbroken Colossi are given command authority and treated as living legends.',
      },
    ],
    evolutionPaths: [],
    lore: 'The Iron Vanguard tradition began with a single cultivator who swore to hold a mountain pass against a Corpse Tide incursion. She held for nineteen days, her body growing harder with each oath she swore — to protect each villager by name, to stand until dawn, to break before bending. By the time relief arrived, her skin had the sheen of polished iron. She had not moved an inch.',
  },
];

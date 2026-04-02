import type { PathDef, Rank } from '../engine/types';

export const paths: PathDef[] = [
  {
    id: 'blood-sovereignty',
    name: 'Blood Sovereignty',
    description:
      'The path of the blood sovereign is one of consumption and dominion. You learn to drink deeply of vital essence — from the world, from your enemies, from yourself — and to refine what you take into a crimson authority that bends lesser wills. At its heights, the Blood Sovereign does not merely wield power; they become a living throne of scarlet mandate, their very heartbeat a command that reverberates through the veins of all who stand near.',
    tags: ['blood', 'domination', 'vitality', 'consumption', 'sovereignty'],
    framework: 'absorption-refinement',
    affinities: ['blood', 'vitality', 'domination'],
    oppositions: ['holy', 'machine'],
    ranks: [
      {
        rank: 1 as Rank,
        name: 'Bloodtaster',
        description:
          'You have learned to taste the essence in blood — your own and others. The copper tang on your tongue carries information: health, cultivation level, emotional state, and the faintest echo of lineage. Your veins darken visibly when you draw upon this nascent power.',
        unlockEffects: [
          { type: 'add_tag', target: 'blood-awakened' },
          { type: 'add_resource', target: 'maxEssence', value: 5 },
          { type: 'narrative_log', value: 'Your blood quickens. You taste iron and inheritance on your tongue — the first stirring of the Sovereign path.' },
        ],
      },
      {
        rank: 2 as Rank,
        name: 'Crimson Acolyte',
        description:
          'The blood obeys you now. You can draw it from open wounds at a distance, sense the vital rhythms of nearby creatures, and begin the grim work of absorption — taking the refined essence of defeated foes into your own circulation. Your eyes occasionally flash red in dim light.',
        unlockEffects: [
          { type: 'add_tag', target: 'blood-communion' },
          { type: 'add_resource', target: 'maxVitality', value: 10 },
          { type: 'add_resource', target: 'maxEssence', value: 10 },
          { type: 'add_trait', target: 'crimson-sight' },
          { type: 'narrative_log', value: 'Blood answers your call across open air. The crimson acolyte rises — half healer, half predator, wholly transformed.' },
        ],
      },
      {
        rank: 3 as Rank,
        name: 'Sanguine Tyrant',
        description:
          'Your blood has become a weapon, a shield, and a throne. You can harden it into crystalline armor, project it as lashing whips of vital force, and — most terrifyingly — exert a measure of control over the blood still flowing in living bodies. Those of weaker cultivation feel their pulse stutter when you focus your intent upon them.',
        unlockEffects: [
          { type: 'add_tag', target: 'blood-dominion' },
          { type: 'add_resource', target: 'maxVitality', value: 15 },
          { type: 'add_resource', target: 'maxEssence', value: 15 },
          { type: 'add_title', target: 'sanguine-tyrant' },
          { type: 'add_trait', target: 'blood-pressure-aura' },
          { type: 'narrative_log', value: 'The blood of lesser beings trembles at your approach. You have become the Sanguine Tyrant — sovereign of the vital tide.' },
        ],
      },
    ],
    lore: 'Blood Sovereignty is whispered about in the same breath as forbidden arts, though its practitioners argue — with some justification — that all cultivation involves the refinement of vital essence. They simply dispense with the metaphor. The path traces its origins to the Hemorrhage Courts of the Second Age, where a cabal of cultivators discovered that blood willingly given carried more power than essence painstakingly gathered over decades. The courts fell to internal predation, as such things always do, but the techniques survived in fragmentary manuals written in rust-brown ink that, upon close inspection, is not ink at all.',
  },

  {
    id: 'grave-saint',
    name: 'Grave Saint',
    description:
      'Where others see death as a resource to be exploited, the Grave Saint sees it as a sacred charge. This path cultivates power through funerary rites, the preservation of the departed, and the merciful guidance of lingering spirits toward their rest. It is not a gentle path — the dead do not always wish to go quietly, and the Grave Saint must sometimes use force to grant peace — but it is a righteous one, rooted in compassion for both the living and the dead.',
    tags: ['death', 'spirit', 'sanctity', 'ritual', 'mercy'],
    framework: 'ritual-accumulation',
    affinities: ['death', 'spirit', 'sanctity'],
    oppositions: ['chaos', 'beast'],
    ranks: [
      {
        rank: 1 as Rank,
        name: 'Pallbearer',
        description:
          'You have performed the first rites and felt the weight of the dead settle upon your shoulders — not as a burden, but as a mantle. You can sense the presence of lingering spirits, and your touch brings a measure of comfort to the restless departed. Corpses do not decay as quickly in your presence.',
        unlockEffects: [
          { type: 'add_tag', target: 'death-rites-initiate' },
          { type: 'add_resource', target: 'maxStability', value: 8 },
          { type: 'add_resource', target: 'maxEssence', value: 5 },
          { type: 'narrative_log', value: 'You lift the weight of the dead and find it bearable. The first rite is complete — the dead acknowledge you as one who serves.' },
        ],
      },
      {
        rank: 2 as Rank,
        name: 'Threshold Keeper',
        description:
          'You stand at the boundary between life and death and hold the gate. Spirits cannot cross without your permission — neither into life nor into oblivion. You have learned the deeper rites: the binding of vengeful ghosts, the release of trapped souls, and the slow accumulation of deathly essence that each ceremony leaves behind like sediment in a river.',
        unlockEffects: [
          { type: 'add_tag', target: 'threshold-authority' },
          { type: 'add_resource', target: 'maxStability', value: 12 },
          { type: 'add_resource', target: 'maxEssence', value: 10 },
          { type: 'add_trait', target: 'spirit-gate' },
          { type: 'narrative_log', value: 'The threshold opens before you like a door you have always known. Spirits halt at your raised hand. You are the Keeper now.' },
        ],
      },
      {
        rank: 3 as Rank,
        name: 'Grave Saint',
        description:
          'You have become what the old texts describe as a living reliquary — a being so saturated with funerary power that the boundary between life and death blurs in your presence. The dead rise to serve you not through compulsion but through devotion, recognizing you as their appointed steward. Flowers wilt at your approach, but the dying find peace in your shadow.',
        unlockEffects: [
          { type: 'add_tag', target: 'grave-sanctity' },
          { type: 'add_resource', target: 'maxStability', value: 20 },
          { type: 'add_resource', target: 'maxEssence', value: 15 },
          { type: 'add_title', target: 'grave-saint' },
          { type: 'add_trait', target: 'living-reliquary' },
          { type: 'narrative_log', value: 'The dead kneel. Not because they must, but because they know you. You are the Grave Saint — mercy given form, the last kindness before the long dark.' },
        ],
      },
    ],
    lore: 'The tradition of the Grave Saints predates organized cultivation by centuries. In the earliest days, before essence refinement was understood, there were simply those who tended the dead — and in tending them, absorbed something of their passing. The first Grave Saint was said to be a woman named Ashen Lien, who buried so many plague victims that death itself took notice and offered her a bargain: serve as its steward, and it would grant her the power to ease the suffering of those in its domain. Whether the story is true or metaphor, the result is the same. The Grave Saints walk with death as a companion, not a master, and their accumulated funeral power is vast, patient, and implacable.',
  },

  {
    id: 'oathbound-warden',
    name: 'Oathbound Warden',
    description:
      'Power sealed by vows. Every oath you swear becomes a link in an invisible chain that binds your soul to purpose — and in that binding, you find strength beyond what flesh and essence alone can provide. The Oathbound Warden does not cultivate through meditation or absorption but through commitment. Each promise kept hardens the will, each duty fulfilled tempers the spirit, until the Warden becomes an unbreakable bulwark of sworn intent.',
    tags: ['oath', 'iron', 'will', 'protection', 'binding'],
    framework: 'oath-binding',
    affinities: ['oath', 'iron', 'will', 'protection'],
    oppositions: ['shadow', 'deception'],
    ranks: [
      {
        rank: 1 as Rank,
        name: 'Sworn Sentinel',
        description:
          'You have spoken your first binding oath and felt the words take root in your core like iron seeds. Your body has begun to harden in subtle ways — your bones denser, your skin tougher, your stance more rooted. Breaking a promise now causes you physical pain, a dull ache in your chest where the oath-chains anchor.',
        unlockEffects: [
          { type: 'add_tag', target: 'oath-initiated' },
          { type: 'add_resource', target: 'maxVitality', value: 8 },
          { type: 'add_resource', target: 'maxStability', value: 8 },
          { type: 'narrative_log', value: 'The first oath settles into your bones like molten iron cooling. You are Sworn now. The chain has its first link.' },
        ],
      },
      {
        rank: 2 as Rank,
        name: 'Iron Warden',
        description:
          'Your oaths have accumulated into a lattice of binding force that reinforces your entire being. You can extend your protection to others, shielding those you have sworn to guard with a barrier of condensed will. Your skin takes on a faint metallic sheen under stress, and your voice carries the weight of absolute conviction when you speak your vows.',
        unlockEffects: [
          { type: 'add_tag', target: 'iron-oath-lattice' },
          { type: 'add_resource', target: 'maxVitality', value: 12 },
          { type: 'add_resource', target: 'maxStability', value: 12 },
          { type: 'add_trait', target: 'ward-projection' },
          { type: 'narrative_log', value: 'The lattice completes. Iron will given form — you are the Warden, and those who shelter behind your word shall not be harmed.' },
        ],
      },
      {
        rank: 3 as Rank,
        name: 'Covenant Bastion',
        description:
          'You have become a living fortress of sworn purpose. Your oaths no longer merely strengthen you — they reshape reality in your immediate vicinity. Lies spoken in your presence ring hollow. Betrayals falter. Those who attack someone under your protection find their blows turning aside as if deflected by invisible walls of compressed intent. Your eyes glow with a steady iron light, and your heartbeat sounds like a hammer striking an anvil.',
        unlockEffects: [
          { type: 'add_tag', target: 'covenant-absolute' },
          { type: 'add_resource', target: 'maxVitality', value: 20 },
          { type: 'add_resource', target: 'maxStability', value: 20 },
          { type: 'add_title', target: 'covenant-bastion' },
          { type: 'add_trait', target: 'truth-field' },
          { type: 'narrative_log', value: 'You are the Covenant made flesh. Lies crumble in your shadow. Oathbreakers flee your gaze. The Bastion stands, and shall not fall.' },
        ],
      },
    ],
    lore: 'The Oathbound tradition is rooted in a simple observation: words have power. Not metaphorically — literally. When a cultivator speaks a binding vow with full intent and awareness, the words carve channels in their spiritual architecture through which essence flows with unusual efficiency. The Covenant of Unbroken Words formalized this into a cultivation method, discovering that the more oaths one keeps, the stronger the channels become, until the cultivator\'s entire being is reinforced by a web of fulfilled promises. The danger, of course, is that a broken oath damages those same channels catastrophically. An Oathbound who forswears themselves does not merely lose power — they shatter from within, their spiritual architecture collapsing like a building stripped of its load-bearing walls.',
  },

  {
    id: 'bone-architect',
    name: 'Bone Architect',
    description:
      'Bone remembers. Every skeleton is a record of the life it supported — the stresses it endured, the essence that flowed through its marrow, the shape of the soul it housed. The Bone Architect learns to read these records and, in time, to write new ones. They construct frameworks of spiritual power using bone as their medium, building internal architectures of reinforced remains that channel and amplify essence in ways that conventional cultivation cannot match.',
    tags: ['bone', 'structure', 'craft', 'death', 'construction'],
    framework: 'technical-fabrication',
    affinities: ['bone', 'structure', 'craft', 'death'],
    oppositions: ['nature', 'growth'],
    ranks: [
      {
        rank: 1 as Rank,
        name: 'Osseous Apprentice',
        description:
          'You have learned to sense the residual essence in bones and to shape simple constructs from prepared remains. Your first creation was crude — a charm of finger bones that hums with faint protective energy — but it taught you the fundamental principle: bone is the scaffolding upon which all cultivation can be built.',
        unlockEffects: [
          { type: 'add_tag', target: 'bone-shaping' },
          { type: 'add_resource', target: 'maxEssence', value: 8 },
          { type: 'add_resource', target: 'maxFocus', value: 5 },
          { type: 'narrative_log', value: 'You shape the first bone and feel it resonate. The dead offer their scaffolding to your ambition. The architecture begins.' },
        ],
      },
      {
        rank: 2 as Rank,
        name: 'Marrow Engineer',
        description:
          'Your constructs have grown sophisticated. You can graft supplementary bone structures onto your own skeleton — reinforcing ribs, adding sub-dermal plates, threading channels of hollowed bone through your body that serve as dedicated essence conduits. The process is agonizing but the results are undeniable: you are stronger, more durable, and your essence flows with mechanical precision.',
        unlockEffects: [
          { type: 'add_tag', target: 'bone-grafting' },
          { type: 'add_resource', target: 'maxEssence', value: 12 },
          { type: 'add_resource', target: 'maxFocus', value: 10 },
          { type: 'add_resource', target: 'maxVitality', value: 8 },
          { type: 'add_trait', target: 'osseous-conduits' },
          { type: 'narrative_log', value: 'Bone grafted to bone. New channels carved through marrow. You are the engineer of your own skeleton, and the architecture grows.' },
        ],
      },
      {
        rank: 3 as Rank,
        name: 'Bone Architect',
        description:
          'You have transcended the limitations of a single skeleton. Your body now houses an intricate secondary structure of cultivated bone — a masterwork of spiritual engineering that amplifies your essence capacity severalfold. You can project bone constructs externally: walls, bridges, cages, weapons — all grown from your body in seconds and imbued with your refined essence. Other cultivators find your appearance unsettling, as your silhouette occasionally shifts with the movement of structures beneath your skin.',
        unlockEffects: [
          { type: 'add_tag', target: 'bone-mastery' },
          { type: 'add_resource', target: 'maxEssence', value: 20 },
          { type: 'add_resource', target: 'maxFocus', value: 15 },
          { type: 'add_resource', target: 'maxVitality', value: 12 },
          { type: 'add_title', target: 'bone-architect' },
          { type: 'add_trait', target: 'living-ossuary' },
          { type: 'set_body_state', target: 'augmented' },
          { type: 'narrative_log', value: 'The architecture is complete. You are scaffold and builder both — the Bone Architect, a cathedral of cultivated remains walking in human shape.' },
        ],
      },
    ],
    lore: 'The Bone Architects trace their lineage to the Sepulcher Academies, where anatomists and cultivators worked side by side to understand the relationship between physical structure and spiritual capacity. They discovered that bone — particularly bone that has housed a cultivator\'s essence for decades — develops a crystalline microstructure that channels spiritual energy with remarkable efficiency. From this discovery came the grim but practical art of bone architecture: the systematic harvest, preparation, and integration of skeletal material into living cultivators. The Academies were eventually destroyed by an alliance of orthodox sects who found the practice abhorrent, but the techniques survived in coded manuals disguised as anatomical texts, passed down through a chain of renegade surgeons and graverobbers.',
  },

  {
    id: 'shadow-pilgrim',
    name: 'Shadow Pilgrim',
    description:
      'Between the world of the living and the realm of the dead, there exists a liminal space — a twilight territory where shadows have substance and silence has texture. The Shadow Pilgrim walks this border, drawing power from the passage itself rather than from either destination. They are travelers of the in-between, and the deeper they walk into the twilight, the less they belong to either world and the more they belong to both.',
    tags: ['shadow', 'spirit', 'passage', 'liminal', 'pilgrim'],
    framework: 'void-pilgrimage',
    affinities: ['shadow', 'spirit', 'passage', 'liminal'],
    oppositions: ['fire', 'radiance'],
    ranks: [
      {
        rank: 1 as Rank,
        name: 'Dusk Walker',
        description:
          'You have taken your first steps into the space between. Shadows cling to you like affectionate cats, pooling at your feet and stretching toward you when you enter a room. You can dim lights with your presence and move with unnatural silence. In moments of deep focus, you can perceive the faint outlines of the spirit world overlaid upon the physical.',
        unlockEffects: [
          { type: 'add_tag', target: 'shadow-touched' },
          { type: 'add_resource', target: 'maxEssence', value: 8 },
          { type: 'add_resource', target: 'maxFocus', value: 8 },
          { type: 'narrative_log', value: 'The shadows welcome you as kin. You step between the light and the dark, and find a road there that others cannot see.' },
        ],
      },
      {
        rank: 2 as Rank,
        name: 'Twilight Wayfarer',
        description:
          'The liminal space has become your second home. You can step sideways out of the physical world for brief moments, traveling through the shadow-realm to emerge elsewhere. Spirits see you as one of their own. Your reflection has begun to move independently, and your shadow sometimes arrives at your destination before you do.',
        unlockEffects: [
          { type: 'add_tag', target: 'liminal-passage' },
          { type: 'add_resource', target: 'maxEssence', value: 12 },
          { type: 'add_resource', target: 'maxFocus', value: 12 },
          { type: 'add_trait', target: 'shadow-step' },
          { type: 'narrative_log', value: 'You walk the twilight road with sure feet now. Your shadow leads, your reflection follows, and you exist in the space between all things.' },
        ],
      },
      {
        rank: 3 as Rank,
        name: 'Shadow Pilgrim',
        description:
          'You have walked so far into the twilight that you have become part of it. Your body can shift between solid and shadow at will. You perceive the world through a dual lens — physical and spiritual simultaneously — and can interact with both at once. The dead speak to you freely, the living find your gaze unsettling, and in certain lights, you are not entirely visible. You have become a pilgrim of the space between, and the pilgrimage is eternal.',
        unlockEffects: [
          { type: 'add_tag', target: 'shadow-ascended' },
          { type: 'add_resource', target: 'maxEssence', value: 18 },
          { type: 'add_resource', target: 'maxFocus', value: 18 },
          { type: 'add_title', target: 'shadow-pilgrim' },
          { type: 'add_trait', target: 'dual-existence' },
          { type: 'set_body_state', target: 'spectral' },
          { type: 'narrative_log', value: 'You are neither here nor there, neither living nor dead. You are the Shadow Pilgrim — the eternal walker between, the one who belongs to every threshold and no destination.' },
        ],
      },
    ],
    lore: 'The Shadow Pilgrims are perhaps the most misunderstood of all cultivation traditions. They are not necromancers, though they speak with the dead. They are not assassins, though they walk unseen. They are, in the truest sense, pilgrims — seekers on an endless journey through the spaces that exist between defined things. The tradition began with the Liminal Monks of the Greywall Monastery, who meditated in the shadow of a cliff face that marked the exact boundary between two rival kingdoms. In that contested no-man\'s-land, they discovered that boundaries themselves hold power — and that one who walks enough boundaries begins to embody the concept of passage itself. The monastery was swallowed by shadow long ago, but the pilgrimage continues.',
  },
];

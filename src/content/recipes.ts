import type { RecipeDef } from '../engine/types';

export const recipes: RecipeDef[] = [
  {
    id: 'bone-ward-talisman',
    name: 'Bone Ward Talisman',
    description: 'A talisman carved from grave iron and ancient bone, inscribed with protective wards.',
    tags: ['bone', 'defense', 'craft'],
    inputs: [
      { itemId: 'ancient-bone-fragment', quantity: 2 },
      { itemId: 'grave-iron', quantity: 1 },
    ],
    conditions: [{ type: 'has_method', target: 'bone-shaping' }],
    baseOutput: 'bone-ward-talisman-item',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'bone-architect' },
        description: 'Bone Architect: Talisman gains enhanced structural resonance.',
        outputOverride: undefined,
        bonusEffects: [{ type: 'add_stability', value: 5 }, { type: 'narrative_log', value: 'Your bone architect\'s instinct shapes the talisman into something greater — the wards interlock like a skeletal lattice.' }],
      },
    ],
    lore: 'The dead protect the living, if you know how to ask. A bone ward talisman is a polite request written in calcium and iron.',
  },
  {
    id: 'blood-phial-craft',
    name: 'Refined Blood Phial',
    description: 'Crystallize raw blood essence into a concentrated restorative phial.',
    tags: ['blood', 'consumable', 'craft'],
    inputs: [
      { itemId: 'congealed-blood-crystal', quantity: 1 },
    ],
    conditions: [{ type: 'has_method', target: 'blood-inscription' }],
    baseOutput: 'blood-phial',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'blood-sovereignty' },
        description: 'Blood Sovereign: Phial contains enhanced vitae.',
        bonusEffects: [{ type: 'add_resource', target: 'essence', value: 10 }, { type: 'narrative_log', value: 'Your blood sovereignty refines the crystal into something purer — the phial glows with deep crimson light.' }],
      },
    ],
    lore: 'Blood is just essence wearing a red coat. A skilled inscriptor can convince it to take off the coat.',
  },
  {
    id: 'spirit-candle-craft',
    name: 'Spirit Candle',
    description: 'A candle that burns with spectral light, revealing the unseen.',
    tags: ['spirit', 'consumable', 'craft'],
    inputs: [
      { itemId: 'spirit-amber', quantity: 1 },
      { itemId: 'sanctified-ash', quantity: 1 },
    ],
    conditions: [],
    baseOutput: 'spirit-candle',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'grave-saint' },
        description: 'Grave Saint: Candle burns longer and reveals deeper truths.',
        bonusEffects: [{ type: 'add_resource', target: 'focus', value: 5 }, { type: 'narrative_log', value: 'Your sanctified hands shape the candle with practiced reverence. It will burn for hours, showing you things the dead themselves have forgotten.' }],
      },
    ],
    lore: 'Spirit candles do not burn wax. They burn the boundary between the seen and unseen. What they illuminate was always there.',
  },
  {
    id: 'oath-iron-blade',
    name: 'Oath Iron Blade',
    description: 'A blade forged from grave iron and bound with oath stone, carrying the weight of vows.',
    tags: ['oath', 'iron', 'weapon', 'craft'],
    inputs: [
      { itemId: 'grave-iron', quantity: 2 },
      { itemId: 'oath-stone', quantity: 1 },
    ],
    conditions: [{ type: 'has_trait', target: 'oathbound' }],
    baseOutput: 'oath-iron-blade-item',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'oathbound-warden' },
        description: 'Oathbound Warden: Blade resonates with your vows, gaining spiritual weight.',
        bonusEffects: [{ type: 'add_stability', value: 5 }, { type: 'add_method_mastery', target: 'iron-oath-blow', value: 1 }, { type: 'narrative_log', value: 'The blade sings as you forge it, harmonizing with the oaths that bind your spirit. This is not merely a weapon — it is a promise made steel.' }],
      },
    ],
    lore: 'An oath iron blade cannot be broken by force. It can only be broken by betrayal.',
  },
  {
    id: 'shadow-cloak-craft',
    name: 'Shadow Cloak',
    description: 'A cloak woven from void silk that drinks in light.',
    tags: ['shadow', 'vestment', 'craft'],
    inputs: [
      { itemId: 'void-silk-thread', quantity: 3 },
    ],
    conditions: [{ type: 'has_method', target: 'shadow-walk' }],
    baseOutput: 'shadow-veil',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'shadow-pilgrim' },
        description: 'Shadow Pilgrim: Cloak becomes a gateway to the liminal space.',
        bonusEffects: [{ type: 'add_resource', target: 'maxEssence', value: 5 }, { type: 'narrative_log', value: 'The void silk responds to your pilgrim nature. The cloak does not merely conceal — it partially exists in the shadow realm.' }],
      },
    ],
    lore: 'Light enters the shadow cloak and does not return. This is not absorption. The light simply finds somewhere better to be.',
  },
  {
    id: 'relic-restoration',
    name: 'Relic Restoration',
    description: 'Restore a shattered artifact from its fragments, calling back its lost power.',
    tags: ['relic', 'spirit', 'craft'],
    inputs: [
      { itemId: 'relic-shard', quantity: 3 },
      { itemId: 'spirit-amber', quantity: 1 },
    ],
    conditions: [{ type: 'has_method', target: 'relic-attunement' }],
    baseOutput: 'mourners-lantern',
    modifiers: [
      {
        condition: { type: 'has_trait', target: 'relic-bonded' },
        description: 'Relic Bonded: Restored artifact awakens with greater power.',
        bonusEffects: [{ type: 'add_resource', target: 'focus', value: 10 }, { type: 'narrative_log', value: 'The relic recognizes you as kin. It reassembles not just into what it was, but into what it wanted to become.' }],
      },
    ],
    lore: 'No relic is truly destroyed. It merely disassembles and waits for someone patient enough to reassemble it. Relics are stubborn that way.',
  },
  {
    id: 'corpse-wax-seal-craft',
    name: 'Corpse Wax Seal',
    description: 'A waxy compound that seals wounds and preserves vitality.',
    tags: ['death', 'consumable', 'craft'],
    inputs: [
      { itemId: 'bone-dust', quantity: 2 },
      { itemId: 'blood-phial', quantity: 1 },
    ],
    conditions: [],
    baseOutput: 'corpse-wax',
    modifiers: [],
    lore: 'Corpse wax forms naturally on the ancient dead. Crafting it fresh requires combining the vitality of blood with the permanence of bone.',
  },
  {
    id: 'runed-bone-chisel-craft',
    name: 'Runed Bone Chisel',
    description: 'An enhanced bone chisel inscribed with shadow runes for precision shaping.',
    tags: ['bone', 'shadow', 'implement', 'craft'],
    inputs: [
      { itemId: 'ancient-bone-fragment', quantity: 1 },
      { itemId: 'grave-iron', quantity: 1 },
      { itemId: 'shadow-ink', quantity: 1 },
    ],
    conditions: [{ type: 'has_method', target: 'bone-shaping' }],
    baseOutput: 'bone-chisel',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'bone-architect' },
        description: 'Bone Architect: Chisel gains resonant feedback, improving all bone crafting.',
        bonusEffects: [{ type: 'add_method_mastery', target: 'bone-shaping', value: 1 }, { type: 'narrative_log', value: 'The runes pulse in time with your bone resonance. This tool is an extension of your architectural vision.' }],
      },
    ],
    lore: 'A runed bone chisel does not cut bone. It convinces bone to reshape itself. The runes are the argument.',
  },
  {
    id: 'bone-marrow-tonic-craft',
    name: 'Bone Marrow Tonic',
    description: 'Render ancient bone and corpse wax into a deep-healing tonic that restores structural vitality.',
    tags: ['bone', 'healing', 'craft'],
    inputs: [
      { itemId: 'ancient-bone-fragment', quantity: 1 },
      { itemId: 'corpse-wax', quantity: 1 },
    ],
    conditions: [],
    baseOutput: 'bone-marrow-tonic',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'bone-architect' },
        description: 'Bone Architect: Tonic resonates with your skeletal attunement, restoring even more vitality.',
        bonusEffects: [{ type: 'add_resource', target: 'vitality', value: 15 }, { type: 'narrative_log', value: 'Your bone architect\'s understanding guides the rendering. The tonic carries not just marrow but memory — the body heals deeper than flesh.' }],
      },
    ],
    lore: 'Marrow is the factory of the body, the place where vitality is manufactured. A tonic made from ancient marrow carries the blueprints of a stronger age.',
  },
  {
    id: 'essence-condensate-craft',
    name: 'Essence Condensate',
    description: 'Compress spirit amber and blood crystal into a single drop of pure, concentrated essence.',
    tags: ['essence', 'cultivation', 'craft'],
    inputs: [
      { itemId: 'spirit-amber', quantity: 2 },
      { itemId: 'congealed-blood-crystal', quantity: 1 },
    ],
    conditions: [],
    baseOutput: 'essence-condensate',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'grave-saint' },
        description: 'Grave Saint: Condensate also restores mental clarity alongside essence.',
        bonusEffects: [{ type: 'add_resource', target: 'focus', value: 10 }, { type: 'narrative_log', value: 'Your sanctified hands draw more from the amber than mere essence. The condensate shimmers with clarity — it will restore mind as well as power.' }],
      },
    ],
    lore: 'Essence exists in everything, dilute and scattered. Condensation is the art of gathering the scattered into the singular. One perfect drop.',
  },
  {
    id: 'stability-elixir-craft',
    name: 'Stability Elixir',
    description: 'Combine sanctified ash and iron tonic into a purifying elixir that steadies the foundation.',
    tags: ['stability', 'purification', 'craft'],
    inputs: [
      { itemId: 'sanctified-ash', quantity: 2 },
      { itemId: 'iron-tonic', quantity: 1 },
    ],
    conditions: [],
    baseOutput: 'stability-elixir',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'oathbound-warden' },
        description: 'Oathbound Warden: Elixir purges corruption more aggressively, strengthened by your sworn resolve.',
        bonusEffects: [{ type: 'add_corruption', value: -3 }, { type: 'narrative_log', value: 'Your warden\'s discipline infuses the elixir with the force of your oaths. Corruption does not merely recede — it is driven out.' }],
      },
    ],
    lore: 'Ash remembers fire. Iron remembers earth. Together they remember a time before corruption, and they carry that memory into the drinker.',
  },
  {
    id: 'blood-wine-craft',
    name: 'Blood Wine',
    description: 'Ferment dark sap with blood crystal into a potent but corrupting restorative wine.',
    tags: ['blood', 'consumable', 'craft'],
    inputs: [
      { itemId: 'dark-sap', quantity: 2 },
      { itemId: 'congealed-blood-crystal', quantity: 1 },
    ],
    conditions: [],
    baseOutput: 'blood-wine',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'blood-sovereignty' },
        description: 'Blood Sovereign: Wine carries less corruption, refined by your mastery over blood.',
        bonusEffects: [{ type: 'add_corruption', value: -2 }, { type: 'narrative_log', value: 'Your blood sovereignty tames the wine\'s darker impulses. The corruption that rides within it bows to your authority and dissipates.' }],
      },
    ],
    lore: 'The old blood courts perfected this recipe over centuries. They never shared it willingly. Those who stole it learned why — the wine is generous with power and patient with its price.',
  },
  {
    id: 'plague-mask-craft',
    name: "Plague Doctor's Mask",
    description: 'Shape plague spores, grave iron, and spirit amber into a mask that wards against corruption.',
    tags: ['death', 'disease', 'relic', 'craft'],
    inputs: [
      { itemId: 'plague-spore', quantity: 3 },
      { itemId: 'grave-iron', quantity: 1 },
      { itemId: 'spirit-amber', quantity: 1 },
    ],
    conditions: [{ type: 'has_method', target: 'bone-shaping' }],
    baseOutput: 'plague-doctors-mask',
    modifiers: [],
    lore: 'The original masks were shaped from the bones of plague cultivators who died in the field. Modern recreations use spores and iron instead, but the principle is the same: fight corruption with corruption\'s own memory.',
  },
  {
    id: 'spirit-incense-craft',
    name: 'Spirit Incense',
    description: 'Compress spirit residue and sanctified ash into incense that amplifies spirit methods.',
    tags: ['spirit', 'ritual', 'craft'],
    inputs: [
      { itemId: 'spirit-residue', quantity: 2 },
      { itemId: 'sanctified-ash', quantity: 1 },
    ],
    conditions: [],
    baseOutput: 'spirit-incense',
    modifiers: [
      {
        condition: { type: 'has_trait', target: 'spirit-sight' },
        description: 'Spirit Sight: Incense burns longer and with greater intensity, sustained by your innate connection.',
        bonusEffects: [{ type: 'add_resource', target: 'focus', value: 5 }, { type: 'narrative_log', value: 'Your spirit sight feeds the incense. The smoke thickens and lingers, the boundary between worlds thinning further. Your methods will burn bright for a long time.' }],
      },
    ],
    lore: 'Spirit residue alone dissipates too quickly. Sanctified ash gives it weight, grounds it in the material world. The combination burns slowly, releasing the spiritual energy in a steady stream rather than a flash.',
  },
  {
    id: 'oath-chain-craft',
    name: 'Chain of Binding Oaths',
    description: 'Forge oath fragments and grave iron into a chain heavy with the weight of vows.',
    tags: ['oath', 'iron', 'relic', 'craft'],
    inputs: [
      { itemId: 'oath-fragment', quantity: 3 },
      { itemId: 'grave-iron', quantity: 2 },
    ],
    conditions: [{ type: 'has_method', target: 'oath-tempering' }],
    baseOutput: 'chain-of-binding-oaths',
    modifiers: [],
    lore: 'Each link must be forged while swearing a true oath. Lie during the forging and the link shatters. The chain is only as strong as the conviction that shaped it.',
  },
  {
    id: 'fog-pearl-amulet-craft',
    name: 'Fog Pearl Amulet',
    description: 'Set a fog pearl in void silk and spirit amber to create a mirror that reveals hidden truths.',
    tags: ['shadow', 'liminal', 'relic', 'craft'],
    inputs: [
      { itemId: 'fog-pearl', quantity: 1 },
      { itemId: 'void-silk-thread', quantity: 1 },
      { itemId: 'spirit-amber', quantity: 1 },
    ],
    conditions: [],
    baseOutput: 'mirror-of-liminal',
    modifiers: [
      {
        condition: { type: 'has_path', target: 'shadow-pilgrim' },
        description: 'Shadow Pilgrim: Mirror reveals deeper layers, enhanced by your familiarity with the liminal.',
        bonusEffects: [{ type: 'add_resource', target: 'focus', value: 10 }, { type: 'narrative_log', value: 'The fog pearl recognizes your pilgrim nature. The mirror it becomes shows not just hidden things but hidden meanings — the reasons behind the concealment.' }],
      },
    ],
    lore: 'A fog pearl set in the right frame becomes a lens for seeing what is deliberately hidden. The void silk provides the frame; the spirit amber provides the light. Together they create something that refuses to be deceived.',
  },
];

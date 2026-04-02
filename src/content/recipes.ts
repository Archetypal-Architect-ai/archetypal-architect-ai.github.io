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
];

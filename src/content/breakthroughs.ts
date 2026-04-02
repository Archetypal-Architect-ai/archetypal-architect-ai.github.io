import type { BreakthroughDef } from '../engine/types';

export const breakthroughs: BreakthroughDef[] = [
  // === TIER 1: Mortal → Initiate (Rank 1 → 2) ===
  {
    id: 'awakening-inner-gate',
    name: 'Awakening of the Inner Gate',
    description: 'Open the first gate of cultivation and step beyond mortal limits.',
    tags: ['cultivation', 'awakening', 'universal'],
    targetRank: 2,
    conditions: [
      { type: 'min_rank', value: 1 },
    ],
    resourceCost: { essence: 40, focus: 20 },
    minCoherence: 20,
    riskFactors: [
      {
        condition: { type: 'max_resource', target: 'stability', value: 30 },
        description: 'Low stability may cause cultivation deviation.',
        penaltyEffects: [{ type: 'add_corruption', value: 5 }, { type: 'narrative_log', value: 'Your unstable foundation cracks during the breakthrough. Corruption seeps in.' }],
      },
    ],
    successEffects: [
      { type: 'add_resource', target: 'maxEssence', value: 30 },
      { type: 'add_resource', target: 'maxFocus', value: 15 },
      { type: 'add_resource', target: 'maxVitality', value: 20 },
      { type: 'add_path_depth', value: 2 },
      { type: 'narrative_log', value: 'The Inner Gate opens. Power floods through you like a river breaking a dam. You are no longer merely mortal.' },
    ],
    failureEffects: [
      { type: 'add_resource', target: 'essence', value: -20 },
      { type: 'add_stability', value: -15 },
      { type: 'narrative_log', value: 'The gate resists. Your essence scatters like sparks in wind. You feel diminished, but intact.' },
    ],
    forcedEffects: [
      { type: 'add_corruption', value: 10 },
      { type: 'add_stability', value: -20 },
      { type: 'add_trait', target: 'corruption-scarred' },
      { type: 'narrative_log', value: 'You wrench the gate open by force. Something tears — in your spirit, in your foundation. The power comes, but it comes wrong.' },
    ],
    lore: 'The Inner Gate is the first truth of cultivation: you are not what you were born as. You are what you choose to become. The gate only asks whether you mean it.',
  },

  // === TIER 2: Initiate → Adept (Rank 2 → 3) — Path-Specific ===
  {
    id: 'blood-tide-ascension',
    name: 'Blood Tide Ascension',
    description: 'Let the blood tide rise within and claim the power of sanguine mastery.',
    tags: ['blood', 'cultivation', 'ascension'],
    targetRank: 3,
    conditions: [
      { type: 'min_rank', value: 2 },
      { type: 'has_path', target: 'blood-sovereignty' },
      { type: 'has_trait', target: 'blood-awakened' },
    ],
    resourceCost: { essence: 80, focus: 30, stability: 25 },
    minCoherence: 40,
    riskFactors: [
      {
        condition: { type: 'min_resource', target: 'corruption', value: 15 },
        description: 'High corruption may cause the blood to turn against you.',
        penaltyEffects: [
          { type: 'damage', value: 20 },
          { type: 'add_corruption', value: 10 },
          { type: 'narrative_log', value: 'Your corrupted blood rebels, burning through your veins like acid.' },
        ],
      },
    ],
    successEffects: [
      { type: 'add_resource', target: 'maxEssence', value: 50 },
      { type: 'add_resource', target: 'maxVitality', value: 30 },
      { type: 'add_trait', target: 'corpse-pale' },
      { type: 'add_path_depth', value: 3 },
      { type: 'add_tag', target: 'blood-adept' },
      { type: 'narrative_log', value: 'The blood tide rises. Your veins glow crimson beneath pale skin. Every heartbeat is a drum of power.' },
    ],
    failureEffects: [
      { type: 'damage', value: 30 },
      { type: 'add_resource', target: 'essence', value: -40 },
      { type: 'add_corruption', value: 5 },
      { type: 'narrative_log', value: 'The blood refuses to transform. It pools and stagnates. You cough crimson and feel the weakness of failure.' },
    ],
    forcedEffects: [
      { type: 'add_corruption', value: 15 },
      { type: 'add_stability', value: -30 },
      { type: 'set_body_state', target: 'mutated' },
      { type: 'narrative_log', value: 'You force the blood to obey. It obeys — but it changes you. Your flesh warps, your veins become visible, pulsing with dark light.' },
    ],
    lore: 'The Blood Tide is not a metaphor. Every blood cultivator reaches a point where their blood becomes something other than human. The question is whether you drown in it or surf it.',
  },
  {
    id: 'grave-consecration',
    name: 'Grave Consecration',
    description: 'Consecrate your spirit in the manner of the ancient grave saints.',
    tags: ['death', 'sanctity', 'cultivation'],
    targetRank: 3,
    conditions: [
      { type: 'min_rank', value: 2 },
      { type: 'has_path', target: 'grave-saint' },
      { type: 'has_trait', target: 'spirit-sight' },
    ],
    resourceCost: { essence: 70, focus: 40, stability: 20 },
    minCoherence: 40,
    riskFactors: [
      {
        condition: { type: 'min_resource', target: 'corruption', value: 10 },
        description: 'Corruption may taint the consecration.',
        penaltyEffects: [
          { type: 'add_stability', value: -15 },
          { type: 'narrative_log', value: 'The corruption in your spirit clashes with the sacred rites, leaving cracks in your foundation.' },
        ],
      },
    ],
    successEffects: [
      { type: 'add_resource', target: 'maxEssence', value: 40 },
      { type: 'add_resource', target: 'maxFocus', value: 25 },
      { type: 'add_resource', target: 'maxStability', value: 20 },
      { type: 'add_path_depth', value: 3 },
      { type: 'add_tag', target: 'consecrated' },
      { type: 'narrative_log', value: 'The dead bear witness as you consecrate your spirit. A cold light settles into your bones. You are sanctified.' },
    ],
    failureEffects: [
      { type: 'add_resource', target: 'focus', value: -20 },
      { type: 'add_stability', value: -10 },
      { type: 'narrative_log', value: 'The consecration falters. The dead turn away. You are left standing in silence, unchanged.' },
    ],
    forcedEffects: [
      { type: 'add_corruption', value: 8 },
      { type: 'add_stability', value: -25 },
      { type: 'narrative_log', value: 'You force the consecration against the will of the dead. It takes — but the dead remember your presumption.' },
    ],
    lore: 'A Grave Saint does not command death. A Grave Saint is recognized by it. Consecration is the moment death looks at you and nods.',
  },
  {
    id: 'iron-oath-apotheosis',
    name: 'Iron Oath Apotheosis',
    description: 'Let your accumulated oaths forge your spirit into unbreakable iron.',
    tags: ['oath', 'iron', 'cultivation', 'will'],
    targetRank: 3,
    conditions: [
      { type: 'min_rank', value: 2 },
      { type: 'has_path', target: 'oathbound-warden' },
      { type: 'has_trait', target: 'iron-constitution' },
    ],
    resourceCost: { essence: 60, focus: 30, stability: 40 },
    minCoherence: 40,
    riskFactors: [
      {
        condition: { type: 'not', inner: { type: 'has_trait', target: 'oathbound' } },
        description: 'Without active oaths, the apotheosis has nothing to forge.',
        penaltyEffects: [
          { type: 'add_stability', value: -30 },
          { type: 'narrative_log', value: 'Without the weight of oaths, the forge finds nothing to shape. You shatter internally.' },
        ],
      },
    ],
    successEffects: [
      { type: 'add_resource', target: 'maxStability', value: 40 },
      { type: 'add_resource', target: 'maxVitality', value: 30 },
      { type: 'add_resource', target: 'maxFocus', value: 15 },
      { type: 'add_path_depth', value: 3 },
      { type: 'add_tag', target: 'iron-forged' },
      { type: 'narrative_log', value: 'Your oaths become chains of light that wrap your spirit and harden into iron. You are forged. You will not break.' },
    ],
    failureEffects: [
      { type: 'add_stability', value: -20 },
      { type: 'add_resource', target: 'focus', value: -15 },
      { type: 'narrative_log', value: 'The forge burns cold. Your oaths flicker but do not catch. The apotheosis rejects you — for now.' },
    ],
    forcedEffects: [
      { type: 'add_corruption', value: 5 },
      { type: 'add_stability', value: -35 },
      { type: 'add_trait', target: 'corruption-scarred' },
      { type: 'narrative_log', value: 'You force the iron to take shape. It does — but the metal is flawed, threaded with corruption. An imperfect forging.' },
    ],
    lore: 'The Iron Oath Apotheosis is simple in principle. You place everything you are on the anvil of your vows and let duty hammer you into a new shape.',
  },
  {
    id: 'skeletal-convergence',
    name: 'Skeletal Convergence',
    description: 'Merge your cultivation with the architecture of bone itself.',
    tags: ['bone', 'structure', 'cultivation'],
    targetRank: 3,
    conditions: [
      { type: 'min_rank', value: 2 },
      { type: 'has_path', target: 'bone-architect' },
      { type: 'has_trait', target: 'bone-resonance' },
    ],
    resourceCost: { essence: 70, focus: 35, stability: 20 },
    minCoherence: 40,
    riskFactors: [
      {
        condition: { type: 'max_resource', target: 'stability', value: 25 },
        description: 'Weak stability may cause your bones to restructure painfully.',
        penaltyEffects: [
          { type: 'damage', value: 25 },
          { type: 'set_body_state', target: 'mutated' },
          { type: 'narrative_log', value: 'Your skeleton reshapes itself without guidance. The pain is extraordinary.' },
        ],
      },
    ],
    successEffects: [
      { type: 'add_resource', target: 'maxEssence', value: 35 },
      { type: 'add_resource', target: 'maxFocus', value: 20 },
      { type: 'add_resource', target: 'maxVitality', value: 25 },
      { type: 'add_path_depth', value: 3 },
      { type: 'add_tag', target: 'bone-convergent' },
      { type: 'narrative_log', value: 'Your bones sing in harmony. The architecture of death becomes the architecture of your power. You are a living ossuary.' },
    ],
    failureEffects: [
      { type: 'add_resource', target: 'essence', value: -30 },
      { type: 'damage', value: 15 },
      { type: 'narrative_log', value: 'The bones reject convergence. They rattle and settle, unchanged. Your body aches with phantom fractures.' },
    ],
    forcedEffects: [
      { type: 'set_body_state', target: 'crystalline' },
      { type: 'add_corruption', value: 8 },
      { type: 'narrative_log', value: 'You force the convergence. Your bones crystallize, becoming something neither bone nor stone. The transformation is irreversible and... incomplete.' },
    ],
    lore: 'A Bone Architect does not build houses. They build themselves. Skeletal Convergence is the moment you stop having a skeleton and start being one.',
  },
  {
    id: 'shadow-threshold-crossing',
    name: 'Shadow Threshold',
    description: 'Cross fully into the liminal space and return changed.',
    tags: ['shadow', 'liminal', 'passage', 'cultivation'],
    targetRank: 3,
    conditions: [
      { type: 'min_rank', value: 2 },
      { type: 'has_path', target: 'shadow-pilgrim' },
      { type: 'has_trait', target: 'shadow-touched' },
    ],
    resourceCost: { essence: 75, focus: 35, stability: 30 },
    minCoherence: 40,
    riskFactors: [
      {
        condition: { type: 'max_resource', target: 'focus', value: 15 },
        description: 'Low focus may cause you to lose yourself in the shadow realm.',
        penaltyEffects: [
          { type: 'add_stability', value: -25 },
          { type: 'add_corruption', value: 8 },
          { type: 'narrative_log', value: 'The shadow realm pulls at your identity. Pieces of you scatter into the dark. You return, but less than you were.' },
        ],
      },
    ],
    successEffects: [
      { type: 'add_resource', target: 'maxEssence', value: 45 },
      { type: 'add_resource', target: 'maxFocus', value: 20 },
      { type: 'add_path_depth', value: 3 },
      { type: 'set_body_state', target: 'spectral' },
      { type: 'add_tag', target: 'shadow-crossed' },
      { type: 'narrative_log', value: 'You step through the threshold. The shadow realm accepts you. When you return, your edges are soft, your footsteps silent. You are between.' },
    ],
    failureEffects: [
      { type: 'add_resource', target: 'essence', value: -35 },
      { type: 'add_stability', value: -15 },
      { type: 'narrative_log', value: 'The threshold refuses to open fully. You slam against the barrier between worlds and bounce back, dazed and drained.' },
    ],
    forcedEffects: [
      { type: 'add_corruption', value: 12 },
      { type: 'add_stability', value: -30 },
      { type: 'set_body_state', target: 'spectral' },
      { type: 'narrative_log', value: 'You tear through the threshold by force. The shadow realm floods into you. You are changed, but something from the other side came back with you.' },
    ],
    lore: 'The Shadow Threshold is not a door. It is a question: Are you willing to become something that exists in two places at once? The answer costs you your certainty.',
  },
];

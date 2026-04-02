// ============================================================================
// Dragonsloft Cultivation RPG Engine — Progression System
// ============================================================================
//
// Handles breakthroughs, method mastery, path depth, title earning,
// trait evolution, meditation, and all forms of character advancement.
// ============================================================================

import type {
  GameState,
  CharacterState,
  WorldState,
  ContentPack,
  BreakthroughDef,
  TitleDef,
  TraitDef,
  Effect,
  Rank,
} from './types';

import { checkCondition } from './world';

// ---------------------------------------------------------------------------
// Breakthrough Attempt
// ---------------------------------------------------------------------------

export interface BreakthroughResult {
  state: GameState;
  result: 'success' | 'failure' | 'forced';
  narrative: string[];
}

/**
 * Attempt a cultivation breakthrough.
 *
 * Flow:
 *   1. Verify conditions are met (or force=true).
 *   2. Check coherence threshold.
 *   3. Deduct resource costs.
 *   4. Evaluate risk factors.
 *   5. On success: apply successEffects, advance rank.
 *   6. On failure: apply failureEffects.
 *   7. If forced despite unmet conditions: also apply forcedEffects.
 */
export function attemptBreakthrough(
  state: GameState,
  breakthrough: BreakthroughDef,
  content: ContentPack,
  force?: boolean,
): BreakthroughResult {
  const narrative: string[] = [];
  let current = { ...state };

  // --- Check conditions ---
  const conditionsMet = breakthrough.conditions.every((cond) =>
    checkCondition(cond, current.character, current.world, content),
  );

  const meetsCoherence = current.coherence >= breakthrough.minCoherence;

  if (!conditionsMet && !force) {
    narrative.push(
      `You are not yet ready for the ${breakthrough.name}. Prerequisites remain unfulfilled.`,
    );
    return { state: current, result: 'failure', narrative };
  }

  if (!meetsCoherence && !force) {
    narrative.push(
      `Your cultivation lacks the coherence required for ${breakthrough.name}. ` +
      `Current coherence: ${current.coherence}, required: ${breakthrough.minCoherence}.`,
    );
    return { state: current, result: 'failure', narrative };
  }

  // --- Deduct resource costs ---
  const canAfford = checkResourceCosts(current.character, breakthrough.resourceCost);
  if (!canAfford && !force) {
    narrative.push(
      `Insufficient resources for the ${breakthrough.name}. Gather more before attempting.`,
    );
    return { state: current, result: 'failure', narrative };
  }

  // Deduct what we can
  current = {
    ...current,
    character: deductResources(current.character, breakthrough.resourceCost),
  };

  narrative.push(`You begin the ${breakthrough.name}...`);

  // --- Evaluate risk factors ---
  const activeRisks: string[] = [];
  for (const risk of breakthrough.riskFactors) {
    if (checkCondition(risk.condition, current.character, current.world, content)) {
      activeRisks.push(risk.description);
      current = applyEffectsToState(current, risk.penaltyEffects);
    }
  }

  if (activeRisks.length > 0) {
    narrative.push(`Risk factors manifest: ${activeRisks.join('; ')}.`);
  }

  // --- Determine outcome ---
  const isForced = force && (!conditionsMet || !meetsCoherence || !canAfford);

  if (isForced) {
    // Forced breakthrough: apply success effects AND forced effects
    narrative.push(
      `You force the breakthrough through sheer will, tearing against the natural flow of cultivation.`,
    );

    current = applyEffectsToState(current, breakthrough.successEffects);
    current = applyEffectsToState(current, breakthrough.forcedEffects);

    // Advance rank
    current = advanceRank(current, breakthrough.targetRank, narrative);

    current = {
      ...current,
      lastBreakthroughResult: 'forced',
      phase: 'breakthrough',
    };

    narrative.push(
      `The breakthrough succeeds, but at a cost. The forced advancement leaves scars on your cultivation base.`,
    );

    return { state: current, result: 'forced', narrative };
  }

  // Normal success
  narrative.push(
    `Energy surges through your meridians as the breakthrough takes hold.`,
  );

  current = applyEffectsToState(current, breakthrough.successEffects);
  current = advanceRank(current, breakthrough.targetRank, narrative);

  current = {
    ...current,
    lastBreakthroughResult: 'success',
    phase: 'breakthrough',
  };

  narrative.push(`The ${breakthrough.name} is complete. Your cultivation ascends.`);

  return { state: current, result: 'success', narrative };
}

// ---------------------------------------------------------------------------
// Method Mastery
// ---------------------------------------------------------------------------

/**
 * Add mastery points to a method the character knows.
 * Clamps to the method's maximum mastery level if a content definition is available.
 */
export function addMethodMastery(
  character: CharacterState,
  methodId: string,
  amount: number,
): CharacterState {
  const existing = character.methods[methodId];
  if (!existing) return character;

  const newMastery = existing.mastery + amount;

  return {
    ...character,
    methods: {
      ...character.methods,
      [methodId]: { mastery: Math.max(0, newMastery) },
    },
  };
}

// ---------------------------------------------------------------------------
// Path Depth
// ---------------------------------------------------------------------------

/**
 * Increase path depth, representing deeper understanding of the chosen cultivation path.
 */
export function addPathDepth(
  character: CharacterState,
  amount: number,
): CharacterState {
  return {
    ...character,
    pathDepth: Math.max(0, character.pathDepth + amount),
  };
}

// ---------------------------------------------------------------------------
// Title Checking
// ---------------------------------------------------------------------------

/**
 * Check whether a character meets all conditions to earn a specific title.
 */
export function checkTitleEarned(
  character: CharacterState,
  world: WorldState,
  title: TitleDef,
  content: ContentPack,
): boolean {
  return title.sourceConditions.every((cond) =>
    checkCondition(cond, character, world, content),
  );
}

// ---------------------------------------------------------------------------
// Trait Evolution
// ---------------------------------------------------------------------------

export interface TraitEvolutionResult {
  character: CharacterState;
  evolved: boolean;
  newTraitId?: string;
}

/**
 * Attempt to evolve a trait based on its mutation definitions.
 * Returns the updated character and whether evolution occurred.
 */
export function evolveTrait(
  character: CharacterState,
  traitDef: TraitDef,
  content: ContentPack,
): TraitEvolutionResult {
  // Character must actually have this trait
  if (!character.traits.includes(traitDef.id)) {
    return { character, evolved: false };
  }

  // No mutations defined
  if (!traitDef.mutations || traitDef.mutations.length === 0) {
    return { character, evolved: false };
  }

  // We need a WorldState for condition checking; build a minimal one from character context.
  // Since evolveTrait only takes character + content, we create a stub world.
  // The caller should use this at a point where world conditions are not critical,
  // or pass world state through a higher-level function.
  // For conditions that need world state, we check with a permissive stub.
  const stubWorld: WorldState = {
    currentRegion: '',
    currentScene: '',
    flags: {},
    factionStandings: {},
    unlockedRegions: [],
    timers: [],
    day: 0,
    season: 'spring',
    activeThreats: [],
    rumors: [],
    deadNpcs: [],
    narrativeLog: [],
  };

  for (const mutation of traitDef.mutations) {
    const conditionsMet = mutation.conditions.every((cond) =>
      checkCondition(cond, character, stubWorld, content),
    );

    if (conditionsMet) {
      // Remove old trait, add new one
      const updatedTraits = character.traits.filter((t) => t !== traitDef.id);
      updatedTraits.push(mutation.targetTraitId);

      return {
        character: { ...character, traits: updatedTraits },
        evolved: true,
        newTraitId: mutation.targetTraitId,
      };
    }
  }

  return { character, evolved: false };
}

// ---------------------------------------------------------------------------
// Available Breakthroughs
// ---------------------------------------------------------------------------

/**
 * Return all breakthroughs the character could currently attempt based on
 * their rank and condition satisfaction.
 */
export function getAvailableBreakthroughs(
  state: GameState,
  content: ContentPack,
): BreakthroughDef[] {
  return content.breakthroughs.filter((bt) => {
    // Must target the next rank
    if (bt.targetRank !== ((state.character.rank + 1) as Rank)) return false;
    // Rank cap
    if (state.character.rank >= 9) return false;

    // All conditions must be met
    return bt.conditions.every((cond) =>
      checkCondition(cond, state.character, state.world, content),
    );
  });
}

// ---------------------------------------------------------------------------
// Meditation Effects
// ---------------------------------------------------------------------------

/**
 * Generate effects for a meditation session based on the chosen focus.
 *
 * - stability: restore stability, slight essence cost
 * - essence: restore essence, slight stability cost
 * - coherence: small boost to both, no cost, but less effective individually
 */
export function getMeditationEffects(
  character: CharacterState,
  focus: 'stability' | 'essence' | 'coherence',
): Effect[] {
  const rank = character.rank;
  const pathDepthBonus = Math.floor(character.pathDepth / 10);

  switch (focus) {
    case 'stability': {
      const amount = 10 + rank * 3 + pathDepthBonus;
      const effects: Effect[] = [
        { type: 'add_stability', value: amount },
        { type: 'add_resource', target: 'essence', value: -(Math.ceil(amount * 0.2)) },
      ];
      // High-rank cultivators regain focus too
      if (rank >= 4) {
        effects.push({ type: 'add_resource', target: 'focus', value: Math.floor(amount * 0.3) });
      }
      return effects;
    }

    case 'essence': {
      const amount = 8 + rank * 4 + pathDepthBonus;
      const effects: Effect[] = [
        { type: 'add_resource', target: 'essence', value: amount },
        { type: 'add_stability', value: -(Math.ceil(amount * 0.15)) },
      ];
      // Undead and spectral cultivators gain bonus essence from meditation
      if (character.bodyState === 'undead' || character.bodyState === 'spectral') {
        effects.push({ type: 'add_resource', target: 'essence', value: Math.floor(amount * 0.25) });
      }
      return effects;
    }

    case 'coherence': {
      const stab = 5 + rank * 2 + Math.floor(pathDepthBonus * 0.5);
      const ess = 4 + rank * 2 + Math.floor(pathDepthBonus * 0.5);
      const effects: Effect[] = [
        { type: 'add_stability', value: stab },
        { type: 'add_resource', target: 'essence', value: ess },
      ];
      // Coherence meditation also grants narrative insight at higher ranks
      if (rank >= 5) {
        effects.push({
          type: 'narrative_log',
          value: 'Deep meditation reveals the underlying harmony of your cultivation.',
        });
      }
      return effects;
    }

    default:
      return [];
  }
}

// ---------------------------------------------------------------------------
// Internal Helpers
// ---------------------------------------------------------------------------

/**
 * Check whether the character can afford the given resource costs.
 */
function checkResourceCosts(
  character: CharacterState,
  costs: Partial<Record<string, number>>,
): boolean {
  for (const [resource, amount] of Object.entries(costs)) {
    if (amount === undefined || amount <= 0) continue;

    const current = getResourceValueFromCharacter(character, resource);
    if (current < amount) return false;
  }
  return true;
}

/**
 * Deduct resource costs from the character. Does not go below zero.
 */
function deductResources(
  character: CharacterState,
  costs: Partial<Record<string, number>>,
): CharacterState {
  let resources = { ...character.resources };
  let optionalResources = { ...character.optionalResources };
  let materials = { ...resources.materials };

  for (const [resource, amount] of Object.entries(costs)) {
    if (amount === undefined || amount <= 0) continue;

    if (resource === 'materials') continue; // materials handled separately via item costs

    if (resource in resources) {
      const current = (resources as unknown as Record<string, number>)[resource] ?? 0;
      (resources as unknown as Record<string, number>)[resource] = Math.max(0, current - amount);
    } else if (resource in optionalResources) {
      const current =
        ((optionalResources as unknown as Record<string, number | undefined>)[resource]) ?? 0;
      (optionalResources as unknown as Record<string, number>)[resource] = Math.max(0, current - amount);
    }
  }

  resources = { ...resources, materials };

  return {
    ...character,
    resources,
    optionalResources,
  };
}

/**
 * Read a named resource value from the character, checking core and optional.
 */
function getResourceValueFromCharacter(character: CharacterState, name: string): number {
  if (name in character.resources) {
    return (character.resources as unknown as Record<string, number>)[name] ?? 0;
  }
  if (name in character.optionalResources) {
    return (
      (character.optionalResources as unknown as Record<string, number | undefined>)[name]
    ) ?? 0;
  }
  return 0;
}

/**
 * Apply a list of effects to the game state.
 * This is a simplified applicator that handles the most common effect types.
 * A full effect engine would be in its own module.
 */
function applyEffectsToState(state: GameState, effects: Effect[]): GameState {
  let current = { ...state };

  for (const effect of effects) {
    switch (effect.type) {
      case 'add_resource': {
        const target = effect.target!;
        const amount = effect.value as number;
        current = {
          ...current,
          character: addResource(current.character, target, amount),
        };
        break;
      }

      case 'set_resource': {
        const target = effect.target!;
        const amount = effect.value as number;
        current = {
          ...current,
          character: setResource(current.character, target, amount),
        };
        break;
      }

      case 'add_tag': {
        const tag = effect.target ?? (effect.value as string);
        if (tag && !current.character.tags.includes(tag)) {
          current = {
            ...current,
            character: {
              ...current.character,
              tags: [...current.character.tags, tag],
            },
          };
        }
        break;
      }

      case 'remove_tag': {
        const tag = effect.target ?? (effect.value as string);
        current = {
          ...current,
          character: {
            ...current.character,
            tags: current.character.tags.filter((t) => t !== tag),
          },
        };
        break;
      }

      case 'add_trait': {
        const traitId = effect.target ?? (effect.value as string);
        if (traitId && !current.character.traits.includes(traitId)) {
          current = {
            ...current,
            character: {
              ...current.character,
              traits: [...current.character.traits, traitId],
            },
          };
        }
        break;
      }

      case 'remove_trait': {
        const traitId = effect.target ?? (effect.value as string);
        current = {
          ...current,
          character: {
            ...current.character,
            traits: current.character.traits.filter((t) => t !== traitId),
          },
        };
        break;
      }

      case 'add_title': {
        const titleId = effect.target ?? (effect.value as string);
        if (titleId) {
          current = {
            ...current,
            character: {
              ...current.character,
              titles: {
                ...current.character.titles,
                [titleId]: { rank: 1, earned: true },
              },
            },
          };
        }
        break;
      }

      case 'set_body_state': {
        const bodyState = (effect.target ?? effect.value) as CharacterState['bodyState'];
        current = {
          ...current,
          character: {
            ...current.character,
            bodyState,
          },
        };
        break;
      }

      case 'add_method': {
        const methodId = effect.target ?? (effect.value as string);
        if (methodId && !(methodId in current.character.methods)) {
          current = {
            ...current,
            character: {
              ...current.character,
              methods: {
                ...current.character.methods,
                [methodId]: { mastery: 0 },
              },
            },
          };
        }
        break;
      }

      case 'add_method_mastery': {
        const methodId = effect.target!;
        const amount = effect.value as number;
        current = {
          ...current,
          character: addMethodMastery(current.character, methodId, amount),
        };
        break;
      }

      case 'add_path_depth': {
        const amount = effect.value as number;
        current = {
          ...current,
          character: addPathDepth(current.character, amount),
        };
        break;
      }

      case 'add_stability': {
        current = {
          ...current,
          character: addResource(current.character, 'stability', effect.value as number),
        };
        break;
      }

      case 'add_corruption': {
        const amount = effect.value as number;
        const currentCorruption = current.character.optionalResources.corruption ?? 0;
        current = {
          ...current,
          character: {
            ...current.character,
            optionalResources: {
              ...current.character.optionalResources,
              corruption: currentCorruption + amount,
            },
          },
        };
        break;
      }

      case 'damage': {
        const amount = effect.value as number;
        current = {
          ...current,
          character: addResource(current.character, 'vitality', -amount),
        };
        break;
      }

      case 'set_world_flag': {
        const flag = effect.target!;
        const value = effect.value ?? true;
        current = {
          ...current,
          world: {
            ...current.world,
            flags: { ...current.world.flags, [flag]: value },
          },
        };
        break;
      }

      case 'clear_world_flag': {
        const flag = effect.target!;
        const { [flag]: _, ...remainingFlags } = current.world.flags;
        current = {
          ...current,
          world: {
            ...current.world,
            flags: remainingFlags,
          },
        };
        break;
      }

      case 'narrative_log': {
        const text = (effect.value as string) ?? '';
        if (text) {
          current = {
            ...current,
            narrativeBuffer: [...current.narrativeBuffer, text],
          };
        }
        break;
      }

      case 'unlock_region': {
        const regionId = effect.target ?? (effect.value as string);
        if (regionId && !current.world.unlockedRegions.includes(regionId)) {
          current = {
            ...current,
            world: {
              ...current.world,
              unlockedRegions: [...current.world.unlockedRegions, regionId],
            },
          };
        }
        break;
      }

      case 'set_scene': {
        const sceneId = effect.target ?? (effect.value as string);
        if (sceneId) {
          current = {
            ...current,
            world: {
              ...current.world,
              currentScene: sceneId,
            },
          };
        }
        break;
      }

      case 'add_item': {
        const itemId = effect.target ?? (effect.value as string);
        if (itemId) {
          const existing = current.character.inventory.find((s) => s.itemId === itemId);
          const inventory = existing
            ? current.character.inventory.map((s) =>
                s.itemId === itemId ? { ...s, quantity: s.quantity + 1 } : s,
              )
            : [...current.character.inventory, { itemId, quantity: 1 }];
          current = {
            ...current,
            character: { ...current.character, inventory },
          };
        }
        break;
      }

      case 'remove_item': {
        const itemId = effect.target ?? (effect.value as string);
        if (itemId) {
          const inventory = current.character.inventory
            .map((s) => (s.itemId === itemId ? { ...s, quantity: s.quantity - 1 } : s))
            .filter((s) => s.quantity > 0);
          current = {
            ...current,
            character: { ...current.character, inventory },
          };
        }
        break;
      }

      case 'add_companion': {
        const companionId = effect.target ?? (effect.value as string);
        if (companionId) {
          const alreadyHas = current.character.companions.some(
            (c) => c.companionId === companionId,
          );
          if (!alreadyHas) {
            current = {
              ...current,
              character: {
                ...current.character,
                companions: [
                  ...current.character.companions,
                  { companionId, stage: 1, bonded: true },
                ],
              },
            };
          }
        }
        break;
      }

      case 'add_faction_rep': {
        const factionId = effect.target!;
        const amount = effect.value as number;
        const currentStanding = current.world.factionStandings[factionId] ?? 0;
        current = {
          ...current,
          world: {
            ...current.world,
            factionStandings: {
              ...current.world.factionStandings,
              [factionId]: currentStanding + amount,
            },
          },
        };
        break;
      }

      case 'advance_time': {
        const days = effect.value as number;
        current = {
          ...current,
          world: {
            ...current.world,
            day: current.world.day + days,
          },
        };
        break;
      }

      // Effects not handled here are accumulated in pendingEffects for the
      // main game reducer to process (e.g., trigger_breakthrough, evolve_title,
      // start_timer).
      default:
        current = {
          ...current,
          pendingEffects: [...current.pendingEffects, effect],
        };
        break;
    }
  }

  return current;
}

/**
 * Add to a numeric resource on the character, clamping to 0..max.
 */
function addResource(character: CharacterState, name: string, amount: number): CharacterState {
  if (name in character.resources) {
    const res = { ...character.resources } as unknown as Record<string, number>;
    const maxKey = `max${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    const current = res[name] ?? 0;
    const max = res[maxKey]; // may be undefined for non-capped resources
    let newVal = current + amount;
    if (max !== undefined) newVal = Math.min(newVal, max);
    newVal = Math.max(0, newVal);
    res[name] = newVal;
    return { ...character, resources: res as unknown as CharacterState['resources'] };
  }

  if (name in character.optionalResources) {
    const opt = { ...character.optionalResources } as unknown as Record<
      string,
      number | undefined
    >;
    const current = opt[name] ?? 0;
    opt[name] = Math.max(0, current + amount);
    return {
      ...character,
      optionalResources: opt as unknown as CharacterState['optionalResources'],
    };
  }

  return character;
}

/**
 * Set a resource to an absolute value.
 */
function setResource(character: CharacterState, name: string, value: number): CharacterState {
  if (name in character.resources) {
    const res = { ...character.resources } as unknown as Record<string, number>;
    res[name] = Math.max(0, value);
    return { ...character, resources: res as unknown as CharacterState['resources'] };
  }

  if (name in character.optionalResources) {
    const opt = { ...character.optionalResources } as unknown as Record<
      string,
      number | undefined
    >;
    opt[name] = Math.max(0, value);
    return {
      ...character,
      optionalResources: opt as unknown as CharacterState['optionalResources'],
    };
  }

  return character;
}

/**
 * Advance the character's rank and push narrative text about the advancement.
 */
function advanceRank(
  state: GameState,
  targetRank: Rank,
  narrative: string[],
): GameState {
  if (state.character.rank >= targetRank) return state;

  const RANK_LABELS: Record<number, string> = {
    1: 'Mortal',
    2: 'Initiate',
    3: 'Adept',
    4: 'Consolidator',
    5: 'Domain Holder',
    6: 'Ascendant',
    7: 'Sovereign',
    8: 'Mythic',
    9: 'Transcendent',
  };

  const label = RANK_LABELS[targetRank] ?? `Rank ${targetRank}`;
  narrative.push(`You have ascended to the ${label} realm.`);

  return {
    ...state,
    character: {
      ...state.character,
      rank: targetRank,
    },
  };
}

// ============================================================================
// Dragonsloft Cultivation RPG Engine — Narrative System
// ============================================================================
//
// Manages scene presentation, choice filtering, choice processing, and
// title trigger detection. This module bridges the content definitions
// (scenes, choices, titles) with the live game state.
// ============================================================================

import type {
  GameState,
  CharacterState,
  WorldState,
  ContentPack,
  SceneDef,
  Choice,
  TitleId,
  TitleDef,
  Effect,
} from './types';

import { checkCondition } from './world';

// ---------------------------------------------------------------------------
// Available Choices
// ---------------------------------------------------------------------------

/**
 * Filter and return choices available to the player for a given scene.
 *
 * - Choices with `visible: false` are hidden by default but become available
 *   once their conditions are met (secret/hidden options).
 * - Choices with `visible: true` (or undefined, the default) are shown if
 *   their conditions are satisfied.
 */
export function getAvailableChoices(
  scene: SceneDef,
  character: CharacterState,
  world: WorldState,
  content: ContentPack,
): Choice[] {
  return scene.choices.filter((choice) => {
    const conditionsMet = choice.conditions.every((cond) =>
      checkCondition(cond, character, world, content),
    );

    // If the choice is explicitly hidden, only show it when conditions are met
    if (choice.visible === false) {
      return conditionsMet;
    }

    // Normal choices: show when conditions are met
    return conditionsMet;
  });
}

// ---------------------------------------------------------------------------
// Process Choice
// ---------------------------------------------------------------------------

export interface ProcessChoiceResult {
  state: GameState;
  narrative: string[];
}

/**
 * Process a player's choice within a scene.
 *
 * 1. Locate the choice in the scene definition.
 * 2. Verify conditions are still met (guard against stale UI).
 * 3. Apply the choice's effects to the game state.
 * 4. Collect narrative text (resultText + any narrative_log effects).
 * 5. If the choice has a nextScene, update the current scene.
 */
export function processChoice(
  state: GameState,
  scene: SceneDef,
  choiceId: string,
  content: ContentPack,
): ProcessChoiceResult {
  const narrative: string[] = [];
  let current = { ...state };

  // --- Find the choice ---
  const choice = scene.choices.find((c) => c.id === choiceId);
  if (!choice) {
    narrative.push('That option is no longer available.');
    return { state: current, narrative };
  }

  // --- Verify conditions ---
  const conditionsMet = choice.conditions.every((cond) =>
    checkCondition(cond, current.character, current.world, content),
  );

  if (!conditionsMet) {
    narrative.push('The conditions for this choice are no longer met.');
    return { state: current, narrative };
  }

  // --- Apply effects ---
  current = applyEffects(current, choice.effects);

  // --- Collect narrative ---
  if (choice.resultText) {
    narrative.push(choice.resultText);
  }

  // Gather any narrative_log effects that were in the choice effects
  for (const effect of choice.effects) {
    if (effect.type === 'narrative_log' && effect.value) {
      narrative.push(effect.value as string);
    }
  }

  // --- Handle scene transition ---
  if (choice.nextScene) {
    current = {
      ...current,
      world: {
        ...current.world,
        currentScene: choice.nextScene,
      },
    };

    // Apply onEnter effects of the new scene
    const nextSceneDef = content.scenes.find((s) => s.id === choice.nextScene);
    if (nextSceneDef && nextSceneDef.onEnter.length > 0) {
      current = applyEffects(current, nextSceneDef.onEnter);
    }
  }

  // Update phase
  current = {
    ...current,
    phase: 'choice_result',
    narrativeBuffer: [...current.narrativeBuffer, ...narrative],
  };

  return { state: current, narrative };
}

// ---------------------------------------------------------------------------
// Scene Description
// ---------------------------------------------------------------------------

/**
 * Get the scene description, potentially modified based on character state.
 *
 * Atmospheric modifiers are appended for certain body states, high/low
 * resources, or other notable character conditions to make the narrative
 * feel responsive to the player's build.
 */
export function getSceneDescription(
  scene: SceneDef,
  character: CharacterState,
  world: WorldState,
): string {
  let description = scene.description;

  // --- Body state atmospheric overlays ---
  switch (character.bodyState) {
    case 'undead':
      description +=
        ' The living energy of this place presses against your deathly nature, a faint discomfort beneath your bones.';
      break;
    case 'spectral':
      description +=
        ' The material world feels thin here, its edges blurring at the periphery of your spectral sight.';
      break;
    case 'bestial':
      description +=
        ' Your heightened senses flood with detail — every scent, every distant sound, sharpened to a razor point.';
      break;
    case 'crystalline':
      description +=
        ' Light refracts through your crystalline form, casting prismatic patterns across the surroundings.';
      break;
    case 'mechanical':
      description +=
        ' Your mechanisms whir softly as internal sensors catalogue the environment in precise detail.';
      break;
    case 'mutated':
      description +=
        ' Your mutated form draws uneasy glances from those nearby, a constant reminder of the price of power.';
      break;
    default:
      break;
  }

  // --- Resource-based atmospheric hints ---
  const stabilityRatio =
    character.resources.maxStability > 0
      ? character.resources.stability / character.resources.maxStability
      : 1;

  if (stabilityRatio < 0.2) {
    description +=
      ' Your cultivation base trembles, unstable energy threatening to spill at any moment.';
  } else if (stabilityRatio < 0.4) {
    description += ' A faint unsteadiness hums beneath your foundation.';
  }

  const essenceRatio =
    character.resources.maxEssence > 0
      ? character.resources.essence / character.resources.maxEssence
      : 1;

  if (essenceRatio > 0.9) {
    description +=
      ' Power thrums through you, essence brimming near its peak.';
  }

  // --- Corruption overlay ---
  const corruption = character.optionalResources.corruption ?? 0;
  if (corruption > 50) {
    description +=
      ' A dark miasma clings to the edges of your perception, the corruption within coloring everything.';
  } else if (corruption > 25) {
    description +=
      ' Faint whispers curl at the back of your mind, the corruption within stirring.';
  }

  // --- Time of day / season flavor ---
  if (world.season === 'winter') {
    description += ' A chill pervades the air, winter\'s grip tightening.';
  } else if (world.season === 'summer') {
    description += ' Warmth saturates the atmosphere, heavy with the fullness of summer.';
  }

  return description;
}

// ---------------------------------------------------------------------------
// Title Triggers
// ---------------------------------------------------------------------------

/**
 * Scan all titles in the content pack and return the IDs of any titles
 * the character has newly earned (conditions met, not already possessed).
 */
export function checkTitleTriggers(
  state: GameState,
  content: ContentPack,
): TitleId[] {
  const earned: TitleId[] = [];

  for (const title of content.titles) {
    // Skip titles already earned
    if (
      state.character.titles[title.id] &&
      state.character.titles[title.id].earned
    ) {
      continue;
    }

    // Check all source conditions
    const conditionsMet = title.sourceConditions.every((cond) =>
      checkCondition(cond, state.character, state.world, content),
    );

    if (conditionsMet) {
      earned.push(title.id);
    }
  }

  return earned;
}

// ---------------------------------------------------------------------------
// Internal: Effect Application
// ---------------------------------------------------------------------------

/**
 * Apply a list of effects to the game state.
 * Mirrors the effect applicator in progression.ts — in a full build these
 * would share a single implementation from a dedicated effects module.
 */
function applyEffects(state: GameState, effects: Effect[]): GameState {
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

      case 'add_method_mastery': {
        const methodId = effect.target!;
        const amount = effect.value as number;
        const existing = current.character.methods[methodId];
        if (existing) {
          current = {
            ...current,
            character: {
              ...current.character,
              methods: {
                ...current.character.methods,
                [methodId]: { mastery: Math.max(0, existing.mastery + amount) },
              },
            },
          };
        }
        break;
      }

      case 'add_path_depth': {
        const amount = effect.value as number;
        current = {
          ...current,
          character: {
            ...current.character,
            pathDepth: Math.max(0, current.character.pathDepth + amount),
          },
        };
        break;
      }

      case 'narrative_log':
        // Handled by caller when collecting narrative text; no state mutation needed.
        break;

      // Unhandled effects go to pendingEffects for the main reducer
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

// ---------------------------------------------------------------------------
// Internal: Resource Helpers
// ---------------------------------------------------------------------------

function addResource(character: CharacterState, name: string, amount: number): CharacterState {
  if (name in character.resources) {
    const res = { ...character.resources } as unknown as Record<string, number>;
    const maxKey = `max${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    const current = res[name] ?? 0;
    const max = res[maxKey];
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

// ============================================================================
// Effect Application Engine
// ============================================================================

import type {
  Effect, GameState, CharacterState, WorldState, Resources,
  OptionalResources, ItemId, InventorySlot,
} from './types';

export function applyEffect(state: GameState, effect: Effect): GameState {
  switch (effect.type) {
    case 'add_resource':
      return { ...state, character: addResource(state.character, effect.target!, effect.value as number) };
    case 'set_resource':
      return { ...state, character: setResource(state.character, effect.target!, effect.value as number) };
    case 'add_tag':
      return { ...state, character: addTag(state.character, effect.target!) };
    case 'remove_tag':
      return { ...state, character: removeTag(state.character, effect.target!) };
    case 'add_trait':
      return { ...state, character: addTrait(state.character, effect.target!) };
    case 'remove_trait':
      return { ...state, character: removeTrait(state.character, effect.target!) };
    case 'add_title':
      return {
        ...state,
        character: {
          ...state.character,
          titles: { ...state.character.titles, [effect.target!]: { rank: 1, earned: true } },
        },
      };
    case 'evolve_title':
      return {
        ...state,
        character: {
          ...state.character,
          titles: {
            ...state.character.titles,
            [effect.target!]: {
              ...state.character.titles[effect.target!],
              rank: (state.character.titles[effect.target!]?.rank ?? 0) + 1,
            },
          },
        },
      };
    case 'add_method':
      return {
        ...state,
        character: {
          ...state.character,
          methods: { ...state.character.methods, [effect.target!]: { mastery: 1 } },
        },
      };
    case 'add_method_mastery':
      return {
        ...state,
        character: {
          ...state.character,
          methods: {
            ...state.character.methods,
            [effect.target!]: {
              mastery: Math.min(
                (state.character.methods[effect.target!]?.mastery ?? 0) + (effect.value as number || 1),
                5
              ),
            },
          },
        },
      };
    case 'add_item':
      return { ...state, character: addItemToInventory(state.character, effect.target!, effect.value as number || 1) };
    case 'remove_item':
      return { ...state, character: removeItemFromInventory(state.character, effect.target!, effect.value as number || 1) };
    case 'set_body_state':
      return { ...state, character: { ...state.character, bodyState: effect.target as CharacterState['bodyState'] } };
    case 'add_faction_rep':
      return {
        ...state,
        world: {
          ...state.world,
          factionStandings: {
            ...state.world.factionStandings,
            [effect.target!]: (state.world.factionStandings[effect.target!] ?? 0) + (effect.value as number),
          },
        },
      };
    case 'set_world_flag':
      return {
        ...state,
        world: {
          ...state.world,
          flags: { ...state.world.flags, [effect.target!]: effect.value ?? true },
        },
      };
    case 'clear_world_flag': {
      const flags = { ...state.world.flags };
      delete flags[effect.target!];
      return { ...state, world: { ...state.world, flags } };
    }
    case 'start_timer':
      return {
        ...state,
        world: {
          ...state.world,
          timers: [
            ...state.world.timers,
            {
              id: effect.target!,
              label: effect.target!,
              expiresOnDay: state.world.day + (effect.value as number),
              onExpireEffects: [],
            },
          ],
        },
      };
    case 'advance_time':
      return {
        ...state,
        world: { ...state.world, day: state.world.day + (effect.value as number) },
      };
    case 'add_companion':
      return {
        ...state,
        character: {
          ...state.character,
          companions: [
            ...state.character.companions,
            { companionId: effect.target!, stage: 1, bonded: true },
          ],
        },
      };
    case 'add_corruption':
      return {
        ...state,
        character: {
          ...state.character,
          optionalResources: {
            ...state.character.optionalResources,
            corruption: (state.character.optionalResources.corruption ?? 0) + (effect.value as number),
          },
        },
      };
    case 'add_stability':
      return {
        ...state,
        character: {
          ...state.character,
          resources: {
            ...state.character.resources,
            stability: Math.min(
              state.character.resources.stability + (effect.value as number),
              state.character.resources.maxStability
            ),
          },
        },
      };
    case 'damage':
      return {
        ...state,
        character: {
          ...state.character,
          resources: {
            ...state.character.resources,
            vitality: Math.max(0, state.character.resources.vitality - (effect.value as number)),
          },
        },
      };
    case 'unlock_region':
      return {
        ...state,
        world: {
          ...state.world,
          unlockedRegions: state.world.unlockedRegions.includes(effect.target!)
            ? state.world.unlockedRegions
            : [...state.world.unlockedRegions, effect.target!],
        },
      };
    case 'set_scene':
      return {
        ...state,
        world: { ...state.world, currentScene: effect.target! },
      };
    case 'add_path_depth':
      return {
        ...state,
        character: {
          ...state.character,
          pathDepth: state.character.pathDepth + (effect.value as number || 1),
        },
      };
    case 'trigger_breakthrough':
      return { ...state, phase: 'breakthrough' };
    case 'narrative_log':
      return {
        ...state,
        world: {
          ...state.world,
          narrativeLog: [...state.world.narrativeLog, effect.value as string].slice(-100),
        },
        narrativeBuffer: [...state.narrativeBuffer, effect.value as string],
      };
    default:
      return state;
  }
}

export function applyEffects(state: GameState, effects: Effect[]): GameState {
  return effects.reduce((s, e) => applyEffect(s, e), state);
}

// --- Helpers ---

function addResource(char: CharacterState, key: string, amount: number): CharacterState {
  const optKeys: (keyof OptionalResources)[] = [
    'corruption', 'sanctity', 'dread', 'bloodReserve', 'command',
    'domainControl', 'favor', 'worship', 'synchronization',
  ];

  if (optKeys.includes(key as keyof OptionalResources)) {
    return {
      ...char,
      optionalResources: {
        ...char.optionalResources,
        [key]: (char.optionalResources[key as keyof OptionalResources] ?? 0) + amount,
      },
    };
  }

  if (key === 'momentum' || key === 'reputation') {
    return {
      ...char,
      resources: { ...char.resources, [key]: char.resources[key as keyof Resources] as number + amount },
    };
  }

  // Capped resources
  const maxKey = `max${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof Resources;
  const max = (char.resources[maxKey] as number) ?? Infinity;
  const current = (char.resources[key as keyof Resources] as number) ?? 0;
  return {
    ...char,
    resources: {
      ...char.resources,
      [key]: Math.max(0, Math.min(current + amount, max)),
    },
  };
}

function setResource(char: CharacterState, key: string, value: number): CharacterState {
  return {
    ...char,
    resources: { ...char.resources, [key]: value },
  };
}

function addTag(char: CharacterState, tag: string): CharacterState {
  if (char.tags.includes(tag)) return char;
  return { ...char, tags: [...char.tags, tag] };
}

function removeTag(char: CharacterState, tag: string): CharacterState {
  return { ...char, tags: char.tags.filter(t => t !== tag) };
}

function addTrait(char: CharacterState, traitId: string): CharacterState {
  if (char.traits.includes(traitId)) return char;
  return { ...char, traits: [...char.traits, traitId] };
}

function removeTrait(char: CharacterState, traitId: string): CharacterState {
  return { ...char, traits: char.traits.filter(t => t !== traitId) };
}

function addItemToInventory(char: CharacterState, itemId: ItemId, quantity: number): CharacterState {
  const existing = char.inventory.find(s => s.itemId === itemId);
  if (existing) {
    return {
      ...char,
      inventory: char.inventory.map(s =>
        s.itemId === itemId ? { ...s, quantity: s.quantity + quantity } : s
      ),
    };
  }
  return {
    ...char,
    inventory: [...char.inventory, { itemId, quantity }],
  };
}

function removeItemFromInventory(char: CharacterState, itemId: ItemId, quantity: number): CharacterState {
  return {
    ...char,
    inventory: char.inventory
      .map(s => s.itemId === itemId ? { ...s, quantity: s.quantity - quantity } : s)
      .filter(s => s.quantity > 0),
  };
}

// ============================================================================
// Game State Reducer — Central State Machine
// ============================================================================

import type {
  GameState, GameAction, GamePhase, CharacterState, WorldState,
  Resources, OptionalResources, Rank, ContentPack, Origin, PathDef,
} from './types';
import { applyEffects } from './effects';

// --- Initial State Factory ---

export function createInitialState(seed?: number): GameState {
  return {
    character: createEmptyCharacter(),
    world: createInitialWorld(),
    coherence: 50,
    phase: 'character_creation',
    pendingEffects: [],
    narrativeBuffer: [],
    seed: seed ?? Date.now(),
    turnCount: 0,
    debug: false,
  };
}

function createEmptyCharacter(): CharacterState {
  return {
    name: '',
    origin: '',
    bodyState: 'normal',
    rank: 1,
    pathId: null,
    pathDepth: 0,
    frameworkId: null,
    resources: {
      vitality: 100,
      maxVitality: 100,
      essence: 50,
      maxEssence: 50,
      focus: 30,
      maxFocus: 30,
      stability: 80,
      maxStability: 100,
      momentum: 0,
      reputation: 0,
      materials: {},
    },
    optionalResources: {},
    methods: {},
    titles: {},
    traits: [],
    affinities: [],
    tags: [],
    inventory: [],
    equipped: {},
    companions: [],
  };
}

function createInitialWorld(): WorldState {
  return {
    currentRegion: 'ashenmoor',
    currentScene: 'crossroads',
    flags: {},
    factionStandings: {
      'ashen-veil': 0,
      'crimson-court': 0,
      'hollow-watch': 0,
    },
    unlockedRegions: ['ashenmoor'],
    timers: [],
    day: 1,
    season: 'autumn',
    activeThreats: [],
    rumors: [],
    deadNpcs: [],
    narrativeLog: [],
  };
}

// --- Reducer ---

export function gameReducer(state: GameState, action: GameAction, content: ContentPack): GameState {
  switch (action.type) {
    case 'NEW_GAME':
      return createInitialState();

    case 'LOAD_STATE':
      return action.payload;

    case 'TOGGLE_DEBUG':
      return { ...state, debug: !state.debug };

    case 'SET_PHASE':
      return { ...state, phase: action.payload.phase };

    case 'DISMISS_NARRATIVE':
      return { ...state, narrativeBuffer: [] };

    case 'CREATE_CHARACTER':
      return handleCreateCharacter(state, action.payload, content);

    case 'MAKE_CHOICE':
      return handleMakeChoice(state, action.payload, content);

    case 'NAVIGATE':
      return handleNavigate(state, action.payload, content);

    case 'USE_METHOD':
      return handleUseMethod(state, action.payload, content);

    case 'ATTEMPT_BREAKTHROUGH':
      return handleAttemptBreakthrough(state, action.payload, content);

    case 'CRAFT_ITEM':
      return handleCraftItem(state, action.payload, content);

    case 'EQUIP_ITEM':
      return handleEquipItem(state, action.payload);

    case 'UNEQUIP_ITEM':
      return handleUnequipItem(state, action.payload);

    case 'USE_ITEM':
      return handleUseItem(state, action.payload, content);

    case 'MEDITATE':
      return handleMeditate(state, action.payload);

    case 'ADVANCE_TIME':
      return handleAdvanceTime(state, action.payload);

    case 'APPLY_EFFECTS':
      return applyEffects(state, action.payload.effects);

    default:
      return state;
  }
}

// --- Action Handlers ---

function handleCreateCharacter(
  state: GameState,
  payload: { name: string; origin: Origin; path: PathDef },
  content: ContentPack
): GameState {
  const { name, origin, path } = payload;
  const framework = content.frameworks.find(f => f.id === path.framework) ?? null;

  let character: CharacterState = {
    ...state.character,
    name,
    origin: origin.id,
    pathId: path.id,
    pathDepth: 1,
    frameworkId: framework?.id ?? null,
    traits: [...origin.startingTraits],
    affinities: [...origin.affinities, ...path.affinities],
    tags: [...origin.tags, ...path.tags],
  };

  // Apply origin starting resources
  if (origin.startingResources) {
    character.resources = { ...character.resources, ...origin.startingResources };
  }

  // Add starting methods
  for (const methodId of origin.startingMethods) {
    character.methods[methodId] = { mastery: 1 };
  }

  // Add starting items
  for (const itemId of origin.startingItems) {
    character.inventory.push({ itemId, quantity: 1 });
  }

  // Apply path rank 1 effects
  const rank1 = path.ranks.find(r => r.rank === 1);
  let newState: GameState = {
    ...state,
    character,
    phase: 'scene' as GamePhase,
    narrativeBuffer: [
      `${name}, ${origin.name}, steps onto the path of ${path.name}.`,
      origin.lore,
    ],
  };

  if (rank1) {
    newState = applyEffects(newState, rank1.unlockEffects);
  }

  return newState;
}

function handleMakeChoice(
  state: GameState,
  payload: { sceneId: string; choiceId: string },
  content: ContentPack
): GameState {
  const scene = content.scenes.find(s => s.id === payload.sceneId);
  if (!scene) return state;

  const choice = scene.choices.find(c => c.id === payload.choiceId);
  if (!choice) return state;

  let newState = applyEffects(state, choice.effects);
  newState = {
    ...newState,
    narrativeBuffer: [...newState.narrativeBuffer, choice.resultText],
    turnCount: newState.turnCount + 1,
    phase: 'choice_result',
  };

  // Navigate to next scene if specified
  if (choice.nextScene) {
    newState = {
      ...newState,
      world: { ...newState.world, currentScene: choice.nextScene },
    };
  }

  return newState;
}

function handleNavigate(
  state: GameState,
  payload: { targetScene: string },
  content: ContentPack
): GameState {
  const scene = content.scenes.find(s => s.id === payload.targetScene);
  if (!scene) return state;

  let newState: GameState = {
    ...state,
    world: { ...state.world, currentScene: payload.targetScene },
    phase: 'scene',
    narrativeBuffer: [],
  };

  // Apply onEnter effects
  if (scene.onEnter.length > 0) {
    newState = applyEffects(newState, scene.onEnter);
  }

  return newState;
}

function handleUseMethod(
  state: GameState,
  payload: { methodId: string },
  content: ContentPack
): GameState {
  const method = content.methods.find(m => m.id === payload.methodId);
  if (!method) return state;
  if (!state.character.methods[payload.methodId]) return state;

  // Check and deduct resource costs
  let character = { ...state.character };
  const res = { ...character.resources };
  const optRes = { ...character.optionalResources };

  for (const [key, cost] of Object.entries(method.resourceCost)) {
    if (cost === undefined || cost === 0) continue;
    if (key in res) {
      const current = res[key as keyof Resources];
      if (typeof current === 'number' && current < (cost as number)) return state; // can't afford
      (res as Record<string, unknown>)[key] = (current as number) - (cost as number);
    } else if (key in optRes) {
      const current = optRes[key as keyof OptionalResources] ?? 0;
      if (current < (cost as number)) return state;
      (optRes as Record<string, unknown>)[key] = current - (cost as number);
    }
  }

  character = { ...character, resources: res as Resources, optionalResources: optRes };

  let newState: GameState = {
    ...state,
    character,
    narrativeBuffer: [...state.narrativeBuffer, `Used ${method.name}.`],
  };

  // Apply method effects
  newState = applyEffects(newState, method.effects);

  // Gain mastery
  const currentMastery = newState.character.methods[payload.methodId]?.mastery ?? 0;
  if (currentMastery < method.masteryLevels) {
    // Small chance to gain mastery on use
    const masteryChance = 0.15;
    const roll = Math.random(); // TODO: use seeded RNG
    if (roll < masteryChance) {
      newState = {
        ...newState,
        character: {
          ...newState.character,
          methods: {
            ...newState.character.methods,
            [payload.methodId]: { mastery: currentMastery + 1 },
          },
        },
        narrativeBuffer: [
          ...newState.narrativeBuffer,
          `Your mastery of ${method.name} deepens.`,
        ],
      };
    }
  }

  return newState;
}

function handleAttemptBreakthrough(
  state: GameState,
  payload: { breakthroughId: string; force?: boolean },
  content: ContentPack
): GameState {
  const bt = content.breakthroughs.find(b => b.id === payload.breakthroughId);
  if (!bt) return state;

  // Simplified breakthrough - full logic in progression.ts
  // This handler applies the effects
  const meetsCoherence = state.coherence >= bt.minCoherence;
  const isForced = payload.force && !meetsCoherence;

  let newState: GameState = {
    ...state,
    phase: 'breakthrough',
  };

  if (meetsCoherence || payload.force) {
    // Deduct costs
    const res = { ...newState.character.resources };
    for (const [key, cost] of Object.entries(bt.resourceCost)) {
      if (cost && typeof cost === 'number' && key in res) {
        (res as Record<string, unknown>)[key] = Math.max(0, (res[key as keyof Resources] as number) - cost);
      }
    }
    newState = { ...newState, character: { ...newState.character, resources: res as Resources } };

    // Success
    newState = applyEffects(newState, bt.successEffects);
    if (isForced) {
      newState = applyEffects(newState, bt.forcedEffects);
    }

    // Advance rank
    const newRank = Math.min(9, bt.targetRank) as Rank;
    newState = {
      ...newState,
      character: { ...newState.character, rank: newRank },
      lastBreakthroughResult: isForced ? 'forced' : 'success',
      narrativeBuffer: [
        ...newState.narrativeBuffer,
        `Breakthrough achieved: ${bt.name}!`,
        isForced ? 'The forced ascension leaves scars on your cultivation base.' : '',
      ].filter(Boolean),
    };
  } else {
    // Failure
    newState = applyEffects(newState, bt.failureEffects);
    newState = {
      ...newState,
      lastBreakthroughResult: 'failure',
      narrativeBuffer: [
        ...newState.narrativeBuffer,
        `Breakthrough failed: ${bt.name}. Your foundation was not ready.`,
      ],
    };
  }

  return newState;
}

function handleCraftItem(
  state: GameState,
  payload: { recipeId: string },
  content: ContentPack
): GameState {
  const recipe = content.recipes.find(r => r.id === payload.recipeId);
  if (!recipe) return state;

  // Check inputs
  let character = { ...state.character };
  for (const input of recipe.inputs) {
    const slot = character.inventory.find(s => s.itemId === input.itemId);
    if (!slot || slot.quantity < input.quantity) return state; // can't afford
  }

  // Consume inputs
  for (const input of recipe.inputs) {
    character = {
      ...character,
      inventory: character.inventory
        .map(s => s.itemId === input.itemId ? { ...s, quantity: s.quantity - input.quantity } : s)
        .filter(s => s.quantity > 0),
    };
  }

  // Add output
  character = {
    ...character,
    inventory: addToInventory(character.inventory, recipe.baseOutput, 1),
  };

  let newState: GameState = {
    ...state,
    character,
    narrativeBuffer: [...state.narrativeBuffer, `Crafted: ${recipe.name}`],
  };

  // Check modifiers
  for (const mod of recipe.modifiers) {
    // Simplified: check if character has matching tags
    const charTags = new Set(newState.character.tags);
    if (mod.condition.type === 'has_tag' && mod.condition.target && charTags.has(mod.condition.target)) {
      newState = applyEffects(newState, mod.bonusEffects);
      newState = {
        ...newState,
        narrativeBuffer: [...newState.narrativeBuffer, mod.description],
      };
    }
  }

  return newState;
}

function handleEquipItem(
  state: GameState,
  payload: { itemId: string; slot: string }
): GameState {
  return {
    ...state,
    character: {
      ...state.character,
      equipped: { ...state.character.equipped, [payload.slot]: payload.itemId },
    },
  };
}

function handleUnequipItem(
  state: GameState,
  payload: { slot: string }
): GameState {
  const equipped = { ...state.character.equipped };
  equipped[payload.slot] = null;
  return {
    ...state,
    character: { ...state.character, equipped },
  };
}

function handleUseItem(
  state: GameState,
  payload: { itemId: string },
  content: ContentPack
): GameState {
  const itemDef = content.items.find(i => i.id === payload.itemId);
  if (!itemDef) return state;
  if (itemDef.category !== 'consumable') return state;

  const slot = state.character.inventory.find(s => s.itemId === payload.itemId);
  if (!slot || slot.quantity < 1) return state;

  let newState: GameState = {
    ...state,
    character: {
      ...state.character,
      inventory: state.character.inventory
        .map(s => s.itemId === payload.itemId ? { ...s, quantity: s.quantity - 1 } : s)
        .filter(s => s.quantity > 0),
    },
  };

  newState = applyEffects(newState, itemDef.effects);
  newState = {
    ...newState,
    narrativeBuffer: [...newState.narrativeBuffer, `Used ${itemDef.name}.`],
  };

  return newState;
}

function handleMeditate(
  state: GameState,
  payload: { focus: 'stability' | 'essence' | 'coherence' }
): GameState {
  const char = state.character;
  let newState = { ...state };
  const narratives: string[] = [];

  switch (payload.focus) {
    case 'stability':
      newState = {
        ...newState,
        character: {
          ...char,
          resources: {
            ...char.resources,
            stability: Math.min(char.resources.stability + 15, char.resources.maxStability),
          },
        },
      };
      narratives.push('You still your mind and reinforce your inner foundation. Stability restored.');
      break;
    case 'essence':
      newState = {
        ...newState,
        character: {
          ...char,
          resources: {
            ...char.resources,
            essence: Math.min(char.resources.essence + 20, char.resources.maxEssence),
          },
        },
      };
      narratives.push('You draw in ambient energy, refining it into cultivation essence.');
      break;
    case 'coherence':
      newState = {
        ...newState,
        character: {
          ...char,
          resources: {
            ...char.resources,
            stability: Math.min(char.resources.stability + 5, char.resources.maxStability),
            focus: Math.min(char.resources.focus + 5, char.resources.maxFocus),
          },
        },
      };
      narratives.push('You align your path, methods, and spirit. Inner harmony deepens.');
      break;
  }

  // Advance time by 1 day when meditating
  newState = {
    ...newState,
    world: { ...newState.world, day: newState.world.day + 1 },
    narrativeBuffer: [...newState.narrativeBuffer, ...narratives],
    turnCount: newState.turnCount + 1,
  };

  return newState;
}

function handleAdvanceTime(
  state: GameState,
  payload: { days: number }
): GameState {
  const newDay = state.world.day + payload.days;
  const seasons: WorldState['season'][] = ['spring', 'summer', 'autumn', 'winter'];
  const seasonIndex = Math.floor(newDay / 90) % 4;

  return {
    ...state,
    world: {
      ...state.world,
      day: newDay,
      season: seasons[seasonIndex],
      timers: state.world.timers.filter(t => t.expiresOnDay > newDay),
    },
  };
}

// --- Helpers ---

function addToInventory(inventory: { itemId: string; quantity: number }[], itemId: string, quantity: number) {
  const existing = inventory.find(s => s.itemId === itemId);
  if (existing) {
    return inventory.map(s => s.itemId === itemId ? { ...s, quantity: s.quantity + quantity } : s);
  }
  return [...inventory, { itemId, quantity }];
}

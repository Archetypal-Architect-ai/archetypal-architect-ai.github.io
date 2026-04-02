// ============================================================================
// Dragonsloft Cultivation RPG Engine — World System
// ============================================================================

import type {
  WorldState,
  CharacterState,
  ContentPack,
  SceneDef,
  FactionStanding,
  Condition,
} from './types';

// --- Faction standing thresholds (default) ---

const DEFAULT_STANDING_THRESHOLDS: { min: number; standing: FactionStanding }[] = [
  { min: 100, standing: 'devoted' },
  { min: 75, standing: 'allied' },
  { min: 50, standing: 'respected' },
  { min: 25, standing: 'known' },
  { min: -24, standing: 'neutral' },
  { min: -49, standing: 'distrusted' },
  { min: -74, standing: 'feared' },
  { min: -Infinity, standing: 'hostile' },
];

// --- Scene availability ---

/**
 * Return all scenes available to the character given the current world state.
 * A scene is available when:
 *   1. It belongs to the character's current region.
 *   2. All of its conditions are satisfied.
 */
export function getAvailableScenes(
  world: WorldState,
  character: CharacterState,
  content: ContentPack,
): SceneDef[] {
  return content.scenes.filter((scene) => {
    if (scene.region !== world.currentRegion) return false;
    return scene.conditions.every((cond) => checkCondition(cond, character, world, content));
  });
}

// --- Faction helpers ---

/**
 * Convert a raw numeric standing value to the FactionStanding enum.
 * If a faction definition exists in the content pack with custom thresholds those
 * could be layered in later; for now we use sensible defaults.
 */
export function getFactionStanding(world: WorldState, factionId: string): FactionStanding {
  const value = world.factionStandings[factionId] ?? 0;
  for (const threshold of DEFAULT_STANDING_THRESHOLDS) {
    if (value >= threshold.min) return threshold.standing;
  }
  return 'neutral';
}

/**
 * Modify a faction's numeric standing by `amount` (can be negative).
 */
export function modifyFactionStanding(
  world: WorldState,
  factionId: string,
  amount: number,
): WorldState {
  const current = world.factionStandings[factionId] ?? 0;
  return {
    ...world,
    factionStandings: {
      ...world.factionStandings,
      [factionId]: current + amount,
    },
  };
}

// --- World flags ---

export function setWorldFlag(
  world: WorldState,
  flag: string,
  value: string | number | boolean,
): WorldState {
  return {
    ...world,
    flags: {
      ...world.flags,
      [flag]: value,
    },
  };
}

export function getWorldFlag(
  world: WorldState,
  flag: string,
): string | number | boolean | undefined {
  return world.flags[flag];
}

// --- Region unlocking ---

export function unlockRegion(world: WorldState, regionId: string): WorldState {
  if (world.unlockedRegions.includes(regionId)) return world;
  return {
    ...world,
    unlockedRegions: [...world.unlockedRegions, regionId],
  };
}

// --- Narrative log ---

const MAX_NARRATIVE_LOG = 100;

export function addNarrativeLog(world: WorldState, entry: string): WorldState {
  const log = [...world.narrativeLog, entry];
  return {
    ...world,
    narrativeLog: log.length > MAX_NARRATIVE_LOG ? log.slice(log.length - MAX_NARRATIVE_LOG) : log,
  };
}

// --- Core condition checker ---

/**
 * Evaluate a single Condition against the current character, world, and content.
 * This must handle ALL condition types defined in types.ts.
 */
export function checkCondition(
  condition: Condition,
  character: CharacterState,
  world: WorldState,
  content: ContentPack,
): boolean {
  switch (condition.type) {
    // --- Character tag / collection checks ---

    case 'has_tag':
      return character.tags.includes(condition.target!);

    case 'has_path':
      return character.pathId === condition.target!;

    case 'has_method':
      return condition.target! in character.methods;

    case 'has_title':
      return (
        condition.target! in character.titles && character.titles[condition.target!].earned
      );

    case 'has_trait':
      return character.traits.includes(condition.target!);

    case 'has_item':
      return character.inventory.some((slot) => {
        if (slot.itemId !== condition.target!) return false;
        // If a numeric value is specified, require at least that quantity
        if (typeof condition.value === 'number') return slot.quantity >= condition.value;
        return slot.quantity > 0;
      });

    case 'has_companion':
      return character.companions.some((c) => c.companionId === condition.target! && c.bonded);

    case 'has_body_state':
      return character.bodyState === (condition.target ?? condition.value);

    // --- Numeric threshold checks ---

    case 'min_rank':
      return character.rank >= (condition.value as number);

    case 'min_resource': {
      const resVal = getResourceValue(character, condition.target!);
      return resVal >= (condition.value as number);
    }

    case 'max_resource': {
      const resVal = getResourceValue(character, condition.target!);
      return resVal <= (condition.value as number);
    }

    case 'min_coherence': {
      // Coherence is stored at the GameState level, but conditions reference it.
      // We check the world flag 'coherence' as a fallback convention, or treat as
      // always-true if the caller hasn't populated it (engine layer should set it).
      const coherence = world.flags['__coherence'];
      if (coherence === undefined) return true; // permissive when not tracked
      return (coherence as number) >= (condition.value as number);
    }

    case 'min_method_mastery': {
      const method = character.methods[condition.target!];
      if (!method) return false;
      return method.mastery >= (condition.value as number);
    }

    // --- Faction ---

    case 'faction_standing': {
      const current = getFactionStanding(world, condition.target!);
      const required = condition.standing!;
      return standingAtLeast(current, required);
    }

    // --- World state checks ---

    case 'world_flag': {
      const flagVal = world.flags[condition.target!];
      if (condition.value === undefined) {
        // Treat as a boolean existence / truthiness check
        return !!flagVal;
      }
      return flagVal === condition.value;
    }

    case 'time_after':
      return world.day >= (condition.value as number);

    case 'region_is':
      return world.currentRegion === condition.target!;

    // --- Meta / logical ---

    case 'not':
      if (!condition.inner) return true;
      return !checkCondition(condition.inner, character, world, content);

    default:
      // Unknown condition type — fail open with a warning in development
      if (typeof console !== 'undefined') {
        console.warn(`[world] Unknown condition type: ${(condition as Condition).type}`);
      }
      return false;
  }
}

// --- Internal helpers ---

const STANDING_ORDER: FactionStanding[] = [
  'hostile',
  'feared',
  'distrusted',
  'neutral',
  'known',
  'respected',
  'allied',
  'devoted',
];

/**
 * Return true if `current` standing is at least as high as `required`.
 */
function standingAtLeast(current: FactionStanding, required: FactionStanding): boolean {
  return STANDING_ORDER.indexOf(current) >= STANDING_ORDER.indexOf(required);
}

/**
 * Read a named resource value from the character, checking both core and optional resources.
 */
function getResourceValue(character: CharacterState, name: string): number {
  // Core resources
  if (name in character.resources) {
    return (character.resources as unknown as Record<string, number>)[name] ?? 0;
  }
  // Optional resources
  if (name in character.optionalResources) {
    return ((character.optionalResources as unknown as Record<string, number | undefined>)[name]) ?? 0;
  }
  return 0;
}

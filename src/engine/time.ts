// ============================================================================
// Dragonsloft Cultivation RPG Engine — Time System
// ============================================================================

import type { WorldState, Timer, Effect } from './types';

const DAYS_PER_SEASON = 90;
const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const;

export type Season = (typeof SEASONS)[number];

/**
 * Derive the current season from the absolute day count.
 * Day 0-89 = spring, 90-179 = summer, 180-269 = autumn, 270-359 = winter, then repeats.
 */
export function getSeason(day: number): Season {
  const index = Math.floor((day % (DAYS_PER_SEASON * 4)) / DAYS_PER_SEASON);
  return SEASONS[index];
}

/**
 * Return minor environmental effects associated with a season.
 */
export function getSeasonEffects(season: Season): Effect[] {
  switch (season) {
    case 'spring':
      return [
        { type: 'add_resource', target: 'essence', value: 2 },
        { type: 'narrative_log', value: 'The air hums with renewing essence as spring blossoms unfurl.' },
      ];
    case 'summer':
      return [
        { type: 'add_resource', target: 'vitality', value: 1 },
        { type: 'add_resource', target: 'focus', value: 1 },
        { type: 'narrative_log', value: 'Summer heat sharpens the senses and strengthens the body.' },
      ];
    case 'autumn':
      return [
        { type: 'add_resource', target: 'stability', value: 2 },
        { type: 'narrative_log', value: 'Autumn winds carry the weight of settling energies, granting calm.' },
      ];
    case 'winter':
      return [
        { type: 'add_resource', target: 'focus', value: 2 },
        { type: 'narrative_log', value: 'Winter stillness deepens concentration and tempers the spirit.' },
      ];
  }
}

/**
 * Add a timer to the world state.
 */
export function addTimer(world: WorldState, timer: Timer): WorldState {
  return {
    ...world,
    timers: [...world.timers, timer],
  };
}

/**
 * Advance time by a given number of days.
 * - Updates `world.day` and `world.season`.
 * - Collects expired timers (those whose `expiresOnDay <= newDay`).
 * - Removes expired timers from the world state.
 * - Reports whether the season changed during the advance.
 */
export function advanceTime(
  world: WorldState,
  days: number,
): { world: WorldState; expiredTimers: Timer[]; seasonChanged: boolean } {
  const oldSeason = getSeason(world.day);
  const newDay = world.day + days;
  const newSeason = getSeason(newDay);
  const seasonChanged = newSeason !== oldSeason;

  // Partition timers into expired and remaining
  const expiredTimers: Timer[] = [];
  const remainingTimers: Timer[] = [];

  for (const timer of world.timers) {
    if (timer.expiresOnDay <= newDay) {
      expiredTimers.push(timer);
    } else {
      remainingTimers.push(timer);
    }
  }

  const updatedWorld: WorldState = {
    ...world,
    day: newDay,
    season: newSeason,
    timers: remainingTimers,
  };

  return {
    world: updatedWorld,
    expiredTimers,
    seasonChanged,
  };
}

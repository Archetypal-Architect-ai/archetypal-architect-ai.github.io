// ============================================================================
// Dragonsloft Cultivation RPG Engine — Save / Load System
// ============================================================================

import type { GameState, SaveData } from './types';

export const SAVE_VERSION = 1;

const STORAGE_PREFIX = 'dragonsloft_save_';
const AUTOSAVE_KEY = `${STORAGE_PREFIX}__autosave__`;

// ---------------------------------------------------------------------------
// Core serialization
// ---------------------------------------------------------------------------

/**
 * Serialize the current game state into a JSON string using the SaveData
 * envelope format.
 */
export function saveGame(state: GameState, contentPackId: string): string {
  const data: SaveData = {
    version: SAVE_VERSION,
    timestamp: Date.now(),
    gameState: state,
    contentPackId,
  };
  return JSON.stringify(data);
}

/**
 * Deserialize a JSON string back into SaveData.
 * Returns `null` if parsing fails or the save version is incompatible.
 */
export function loadGame(json: string): SaveData | null {
  try {
    const data: SaveData = JSON.parse(json);
    if (
      typeof data !== 'object' ||
      data === null ||
      typeof data.version !== 'number' ||
      data.version > SAVE_VERSION
    ) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// localStorage slot helpers
// ---------------------------------------------------------------------------

/**
 * List all named save slots currently stored in localStorage.
 * Returns slot names (without the internal prefix).
 */
export function getSaveSlots(): string[] {
  const slots: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== null && key.startsWith(STORAGE_PREFIX) && key !== AUTOSAVE_KEY) {
      slots.push(key.slice(STORAGE_PREFIX.length));
    }
  }
  return slots.sort();
}

/**
 * Save the game state into a named localStorage slot.
 */
export function saveToSlot(slot: string, state: GameState, contentPackId: string): void {
  const json = saveGame(state, contentPackId);
  localStorage.setItem(`${STORAGE_PREFIX}${slot}`, json);
}

/**
 * Load a save from a named localStorage slot.
 * Returns `null` if the slot does not exist or the data is invalid.
 */
export function loadFromSlot(slot: string): SaveData | null {
  const json = localStorage.getItem(`${STORAGE_PREFIX}${slot}`);
  if (json === null) {
    return null;
  }
  return loadGame(json);
}

/**
 * Delete a named save slot from localStorage.
 */
export function deleteSave(slot: string): void {
  localStorage.removeItem(`${STORAGE_PREFIX}${slot}`);
}

// ---------------------------------------------------------------------------
// Autosave
// ---------------------------------------------------------------------------

/**
 * Persist an automatic save that can be restored on next session.
 */
export function autoSave(state: GameState, contentPackId: string): void {
  const json = saveGame(state, contentPackId);
  localStorage.setItem(AUTOSAVE_KEY, json);
}

/**
 * Load the autosave, or `null` if none exists or it is invalid.
 */
export function loadAutoSave(): SaveData | null {
  const json = localStorage.getItem(AUTOSAVE_KEY);
  if (json === null) {
    return null;
  }
  return loadGame(json);
}

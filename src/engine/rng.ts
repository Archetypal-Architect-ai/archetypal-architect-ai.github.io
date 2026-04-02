// ============================================================================
// Dragonsloft Cultivation RPG Engine — Deterministic RNG (Mulberry32)
// ============================================================================

/**
 * Immutable RNG state. Each operation returns a new RngState alongside
 * the produced value, keeping the system fully deterministic and
 * compatible with save/replay.
 */
export interface RngState {
  readonly seed: number;
}

/**
 * Create a new RNG from an integer seed.
 */
export function createRng(seed: number): RngState {
  return { seed: seed >>> 0 };
}

/**
 * Mulberry32 — a fast, high-quality 32-bit PRNG.
 * Returns the next state and a float in [0, 1).
 */
export function nextFloat(rng: RngState): [RngState, number] {
  let t = (rng.seed + 0x6d2b79f5) | 0;
  const nextSeed = t >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  const value = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  return [{ seed: nextSeed }, value];
}

/**
 * Return a random integer in [min, max] (inclusive on both ends).
 */
export function nextInt(rng: RngState, min: number, max: number): [RngState, number] {
  const [next, f] = nextFloat(rng);
  const value = min + Math.floor(f * (max - min + 1));
  return [next, value];
}

/**
 * Roll against a probability threshold.
 * `chance` should be in [0, 1] where 1 = always succeeds.
 */
export function rollCheck(rng: RngState, chance: number): [RngState, boolean] {
  const [next, f] = nextFloat(rng);
  return [next, f < chance];
}

/**
 * Pick a uniformly random element from a non-empty array.
 * Returns the new RNG state and the chosen element.
 */
export function pickRandom<T>(rng: RngState, array: readonly T[]): [RngState, T] {
  if (array.length === 0) {
    throw new Error('pickRandom called on empty array');
  }
  const [next, idx] = nextInt(rng, 0, array.length - 1);
  return [next, array[idx]];
}

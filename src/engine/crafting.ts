// ============================================================================
// Dragonsloft Cultivation RPG Engine — Crafting System
// ============================================================================
//
// The crafting system produces "weird, path-shaped outcomes." A Bone-Path
// cultivator forging a blade doesn't get "+5 cold damage" — they get a
// Marrow-Singing Cleaver that drains vitality from the fallen. Modifiers are
// driven by path, tags, traits, and affinities so that every crafter's
// output feels like a natural extension of their cultivation journey.
// ============================================================================

import type {
  CharacterState,
  WorldState,
  GameState,
  ContentPack,
  RecipeDef,
  CraftingModifier,
  CraftingInput,
  ItemDef,
  Effect,
  TagId,
} from './types';
import { checkCondition } from './world';

// ---- Public API -----------------------------------------------------------

/**
 * Return every recipe the character can currently see — they must satisfy the
 * recipe's gate conditions AND possess at least one unit of every required
 * input material.
 */
export function getAvailableRecipes(
  character: CharacterState,
  world: WorldState,
  content: ContentPack,
): RecipeDef[] {
  return content.recipes.filter((recipe) => {
    // All gate conditions must pass
    const conditionsMet = recipe.conditions.every((c) =>
      checkCondition(c, character, world, content),
    );
    if (!conditionsMet) return false;

    // Character must have at least *some* of every input (even if not enough
    // to craft — we still show the recipe so the UI can display shortfalls).
    // Check both inventory slots and the resources.materials bag.
    return recipe.inputs.every((input) => inventoryCount(character, input.itemId) > 0);
  });
}

/**
 * Precisely check whether the character can execute a recipe right now.
 * Returns a breakdown of any missing materials.
 */
export function canCraft(
  character: CharacterState,
  recipe: RecipeDef,
): { canCraft: boolean; missingInputs: { itemId: string; needed: number; have: number }[] } {
  const missingInputs: { itemId: string; needed: number; have: number }[] = [];

  for (const input of recipe.inputs) {
    const have = inventoryCount(character, input.itemId);
    if (have < input.quantity) {
      missingInputs.push({ itemId: input.itemId, needed: input.quantity, have });
    }
  }

  return { canCraft: missingInputs.length === 0, missingInputs };
}

/**
 * Execute a crafting recipe. This is the heart of the system:
 *
 *  1. Consume input materials from inventory.
 *  2. Determine which CraftingModifiers the character qualifies for.
 *  3. If any modifier provides an `outputOverride`, the last matching
 *     override wins (modifiers are ordered by specificity in content data).
 *  4. Collect all bonus effects from matched modifiers.
 *  5. Compute tag-affinity resonance bonuses — extra effects when the
 *     character's affinities/path tags overlap with the output item's tags.
 *  6. Add the output item to inventory.
 *  7. Generate narrative text that reflects the path-shaped nature of the
 *     crafting outcome.
 *
 * Returns a new GameState (immutable update), the resolved output ItemDef,
 * any bonus effects that should be applied, and narrative fragments.
 */
export function craftItem(
  state: GameState,
  recipe: RecipeDef,
  content: ContentPack,
): { state: GameState; outputItem: ItemDef; bonusEffects: Effect[]; narrative: string[] } {
  const { character, world } = state;
  const narrative: string[] = [];

  // --- 1. Consume inputs ------------------------------------------------
  let updatedCharacter = consumeInputs(character, recipe.inputs);

  // --- 2. Evaluate modifiers -------------------------------------------
  const matchedModifiers = getRecipeModifierMatches(character, world, recipe, content);

  // --- 3. Determine output item ----------------------------------------
  let outputItemId = recipe.baseOutput;

  // Last matching outputOverride wins (content authors order modifiers from
  // general → specific so the most specific override is last).
  for (const mod of matchedModifiers) {
    if (mod.outputOverride) {
      outputItemId = mod.outputOverride;
    }
  }

  const outputItem = content.items.find((i) => i.id === outputItemId);
  if (!outputItem) {
    throw new Error(
      `[crafting] Output item '${outputItemId}' not found in content pack for recipe '${recipe.id}'.`,
    );
  }

  // --- 4. Collect bonus effects from modifiers -------------------------
  const bonusEffects: Effect[] = [];
  for (const mod of matchedModifiers) {
    bonusEffects.push(...mod.bonusEffects);
    narrative.push(mod.description);
  }

  // --- 5. Tag-affinity resonance bonuses --------------------------------
  const resonanceEffects = computeResonanceBonuses(character, outputItem, content);
  bonusEffects.push(...resonanceEffects.effects);
  narrative.push(...resonanceEffects.narrative);

  // --- 6. Add output item to inventory ---------------------------------
  updatedCharacter = addToInventory(updatedCharacter, outputItem);

  // --- 7. Build narrative -----------------------------------------------
  narrative.unshift(
    `You shape the gathered materials, and ${outputItem.name} takes form beneath your hands.`,
  );

  if (matchedModifiers.length > 0) {
    narrative.push(
      `Your cultivation resonates through the work — the result is something only you could have made.`,
    );
  }

  // Append the item's own lore as closing flavor.
  if (outputItem.lore) {
    narrative.push(outputItem.lore);
  }

  // --- Assemble updated game state -------------------------------------
  const updatedWorld: WorldState = {
    ...world,
    narrativeLog: [...world.narrativeLog, ...narrative],
  };

  const updatedState: GameState = {
    ...state,
    character: updatedCharacter,
    world: updatedWorld,
    narrativeBuffer: [...state.narrativeBuffer, ...narrative],
    pendingEffects: [...state.pendingEffects, ...bonusEffects],
  };

  return { state: updatedState, outputItem, bonusEffects, narrative };
}

/**
 * Show which CraftingModifiers the player currently qualifies for on a given
 * recipe. Useful for preview UI ("Your Bone-Path affinity will transform
 * this blade into a Marrow-Singing Cleaver").
 */
export function getRecipeModifierMatches(
  character: CharacterState,
  world: WorldState,
  recipe: RecipeDef,
  content: ContentPack,
): CraftingModifier[] {
  return recipe.modifiers.filter((mod) =>
    checkCondition(mod.condition, character, world, content),
  );
}

// ---- Internal helpers -----------------------------------------------------

/**
 * Count how many of a given item the character holds across inventory slots
 * and the resources.materials bag.
 */
function inventoryCount(character: CharacterState, itemId: string): number {
  let total = 0;
  for (const slot of character.inventory) {
    if (slot.itemId === itemId) total += slot.quantity;
  }
  total += character.resources.materials[itemId] ?? 0;
  return total;
}

/**
 * Immutably consume crafting inputs from the character's inventory and
 * resources.materials bag. Inventory slots are drained first; any remainder
 * is pulled from materials. Empty slots and zero-count material entries are
 * pruned.
 */
function consumeInputs(
  character: CharacterState,
  inputs: CraftingInput[],
): CharacterState {
  let inventory = [...character.inventory.map((s) => ({ ...s }))];
  let materials = { ...character.resources.materials };

  for (const input of inputs) {
    let remaining = input.quantity;

    // Drain from inventory slots first.
    for (const slot of inventory) {
      if (slot.itemId !== input.itemId || remaining <= 0) continue;
      const deduct = Math.min(slot.quantity, remaining);
      slot.quantity -= deduct;
      remaining -= deduct;
    }

    // Drain remainder from materials bag.
    if (remaining > 0) {
      const available = materials[input.itemId] ?? 0;
      const deduct = Math.min(available, remaining);
      materials[input.itemId] = available - deduct;
      remaining -= deduct;
    }
  }

  // Prune empty inventory slots.
  inventory = inventory.filter((s) => s.quantity > 0);

  // Prune zero-count material entries.
  for (const key of Object.keys(materials)) {
    if (materials[key] <= 0) delete materials[key];
  }

  return {
    ...character,
    inventory,
    resources: { ...character.resources, materials },
  };
}

/**
 * Immutably add an item to the character's inventory, respecting stack rules.
 */
function addToInventory(
  character: CharacterState,
  item: ItemDef,
): CharacterState {
  const inventory = [...character.inventory.map((s) => ({ ...s }))];

  if (item.stackable) {
    const existing = inventory.find((s) => s.itemId === item.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + 1, item.maxStack);
      return { ...character, inventory };
    }
  }

  inventory.push({ itemId: item.id, quantity: 1 });
  return { ...character, inventory };
}

/**
 * Compute bonus effects and narrative from the resonance between a
 * character's affinities / path tags and the output item's tags.
 *
 * This is where the "weird, path-shaped outcomes" emerge: a character
 * whose cultivation is steeped in 'bone' and 'death' tags crafting an
 * item tagged 'weapon' won't just get a sword — the resonance system
 * layers on thematic effects that make the result feel cultivator-unique.
 */
function computeResonanceBonuses(
  character: CharacterState,
  item: ItemDef,
  content: ContentPack,
): { effects: Effect[]; narrative: string[] } {
  const effects: Effect[] = [];
  const narrative: string[] = [];

  // Gather all tags that define the character's cultivated identity:
  // their explicit affinities, their path's tags, and their personal tags.
  const identityTags = new Set<TagId>([
    ...character.affinities,
    ...character.tags,
  ]);

  // Pull in the character's path tags if a path is active.
  if (character.pathId) {
    const path = content.paths.find((p) => p.id === character.pathId);
    if (path) {
      for (const tag of path.tags) identityTags.add(tag);
      for (const tag of path.affinities) identityTags.add(tag);
    }
  }

  // Pull in tags from the character's traits.
  for (const traitId of character.traits) {
    const traitDef = content.traits.find((t) => t.id === traitId);
    if (traitDef) {
      for (const tag of traitDef.tags) identityTags.add(tag);
    }
  }

  // Find overlapping tags between identity and item
  const resonantTags: TagId[] = [];
  for (const tag of item.tags) {
    if (identityTags.has(tag)) {
      resonantTags.push(tag);
    }
  }
  // Also check item affinities
  for (const tag of item.affinities) {
    if (identityTags.has(tag) && !resonantTags.includes(tag)) {
      resonantTags.push(tag);
    }
  }

  if (resonantTags.length === 0) {
    return { effects, narrative };
  }

  // --- Generate path-shaped bonuses based on resonance depth ------------

  // Light resonance (1-2 shared tags): a subtle echo.
  // Deep resonance (3-4): the item twists to match the cultivator.
  // Profound resonance (5+): the crafting becomes a cultivation event itself.

  const depth = resonantTags.length;

  if (depth >= 1) {
    // Every resonance grants a small stability boost — the act of creating
    // something aligned with one's path is inherently stabilizing.
    effects.push({
      type: 'add_stability',
      value: Math.min(depth, 5),
    });
    narrative.push(
      `The ${resonantTags.slice(0, 2).join(' and ')} essence in the materials ` +
        `responds to your cultivation, settling into familiar patterns.`,
    );
  }

  if (depth >= 3) {
    // Deep resonance: the item carries a trace of the cultivator's identity,
    // feeding back into their growth.
    effects.push({
      type: 'add_path_depth',
      value: 1,
    });
    effects.push({
      type: 'add_resource',
      target: 'essence',
      value: depth,
    });
    narrative.push(
      `Deep resonance between your path and the ${item.name} feeds back ` +
        `into your cultivation — you feel your understanding deepen.`,
    );
  }

  if (depth >= 5) {
    // Profound resonance: the crafting act itself is transformative.
    // Tag the character with a crafting-derived tag for future interactions.
    const craftTag = `crafted:${item.id}` as TagId;
    effects.push({
      type: 'add_tag',
      target: craftTag,
    });
    effects.push({
      type: 'add_resource',
      target: 'momentum',
      value: 3,
    });
    narrative.push(
      `The act of creation becomes a cultivation breakthrough in miniature. ` +
        `The ${item.name} is not merely an object — it is an extension of your dao.`,
    );
  }

  return { effects, narrative };
}

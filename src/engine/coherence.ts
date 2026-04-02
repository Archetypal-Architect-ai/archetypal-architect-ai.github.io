// ============================================================================
// Dragonsloft Cultivation RPG Engine — Coherence / Resonance Calculation
// ============================================================================
//
// Coherence measures how well a character's build fits together: their path,
// methods, titles, traits, equipment, companions, body state, and affinities.
// A highly coherent build resonates — breakthroughs come easier, energy flows
// more efficiently, and titles of greater quality manifest. A discordant build
// risks mutation, instability, and failed advancement.
// ============================================================================

import type {
  TagId,
  CharacterState,
  ContentPack,
  CoherenceReport,
  PathDef,
  FrameworkDef,
  MethodDef,
  TitleDef,
  TraitDef,
  ItemDef,
  CompanionDef,
} from './types';

// ---------------------------------------------------------------------------
// Synergy & Conflict Data
// ---------------------------------------------------------------------------

/** [tagA, tagB, bonus] — tags that resonate when found together */
export const SYNERGY_PAIRS: [TagId, TagId, number][] = [
  // --- Dark cultivation core ---
  ['grave',    'death',     6],
  ['grave',    'bone',      5],
  ['grave',    'decay',     5],
  ['grave',    'undead',    6],
  ['grave',    'spirit',    4],
  ['death',    'bone',      5],
  ['death',    'decay',     5],
  ['death',    'undead',    7],
  ['death',    'spirit',    5],
  ['death',    'shadow',    4],
  ['bone',     'undead',    6],
  ['bone',     'ritual',    4],
  ['bone',     'relic',     3],
  ['blood',    'ritual',    7],
  ['blood',    'oath',      6],
  ['blood',    'sacrifice', 5],
  ['blood',    'vitality',  4],
  ['blood',    'blade',     3],
  ['ritual',   'oath',      5],
  ['ritual',   'relic',     5],
  ['ritual',   'spirit',    4],
  ['ritual',   'sacrifice', 5],
  ['ritual',   'circle',    4],
  ['shadow',   'stealth',   5],
  ['shadow',   'spirit',    4],
  ['shadow',   'decay',     3],
  ['shadow',   'night',     4],
  ['undead',   'spirit',    5],
  ['undead',   'decay',     4],
  ['undead',   'command',   4],
  ['decay',    'poison',    4],
  ['decay',    'corruption',4],
  ['spirit',   'medium',    5],
  ['spirit',   'ancestor',  5],
  ['spirit',   'soul',      6],
  ['oath',     'binding',   5],
  ['oath',     'honor',     4],
  ['oath',     'covenant',  5],
  ['relic',    'ancient',   4],
  ['relic',    'power',     3],
  ['sacrifice','power',     4],

  // --- Elemental ---
  ['fire',     'forge',     6],
  ['fire',     'ash',       4],
  ['fire',     'destruction',4],
  ['ice',      'crystal',   6],
  ['ice',      'preservation',4],
  ['ice',      'stillness', 3],
  ['storm',    'blade',     5],
  ['storm',    'lightning', 6],
  ['storm',    'wind',      5],
  ['lightning','metal',     4],
  ['earth',    'mountain',  5],
  ['earth',    'endurance', 4],
  ['water',    'flow',      4],
  ['water',    'moon',      3],

  // --- Nature / Beast ---
  ['beast',    'nature',    6],
  ['beast',    'fang',      4],
  ['beast',    'instinct',  4],
  ['nature',   'growth',    5],
  ['nature',   'healing',   4],
  ['nature',   'wood',      4],
  ['growth',   'life',      5],

  // --- Martial ---
  ['blade',    'edge',      4],
  ['blade',    'steel',     4],
  ['martial',  'discipline',5],
  ['martial',  'blade',     4],
  ['martial',  'body',      4],
  ['body',     'endurance', 5],
  ['body',     'iron',      4],

  // --- Mind / Celestial ---
  ['mind',     'focus',     5],
  ['mind',     'illusion',  4],
  ['mind',     'knowledge', 5],
  ['celestial','star',      6],
  ['celestial','light',     5],
  ['celestial','divine',    5],
  ['divine',   'holy',      6],
  ['divine',   'sanctity',  5],

  // --- Craft / Alchemy ---
  ['alchemy',  'poison',    4],
  ['alchemy',  'elixir',    5],
  ['alchemy',  'transmutation',5],
  ['forge',    'metal',     5],
  ['forge',    'rune',      4],
  ['rune',     'inscription',5],
  ['rune',     'binding',   4],
];

/** [tagA, tagB, penalty] — tags that clash and create dissonance */
export const CONFLICT_PAIRS: [TagId, TagId, number][] = [
  // --- Fundamental oppositions ---
  ['holy',     'undead',    10],
  ['holy',     'corruption', 9],
  ['holy',     'decay',      7],
  ['divine',   'undead',     9],
  ['divine',   'corruption', 8],
  ['sanctity', 'corruption', 9],
  ['sanctity', 'decay',      6],
  ['light',    'shadow',     6],
  ['light',    'darkness',   7],
  ['life',     'undead',     8],
  ['life',     'death',      5],
  ['life',     'decay',      6],
  ['nature',   'machine',    8],
  ['nature',   'mechanical', 8],
  ['nature',   'undead',     5],
  ['order',    'chaos',      7],
  ['order',    'corruption', 5],
  ['chaos',    'discipline', 6],
  ['healing',  'decay',      7],
  ['healing',  'corruption', 6],
  ['growth',   'decay',      6],
  ['growth',   'death',      5],

  // --- Elemental clashes ---
  ['fire',     'ice',        5],
  ['fire',     'water',      4],
  ['storm',    'stillness',  4],

  // --- Philosophical clashes ---
  ['honor',    'corruption', 6],
  ['honor',    'stealth',    3],
  ['beast',    'mechanical', 7],
  ['instinct', 'discipline', 4],
  ['preservation','destruction',6],
];

// ---------------------------------------------------------------------------
// Body-State Tag Associations
// ---------------------------------------------------------------------------

const BODY_STATE_TAGS: Record<string, TagId[]> = {
  normal:      [],
  mutated:     ['mutation', 'corruption', 'chaos'],
  augmented:   ['body', 'power', 'endurance'],
  undead:      ['undead', 'death', 'decay'],
  bestial:     ['beast', 'instinct', 'fang'],
  crystalline: ['crystal', 'ice', 'preservation'],
  spectral:    ['spirit', 'shadow', 'ethereal'],
  mechanical:  ['machine', 'mechanical', 'metal'],
};

// ---------------------------------------------------------------------------
// Tag Collection
// ---------------------------------------------------------------------------

interface TagSource {
  source: string;
  tags: TagId[];
}

/**
 * Gather every tag associated with a character's build, annotated with
 * its source so we can produce meaningful synergy/conflict descriptions.
 */
function collectTagSources(
  character: CharacterState,
  content: ContentPack,
): TagSource[] {
  const sources: TagSource[] = [];

  // Character's own explicit tags & affinities
  if (character.tags.length > 0) {
    sources.push({ source: 'character', tags: [...character.tags] });
  }
  if (character.affinities.length > 0) {
    sources.push({ source: 'affinities', tags: [...character.affinities] });
  }

  // Path
  if (character.pathId) {
    const path = content.paths.find((p: PathDef) => p.id === character.pathId);
    if (path) {
      sources.push({ source: `path:${path.name}`, tags: [...path.tags, ...path.affinities] });
    }
  }

  // Framework
  if (character.frameworkId) {
    const fw = content.frameworks.find((f: FrameworkDef) => f.id === character.frameworkId);
    if (fw) {
      sources.push({ source: `framework:${fw.name}`, tags: [...fw.tags] });
    }
  }

  // Methods
  for (const methodId of Object.keys(character.methods)) {
    const method = content.methods.find((m: MethodDef) => m.id === methodId);
    if (method) {
      sources.push({ source: `method:${method.name}`, tags: [...method.tags, ...method.affinities] });
    }
  }

  // Titles
  for (const titleId of Object.keys(character.titles)) {
    if (!character.titles[titleId].earned) continue;
    const title = content.titles.find((t: TitleDef) => t.id === titleId);
    if (title) {
      sources.push({ source: `title:${title.name}`, tags: [...title.tags] });
    }
  }

  // Traits
  for (const traitId of character.traits) {
    const trait = content.traits.find((t: TraitDef) => t.id === traitId);
    if (trait) {
      sources.push({ source: `trait:${trait.name}`, tags: [...trait.tags] });
    }
  }

  // Equipped items
  for (const slot of Object.keys(character.equipped)) {
    const itemId = character.equipped[slot];
    if (!itemId) continue;
    const item = content.items.find((i: ItemDef) => i.id === itemId);
    if (item) {
      sources.push({ source: `item:${item.name}`, tags: [...item.tags, ...item.affinities] });
    }
  }

  // Companions
  for (const comp of character.companions) {
    if (!comp.bonded) continue;
    const def = content.companions.find((c: CompanionDef) => c.id === comp.companionId);
    if (def) {
      sources.push({ source: `companion:${def.name}`, tags: [...def.tags, ...def.affinities] });
    }
  }

  // Body state
  const bodyTags = BODY_STATE_TAGS[character.bodyState];
  if (bodyTags && bodyTags.length > 0) {
    sources.push({ source: `body:${character.bodyState}`, tags: bodyTags });
  }

  return sources;
}

// ---------------------------------------------------------------------------
// Core Calculation
// ---------------------------------------------------------------------------

/**
 * Calculate a character's coherence score and produce a detailed report of
 * synergies, conflicts, and suggestions for improvement.
 */
export function calculateCoherence(
  character: CharacterState,
  content: ContentPack,
): CoherenceReport {
  const tagSources = collectTagSources(character, content);

  // Build a flat set of all tags and a map of tag -> sources for reporting
  const tagToSources = new Map<TagId, string[]>();
  for (const { source, tags } of tagSources) {
    for (const tag of tags) {
      const existing = tagToSources.get(tag);
      if (existing) {
        existing.push(source);
      } else {
        tagToSources.set(tag, [source]);
      }
    }
  }

  const allTags = new Set(tagToSources.keys());

  const synergies: CoherenceReport['synergies'] = [];
  const conflicts: CoherenceReport['conflicts'] = [];

  let score = 50;

  // --- Evaluate synergy pairs ---
  for (const [tagA, tagB, bonus] of SYNERGY_PAIRS) {
    if (allTags.has(tagA) && allTags.has(tagB)) {
      const sourcesA = tagToSources.get(tagA)!;
      const sourcesB = tagToSources.get(tagB)!;

      // Stronger bonus when synergy comes from different sources (cross-system resonance)
      const crossSource = sourcesA.some(
        (sa) => sourcesB.some((sb) => sa !== sb),
      );
      const effectiveBonus = crossSource ? bonus : Math.ceil(bonus * 0.6);

      synergies.push({
        source: tagA,
        target: tagB,
        bonus: effectiveBonus,
        reason: crossSource
          ? `${tagA} (${sourcesA[0]}) resonates with ${tagB} (${sourcesB[0]})`
          : `${tagA} and ${tagB} reinforce within ${sourcesA[0]}`,
      });

      score += effectiveBonus;
    }
  }

  // --- Evaluate conflict pairs ---
  for (const [tagA, tagB, penalty] of CONFLICT_PAIRS) {
    if (allTags.has(tagA) && allTags.has(tagB)) {
      const sourcesA = tagToSources.get(tagA)!;
      const sourcesB = tagToSources.get(tagB)!;

      // Worse penalty when conflict comes from different sources (can't be resolved internally)
      const crossSource = sourcesA.some(
        (sa) => sourcesB.some((sb) => sa !== sb),
      );
      const effectivePenalty = crossSource ? penalty : Math.ceil(penalty * 0.5);

      conflicts.push({
        source: tagA,
        target: tagB,
        penalty: effectivePenalty,
        reason: crossSource
          ? `${tagA} (${sourcesA[0]}) clashes with ${tagB} (${sourcesB[0]})`
          : `${tagA} and ${tagB} conflict within ${sourcesA[0]}`,
      });

      score -= effectivePenalty;
    }
  }

  // --- Path + Framework alignment bonus ---
  if (character.pathId && character.frameworkId) {
    const path = content.paths.find((p: PathDef) => p.id === character.pathId);
    const fw = content.frameworks.find((f: FrameworkDef) => f.id === character.frameworkId);

    if (path && fw) {
      // Framework coherence bonus tags that match path tags/affinities
      const pathTagSet = new Set([...path.tags, ...path.affinities]);
      const matchCount = fw.coherenceBonus.filter((t: TagId) => pathTagSet.has(t)).length;

      if (matchCount > 0) {
        const bonus = matchCount * 3;
        synergies.push({
          source: `path:${path.name}`,
          target: `framework:${fw.name}`,
          bonus,
          reason: `Path and framework share ${matchCount} aligned tag(s)`,
        });
        score += bonus;
      }

      // Framework tags overlapping with path tags
      const fwTagSet = new Set(fw.tags);
      const fwOverlap = path.tags.filter((t: TagId) => fwTagSet.has(t)).length;
      if (fwOverlap > 0) {
        const bonus = fwOverlap * 2;
        synergies.push({
          source: `path:${path.name}`,
          target: `framework:${fw.name}`,
          bonus,
          reason: `Framework and path share ${fwOverlap} core tag(s)`,
        });
        score += bonus;
      }
    }
  }

  // --- Method affinities matching path affinities ---
  if (character.pathId) {
    const path = content.paths.find((p: PathDef) => p.id === character.pathId);
    if (path) {
      const pathAffinitySet = new Set(path.affinities);

      for (const methodId of Object.keys(character.methods)) {
        const method = content.methods.find((m: MethodDef) => m.id === methodId);
        if (!method) continue;

        const matchingAffinities = method.affinities.filter((a: TagId) => pathAffinitySet.has(a));
        if (matchingAffinities.length > 0) {
          const bonus = matchingAffinities.length * 2;
          synergies.push({
            source: `method:${method.name}`,
            target: `path:${path.name}`,
            bonus,
            reason: `Method affinities (${matchingAffinities.join(', ')}) align with path`,
          });
          score += bonus;
        }
      }
    }
  }

  // --- Title tags matching path tags ---
  if (character.pathId) {
    const path = content.paths.find((p: PathDef) => p.id === character.pathId);
    if (path) {
      const pathTagSet = new Set([...path.tags, ...path.affinities]);

      for (const titleId of Object.keys(character.titles)) {
        if (!character.titles[titleId].earned) continue;
        const title = content.titles.find((t: TitleDef) => t.id === titleId);
        if (!title) continue;

        const matchingTags = title.tags.filter((t: TagId) => pathTagSet.has(t));
        if (matchingTags.length > 0) {
          const bonus = matchingTags.length * 2;
          synergies.push({
            source: `title:${title.name}`,
            target: `path:${path.name}`,
            bonus,
            reason: `Title tags (${matchingTags.join(', ')}) align with path`,
          });
          score += bonus;
        }
      }
    }
  }

  // --- Path opposition penalties ---
  if (character.pathId) {
    const path = content.paths.find((p: PathDef) => p.id === character.pathId);
    if (path && path.oppositions.length > 0) {
      const oppositionSet = new Set(path.oppositions);
      for (const [tag, sources] of tagToSources) {
        if (oppositionSet.has(tag)) {
          // Only penalize if the opposed tag comes from something other than the path itself
          const nonPathSources = sources.filter((s) => !s.startsWith('path:'));
          if (nonPathSources.length > 0) {
            const penalty = 5;
            conflicts.push({
              source: tag,
              target: `path:${path.name}`,
              penalty,
              reason: `Tag '${tag}' (from ${nonPathSources[0]}) opposes your path`,
            });
            score -= penalty;
          }
        }
      }
    }
  }

  // --- Tag concentration bonus (deep thematic focus) ---
  // If a single tag appears from 3+ different sources, grant a small bonus
  for (const [tag, sources] of tagToSources) {
    const uniqueSources = new Set(sources);
    if (uniqueSources.size >= 3) {
      const bonus = Math.min((uniqueSources.size - 2) * 2, 6);
      synergies.push({
        source: tag,
        target: 'build focus',
        bonus,
        reason: `Deep resonance: '${tag}' echoes through ${uniqueSources.size} aspects of your build`,
      });
      score += bonus;
    }
  }

  // --- Clamp score ---
  score = Math.max(0, Math.min(100, Math.round(score)));

  // --- Generate suggestions ---
  const suggestions = generateSuggestions(character, content, conflicts, synergies, allTags);

  return { score, synergies, conflicts, suggestions };
}

// ---------------------------------------------------------------------------
// Suggestion Generation
// ---------------------------------------------------------------------------

function generateSuggestions(
  character: CharacterState,
  content: ContentPack,
  conflicts: CoherenceReport['conflicts'],
  synergies: CoherenceReport['synergies'],
  allTags: Set<TagId>,
): string[] {
  const suggestions: string[] = [];

  // Suggest removing conflicting equipment
  for (const conflict of conflicts) {
    if (conflict.reason.includes('item:')) {
      suggestions.push(
        `Consider unequipping items that carry the '${conflict.source}' tag to reduce dissonance.`,
      );
      break; // one suggestion is enough
    }
  }

  // Suggest methods that would synergize
  if (character.pathId) {
    const path = content.paths.find((p: PathDef) => p.id === character.pathId);
    if (path) {
      const pathTags = new Set([...path.tags, ...path.affinities]);
      const knownMethods = new Set(Object.keys(character.methods));

      for (const method of content.methods) {
        if (knownMethods.has(method.id)) continue;
        const overlap = method.affinities.filter((a: TagId) => pathTags.has(a)).length;
        if (overlap >= 2) {
          suggestions.push(
            `Learning '${method.name}' would strengthen coherence — its affinities align with your path.`,
          );
          break;
        }
      }
    }
  }

  // Warn about body state conflicts
  const bodyTags = BODY_STATE_TAGS[character.bodyState] ?? [];
  for (const conflict of conflicts) {
    if (bodyTags.includes(conflict.source) || bodyTags.includes(conflict.target)) {
      suggestions.push(
        `Your ${character.bodyState} body state introduces dissonance. Seek transformation or align your build to it.`,
      );
      break;
    }
  }

  // If score is low and no specific suggestions yet, give generic advice
  if (suggestions.length === 0 && conflicts.length > synergies.length) {
    suggestions.push(
      'Your build pulls in too many directions. Focus on fewer thematic elements for stronger resonance.',
    );
  }

  // If doing well, encourage
  if (conflicts.length === 0 && synergies.length >= 3) {
    suggestions.push(
      'Your build resonates deeply. This is an excellent foundation for breakthrough.',
    );
  }

  return suggestions;
}

// ---------------------------------------------------------------------------
// Coherence Modifier (gameplay effects)
// ---------------------------------------------------------------------------

export interface CoherenceModifier {
  /** Multiplier for breakthrough difficulty. <1 = easier, >1 = harder */
  breakthroughDifficulty: number;
  /** Multiplier for energy/resource efficiency. >1 = more efficient */
  energyEfficiency: number;
  /** Multiplier for title quality when earning new titles. >1 = better */
  titleQuality: number;
  /** Chance (0-1) of mutation when attempting breakthroughs or unstable actions */
  mutationChance: number;
}

/**
 * Translate a raw coherence score (0-100) into gameplay modifiers.
 *
 * Design curve:
 *   0   -> very hard breakthroughs, poor efficiency, high mutation risk
 *   30  -> noticeable penalties
 *   50  -> baseline (neutral)
 *   70  -> noticeable bonuses
 *   100 -> strong bonuses, near-zero mutation risk
 */
export function getCoherenceModifier(coherence: number): CoherenceModifier {
  // Normalize to 0..1
  const t = Math.max(0, Math.min(100, coherence)) / 100;

  // Breakthrough difficulty: 1.6 at coherence 0, 1.0 at 50, 0.6 at 100
  // Uses a linear interpolation centered at 50
  const breakthroughDifficulty = 1.6 - t * 1.0;

  // Energy efficiency: 0.6 at coherence 0, 1.0 at 50, 1.5 at 100
  // Slightly curved — high coherence is rewarded more
  const energyEfficiency = 0.6 + t * 0.9;

  // Title quality: 0.5 at coherence 0, 1.0 at 50, 1.6 at 100
  const titleQuality = 0.5 + t * 1.1;

  // Mutation chance: 40% at coherence 0, ~8% at 50, ~0% at 100
  // Exponential decay — drops off quickly above 50
  const mutationChance = Math.max(0, 0.4 * Math.pow(1 - t, 2));

  return {
    breakthroughDifficulty: round3(breakthroughDifficulty),
    energyEfficiency: round3(energyEfficiency),
    titleQuality: round3(titleQuality),
    mutationChance: round3(mutationChance),
  };
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

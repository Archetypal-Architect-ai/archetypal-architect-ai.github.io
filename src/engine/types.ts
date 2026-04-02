// ============================================================================
// Dragonsloft Cultivation RPG Engine — Core Type Definitions
// ============================================================================

// --- Tags & Identifiers ---

export type TagId = string;
export type PathId = string;
export type FrameworkId = string;
export type MethodId = string;
export type TitleId = string;
export type TraitId = string;
export type ItemId = string;
export type FactionId = string;
export type RegionId = string;
export type SceneId = string;
export type BreakthroughId = string;
export type CompanionId = string;
export type RecipeId = string;

// --- Enums & Constants ---

export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const RANK_NAMES: Record<Rank, string> = {
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

export type ItemCategory = 'relic' | 'implement' | 'vestment' | 'consumable' | 'material';
export type MethodCategory = 'combat' | 'cultivation' | 'crafting' | 'social' | 'exploration' | 'passive';
export type BodyState = 'normal' | 'mutated' | 'augmented' | 'undead' | 'bestial' | 'crystalline' | 'spectral' | 'mechanical';
export type FactionStanding = 'hostile' | 'feared' | 'distrusted' | 'neutral' | 'known' | 'respected' | 'allied' | 'devoted';

// --- Core Resources ---

export interface Resources {
  vitality: number;
  maxVitality: number;
  essence: number;
  maxEssence: number;
  focus: number;
  maxFocus: number;
  stability: number;
  maxStability: number;
  momentum: number;
  reputation: number;
  materials: Record<ItemId, number>;
}

export interface OptionalResources {
  corruption?: number;
  sanctity?: number;
  dread?: number;
  bloodReserve?: number;
  command?: number;
  domainControl?: number;
  favor?: number;
  worship?: number;
  synchronization?: number;
}

// --- Conditions ---

export interface Condition {
  type: 'has_tag' | 'has_path' | 'has_method' | 'has_title' | 'has_trait' |
        'has_item' | 'min_rank' | 'min_resource' | 'max_resource' |
        'faction_standing' | 'has_body_state' | 'has_companion' |
        'world_flag' | 'min_coherence' | 'min_method_mastery' |
        'time_after' | 'region_is' | 'not';
  target?: string;
  value?: number | string;
  standing?: FactionStanding;
  inner?: Condition; // for 'not' type
}

// --- Tag-Driven Effect System ---

export interface Effect {
  type: 'add_resource' | 'set_resource' | 'add_tag' | 'remove_tag' |
        'add_trait' | 'remove_trait' | 'add_title' | 'evolve_title' |
        'add_method' | 'add_item' | 'remove_item' | 'set_body_state' |
        'add_faction_rep' | 'set_world_flag' | 'clear_world_flag' |
        'start_timer' | 'advance_time' | 'add_companion' |
        'trigger_breakthrough' | 'add_corruption' | 'add_stability' |
        'damage' | 'unlock_region' | 'set_scene' | 'add_method_mastery' |
        'add_path_depth' | 'narrative_log';
  target?: string;
  value?: number | string;
  tags?: TagId[];
}

// --- Origin ---

export interface Origin {
  id: string;
  name: string;
  description: string;
  tags: TagId[];
  startingTraits: TraitId[];
  startingMethods: MethodId[];
  startingItems: ItemId[];
  startingResources: Partial<Resources>;
  affinities: TagId[];
  lore: string;
}

// --- Path ---

export interface PathDef {
  id: PathId;
  name: string;
  description: string;
  tags: TagId[];
  framework: FrameworkId;
  affinities: TagId[];
  oppositions: TagId[]; // tags that clash with this path
  ranks: PathRankInfo[];
  lore: string;
}

export interface PathRankInfo {
  rank: Rank;
  name: string;
  description: string;
  unlockEffects: Effect[];
}

// --- Framework ---

export interface FrameworkDef {
  id: FrameworkId;
  name: string;
  description: string;
  tags: TagId[];
  advancementStyle: string; // flavor description
  coherenceBonus: TagId[]; // tags that grant bonus coherence under this framework
}

// --- Method ---

export interface MethodDef {
  id: MethodId;
  name: string;
  description: string;
  category: MethodCategory;
  tags: TagId[];
  affinities: TagId[];
  resourceCost: Partial<Resources & OptionalResources>;
  masteryLevels: number; // max mastery (e.g. 5)
  masteryBonuses: MasteryBonus[];
  effects: Effect[];
  conditions: Condition[]; // prerequisites to learn
  upgradeInto?: MethodId[]; // advanced versions
  lore: string;
}

export interface MasteryBonus {
  level: number;
  description: string;
  effects: Effect[];
}

// --- Title ---

export interface TitleDef {
  id: TitleId;
  name: string;
  description: string;
  tags: TagId[];
  sourceConditions: Condition[];
  recognitionScope: 'local' | 'regional' | 'continental' | 'world' | 'cosmic';
  ranks: TitleRankInfo[];
  passiveEffects: Effect[];
  socialConsequences: SocialConsequence[];
  evolutionPaths: TitleEvolution[];
  lore: string;
}

export interface TitleRankInfo {
  rank: number;
  name: string;
  description: string;
  conditions: Condition[];
  effects: Effect[];
}

export interface SocialConsequence {
  factionId: FactionId;
  standingModifier: number;
  reaction: string;
}

export interface TitleEvolution {
  targetTitleId: TitleId;
  conditions: Condition[];
  description: string;
}

// --- Trait ---

export interface TraitDef {
  id: TraitId;
  name: string;
  description: string;
  tags: TagId[];
  permanent: boolean;
  passiveEffects: Effect[];
  conditions: Condition[]; // how this trait is gained
  mutations?: TraitMutation[];
  lore: string;
}

export interface TraitMutation {
  targetTraitId: TraitId;
  conditions: Condition[];
  description: string;
}

// --- Item ---

export interface ItemDef {
  id: ItemId;
  name: string;
  description: string;
  category: ItemCategory;
  tags: TagId[];
  affinities: TagId[];
  effects: Effect[]; // on equip/use
  stackable: boolean;
  maxStack: number;
  equipSlot?: string;
  lore: string;
}

// --- Companion ---

export interface CompanionDef {
  id: CompanionId;
  name: string;
  description: string;
  tags: TagId[];
  affinities: TagId[];
  passiveEffects: Effect[];
  conditions: Condition[]; // how to bond
  growthStages?: CompanionGrowthStage[];
  lore: string;
}

export interface CompanionGrowthStage {
  stage: number;
  name: string;
  description: string;
  conditions: Condition[];
  effects: Effect[];
}

// --- Breakthrough ---

export interface BreakthroughDef {
  id: BreakthroughId;
  name: string;
  description: string;
  tags: TagId[];
  targetRank: Rank;
  conditions: Condition[];
  resourceCost: Partial<Resources & OptionalResources>;
  minCoherence: number;
  riskFactors: RiskFactor[];
  successEffects: Effect[];
  failureEffects: Effect[];
  forcedEffects: Effect[]; // if player forces breakthrough despite not meeting conditions
  lore: string;
}

export interface RiskFactor {
  condition: Condition;
  description: string;
  penaltyEffects: Effect[];
}

// --- Faction ---

export interface FactionDef {
  id: FactionId;
  name: string;
  description: string;
  tags: TagId[];
  attitude: Record<TagId, number>; // how they react to various tags
  standingThresholds: Record<FactionStanding, number>;
  lore: string;
}

// --- Region ---

export interface RegionDef {
  id: RegionId;
  name: string;
  description: string;
  tags: TagId[];
  affinities: TagId[];
  dangerTier: number;
  scenes: SceneId[];
  unlockConditions: Condition[];
  environmentEffects: Effect[]; // applied while in this region
  lore: string;
}

// --- Scene ---

export interface SceneDef {
  id: SceneId;
  name: string;
  description: string; // narrative text
  tags: TagId[];
  region: RegionId;
  conditions: Condition[]; // when this scene is available
  onEnter: Effect[];
  choices: Choice[];
  exits: SceneExit[];
  repeatable: boolean;
  lore?: string;
}

export interface Choice {
  id: string;
  text: string;
  conditions: Condition[];
  effects: Effect[];
  resultText: string;
  tags: TagId[];
  nextScene?: SceneId;
  visible?: boolean; // false = hidden until conditions met; default true
}

export interface SceneExit {
  targetScene: SceneId;
  text: string;
  conditions: Condition[];
}

// --- Crafting ---

export interface RecipeDef {
  id: RecipeId;
  name: string;
  description: string;
  tags: TagId[];
  inputs: CraftingInput[];
  conditions: Condition[];
  baseOutput: ItemId;
  modifiers: CraftingModifier[];
  lore: string;
}

export interface CraftingInput {
  itemId: ItemId;
  quantity: number;
}

export interface CraftingModifier {
  condition: Condition;
  description: string;
  outputOverride?: ItemId;
  bonusEffects: Effect[];
}

// --- World State ---

export interface WorldState {
  currentRegion: RegionId;
  currentScene: SceneId;
  flags: Record<string, string | number | boolean>;
  factionStandings: Record<FactionId, number>;
  unlockedRegions: RegionId[];
  timers: Timer[];
  day: number;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  activeThreats: string[];
  rumors: string[];
  deadNpcs: string[];
  narrativeLog: string[];
}

export interface Timer {
  id: string;
  label: string;
  expiresOnDay: number;
  onExpireEffects: Effect[];
}

// --- Character State ---

export interface CharacterState {
  name: string;
  origin: string;
  bodyState: BodyState;
  rank: Rank;
  pathId: PathId | null;
  pathDepth: number;
  frameworkId: FrameworkId | null;

  resources: Resources;
  optionalResources: OptionalResources;

  methods: Record<MethodId, { mastery: number }>;
  titles: Record<TitleId, { rank: number; earned: boolean }>;
  traits: TraitId[];
  affinities: TagId[];
  tags: TagId[];

  inventory: InventorySlot[];
  equipped: Record<string, ItemId | null>;
  companions: CompanionState[];
}

export interface InventorySlot {
  itemId: ItemId;
  quantity: number;
}

export interface CompanionState {
  companionId: CompanionId;
  stage: number;
  bonded: boolean;
}

// --- Full Game State ---

export interface GameState {
  character: CharacterState;
  world: WorldState;
  coherence: number;
  phase: GamePhase;
  pendingEffects: Effect[];
  lastBreakthroughResult?: 'success' | 'failure' | 'forced';
  narrativeBuffer: string[];
  seed: number;
  turnCount: number;
  debug: boolean;
}

export type GamePhase =
  | 'character_creation'
  | 'scene'
  | 'choice_result'
  | 'breakthrough'
  | 'crafting'
  | 'inventory'
  | 'meditation'
  | 'game_over';

// --- Action Types (Reducer) ---

export type GameAction =
  | { type: 'CREATE_CHARACTER'; payload: { name: string; origin: Origin; path: PathDef } }
  | { type: 'MAKE_CHOICE'; payload: { sceneId: SceneId; choiceId: string } }
  | { type: 'NAVIGATE'; payload: { targetScene: SceneId } }
  | { type: 'ATTEMPT_BREAKTHROUGH'; payload: { breakthroughId: BreakthroughId; force?: boolean } }
  | { type: 'USE_METHOD'; payload: { methodId: MethodId } }
  | { type: 'CRAFT_ITEM'; payload: { recipeId: RecipeId } }
  | { type: 'EQUIP_ITEM'; payload: { itemId: ItemId; slot: string } }
  | { type: 'UNEQUIP_ITEM'; payload: { slot: string } }
  | { type: 'USE_ITEM'; payload: { itemId: ItemId } }
  | { type: 'MEDITATE'; payload: { focus: 'stability' | 'essence' | 'coherence' } }
  | { type: 'ADVANCE_TIME'; payload: { days: number } }
  | { type: 'SET_PHASE'; payload: { phase: GamePhase } }
  | { type: 'APPLY_EFFECTS'; payload: { effects: Effect[] } }
  | { type: 'DISMISS_NARRATIVE' }
  | { type: 'TOGGLE_DEBUG' }
  | { type: 'LOAD_STATE'; payload: GameState }
  | { type: 'NEW_GAME' };

// --- Content Pack ---

export interface ContentPack {
  origins: Origin[];
  paths: PathDef[];
  frameworks: FrameworkDef[];
  methods: MethodDef[];
  titles: TitleDef[];
  traits: TraitDef[];
  items: ItemDef[];
  companions: CompanionDef[];
  breakthroughs: BreakthroughDef[];
  factions: FactionDef[];
  regions: RegionDef[];
  scenes: SceneDef[];
  recipes: RecipeDef[];
}

// --- Coherence Calculation Result ---

export interface CoherenceReport {
  score: number; // 0-100
  synergies: { source: string; target: string; bonus: number; reason: string }[];
  conflicts: { source: string; target: string; penalty: number; reason: string }[];
  suggestions: string[];
}

// --- Save Data ---

export interface SaveData {
  version: number;
  timestamp: number;
  gameState: GameState;
  contentPackId: string;
}

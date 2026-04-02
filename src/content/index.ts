import type { ContentPack } from '../engine/types';
import { origins } from './origins';
import { paths } from './paths';
import { frameworks } from './frameworks';
import { methods } from './methods';
import { titles } from './titles';
import { traits } from './traits';
import { items } from './items';
import { breakthroughs } from './breakthroughs';
import { factions } from './factions';
import { regions } from './regions';
import { scenes } from './scenes';
import { recipes } from './recipes';

export const ashenmoorContentPack: ContentPack = {
  origins,
  paths,
  frameworks,
  methods,
  titles,
  traits,
  items,
  companions: [],
  breakthroughs,
  factions,
  regions,
  scenes,
  recipes,
};

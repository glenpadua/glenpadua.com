import { lakeScene } from '../scenes/lake/content';
import { beachScene } from '../scenes/beach/content';
import { cityScene } from '../scenes/city/content';
import type { WorldScene } from '../model/types';

/** Homepage chapter order. Removing/reordering entries requires no renderer edit. */
export const worldScenes: readonly WorldScene[] = [
  lakeScene,
  beachScene,
  cityScene,
];

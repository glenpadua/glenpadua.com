import type { WorldScene } from './types';

/** Painting coordinates belong to content; runtime controls belong to the journey. */
export interface SceneProps {
  scene: WorldScene;
  load: boolean;
  first: boolean;
  active: boolean;
}

export interface CharacterProps {
  load: boolean;
  onError: () => void;
  play?: number;
}

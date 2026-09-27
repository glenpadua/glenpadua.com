import type { ComponentType } from 'react';
import type { SceneProps } from '../model/scene-runtime';
import { SceneArtwork } from '../shared/scene-artwork';
import { LakeScene } from './lake/scene';
import { BeachScene } from './beach/scene';
import { CityScene } from './city/scene';

/** Custom effects are optional; data-only chapters use the shared renderer. */
const renderers: Record<string, ComponentType<SceneProps>> = {
  lake: LakeScene,
  beach: BeachScene,
  city: CityScene,
};
export function SceneRenderer(props: SceneProps): JSX.Element {
  const Scene = renderers[props.scene.id] ?? SceneArtwork;
  return <Scene {...props} />;
}

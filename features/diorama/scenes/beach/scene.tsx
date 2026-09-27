'use client';
import type { SceneProps } from '../../model/scene-runtime';
import { SceneArtwork } from '../../shared/scene-artwork';
import { useMotionPolicy } from '../../shared/scene-motion';
import { BeachCharacter, BeachStill } from './character';
import { BeachAtmosphere } from './atmosphere';
import { BeachWater } from './water';

export function BeachScene(props: SceneProps): JSX.Element {
  const { enabled } = useMotionPolicy();
  const moving = enabled && props.active;
  return (
    <SceneArtwork
      {...props}
      fallback={<BeachStill />}
      renderLayer={(layer, onError) =>
        layer.id === 'character' ? (
          <BeachCharacter load={props.load} onError={onError} moving={moving} />
        ) : undefined
      }
      afterLayer={layer =>
        layer.id === 'back' ? (
          <BeachWater load={props.load} moving={moving} />
        ) : undefined
      }
      atmosphere={<BeachAtmosphere moving={moving} />}
    />
  );
}

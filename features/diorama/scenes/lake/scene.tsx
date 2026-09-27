'use client';
import type { SceneProps } from '../../model/scene-runtime';
import { SceneArtwork } from '../../shared/scene-artwork';
import { LakeCharacter } from './character';
import { LakeGrass, LakeLife, LakeSeeds } from './lake-life';
import { LakeWater } from './lake-water';

export function LakeScene(props: SceneProps): JSX.Element {
  return (
    <SceneArtwork
      {...props}
      renderLayer={(layer, onError) =>
        layer.id === 'grass' ? (
          <LakeGrass onError={onError} />
        ) : layer.id === 'character' ? (
          <LakeCharacter load={props.load} onError={onError} />
        ) : undefined
      }
      afterLayer={(layer, onError) =>
        layer.id === 'back' && props.load ? (
          <>
            <LakeLife onError={onError} />
            <LakeWater active={props.active} />
          </>
        ) : undefined
      }
      atmosphere={<LakeSeeds />}
    />
  );
}

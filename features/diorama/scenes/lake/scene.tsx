'use client';
import type { SceneProps } from '../../model/scene-runtime';
import { worldAsset } from '../../lib/assets';
import { SceneArtwork } from '../../shared/scene-artwork';
import { lakeHorizonMask } from './horizon';
import { LakeCharacter } from './character';
import { LakeGrass, LakeLife, LakeSeeds } from './lake-life';
import { LakeWater } from './lake-water';

export function LakeScene(props: SceneProps): JSX.Element {
  return (
    <SceneArtwork
      {...props}
      fallback={
        <img
          className="world-static-art"
          style={{ maskImage: lakeHorizonMask }}
          src={worldAsset('lake-static-glasses-v1')}
          alt=""
          loading={props.first ? 'eager' : 'lazy'}
        />
      }
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

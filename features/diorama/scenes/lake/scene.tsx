'use client';
import { useState } from 'react';
import type { SceneProps } from '../../model/scene-runtime';
import { worldAsset } from '../../lib/assets';
import { SceneArtwork } from '../../shared/scene-artwork';
import { lakeHorizonMask } from './horizon';
import { LakeCharacter } from './character';
import { LakeGrass, LakeLife, LakeSeeds } from './lake-life';
import { LakeWater } from './lake-water';
import { InteractionOrb } from '../../shared/interaction-orb';
import { useMotionPolicy } from '../../shared/scene-motion';

export function LakeScene(props: SceneProps): JSX.Element {
  const { enabled } = useMotionPolicy();
  // Each cheer restarts a short burst of reps from the same pull-up frames.
  const [cheers, setCheers] = useState(0);
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
          <LakeCharacter
            load={props.load}
            onError={onError}
            priority={props.first}
            play={cheers}
          />
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
      controls={
        // A reaction only makes sense while he is moving.
        enabled && props.active ? (
          <InteractionOrb
            className="lake-cheer"
            label="Cheer Glen on"
            hint="Cheer him on"
            marker={<span className="lake-cheer-target" />}
            onClick={() => setCheers(count => count + 1)}
          />
        ) : undefined
      }
    />
  );
}

'use client';
import { useState } from 'react';
import { preload } from 'react-dom';
import type { SceneProps } from '../../model/scene-runtime';
import { worldAsset } from '../../lib/assets';
import { SceneArtwork } from '../../shared/scene-artwork';
import { lakeHorizonMask } from './horizon';
import { LakeCharacter } from './character';
import { LakeGrass, LakeLife, LakeSeeds } from './lake-life';
import { LakeWater } from './lake-water';
import { InteractionOrb } from '../../shared/interaction-orb';

export function LakeScene(props: SceneProps): JSX.Element {
  // Each cheer restarts a short burst of reps from the same pull-up frames.
  const [cheers, setCheers] = useState(0);
  // The opening scene's landscape (an SVG image) and horizon mask (CSS) are
  // otherwise found late, after the images the page announces itself.
  if (props.first) {
    preload(worldAsset('lake-clearing-v3'), {
      as: 'image',
      fetchPriority: 'high',
    });
    preload('/assets/world/lake-horizon-mask-v1.webp', {
      as: 'image',
      fetchPriority: 'high',
    });
  }
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
        // The one thing to touch at the lake: the bar keeps its joke, and a
        // tap is a cheer, so he does a few more reps (while motion is on).
        <InteractionOrb
          className="cue-exercise"
          style={{ left: '83.5%', top: '61%' }}
          label="Skipping leg day since 2008. Cheer him on for a few more reps"
          hint="Skipping leg day since 2008."
          onClick={() => setCheers(count => count + 1)}
        />
      }
    />
  );
}

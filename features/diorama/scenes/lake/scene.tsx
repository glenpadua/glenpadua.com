'use client';
import { useState } from 'react';
import { preload } from 'react-dom';
import type { SceneProps } from '../../model/scene-runtime';
import { worldAsset } from '../../lib/assets';
import { SceneArtwork } from '../../shared/scene-artwork';
import { LakeCharacter } from './character';
import { LakeGrass, LakeLife, LakeSeeds } from './lake-life';
import { LakeWater } from './lake-water';
import { InteractionOrb } from '../../shared/interaction-orb';
import { LakeStoneSkip } from './stone-skip';

export function LakeScene(props: SceneProps): JSX.Element {
  // Each cheer quickens three reps without interrupting a landing or recovery.
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
        // The still includes Glen above the ridge: a landscape-only horizon
        // mask would clip his head. Keep the complete painting on failure.
        <img
          className="world-static-art"
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
            active={props.active}
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
        <>
          <LakeStoneSkip active={props.active} />
          {/* A cheer quickens a few reps while scene motion is on. */}
          <InteractionOrb
            className="cue-exercise"
            style={{ left: '83.5%', top: '61%' }}
            label="Cheer me on! Do a few faster pull-ups"
            hint="Cheer me on!"
            onClick={() => setCheers(count => count + 1)}
          />
        </>
      }
    />
  );
}

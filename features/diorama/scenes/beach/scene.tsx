'use client';
import { useState } from 'react';
import type { SceneProps } from '../../model/scene-runtime';
import { SceneArtwork } from '../../shared/scene-artwork';
import { InteractionOrb } from '../../shared/interaction-orb';
import { useMotionPolicy } from '../../shared/scene-motion';
import { BeachCharacter } from './character';
import { BeachAtmosphere } from './atmosphere';
import { BeachWater } from './water';

export function BeachScene(props: SceneProps): JSX.Element {
  const [play, setPlay] = useState(0);
  const { enabled } = useMotionPolicy();
  const moving = enabled && props.active;
  return (
    <SceneArtwork
      {...props}
      renderLayer={(layer, onError) =>
        layer.id === 'character' ? (
          <BeachCharacter
            load={props.load}
            onError={onError}
            play={play}
            moving={moving}
          />
        ) : undefined
      }
      afterLayer={layer =>
        layer.id === 'back' ? (
          <BeachWater load={props.load} moving={moving} />
        ) : undefined
      }
      atmosphere={<BeachAtmosphere moving={moving} />}
      controls={
        <InteractionOrb
          className="cue-football"
          label="Roll the football"
          hint={enabled ? 'A little footwork' : 'Motion is paused'}
          onClick={() => setPlay(value => value + 1)}
        />
      }
      response={
        play > 0 && !enabled ? (
          <span className="sr-only" role="status">
            A little footwork — motion is paused.
          </span>
        ) : undefined
      }
    />
  );
}

'use client';
import { useState } from 'react';
import type { SceneProps } from '../../model/scene-runtime';
import { SceneArtwork } from '../../shared/scene-artwork';
import { InteractionOrb } from '../../shared/interaction-orb';
import { useMotionPolicy } from '../../shared/scene-motion';
import { worldAsset } from '../../lib/assets';
import { CitySkyline, CityTerrace } from './atmosphere';
import { CityNightBackdrop } from './night-backdrop';
import { CityCouple } from './couple';

export function CityScene(props: SceneProps): JSX.Element {
  const [lantern, setLantern] = useState(true);
  const [lightReady, setLightReady] = useState(false);
  const [sips, setSips] = useState(0);
  const { enabled } = useMotionPolicy();
  const moving = enabled && props.active;
  return (
    <SceneArtwork
      {...props}
      fallback={
        <img
          className="world-static-art"
          src={worldAsset('city-static-glasses-v1')}
          alt=""
          loading={props.first ? 'eager' : 'lazy'}
        />
      }
      lantern={lantern}
      renderLayer={(layer, onError) =>
        layer.id === 'terrace' ? (
          <CityCouple
            load={props.load}
            moving={moving}
            play={sips}
            onError={onError}
          />
        ) : undefined
      }
      afterLayer={layer => {
        if (layer.id === 'back')
          return (
            <>
              <CityNightBackdrop load={props.load} active={props.active} />
              <CitySkyline moving={moving} />
            </>
          );
        if (layer.id === 'terrace')
          return (
            <>
              {props.load && (
                <img
                  className="city-terrace-unlit"
                  src={worldAsset('city-couple-backdrop-off-v1')}
                  alt=""
                  width={1536}
                  height={1024}
                  decoding="async"
                  onLoad={() => setLightReady(true)}
                  onError={() => setLightReady(false)}
                />
              )}
              <CityTerrace moving={moving} />
            </>
          );
      }}
      controls={
        <>
          <InteractionOrb
            className="cue-coffee"
            label="Take a sip of coffee"
            hint="Take a sip"
            style={{ left: '75.5%', top: '71%' }}
            onClick={() => setSips(count => count + 1)}
          />
          <InteractionOrb
            className="cue-lantern"
            label={
              lantern
                ? 'Turn the terrace lantern off'
                : 'Light the terrace lantern'
            }
            hint={lantern ? 'Lights out' : 'A little warmth'}
            pressed={!lantern}
            disabled={!lightReady}
            onClick={() => setLantern(value => !value)}
          />
        </>
      }
    />
  );
}

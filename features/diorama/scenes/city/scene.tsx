'use client';
import { useState } from 'react';
import type { SceneProps } from '../../model/scene-runtime';
import { SceneArtwork } from '../../shared/scene-artwork';
import { InteractionOrb } from '../../shared/interaction-orb';
import { useMotionPolicy } from '../../shared/scene-motion';
import { worldAsset } from '../../lib/assets';
import { CitySkyline, CityTerrace } from './atmosphere';

export function CityScene(props: SceneProps): JSX.Element {
  const [lantern, setLantern] = useState(true);
  const [lightReady, setLightReady] = useState(false);
  const { enabled } = useMotionPolicy();
  const moving = enabled && props.active;
  return (
    <SceneArtwork
      {...props}
      lantern={lantern}
      afterLayer={layer => {
        if (layer.id === 'back') return <CitySkyline moving={moving} />;
        if (layer.id === 'terrace')
          return (
            <>
              {props.load && (
                <img
                  className="city-terrace-unlit"
                  src={worldAsset('city-front-off-v2')}
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
      }
    />
  );
}

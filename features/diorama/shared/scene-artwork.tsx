'use client';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { worldAsset } from '../lib/assets';
import type { WorldLayer } from '../model/types';
import type { SceneProps } from '../model/scene-runtime';
import { InteractionOrb } from './interaction-orb';

interface ArtworkProps extends SceneProps {
  renderLayer?: (layer: WorldLayer, onError: () => void) => ReactNode;
  afterLayer?: (layer: WorldLayer, onError: () => void) => ReactNode;
  atmosphere?: ReactNode;
  controls?: ReactNode;
  response?: ReactNode;
  /** Static, scene-owned art used after a layer failure and without JavaScript. */
  fallback?: ReactNode;
  lantern?: boolean;
}

/** Shared art stage and fallbacks. Scene modules own behavior through explicit slots. */
export function SceneArtwork({
  scene,
  load,
  first,
  renderLayer,
  afterLayer,
  atmosphere,
  controls,
  response,
  fallback,
  lantern,
}: ArtworkProps): JSX.Element {
  const [failed, setFailed] = useState(false);
  const onError = () => setFailed(true);
  return (
    <div
      className="world-art"
      role="group"
      aria-label={scene.description}
      data-lantern={lantern}
    >
      {failed ? (
        (fallback ?? (
          <img
            className="world-static-art"
            style={{
              maskImage: scene.layers.find(layer => layer.id === 'back')?.mask,
            }}
            src={worldAsset(`${scene.id}-static`)}
            alt=""
          />
        ))
      ) : (
        <>
          {scene.layers.map(layer => (
            <div
              key={layer.id}
              className={`world-layer layer-${layer.id}`}
              style={
                {
                  left: `${layer.x ?? 0}%`,
                  top: `${layer.y ?? 0}%`,
                  width: `${layer.width ?? 100}%`,
                  maskImage: layer.mask,
                } as CSSProperties
              }
            >
              {renderLayer?.(layer, onError) ??
                (load ? (
                  <img
                    src={worldAsset(layer.asset)}
                    srcSet={
                      layer.responsive
                        ? `${worldAsset(`${layer.asset}-900`)} 900w, ${worldAsset(layer.asset)} 1536w`
                        : undefined
                    }
                    sizes="(max-width: 760px) 210vw, 100vw"
                    width={layer.id === 'character' ? 600 : 1536}
                    height={layer.id === 'character' ? 584 : 1024}
                    fetchPriority={
                      first && layer.id === 'back' ? 'high' : undefined
                    }
                    decoding="async"
                    alt=""
                    onError={onError}
                  />
                ) : null)}
              {afterLayer?.(layer, onError)}
            </div>
          ))}
          {atmosphere}
        </>
      )}
      <noscript>
        {fallback ?? (
          <img
            className="world-static-art"
            style={{
              maskImage: scene.layers.find(layer => layer.id === 'back')?.mask,
            }}
            src={worldAsset(`${scene.id}-static`)}
            alt=""
            loading={first ? 'eager' : 'lazy'}
          />
        )}
      </noscript>
      <div className="world-hotspots">
        {scene.hotspots.map(h => (
          <InteractionOrb
            key={h.id}
            className={`cue-${h.id}`}
            href={h.href}
            label={h.label}
            hint={h.hint}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          />
        ))}
        {controls}
      </div>
      {response}
    </div>
  );
}

'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { worldAsset } from '../../lib/assets';
import type { CharacterProps } from '../../model/scene-runtime';
import { beachWorkStateAt, TYPING_PATCH, TYPING_PATCH_STYLE } from './typing';
import { STRETCH_BOUNDS, STRETCH_SIZE, STRETCH_STYLE } from './stretch';

const poses = [
  'beach-typing-focused',
  'beach-typing-tap-crop-v1',
  'beach-stretch-gather-v1',
  'beach-stretch-clasp-v1',
  'beach-stretch-extend-v1',
  'beach-stretch-hold-v1',
] as const;

export function BeachCharacter({
  load,
  onError,
  moving,
}: CharacterProps & { moving: boolean }): JSX.Element | null {
  const root = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const loaded = useRef(new Set<string>());
  const [ready, setReady] = useState(false);
  const imageReady = useCallback(
    (image: HTMLImageElement | null) => {
      if (!image?.complete) return;
      // A cached error can precede React attaching the onError listener.
      if (!image.naturalWidth) {
        onError();
        return;
      }
      loaded.current.add(image.src);
      if (loaded.current.size === poses.length + 2) setReady(true);
    },
    [onError],
  );
  useEffect(() => {
    if (!moving || !load || !ready) return;
    const started = performance.now();
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      const state = beachWorkStateAt(
        elapsed.current + performance.now() - started,
      );
      if (root.current) {
        root.current.dataset.frame = String(state.frame);
        root.current.dataset.phase = state.phase;
      }
      timer = setTimeout(update, Math.max(1, state.untilNextMs));
    };
    update();
    return () => {
      clearTimeout(timer);
      elapsed.current += performance.now() - started;
    };
  }, [moving, load, ready]);

  if (!load) return null;
  return (
    <div
      ref={root}
      className="character-beach beach-laptop"
      data-frame="0"
      data-phase="typing"
      data-moving={moving}
      aria-hidden="true"
    >
      <img
        hidden
        style={{ display: 'none' }}
        ref={imageReady}
        src={worldAsset('beach-typing-mask-v1')}
        alt=""
        onLoad={event => imageReady(event.currentTarget)}
        onError={onError}
      />
      <img
        ref={imageReady}
        className="beach-stretch-backdrop"
        src={worldAsset('beach-stretch-backdrop-v1')}
        width="900"
        height="900"
        alt=""
        onLoad={event => imageReady(event.currentTarget)}
        onError={onError}
      />
      {poses.map((asset, frame) => (
        <img
          key={frame}
          ref={imageReady}
          className={`beach-typing-frame frame-${frame}`}
          style={
            frame === 0
              ? {
                  maskImage: `url(${worldAsset('beach-typing-mask-v1')})`,
                  maskSize: '100% 100%',
                }
              : frame === 1
                ? TYPING_PATCH_STYLE
                : STRETCH_STYLE
          }
          src={worldAsset(asset)}
          width={
            frame === 1
              ? TYPING_PATCH.right - TYPING_PATCH.left
              : frame >= 2
                ? STRETCH_BOUNDS.width
                : STRETCH_SIZE
          }
          height={
            frame === 1
              ? TYPING_PATCH.bottom - TYPING_PATCH.top
              : frame >= 2
                ? STRETCH_BOUNDS.height
                : STRETCH_SIZE
          }
          alt=""
          onLoad={event => imageReady(event.currentTarget)}
          onError={onError}
        />
      ))}
    </div>
  );
}

/** The same complete typing pose is used without JavaScript or after a failure. */
export function BeachStill(): JSX.Element {
  return (
    <div className="beach-still" aria-hidden="true">
      <img
        className="beach-still-back"
        src={worldAsset('beach-back')}
        alt=""
        width="1536"
        height="1024"
      />
      <img
        className="beach-still-character"
        src={worldAsset('beach-typing-focused')}
        alt=""
        width="900"
        height="900"
      />
    </div>
  );
}

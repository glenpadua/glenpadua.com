'use client';
import { useEffect, useRef } from 'react';
import { worldAsset } from '../../lib/assets';
import type { CharacterProps } from '../../model/scene-runtime';
import { typingStateAt, TYPING_PATCH_CLIP } from './typing';

export function BeachCharacter({
  load,
  onError,
  moving,
}: CharacterProps & { moving: boolean }): JSX.Element | null {
  const root = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  useEffect(() => {
    if (!moving || !load) return;
    const started = performance.now();
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      const state = typingStateAt(
        elapsed.current + performance.now() - started,
      );
      if (root.current) root.current.dataset.frame = String(state.frame);
      timer = setTimeout(update, Math.max(1, state.untilNextMs));
    };
    update();
    return () => {
      clearTimeout(timer);
      elapsed.current += performance.now() - started;
    };
  }, [moving, load]);

  if (!load) return null;
  return (
    <div
      ref={root}
      className="character-beach beach-laptop"
      data-frame="0"
      data-moving={moving}
      aria-hidden="true"
    >
      {[0, 1].map(frame => (
        <img
          key={frame}
          className={`beach-typing-frame frame-${frame}`}
          style={frame === 1 ? { clipPath: TYPING_PATCH_CLIP } : undefined}
          src={worldAsset(
            frame === 0 ? 'beach-typing-focused' : 'beach-typing-focused-tap',
          )}
          width="900"
          height="900"
          alt=""
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

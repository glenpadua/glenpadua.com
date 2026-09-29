'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { worldAsset } from '../../lib/assets';
import type { CharacterProps } from '../../model/scene-runtime';
import { useMotionPolicy } from '../../shared/scene-motion';
import { advancePullup, pullupPose, pullupWait } from './pullup-routine';
/** Coherent complete poses; anatomical left stays left. */
export function LakeCharacter({
  load,
  onError,
  play = 0,
  priority = false,
  active,
}: CharacterProps & { priority?: boolean; active: boolean }): JSX.Element {
  // The bar and Glen arrive together, never an empty bar waiting for him.
  const [ready, setReady] = useState(false);
  const { enabled } = useMotionPolicy();
  const sprite = useRef<HTMLImageElement | null>(null);
  const clock = useRef({ elapsed: 0, cheers: 0 });
  const lastCheer = useRef(play);
  const sheet = useCallback(
    (image: HTMLImageElement | null) => {
      sprite.current = image;
      // A cached load or failure can finish before hydration attaches handlers.
      if (!image?.complete || !image.getAttribute('src')) return;
      if (image.naturalWidth) setReady(true);
      else onError();
    },
    [onError],
  );
  useEffect(() => {
    if (play !== lastCheer.current) {
      lastCheer.current = play;
      if (enabled && active) clock.current.cheers = 3;
    }
    const image = sprite.current;
    if (!image || !ready || !active || !enabled) return;
    let request = 0;
    let timer: ReturnType<typeof setTimeout>;
    let previous = performance.now();
    let wait = 0;
    let lastTransform = '';
    const tick = (now: number) => {
      clock.current = advancePullup(clock.current, now - previous, wait);
      previous = now;
      const pose = pullupPose(clock.current.elapsed);
      const x = (pose.frame % 5) * -20;
      const y = Math.floor(pose.frame / 5) * -50 + pose.y / 14.4;
      const transform = `translate(${x}%, ${y.toFixed(3)}%)`;
      if (transform !== lastTransform) {
        image.style.transform = transform;
        image.dataset.phase = pose.phase;
        image.dataset.frame = String(pose.frame);
        lastTransform = transform;
      }
      const next = pullupWait(clock.current);
      wait = next ?? 0;
      if (next === null) request = requestAnimationFrame(tick);
      else timer = setTimeout(() => tick(performance.now()), Math.max(1, next));
    };
    tick(previous);
    return () => {
      cancelAnimationFrame(request);
      clearTimeout(timer);
      clock.current = advancePullup(
        clock.current,
        performance.now() - previous,
        wait,
      );
    };
  }, [ready, active, enabled, play]);
  return (
    <div
      className="character-action character-lake"
      data-ready={ready}
      aria-hidden="true"
    >
      <svg className="pullup-apparatus" viewBox="0 0 600 720">
        <defs>
          <linearGradient id="pullup-post" x1="0" x2="1">
            <stop stopColor="#23472b" />
            <stop offset=".35" stopColor="#477c43" />
            <stop offset="1" stopColor="#2c562f" />
          </linearGradient>
        </defs>
        <ellipse cx="300" cy="699" rx="235" ry="12" fill="#344b3236" />
        <rect
          x="89"
          y="115"
          width="49"
          height="584"
          rx="11"
          fill="url(#pullup-post)"
          stroke="#203e27"
          strokeWidth="5"
        />
        <rect
          x="463"
          y="115"
          width="49"
          height="584"
          rx="11"
          fill="url(#pullup-post)"
          stroke="#203e27"
          strokeWidth="5"
        />
        <path
          d="M132 190H469"
          stroke="#183f24"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path d="M132 188H469" stroke="#568849" strokeWidth="15" />
      </svg>

      <div className="character-window">
        <img
          ref={sheet}
          className="character-sheet"
          src={load ? worldAsset('lake-pullup-routine-v1') : undefined}
          width={3000}
          height={1440}
          alt=""
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          onLoad={() => setReady(true)}
          onError={onError}
        />
      </div>
    </div>
  );
}

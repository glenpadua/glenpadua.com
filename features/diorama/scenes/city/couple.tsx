'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CharacterProps } from '../../model/scene-runtime';
import { worldAsset } from '../../lib/assets';
import {
  CITY_ATLAS,
  CITY_COUPLE_REGION,
  CITY_COUPLE_STYLE,
} from './couple-geometry';
import {
  advanceCityClock,
  cityPose,
  initialCityClock,
  requestCitySip,
} from './couple-motion';

export function CityCouple({
  load,
  moving,
  onError,
  play = 0,
}: CharacterProps & {
  moving: boolean;
}): JSX.Element | null {
  const root = useRef<HTMLDivElement>(null);
  const clock = useRef(initialCityClock());
  const previous = useRef<number | null>(null);
  const lastPlay = useRef(play);
  const loaded = useRef(new Set<string>());
  const [ready, setReady] = useState(false);
  const imageReady = useCallback(
    (image: HTMLImageElement | null) => {
      if (!image?.complete) return;
      if (!image.naturalWidth) {
        onError();
        return;
      }
      loaded.current.add(image.src);
      if (loaded.current.size === 2) setReady(true);
    },
    [onError],
  );

  useEffect(() => {
    if (!load || !ready || !moving) {
      // A click while motion is disabled is not queued for a surprise later.
      lastPlay.current = play;
      return;
    }
    if (lastPlay.current !== play) {
      clock.current = requestCitySip(clock.current);
      lastPlay.current = play;
    }
    let timer: ReturnType<typeof setTimeout>;
    previous.current = performance.now();
    const tick = () => {
      const now = performance.now();
      clock.current = advanceCityClock(
        clock.current,
        now - (previous.current ?? now),
        Math.random,
      );
      previous.current = now;
      const pose = cityPose(clock.current);
      if (root.current) {
        root.current.dataset.frame = String(pose.frame);
        root.current.dataset.phase = pose.phase;
        const image =
          root.current.querySelector<HTMLImageElement>('.city-couple-sheet');
        if (image)
          image.style.transform = `translate(${(pose.frame % 5) * -20}%, ${Math.floor(pose.frame / 5) * -50}%)`;
      }
      timer = setTimeout(tick, Math.max(1, clock.current.remaining));
    };
    tick();
    return () => {
      clearTimeout(timer);
      const now = performance.now();
      clock.current = advanceCityClock(
        clock.current,
        now - (previous.current ?? now),
        Math.random,
      );
      previous.current = null;
    };
  }, [load, ready, moving, play]);

  if (!load) return null;
  return (
    <div
      ref={root}
      className="city-couple"
      data-frame="0"
      data-phase="idle"
      data-moving={moving}
      aria-hidden="true"
    >
      <img
        ref={imageReady}
        className="city-couple-backdrop"
        src={worldAsset('city-couple-backdrop-v1')}
        width="1536"
        height="1024"
        alt=""
        onLoad={event => imageReady(event.currentTarget)}
        onError={onError}
      />
      <div className="city-couple-window" style={CITY_COUPLE_STYLE}>
        <div className="city-couple-moving">
          <img
            ref={imageReady}
            className="city-couple-sheet"
            src={worldAsset('city-couple-motion-v1')}
            width={CITY_COUPLE_REGION.width * CITY_ATLAS.columns}
            height={CITY_COUPLE_REGION.height * CITY_ATLAS.rows}
            alt=""
            onLoad={event => imageReady(event.currentTarget)}
            onError={onError}
          />
        </div>
        <div className="city-couple-listener">
          <img
            className="city-couple-sheet"
            src={worldAsset('city-couple-motion-v1')}
            width={CITY_COUPLE_REGION.width * CITY_ATLAS.columns}
            height={CITY_COUPLE_REGION.height * CITY_ATLAS.rows}
            alt=""
            onError={onError}
          />
        </div>
      </div>
      <svg className="city-coffee" viewBox="0 0 1536 1024" fill="none">
        <g className="city-steam-position-glen">
          <g className="city-cup-steam">
            <path d="M1188 713c-7-9 7-14 1-23s-3-13 0-18" />
            <path d="M1195 710c5-7-5-11-2-19" />
          </g>
        </g>
        <g className="city-steam-position-companion">
          <g className="city-cup-steam city-cup-steam-companion">
            <path d="M1290 714c-6-8 7-13 1-22s-3-12 0-17" />
            <path d="M1297 711c5-7-5-12-2-19" />
          </g>
        </g>
      </svg>
    </div>
  );
}

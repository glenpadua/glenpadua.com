'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionPolicy } from '../../shared/scene-motion';
import { worldAsset } from '../../lib/assets';

/** One opaque hand and its shadow move over a fixed, hand-free background. */
export function WritingHand({
  resting,
}: {
  resting: boolean;
}): JSX.Element | null {
  const motion = useRef<HTMLDivElement>(null);
  const activity = useRef<HTMLSpanElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    if (!activity.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );
    observer.observe(activity.current);
    return () => observer.disconnect();
  }, []);
  const { enabled } = useMotionPolicy();
  useEffect(() => {
    const hand = motion.current;
    if (!hand) return;
    // Finish the current stroke from its exact pose before settling the pen.
    if (resting) {
      hand.style.setProperty(
        '--writing-finish-from',
        getComputedStyle(hand).transform,
      );
      hand.dataset.resting = 'true';
    } else {
      hand.dataset.resting = 'false';
    }
  }, [resting]);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const portrait = window.matchMedia(
      '(max-width:520px), (max-aspect-ratio:13/10)',
    );
    let version = 0;
    const load = () => {
      const current = ++version;
      const format = portrait.matches ? 'portrait' : 'desktop';
      setReady(false);
      const sources = [
        worldAsset(`stories-writing-clean-${format}`),
        worldAsset(portrait.matches ? 'writing-portrait-v1' : 'writing'),
        `/assets/world/stories-writing-mask-${format}.svg`,
        `/assets/world/stories-writing-clean-mask-${format}.svg`,
        `/assets/world/stories-writing-cuff-mask-${format}.svg`,
      ];
      void Promise.all(
        sources.map(
          src =>
            new Promise<void>((resolve, reject) => {
              const image = new window.Image();
              image.onload = () => resolve();
              image.onerror = () =>
                reject(new Error('Writing layer unavailable'));
              image.src = src;
            }),
        ),
      ).then(
        () => {
          if (version === current) setReady(true);
        },
        () => {
          if (version === current) setFailed(true);
        },
      );
    };
    load();
    portrait.addEventListener('change', load);
    return () => {
      version++;
      portrait.removeEventListener('change', load);
    };
  }, []);
  if (failed) return null;

  return (
    <div
      className="writing-hand-composite"
      data-ready={ready}
      data-moving={enabled && onScreen}
      aria-hidden="true"
    >
      <span ref={activity} className="writing-hand-activity-area" />
      <picture className="writing-hand-clean">
        <source
          media="(max-width:520px), (max-aspect-ratio:13/10)"
          srcSet={worldAsset('stories-writing-clean-portrait')}
        />
        <img
          src={worldAsset('stories-writing-clean-desktop')}
          width={1536}
          height={1024}
          alt=""
          decoding="async"
          onError={() => setFailed(true)}
        />
      </picture>
      <div ref={motion} className="writing-hand-motion">
        <picture className="writing-hand-cutout">
          <source
            media="(max-width:520px), (max-aspect-ratio:13/10)"
            srcSet={worldAsset('writing-portrait-v1')}
          />
          <img
            src={worldAsset('writing')}
            width={1536}
            height={1024}
            alt=""
            decoding="async"
            onError={() => setFailed(true)}
          />
        </picture>
      </div>
      <picture className="writing-hand-cuff">
        <source
          media="(max-width:520px), (max-aspect-ratio:13/10)"
          srcSet={worldAsset('writing-portrait-v1')}
        />
        <img src={worldAsset('writing')} width={1536} height={1024} alt="" />
      </picture>
    </div>
  );
}

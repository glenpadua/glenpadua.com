'use client';

import { useEffect, useState } from 'react';
import { worldAsset } from '../../lib/assets';

/** One opaque hand and its shadow move over a fixed, hand-free background. */
export function WritingHand(): JSX.Element | null {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const portrait = window.matchMedia('(max-width:760px)');
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
      aria-hidden="true"
    >
      <picture className="writing-hand-clean">
        <source
          media="(max-width:760px)"
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
      <div className="writing-hand-motion">
        <picture className="writing-hand-cutout">
          <source
            media="(max-width:760px)"
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
          media="(max-width:760px)"
          srcSet={worldAsset('writing-portrait-v1')}
        />
        <img src={worldAsset('writing')} width={1536} height={1024} alt="" />
      </picture>
    </div>
  );
}

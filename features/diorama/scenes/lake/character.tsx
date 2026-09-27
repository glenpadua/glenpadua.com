'use client';
import { useCallback, useState } from 'react';
import { worldAsset } from '../../lib/assets';
import type { CharacterProps } from '../../model/scene-runtime';
/** Coherent complete poses; anatomical left stays left. */
export function LakeCharacter({
  load,
  onError,
  play = 0,
  priority = false,
}: CharacterProps & { priority?: boolean }): JSX.Element {
  // The bar and Glen arrive together, never an empty bar waiting for him.
  const [ready, setReady] = useState(false);
  const sheet = useCallback((image: HTMLImageElement | null) => {
    if (image?.complete && image.naturalWidth) setReady(true);
  }, []);
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
          key={play}
          ref={sheet}
          className={`character-sheet ${play ? 'action-requested' : ''}`}
          src={load ? worldAsset('pullup-motion-glasses-v1') : undefined}
          width={1200}
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

import { useId, type CSSProperties } from 'react';
import { lakePines } from './horizon';
import { worldAsset } from '@/features/diorama/lib/assets';

// These silhouettes are in the original painting's 1536 × 1024 coordinates.
// Reuse its paint instead of redrawing the trees in a different style.

export function LakeLife({ onError }: { onError: () => void }): JSX.Element {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className="lake-life"
      viewBox="0 0 1536 1024"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-patch`}>
          <stop offset="82%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={`${id}-clearing`}>
          <ellipse
            cx="168"
            cy="553"
            rx="142"
            ry="113"
            fill={`url(#${id}-patch)`}
          />
          <ellipse
            cx="1397"
            cy="593"
            rx="136"
            ry="97"
            fill={`url(#${id}-patch)`}
          />
        </mask>
        {lakePines.map((pine, i) => (
          <clipPath id={`${id}-pine-${i}`} key={i}>
            <path d={pine.path} />
          </clipPath>
        ))}
      </defs>
      <image
        href={worldAsset('lake-clearing-v3')}
        width="1536"
        height="1024"
        mask={`url(#${id}-clearing)`}
        onError={onError}
      />
      {lakePines.map((pine, i) => (
        <g
          className="lake-pine"
          key={i}
          style={
            {
              transformOrigin: pine.root,
              animationDelay: `${[0.35, 0.65, 1.9, 2.1, 2.25][i]}s`,
            } as CSSProperties
          }
        >
          <image
            href={worldAsset('lake-back')}
            width="1536"
            height="1024"
            clipPath={`url(#${id}-pine-${i})`}
          />
        </g>
      ))}
    </svg>
  );
}

export function LakeGrass({ onError }: { onError: () => void }): JSX.Element {
  return (
    <div className="lake-grass" aria-hidden="true">
      {[0, 20, 40, 60, 80].map((start, i) => (
        <div
          className="lake-grass-strip"
          key={start}
          style={{ clipPath: `inset(0 ${80 - start}% 0 ${start}%)` }}
        >
          <img
            src={worldAsset('grass')}
            width={1536}
            height={1024}
            alt=""
            decoding="async"
            style={{ animationDelay: `${i * 0.5}s` }}
            onError={onError}
          />
        </div>
      ))}
    </div>
  );
}

export function LakeSeeds(): JSX.Element {
  return (
    <div className="lake-seeds" aria-hidden="true">
      {[0, 1, 2].map(seed => (
        <span className={`lake-seed seed-${seed}`} key={seed}>
          <svg viewBox="0 0 18 22" fill="none" focusable="false">
            <path d="M9 8q-2 7 1 12" stroke="#a89e71" strokeWidth="1.2" />
            <path
              d="M9 8L2 5m7 3L5 2m4 6V1m0 7 4-6M9 8l7-3M2 5q7-6 14 0"
              stroke="#fff4d9"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

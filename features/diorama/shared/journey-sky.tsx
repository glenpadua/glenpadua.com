import type { CSSProperties } from 'react';
import { skyStyle } from '../lib/sky-time';

/** The same sky stays put while the landscape travels underneath it. */
export function JourneySky({
  time,
  fallback = false,
}: {
  time?: number;
  fallback?: boolean;
}): JSX.Element {
  return (
    <div
      className={`journey-sky ${fallback ? 'sky-fallback' : 'sky-continuous'}`}
      aria-hidden="true"
      style={time === undefined ? undefined : (skyStyle(time) as CSSProperties)}
    >
      <div className="journey-sun">
        <span />
      </div>
      <svg className="journey-moon" viewBox="0 0 64 64">
        <path d="M37 5a27 27 0 1 0 22 39C35 50 20 22 37 5Z" fill="#f8e6bb" />
        <path
          d="M19 30c-2 9 3 18 10 22"
          fill="none"
          stroke="#d8c7a5"
          strokeWidth="3"
          opacity=".5"
        />
      </svg>
      <div className="journey-stars">
        {Array.from({ length: fallback ? 32 : 88 }, (_, i) => (
          <i
            key={i}
            className={i >= 32 ? 'star-after-dark' : undefined}
            style={
              {
                left: `${(i * 37 + 9) % 100}%`,
                top: `${5 + ((i * 19) % 48)}%`,
                '--star-delay': `${-i * 1.3}s`,
                '--star-duration': `${4 + (i % 5)}s`,
                '--star-size': i % 7 === 0 ? '3px' : '2px',
              } as CSSProperties
            }
          />
        ))}
      </div>
      {!fallback && <span className="journey-meteor" />}
      <div className="journey-cloud-bank">
        {[0, 1, 2].map(i => (
          <span key={i} className={`journey-cloud cloud-${i}`} />
        ))}
      </div>
      <div className="journey-birds">
        {[0, 1, 2].map(i => (
          <svg key={i} viewBox="0 0 44 24" className={`sky-bird bird-${i}`}>
            <g className="bird-wing-left">
              <path d="M22 17Q12 5 2 9" />
            </g>
            <g className="bird-wing-right">
              <path d="M22 17Q32 5 42 9" />
            </g>
          </svg>
        ))}
      </div>
    </div>
  );
}

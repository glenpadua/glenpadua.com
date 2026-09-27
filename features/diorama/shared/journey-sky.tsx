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
        {Array.from({ length: 32 }, (_, i) => (
          <i
            key={i}
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
      <div className="journey-cloud-bank">
        {[0, 1, 2].map(i => (
          <svg
            key={i}
            className={`journey-cloud cloud-${i}`}
            viewBox="0 0 420 80"
          >
            <path
              d="M3 60q23-13 48-8 9-23 40-20 19-27 52-18 33-5 46 22 31-14 51 8 37-15 62 6 54-8 115 17-85 5-129 1-67 6-116 0-82 7-169-8Z"
              fill="currentColor"
            />
            <path
              d="M25 65q70 8 131 4t108 3 132-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              opacity=".4"
            />
          </svg>
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

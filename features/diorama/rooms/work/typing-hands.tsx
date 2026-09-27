'use client';

import { useState } from 'react';
import { worldAsset } from '../../lib/assets';
import styles from './typing-hands.module.css';

/** Preserve the desk and sleeves while revealing the two finger poses. */
export function TypingHands(): JSX.Element | null {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <>
      {(['left', 'right'] as const).map(side => (
        <picture
          key={side}
          className={`room-hands ${styles.frame} ${styles[side]}`}
        >
          <source
            media="(max-width:760px)"
            srcSet={worldAsset('typing-portrait-v2')}
          />
          <img
            src={worldAsset('typing-desktop-v2')}
            width={1536}
            height={1024}
            alt=""
            decoding="async"
            onError={() => setFailed(true)}
          />
        </picture>
      ))}
    </>
  );
}

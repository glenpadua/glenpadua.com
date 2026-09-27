'use client';

import { useState } from 'react';
import { InteractionOrb } from '../../shared/interaction-orb';
import { weddingWebsite } from './content';
import styles from './wedding-frame.module.css';

export function WeddingFrame(): JSX.Element {
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.frame}>
      <div className={styles.picture}>
        {failed ? (
          <span className={styles.monogram} aria-hidden="true">
            G &amp; M
          </span>
        ) : (
          <img
            className={styles.portrait}
            src={weddingWebsite.portrait}
            width={512}
            height={512}
            alt={weddingWebsite.description}
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <InteractionOrb
        className={styles.link}
        href={weddingWebsite.href}
        label={weddingWebsite.label}
        hint={weddingWebsite.hint}
      />
    </div>
  );
}

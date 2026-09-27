'use client';
import { useState, useSyncExternalStore, type CSSProperties } from 'react';
import { worldAsset } from '../../lib/assets';
import { LakeCharacter } from '../../scenes/lake/character';
import { BeachCharacter } from '../../scenes/beach/character';
import styles from './desk-wallpaper.module.css';

export type Wallpaper = 'lake' | 'beach' | 'city';
export const wallpaperOrder: readonly Wallpaper[] = ['lake', 'beach', 'city'];
export const wallpaperNames: Record<Wallpaper, string> = {
  lake: 'Morning at the lake',
  beach: 'Midday at the beach',
  city: 'Evening in the city',
};

/** Glen's day in Valencia picks the wallpaper: lake, beach, then city. */
function wallpaperForNow(): Wallpaper {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      hourCycle: 'h23',
      timeZone: 'Europe/Madrid',
    }).format(new Date()),
  );
  if (hour >= 5 && hour < 11) return 'lake';
  if (hour >= 11 && hour < 18) return 'beach';
  return 'city';
}
const clientPick = typeof window === 'undefined' ? 'lake' : wallpaperForNow();
const noSubscription = () => () => {};

/** Where each painting keeps its people when a tall screen crops it. */
const focal: Record<Wallpaper, number> = {
  lake: 0.76,
  beach: 0.7,
  city: 0.74,
};

function Painting({
  wallpaper,
  moving,
  className,
  onDone,
}: {
  wallpaper: Wallpaper;
  moving: boolean;
  className?: string;
  onDone?: () => void;
}): JSX.Element {
  const ignore = () => {};
  return (
    <div
      className={`${styles.painting} ${className ?? ''}`}
      style={{ '--focal': focal[wallpaper] } as CSSProperties}
      onAnimationEnd={event => {
        if (event.target === event.currentTarget) onDone?.();
      }}
      aria-hidden="true"
    >
      <img
        className={styles.back}
        src={worldAsset(`${wallpaper}-back-900`)}
        width={900}
        height={600}
        alt=""
        decoding="async"
        draggable={false}
      />
      {wallpaper === 'lake' && (
        // Reuses the lake scene's own pull-up and its styles.
        <div className={`world-lake ${styles.lakeGlen}`}>
          <LakeCharacter load onError={ignore} />
        </div>
      )}
      {wallpaper === 'beach' && (
        <div className={`world-beach ${styles.beachGlen}`}>
          <BeachCharacter load onError={ignore} moving={moving} />
        </div>
      )}
      {wallpaper === 'city' && (
        <img
          className={styles.back}
          src={worldAsset('city-front-glasses-v1-900')}
          width={900}
          height={600}
          alt=""
          decoding="async"
          draggable={false}
        />
      )}
    </div>
  );
}

/**
 * The desktop wallpaper: the homepage's own scenes, with Glen in them. The
 * default follows the time in Valencia; `useWallpaper` lets visitors cycle.
 */
export function useWallpaper() {
  const timed = useSyncExternalStore(
    noSubscription,
    () => clientPick,
    (): Wallpaper => 'lake',
  );
  const [chosen, setChosen] = useState<Wallpaper | null>(null);
  const [leaving, setLeaving] = useState<Wallpaper | null>(null);
  const current = chosen ?? timed;
  // Without motion there is no handoff to wait for: switch at once.
  const next = (animate: boolean) => {
    const i = wallpaperOrder.indexOf(current);
    setLeaving(animate ? current : null);
    setChosen(wallpaperOrder[(i + 1) % wallpaperOrder.length]);
  };
  return { current, leaving, next, settle: () => setLeaving(null) };
}

export function DeskWallpaper({
  current,
  leaving,
  moving,
  onSettled,
}: {
  current: Wallpaper;
  leaving: Wallpaper | null;
  moving: boolean;
  onSettled: () => void;
}): JSX.Element {
  // Each arrival borrows the homepage's handoff: the tide brings the beach,
  // dusk sweeps in the city, and the lake returns with a soft morning fade.
  const entrance =
    current === 'beach'
      ? styles.tide
      : current === 'city'
        ? styles.dusk
        : styles.dawn;
  return (
    <div className={styles.wallpaper}>
      {leaving && leaving !== current && (
        <Painting key={`was-${leaving}`} wallpaper={leaving} moving={false} />
      )}
      <Painting
        key={current}
        wallpaper={current}
        moving={moving}
        className={leaving && moving ? entrance : undefined}
        onDone={onSettled}
      />
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { useMotionPolicy } from '../../shared/scene-motion';
import styles from './screen-saver.module.css';

// The site's accents, in the order the signature cycles through them.
const inks = ['#54765d', '#c46a3f', '#b8873f', '#3f7f86', '#7a5a86'];
// How close to a corner still counts as hitting it, in pixels.
const CORNER = 7;

/**
 * The desk screen's saver: the signature drifts and bounces off the edges,
 * changing colour at every wall, like the old DVD logo. Now and then it
 * lands in a corner, and the screen celebrates. Still when motion is off.
 */
export function ScreenSaver({
  dark = false,
  onWake,
}: {
  dark?: boolean;
  onWake: () => void;
}): JSX.Element {
  const { enabled } = useMotionPolicy();
  const field = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLSpanElement>(null);
  const [ink, setInk] = useState(0);
  const [corners, setCorners] = useState(0);
  const [cheer, setCheer] = useState(false);

  useEffect(() => {
    const box = field.current;
    const logo = mark.current;
    if (!enabled || !box || !logo) return;
    let x = Math.random() * 0.6;
    let y = Math.random() * 0.6;
    let dx = 1;
    let dy = 1;
    let last = performance.now();
    let frame = 0;
    let cheerTimer: ReturnType<typeof setTimeout>;
    const step = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      const w = box.clientWidth - logo.offsetWidth;
      const h = box.clientHeight - logo.offsetHeight;
      const speed = Math.max(28, box.clientWidth * 0.11);
      let px = x * w + dx * speed * dt;
      let py = y * h + dy * speed * dt;
      let hitX = false;
      let hitY = false;
      if (px <= 0 || px >= w) {
        dx = px <= 0 ? 1 : -1;
        px = Math.min(Math.max(px, 0), w);
        hitX = true;
      }
      if (py <= 0 || py >= h) {
        dy = py <= 0 ? 1 : -1;
        py = Math.min(Math.max(py, 0), h);
        hitY = true;
      }
      if (hitX || hitY) {
        setInk(i => (i + 1) % inks.length);
        const nearX = px <= CORNER || px >= w - CORNER;
        const nearY = py <= CORNER || py >= h - CORNER;
        if (nearX && nearY) {
          setCorners(n => n + 1);
          setCheer(true);
          clearTimeout(cheerTimer);
          cheerTimer = setTimeout(() => setCheer(false), 2400);
        }
      }
      x = w > 0 ? px / w : 0;
      y = h > 0 ? py / h : 0;
      logo.style.transform = `translate(${px}px, ${py}px)`;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(cheerTimer);
      logo.style.transform = '';
    };
  }, [enabled]);

  return (
    <div
      className={`screen-saver ${styles.saver}`}
      data-dark={dark}
      data-still={!enabled}
    >
      <div ref={field} className={styles.field} aria-hidden="true">
        <span
          ref={mark}
          className={styles.mark}
          style={{ color: inks[ink] }}
          data-cheer={cheer}
        >
          glen padua<span>.</span>
        </span>
        {cheer && <span className={styles.cheer}>Corner!</span>}
      </div>
      <div className={styles.away}>
        <p>
          Gone for a walk.
          {corners > 0 && (
            <span className={styles.count} aria-hidden="true">
              {' '}
              Corners hit: {corners}
            </span>
          )}
        </p>
        <button onClick={onWake}>Back to the desk</button>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { useMotionPolicy } from '../../shared/scene-motion';
import { advanceSaver } from './screen-saver-motion';
import styles from './screen-saver.module.css';

// The site's accents, in the order the signature cycles through them.
const inks = ['#54765d', '#c46a3f', '#b8873f', '#3f7f86', '#7a5a86'];

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
  const position = useRef({ x: 0.25, y: 0.2, dx: 1, dy: 1 });
  const [ink, setInk] = useState(0);
  const [corners, setCorners] = useState(0);
  const [cheer, setCheer] = useState(false);
  // Celebration expiry is independent of the motion loop: pausing or hiding
  // the tab must not cancel the only timer that puts the message away.
  useEffect(() => {
    if (!corners) return;
    const timer = setTimeout(() => setCheer(false), 2400);
    return () => clearTimeout(timer);
  }, [corners]);

  useEffect(() => {
    const box = field.current;
    const logo = mark.current;
    if (!box || !logo) return;
    let { x, y, dx, dy } = position.current;
    let w = 0;
    let h = 0;
    let speed = 28;
    // Read layout only when the field or logo changes size, never each frame.
    const resize = () => {
      w = Math.max(0, box.clientWidth - logo.offsetWidth);
      h = Math.max(0, box.clientHeight - logo.offsetHeight);
      speed = Math.max(28, box.clientWidth * 0.11);
      logo.style.transform = `translate(${x * w}px, ${y * h}px)`;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(box);
    observer.observe(logo);
    resize();
    let last = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      const next = advanceSaver({ x, y, dx, dy }, w, h, speed, dt);
      if (next.bounces) {
        setInk(i => (i + next.bounces) % inks.length);
        if (next.corners) {
          setCorners(n => n + next.corners);
          setCheer(true);
        }
      }
      ({ x, y, dx, dy } = next.position);
      logo.style.transform = `translate(${x * w}px, ${y * h}px)`;
      frame = requestAnimationFrame(step);
    };
    if (enabled) frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      position.current = { x, y, dx, dy };
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

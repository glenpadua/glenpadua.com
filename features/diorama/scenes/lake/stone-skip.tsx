'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { worldAsset } from '../../lib/assets';
import { InteractionOrb } from '../../shared/interaction-orb';
import { useMotionPolicy } from '../../shared/scene-motion';
import { lakeShoreline } from './water-config';
import {
  skippingStone,
  stoneContacts,
  stoneControlPosition,
  stoneRipplePose,
  stoneSkipDuration,
  stoneSkipPose,
} from './stone-skip-motion';

type Mode = 'idle' | 'skipping' | 'still';
const pebbleAsset = worldAsset('lake-skipping-pebble-v2');

export function LakeStoneSkip({ active }: { active: boolean }): JSX.Element {
  const { enabled, reduced } = useMotionPolicy();
  const [mode, setMode] = useState<Mode>('idle');
  const [throws, setThrows] = useState(0);
  const [failed, setFailed] = useState(false);
  const elapsed = useRef(0);
  const projectile = useRef<SVGGElement>(null);
  const ripples = useRef<(SVGGElement | null)[]>([]);
  const clip = `stone-water-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    // SVG image failures may finish before hydration attaches onError. A
    // cached request with its handler attached first catches that case too.
    const asset = new Image();
    const reject = () => setFailed(true);
    asset.addEventListener('error', reject);
    asset.src = pebbleAsset;
    return () => asset.removeEventListener('error', reject);
  }, []);

  useEffect(() => {
    const stone = projectile.current;
    if (!stone || failed) return;
    const draw = (time: number, still = false) => {
      const pose =
        time === 0
          ? { ...skippingStone, scale: 1, rotation: 0, opacity: 1 }
          : stoneSkipPose(time);
      stone.setAttribute(
        'transform',
        `translate(${pose.x} ${pose.y}) rotate(${pose.rotation}) scale(${pose.scale})`,
      );
      stone.style.opacity = still ? '1' : String(pose.opacity);
      if (still)
        stone.setAttribute(
          'transform',
          `translate(${skippingStone.x} ${skippingStone.y})`,
        );
      ripples.current.forEach((ring, i) => {
        if (!ring) return;
        const ripple = stoneRipplePose(time, i);
        const size = still ? stoneContacts[i].radius * 0.7 : ripple.radius;
        ring.setAttribute(
          'transform',
          `translate(${ripple.x} ${ripple.y}) scale(${size / 20})`,
        );
        ring.style.opacity = still ? '0.5' : String(ripple.opacity);
      });
    };
    if (mode === 'idle') {
      draw(0);
      return;
    }
    if (mode === 'still' || reduced) {
      draw(0, true);
      const timer = setTimeout(() => {
        elapsed.current = 0;
        setMode('idle');
      }, 1400);
      return () => clearTimeout(timer);
    }
    if (!enabled || !active) return;
    let request = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      elapsed.current += Math.max(0, Math.min(64, now - previous));
      previous = now;
      draw(elapsed.current);
      if (elapsed.current >= stoneSkipDuration) {
        elapsed.current = 0;
        setMode('idle');
      } else request = requestAnimationFrame(tick);
    };
    request = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(request);
  }, [mode, active, enabled, reduced, failed]);

  return (
    <>
      <svg
        className="lake-stone-skip"
        viewBox="0 0 1536 1024"
        aria-hidden="true"
        focusable="false"
        data-skip={mode}
        style={{ display: failed ? 'none' : undefined }}
      >
        <defs>
          <clipPath id={clip}>
            <polygon
              points={lakeShoreline
                .map(([x, y]) => `${x * 15.36},${y * 10.24}`)
                .join(' ')}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clip})`}>
          {stoneContacts.map((contact, i) => (
            <g
              key={contact.at}
              ref={ring => {
                ripples.current[i] = ring;
              }}
              className="lake-stone-ripple"
              opacity="0"
            >
              <ellipse
                rx="20"
                ry="3.6"
                fill="none"
                stroke="#526c59"
                strokeWidth="0.9"
              />
              <ellipse
                rx="19.5"
                ry="3.2"
                fill="none"
                stroke="#fff1d5"
                strokeWidth="1.4"
                strokeDasharray="53 3 21 4"
              />
              <ellipse
                rx="12"
                ry="2.1"
                fill="none"
                stroke="#f3e5c9"
                strokeWidth="1"
              />
            </g>
          ))}
        </g>
        <g
          ref={projectile}
          transform={`translate(${skippingStone.x} ${skippingStone.y})`}
        >
          <image
            href={pebbleAsset}
            x="-11"
            y="-4.640625"
            width="22"
            height="9.28125"
            onError={() => setFailed(true)}
          />
        </g>
      </svg>
      {!failed && (
        <InteractionOrb
          className="cue-skip-stone"
          style={stoneControlPosition}
          label="Skip a pebble"
          disabled={!active}
          onClick={() => {
            if (mode === 'skipping') return;
            elapsed.current = 0;
            setThrows(count => count + 1);
            setMode(enabled ? 'skipping' : 'still');
          }}
        />
      )}
      <span
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {throws > 0 && (
          <span key={throws}>A pebble skips three times across the lake.</span>
        )}
      </span>
    </>
  );
}

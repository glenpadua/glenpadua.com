'use client';

import { useEffect, useRef, useState } from 'react';

export type SpriteStep = { readonly pose: number; readonly duration: number };
export type Contact = readonly [number, number];

export function useSpriteSequence(
  sequence: readonly SpriteStep[],
  moving: boolean,
): number {
  const [step, setStep] = useState(0);
  const remaining = useRef(sequence[0].duration);
  useEffect(() => {
    if (!moving) return;
    const started = performance.now();
    let completed = false;
    const timeout = window.setTimeout(() => {
      completed = true;
      const next = (step + 1) % sequence.length;
      remaining.current = sequence[next].duration;
      setStep(next);
    }, remaining.current);
    return () => {
      window.clearTimeout(timeout);
      if (!completed)
        remaining.current = Math.max(
          0,
          remaining.current - (performance.now() - started),
        );
    };
  }, [moving, step, sequence]);
  return sequence[step].pose;
}

// A similarity transform locks two measured contacts without stretching limbs.
export function contactTransform(
  fromA: Contact,
  fromB: Contact,
  toA: Contact,
  toB: Contact,
): string {
  const source = [fromB[0] - fromA[0], fromB[1] - fromA[1]];
  const target = [toB[0] - toA[0], toB[1] - toA[1]];
  const scale = Math.hypot(...target) / Math.hypot(...source);
  const angle =
    ((Math.atan2(target[1], target[0]) - Math.atan2(source[1], source[0])) *
      180) /
    Math.PI;
  return `translate(${toA.join(' ')}) rotate(${angle}) scale(${scale}) translate(${-fromA[0]} ${-fromA[1]})`;
}

export function AtlasCell({
  src,
  cell,
}: {
  src: string;
  cell: readonly [number, number];
}): JSX.Element {
  return (
    <svg
      width="512"
      height="512"
      viewBox={`${cell[0] * 512} ${cell[1] * 512} 512 512`}
      overflow="hidden"
    >
      <image href={src} width="1536" height="1024" />
    </svg>
  );
}

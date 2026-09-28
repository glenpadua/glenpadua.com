'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { WorldScene } from '../model/types';
import { DiscoveryMark } from './discovery-mark';
import { useMotionPolicy } from './scene-motion';

const commonPrefix = (a: string, b: string) => {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
};

/**
 * Retypes a title line through its alternatives once, like someone at the
 * keyboard, then settles back on the authored words. Visual only: the
 * heading's accessible name and text stay the authored line.
 */
function TitleSwap({
  line,
  phrases,
  running,
}: {
  line: string;
  phrases: readonly string[];
  running: boolean;
}): JSX.Element {
  const [text, setText] = useState(line);
  const [typing, setTyping] = useState(false);
  const done = useRef(false);
  useEffect(() => {
    if (!running || done.current) return;
    let frame = 0;
    let current = line;
    // Paced by animation frames, not a chain of timers: iOS Safari treats a
    // tap during timer-driven page changes as a hover and swallows its click,
    // so the header and scroll arrow would ignore taps while this types.
    const after = (ms: number, next: () => void) => {
      const start = performance.now();
      const tick = (now: number) => {
        if (now - start >= ms) next();
        else frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const retype = (target: string, then: () => void) => {
      const keep = commonPrefix(current, target);
      const erase = () => {
        if (current.length <= keep) return type();
        current = current.slice(0, -1);
        setText(current);
        after(32, erase);
      };
      const type = () => {
        if (current.length >= target.length) return then();
        current = target.slice(0, current.length + 1);
        setText(current);
        after(60 + Math.random() * 45, type);
      };
      erase();
    };
    const queue = [...phrases, line];
    const step = (i: number) => {
      if (i >= queue.length) {
        done.current = true;
        return setTyping(false);
      }
      retype(queue[i], () =>
        after(i < queue.length - 1 ? 1700 : 0, () => step(i + 1)),
      );
    };
    after(1400, () => {
      setTyping(true);
      step(0);
    });
    return () => {
      cancelAnimationFrame(frame);
      // Interrupted (scrolled away or paused): show the authored words.
      if (!done.current) {
        setText(line);
        setTyping(false);
      }
    };
  }, [line, phrases, running]);
  return (
    <span aria-hidden="true">
      {text || '\u00a0'}
      {typing && <i className="world-title-caret" />}
    </span>
  );
}

/** Scene-owned words, naturally wrapping paragraphs and an optional quiet link. */
export function SceneCopy({
  scene,
  first,
  interactive,
  active = true,
}: {
  scene: WorldScene;
  first: boolean;
  interactive: boolean;
  active?: boolean;
}): JSX.Element {
  const { enabled } = useMotionPolicy();
  const Heading = first ? 'h1' : 'h2';
  const discovery = scene.discovery;
  return (
    <div className="world-copy">
      {scene.eyebrow && <p className="world-eyebrow">{scene.eyebrow}</p>}
      <Heading
        id={`${scene.id}-title`}
        aria-label={scene.titleSwaps ? scene.title.join(' ') : undefined}
      >
        {scene.title.map((line, i) =>
          scene.titleSwaps?.line === i ? (
            <TitleSwap
              key={line}
              line={line}
              phrases={scene.titleSwaps.phrases}
              running={interactive && active && enabled}
            />
          ) : (
            <span key={line}>{line}</span>
          ),
        )}
      </Heading>
      {scene.body?.map(paragraph => (
        <p className="world-description" key={paragraph}>
          {paragraph}
        </p>
      ))}
      {discovery && (
        <Link
          className="world-discovery"
          href={discovery.href}
          prefetch={false}
          target={/^https?:\/\//.test(discovery.href) ? '_blank' : undefined}
          rel={
            /^https?:\/\//.test(discovery.href)
              ? 'noopener noreferrer'
              : undefined
          }
        >
          <span>{discovery.label}</span>
          <DiscoveryMark />
        </Link>
      )}
    </div>
  );
}

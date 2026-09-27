'use client';

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
} from 'react';
import { InteractionOrb } from '../../shared/interaction-orb';
import { useMotionPolicy } from '../../shared/scene-motion';
import {
  advanceGlobe,
  dragRotation,
  releaseVelocity,
  wrapAngle,
} from './globe-motion';
import { createGlobeRenderer } from './globe-renderer';
import styles from './spinning-globe.module.css';

export function SpinningGlobe(): JSX.Element {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const draw = useRef<((angle: number) => void) | null>(null);
  const angle = useRef(0);
  const velocity = useRef(0);
  const frame = useRef(0);
  const lastFrame = useRef(0);
  const drag = useRef<{
    id: number;
    x: number;
    time: number;
    distance: number;
  } | null>(null);
  const [ready, setReady] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const { enabled } = useMotionPolicy();
  const canCoast = enabled && onScreen;
  const canCoastRef = useRef(canCoast);

  const stop = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    velocity.current = 0;
  };
  const paint = () => draw.current?.(angle.current);
  const coast = () => {
    if (!canCoastRef.current || !draw.current || frame.current) return;
    lastFrame.current = performance.now();
    const tick = (now: number) => {
      frame.current = 0;
      if (!canCoastRef.current) return;
      const next = advanceGlobe(
        angle.current,
        velocity.current,
        (now - lastFrame.current) / 1000,
      );
      angle.current = next.angle;
      velocity.current = next.velocity;
      lastFrame.current = now;
      paint();
      if (next.velocity !== 0) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };
  const spin = (direction = 1) => {
    stop();
    if (!draw.current) return;
    if (canCoastRef.current) {
      velocity.current = direction * 3;
      coast();
    } else {
      // Direct input still works when paused/reduced, without automatic motion.
      angle.current = wrapAngle(angle.current + (direction * Math.PI) / 4);
      paint();
    }
  };

  useEffect(() => {
    canCoastRef.current = canCoast;
    if (!canCoast) stop();
  }, [canCoast]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let disposed = false;
    const image = new Image();
    image.onload = () => {
      if (disposed || !canvas.current) return;
      try {
        const source = document.createElement('canvas');
        source.width = image.naturalWidth;
        source.height = image.naturalHeight;
        const context = source.getContext('2d');
        if (!context) return;
        context.drawImage(image, 0, 0);
        draw.current = createGlobeRenderer(
          canvas.current,
          context.getImageData(0, 0, source.width, source.height),
        );
        draw.current?.(angle.current);
        setReady(Boolean(draw.current));
      } catch {
        // The illustrated cutout remains a complete static fallback.
      }
    };
    image.src = '/assets/world/work-globe-map.webp';
    return () => {
      disposed = true;
      image.onload = null;
      stop();
      draw.current = null;
    };
  }, []);

  const down = (event: PointerEvent<HTMLDivElement>) => {
    if (!ready || !event.isPrimary || event.button !== 0) return;
    stop();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      time: event.timeStamp,
      distance: 0,
    };
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const delta = event.clientX - gesture.x;
    const turn = dragRotation(
      delta,
      event.currentTarget.getBoundingClientRect().width,
    );
    angle.current = wrapAngle(angle.current - turn);
    velocity.current = releaseVelocity(-turn, event.timeStamp - gesture.time);
    gesture.distance += Math.abs(delta);
    gesture.x = event.clientX;
    gesture.time = event.timeStamp;
    paint();
  };
  const up = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (gesture.distance < 4) spin();
    else if (event.timeStamp - gesture.time < 120) coast();
    else stop();
  };
  const cancel = () => {
    drag.current = null;
    stop();
  };
  const key = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      spin(event.key === 'ArrowRight' ? -1 : 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      stop();
      angle.current = 0;
      paint();
    }
  };

  return (
    <div
      ref={root}
      className={styles.globe}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={cancel}
      onLostPointerCapture={() => {
        if (drag.current) cancel();
      }}
      onKeyDown={key}
    >
      <img
        className={styles.art}
        src="/assets/world/work-globe.webp"
        width={362}
        height={500}
        alt="A small illustrated globe on a wooden stand"
        draggable={false}
      />
      <canvas
        ref={canvas}
        className={styles.sphere}
        hidden={!ready}
        aria-hidden="true"
      />
      <InteractionOrb
        className={styles.control}
        label="Spin the globe. Drag, or use the left and right arrow keys."
        hint="Give it a spin"
        disabled={!ready}
        onClick={event => {
          if (event.detail === 0) spin();
        }}
      />
    </div>
  );
}

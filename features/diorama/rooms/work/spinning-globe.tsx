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
  facingAngle,
  facingPlace,
  landingEase,
  nearestPlace,
  releaseVelocity,
  wrapAngle,
} from './globe-motion';
import { livedPlaces as globePlaces, visitedPlaces } from './content';
import { createGlobeRenderer } from './globe-renderer';
import styles from './spinning-globe.module.css';

export function SpinningGlobe(): JSX.Element {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const draw = useRef<((angle: number, current?: number) => void) | null>(null);
  // The place facing the viewer once the globe rests, shown on a paper tag.
  const [place, setPlace] = useState(-1);
  const placeRef = useRef(-1);
  const visited = useRef(-1);
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
  const paint = () => draw.current?.(angle.current, placeRef.current);
  const showPlace = (index: number) => {
    placeRef.current = index;
    setPlace(index);
    paint();
  };
  const settle = () => {
    const index = facingPlace(angle.current, globePlaces);
    if (index >= 0) visited.current = index;
    showPlace(index);
  };
  // Turn to a place and name it. Paused or reduced motion turns at once.
  const travelTo = (index: number, travel: number, duration: number) => {
    visited.current = index;
    const target = facingAngle(globePlaces[index].lon);
    if (!canCoastRef.current) {
      angle.current = target;
      return settle();
    }
    showPlace(-1);
    const from = angle.current;
    const started = performance.now();
    const tick = (now: number) => {
      frame.current = 0;
      if (!canCoastRef.current) return settle();
      const t = (now - started) / duration;
      angle.current = wrapAngle(from + travel * landingEase(t));
      if (t < 1) {
        paint();
        frame.current = requestAnimationFrame(tick);
      } else {
        angle.current = target;
        settle();
      }
    };
    frame.current = requestAnimationFrame(tick);
  };
  // However it was turned, the globe comes to rest on the nearest place.
  const snap = () => {
    if (!globePlaces.length) return settle();
    const index = nearestPlace(angle.current, globePlaces);
    const offset = facingAngle(globePlaces[index].lon) - angle.current;
    const travel = Math.atan2(Math.sin(offset), Math.cos(offset));
    travelTo(index, travel, 280 + Math.abs(travel) * 500);
  };
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
      else snap();
    };
    frame.current = requestAnimationFrame(tick);
  };
  // A spin travels one extra turn and lands on the next place.
  const spin = (direction = 1) => {
    stop();
    if (!draw.current) return;
    if (!globePlaces.length) {
      angle.current = wrapAngle(angle.current + (direction * Math.PI) / 4);
      return paint();
    }
    const count = globePlaces.length;
    const index = (((visited.current + direction) % count) + count) % count;
    const target = facingAngle(globePlaces[index].lon);
    const from = angle.current;
    const travel =
      (direction > 0 ? wrapAngle(target - from) : -wrapAngle(from - target)) +
      direction * Math.PI * 2;
    travelTo(index, travel, 1500);
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
          globePlaces,
          visitedPlaces,
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
    if (placeRef.current >= 0) showPlace(-1);
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
    else if (event.timeStamp - gesture.time < 120 && canCoastRef.current)
      coast();
    else {
      stop();
      snap();
    }
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
      settle();
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
      <p className={styles.tag} data-shown={place >= 0} aria-live="polite">
        {place >= 0 && (
          <>
            <strong>{globePlaces[place].name}</strong>
            {globePlaces[place].note && <span>{globePlaces[place].note}</span>}
          </>
        )}
      </p>
      <p className="sr-only">
        Pinned places Glen has lived:{' '}
        {globePlaces.map(place => place.name).join(', ')}. Also visited:{' '}
        {visitedPlaces.map(place => place.name).join(', ')}.
      </p>
      <InteractionOrb
        className={styles.control}
        label="Spin the globe to the next place. Drag to turn it; it settles on the nearest place. Left and right arrow keys step between places."
        hint="Give it a spin"
        disabled={!ready}
        onClick={event => {
          if (event.detail === 0) spin();
        }}
      />
    </div>
  );
}

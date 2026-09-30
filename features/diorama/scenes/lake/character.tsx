'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { worldAsset } from '../../lib/assets';
import type { CharacterProps } from '../../model/scene-runtime';
import { useMotionPolicy } from '../../shared/scene-motion';
import { pullupPose } from './pullup-routine';
import {
  advanceLakeCharacter,
  birdPerch,
  birdVisitPose,
  defaultBirdFlightRoute,
  getBirdFlightRoute,
  initialLakeCharacterClock,
  lakeCharacterWait,
} from './bird-visit-motion';
/** Coherent complete poses; anatomical left stays left. */
export function LakeCharacter({
  load,
  onError,
  play = 0,
  priority = false,
  active,
}: CharacterProps & { priority?: boolean; active: boolean }): JSX.Element {
  // The bar and Glen arrive together, never an empty bar waiting for him.
  const [ready, setReady] = useState(false);
  const [birdReady, setBirdReady] = useState(false);
  const [glanceReady, setGlanceReady] = useState(false);
  const [visitorFailed, setVisitorFailed] = useState(false);
  const { enabled } = useMotionPolicy();
  const sprite = useRef<HTMLImageElement | null>(null);
  const figure = useRef<HTMLDivElement>(null);
  const flightRoute = useRef(defaultBirdFlightRoute);
  const characterWindow = useRef<HTMLDivElement>(null);
  const bird = useRef<HTMLDivElement>(null);
  const birdSheet = useRef<HTMLImageElement | null>(null);
  const glance = useRef<HTMLImageElement | null>(null);
  const clock = useRef(initialLakeCharacterClock());
  const allowVisit = birdReady && glanceReady && !visitorFailed;
  const lastCheer = useRef(play);
  const sheet = useCallback(
    (image: HTMLImageElement | null) => {
      sprite.current = image;
      // A cached load or failure can finish before hydration attaches handlers.
      if (!image?.complete || !image.getAttribute('src')) return;
      if (image.naturalWidth) setReady(true);
      else onError();
    },
    [onError],
  );
  const visitorSheet = useCallback((image: HTMLImageElement | null) => {
    birdSheet.current = image;
    if (!image?.complete || !image.getAttribute('src')) return;
    if (image.naturalWidth) setBirdReady(true);
    else setVisitorFailed(true);
  }, []);
  const visitorGlance = useCallback((image: HTMLImageElement | null) => {
    glance.current = image;
    if (!image?.complete || !image.getAttribute('src')) return;
    if (image.naturalWidth) setGlanceReady(true);
    else setVisitorFailed(true);
  }, []);
  useEffect(() => {
    const character = figure.current;
    const viewport = character?.closest('.world-scene');
    if (!character || !viewport) return;
    const measure = () => {
      const route = getBirdFlightRoute(
        character.getBoundingClientRect(),
        viewport.getBoundingClientRect(),
      );
      if (route) flightRoute.current = route;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(character);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (play !== lastCheer.current) {
      lastCheer.current = play;
      if (enabled && active) clock.current.exercise.cheers = 3;
    }
    const image = sprite.current;
    if (!image || !ready || !active || !enabled) return;
    let request = 0;
    let timer: ReturnType<typeof setTimeout>;
    let previous = performance.now();
    let wait = 0;
    let lastTransform = '';
    const tick = (now: number) => {
      clock.current = advanceLakeCharacter(
        clock.current,
        now - previous,
        wait,
        allowVisit,
      );
      previous = now;
      const pose = pullupPose(clock.current.exercise.elapsed);
      const x = (pose.frame % 5) * -20;
      const y = Math.floor(pose.frame / 5) * -50 + pose.y / 14.4;
      const transform = `translate(${x}%, ${y.toFixed(3)}%)`;
      if (transform !== lastTransform) {
        image.style.transform = transform;
        lastTransform = transform;
      }
      image.dataset.phase = pose.phase;
      image.dataset.frame = String(pose.frame);
      const visitor = birdVisitPose(clock.current.visitMs, flightRoute.current);
      if (
        bird.current &&
        birdSheet.current &&
        glance.current &&
        characterWindow.current
      ) {
        bird.current.style.opacity = visitor.visible ? '1' : '0';
        bird.current.style.transform = `translate(${(visitor.x - birdPerch.x) / 0.8}%, ${(visitor.y - birdPerch.y) / 0.8}%)`;
        bird.current.dataset.phase = visitor.phase;
        bird.current.dataset.visits = String(clock.current.visits);
        birdSheet.current.style.transform = `translate(${((visitor.frame % 3) * -100) / 3}%, ${Math.floor(visitor.frame / 3) * -50}%)`;
        // Preserve the original body's exact pixels; only the head changes.
        characterWindow.current.style.clipPath = visitor.glancing
          ? 'inset(57.5% 0 0 0)'
          : '';
        glance.current.style.opacity = visitor.glancing ? '1' : '0';
      }
      const next = lakeCharacterWait(clock.current, allowVisit);
      wait = next ?? 0;
      if (next === null) request = requestAnimationFrame(tick);
      else timer = setTimeout(() => tick(performance.now()), Math.max(1, next));
    };
    tick(previous);
    return () => {
      cancelAnimationFrame(request);
      clearTimeout(timer);
      clock.current = advanceLakeCharacter(
        clock.current,
        performance.now() - previous,
        wait,
        allowVisit,
      );
    };
  }, [ready, active, enabled, play, allowVisit]);
  return (
    <div
      ref={figure}
      className="character-action character-lake"
      data-ready={ready}
      aria-hidden="true"
    >
      <svg className="pullup-apparatus" viewBox="0 0 600 720">
        <defs>
          <linearGradient id="pullup-post" x1="0" x2="1">
            <stop stopColor="#23472b" />
            <stop offset=".35" stopColor="#477c43" />
            <stop offset="1" stopColor="#2c562f" />
          </linearGradient>
        </defs>
        <ellipse cx="300" cy="699" rx="235" ry="12" fill="#344b3236" />
        <rect
          x="89"
          y="115"
          width="49"
          height="584"
          rx="11"
          fill="url(#pullup-post)"
          stroke="#203e27"
          strokeWidth="5"
        />
        <rect
          x="463"
          y="115"
          width="49"
          height="584"
          rx="11"
          fill="url(#pullup-post)"
          stroke="#203e27"
          strokeWidth="5"
        />
        <path
          d="M132 190H469"
          stroke="#183f24"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path d="M132 188H469" stroke="#568849" strokeWidth="15" />
      </svg>

      <div className="character-window" ref={characterWindow}>
        <img
          ref={sheet}
          className="character-sheet"
          src={load ? worldAsset('lake-pullup-routine-v1') : undefined}
          width={3000}
          height={1440}
          alt=""
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          onLoad={() => setReady(true)}
          onError={onError}
        />
      </div>
      <img
        ref={visitorGlance}
        className="lake-character-glance"
        src={load ? worldAsset('lake-bird-glance-v1') : undefined}
        width={154}
        height={148}
        alt=""
        decoding="async"
        onLoad={() => setGlanceReady(true)}
        onError={() => setVisitorFailed(true)}
      />
      <div ref={bird} className="lake-bird" data-phase="away">
        <div className="lake-bird-window">
          <img
            ref={visitorSheet}
            className="lake-bird-sheet"
            src={load ? worldAsset('lake-bird-v1') : undefined}
            width={384}
            height={256}
            alt=""
            decoding="async"
            onLoad={() => setBirdReady(true)}
            onError={() => setVisitorFailed(true)}
          />
        </div>
      </div>
    </div>
  );
}

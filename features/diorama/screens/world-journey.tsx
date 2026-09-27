'use client';
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react';
import { ArrowDown } from 'lucide-react';
import type { WorldScene } from '../model/types';
import { useMotionPolicy } from '@/features/diorama/shared/scene-motion';
import { clamp, sceneFrame } from '@/features/diorama/lib/travel';
import { SceneRenderer } from '../scenes/registry';
import { JourneySky } from '../shared/journey-sky';
import { journeyTime, skyStyle } from '../lib/sky-time';

const subscribeHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const variables = (value: Record<string, string | number>) =>
  value as CSSProperties;

function PopulatedJourney({
  scenes,
}: {
  scenes: readonly WorldScene[];
}): JSX.Element {
  const root = useRef<HTMLElement>(null);
  const { enabled } = useMotionPolicy();
  const ready = useSyncExternalStore(
    subscribeHydration,
    clientReady,
    serverReady,
  );
  const [current, setCurrent] = useState(0);
  const [loadedThrough, setLoadedThrough] = useState(0);

  useEffect(() => {
    const element = root.current;
    if (!element || !ready) return;
    let frame = 0;
    const restoreFragment = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let fragment: string;
        try {
          fragment = decodeURIComponent(window.location.hash.slice(1));
        } catch {
          return;
        }
        const index = scenes.findIndex(
          scene => fragment === scene.id || fragment === `${scene.id}-scene`,
        );
        if (index < 0) return;
        // Hydration replaces stacked scenes with one sticky viewport. The
        // browser's earlier anchor jump no longer describes this geometry.
        const travel = Math.max(0, element.offsetHeight - window.innerHeight);
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: top + (index * travel) / Math.max(1, scenes.length - 1),
          behavior: 'instant',
        });
      });
    };
    restoreFragment();
    window.addEventListener('hashchange', restoreFragment);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', restoreFragment);
    };
  }, [ready, scenes]);

  useEffect(() => {
    const element = root.current;
    if (!element || !ready) return;
    const chapters = Array.from(
      element.querySelectorAll<HTMLElement>('.world-scene'),
    );
    let frame = 0;
    let measure = true;
    let sunrise: { x: number; y: number } | undefined;
    const update = () => {
      frame = 0;
      if (measure) {
        measure = false;
        const index = scenes.findIndex(scene => scene.sunrise);
        const anchor = scenes[index]?.sunrise;
        const chapter = chapters[index];
        const back = chapter?.querySelector<HTMLElement>('.layer-back');
        const art = chapter?.querySelector<HTMLElement>('.world-art');
        const viewport = element.querySelector<HTMLElement>('.world-viewport');
        if (anchor && back && art && viewport) {
          const bounds = back.getBoundingClientRect();
          const stage = art.getBoundingClientRect();
          const view = viewport.getBoundingClientRect();
          // The background scales about its bottom edge. Derive its height
          // from the 3:2 painting, so a cold image load cannot move the sun.
          sunrise = {
            x:
              ((bounds.left - view.left + (bounds.width * anchor.x) / 100) /
                view.width) *
              100,
            y:
              ((stage.bottom -
                view.top -
                ((bounds.width * 2) / 3) * (1 - anchor.y / 100)) /
                view.height) *
              100,
          };
        }
      }
      const travel = Math.max(1, element.offsetHeight - window.innerHeight);
      const progress =
        clamp(-element.getBoundingClientRect().top / travel, 0, 1) *
        (scenes.length - 1);
      const active = clamp(Math.floor(progress + 0.18), 0, scenes.length - 1);
      setCurrent(previous => (previous === active ? previous : active));
      setLoadedThrough(previous =>
        Math.max(
          previous,
          Math.min(scenes.length - 1, Math.ceil(progress + 0.05)),
        ),
      );
      const time = journeyTime(
        enabled ? progress : active,
        scenes.map(scene => scene.skyTime ?? 0),
      );
      for (const [name, value] of Object.entries(skyStyle(time, sunrise))) {
        element.style.setProperty(name, String(value));
      }
      element.dataset.skyTime = time.toFixed(3);
      chapters.forEach((chapter, i) => {
        const pose = sceneFrame(progress, i, scenes.length);
        const visible = enabled ? pose.opacity > 0.001 : i === active;
        chapter.style.opacity = String(
          enabled ? pose.opacity : i === active ? 1 : 0,
        );
        chapter.style.visibility = visible ? 'visible' : 'hidden';
        chapter.style.setProperty('--travel', `${enabled ? pose.travel : 0}vh`);
        chapter.style.setProperty('--drift', `${enabled ? pose.drift : 0}px`);
        chapter.style.setProperty(
          '--subject',
          String(enabled ? pose.subject : 1),
        );
        chapter.dataset.moving = String(enabled && i === active);
        chapter.inert = i !== active;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      measure = true;
      schedule();
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
    };
  }, [enabled, ready, scenes]);

  return (
    <main
      id="world-main"
      tabIndex={-1}
      ref={root}
      className={`world-journey ${ready ? 'is-ready' : ''}`}
      data-scene={scenes[current].id}
      style={variables({
        '--scene-count': scenes.length,
        ...skyStyle(scenes[0].skyTime ?? 0),
      })}
    >
      <div className="world-viewport">
        <JourneySky />
        {scenes.map((scene, i) => (
          <section
            className={`world-scene world-${scene.id}`}
            id={`${scene.id}-scene`}
            aria-labelledby={`${scene.id}-title`}
            aria-hidden={ready && current !== i ? true : undefined}
            key={scene.id}
            style={variables({
              '--sky': scene.sky,
              '--mobile-width': `${scene.mobile.width}%`,
              '--mobile-left': `${scene.mobile.left}%`,
            })}
          >
            <JourneySky time={scene.skyTime ?? 0} fallback />
            <SceneRenderer
              scene={scene}
              load={i <= loadedThrough}
              first={i === 0}
              active={current === i}
            />
            <div className="world-copy">
              <p className="world-eyebrow">{scene.eyebrow}</p>
              {i === 0 ? (
                <h1 id={`${scene.id}-title`}>
                  {scene.title.map(line => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
              ) : (
                <h2 id={`${scene.id}-title`}>
                  {scene.title.map(line => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
              )}
              {scene.body && (
                <p className="world-description">
                  {scene.body.map(line => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              )}
            </div>
          </section>
        ))}
        {current < scenes.length - 1 && (
          <a
            className="world-wander"
            href={`#${scenes[current + 1].id}${ready ? '' : '-scene'}`}
            aria-label={`Continue to ${scenes[current + 1].name}`}
          >
            <ArrowDown size={26} strokeWidth={1.35} aria-hidden="true" />
          </a>
        )}
      </div>
      {scenes.map((scene, i) => (
        <span
          className="world-stop"
          id={scene.id}
          key={scene.id}
          style={{ top: `${(i * 100) / scenes.length}%` }}
          aria-hidden="true"
        />
      ))}
    </main>
  );
}

/** Empty scene lists remain a valid editing state. */
export function WorldJourney({
  scenes,
}: {
  scenes: readonly WorldScene[];
}): JSX.Element {
  if (!scenes.length)
    return (
      <main id="world-main" tabIndex={-1} className="world-empty">
        <h1>Out exploring.</h1>
        <p>The desk and stories are still here.</p>
      </main>
    );
  return <PopulatedJourney scenes={scenes} />;
}

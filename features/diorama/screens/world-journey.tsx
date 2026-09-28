'use client';
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import type { WorldScene } from '../model/types';
import { useMotionPolicy } from '@/features/diorama/shared/scene-motion';
import {
  EPILOGUE,
  chapterStop,
  clamp,
  journeyPosition,
  sceneFrame,
} from '@/features/diorama/lib/travel';
import { SceneRenderer } from '../scenes/registry';
import { SceneCopy } from '../shared/scene-copy';
import { JourneySky } from '../shared/journey-sky';
import { JourneyEnding } from '../shared/journey-ending';
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
  const [ended, setEnded] = useState(false);
  // Still at the very start: the arrow invites the visitor into the day.
  const [dawn, setDawn] = useState(true);
  /*
   * The arrow and "Back to dawn" share one spot, and iOS can deliver a tap's
   * click late (or twice) after a glide has begun. Until the glide settles,
   * and for a moment after the day ends, that stray click must not count.
   */
  const settledAt = useRef(0);
  /*
   * iOS Safari withholds a tap's click while anything on the page is changing,
   * so on touch the arrow acts on the lifted finger itself (a short, still
   * press); the click that may follow is then held off above.
   */
  const pressedAt = useRef<{ x: number; y: number; t: number } | null>(null);
  // Glide through the handover rather than jumping past it, to the next
  // scene's resting point in the same terms as the scroll handler.
  const glide = () => {
    const element = root.current;
    if (!ready || !element || tapsHeld(settledAt)) return;
    holdTaps(settledAt, enabled ? 900 : 300);
    const next =
      current < scenes.length - 1 ? chapterStop(current + 1, scenes.length) : 1;
    window.scrollTo({
      top:
        element.getBoundingClientRect().top +
        window.scrollY +
        next * journeyTravel(element),
      behavior: enabled ? 'smooth' : 'instant',
    });
  };
  const backToDawn = () => {
    if (tapsHeld(settledAt)) return;
    holdTaps(settledAt, enabled ? 900 : 300);
    window.scrollTo({ top: 0, behavior: enabled ? 'smooth' : 'instant' });
    root.current?.focus({ preventScroll: true });
  };
  // A tap would otherwise move focus to the journey, and iOS may scroll the
  // newly focused element into view: back to dawn, mid-glide.
  const keepFocus = (event: { preventDefault: () => void }) =>
    event.preventDefault();
  const pressArrow = (event: ReactPointerEvent) => {
    pressedAt.current =
      event.pointerType === 'touch'
        ? { x: event.clientX, y: event.clientY, t: performance.now() }
        : null;
  };
  const liftArrow = (event: ReactPointerEvent) => {
    const press = pressedAt.current;
    pressedAt.current = null;
    if (event.pointerType !== 'touch' || !press) return;
    const still =
      Math.hypot(event.clientX - press.x, event.clientY - press.y) < 12 &&
      performance.now() - press.t < 700;
    if (still) (ended ? backToDawn : glide)();
  };
  useEffect(() => {
    if (ended) holdTaps(settledAt, 700);
  }, [ended]);

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
        const index =
          fragment === 'end'
            ? scenes.length - 1
            : scenes.findIndex(
                scene =>
                  fragment === scene.id || fragment === `${scene.id}-scene`,
              );
        if (index < 0) return;
        // Hydration replaces stacked scenes with one sticky viewport. The
        // browser's earlier anchor jump no longer describes this geometry.
        const travel = journeyTravel(element);
        const top = element.getBoundingClientRect().top + window.scrollY;
        const stop = fragment === 'end' ? 1 : chapterStop(index, scenes.length);
        window.scrollTo({ top: top + stop * travel, behavior: 'instant' });
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
    // Shaped entrances need mask compositing; otherwise every passage fades.
    const shaped = CSS.supports('mask-composite', 'subtract');
    let frame = 0;
    let measure = true;
    let sunrise: { x: number; y: number } | undefined;
    // Scroll speed as a gentle gust (`--lean`, -1 to 1) for foreground plants.
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let lean = 0;
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
      const travel = Math.max(1, journeyTravel(element));
      const { progress, ending } = journeyPosition(
        -element.getBoundingClientRect().top / travel,
        scenes.length,
      );
      const atDawn = -element.getBoundingClientRect().top < 24;
      setDawn(previous => (previous === atDawn ? previous : atDawn));
      const endingPose = enabled ? ending : Math.round(ending);
      setEnded(previous =>
        previous === endingPose >= 0.4 ? previous : !previous,
      );
      element.style.setProperty('--ending', endingPose.toFixed(3));
      const active = clamp(Math.floor(progress + 0.18), 0, scenes.length - 1);
      const now = performance.now();
      const speed = (window.scrollY - lastY) / Math.max(1, now - lastTime);
      lastY = window.scrollY;
      lastTime = now;
      const gust = enabled ? clamp(speed / 1.6, -1, 1) : 0;
      // Plants catch a gust quickly and straighten slowly.
      lean += (gust - lean) * (Math.abs(gust) > Math.abs(lean) ? 0.22 : 0.06);
      if (!gust && Math.abs(lean) < 0.004) lean = 0;
      element.style.setProperty('--lean', lean.toFixed(3));
      setCurrent(previous => (previous === active ? previous : active));
      // Load a chapter one passage early, so a quick scroll never meets
      // an unpainted scene behind the wipe. (At rest on the first scene the
      // next one waits for the page to finish loading; see below.)
      setLoadedThrough(previous =>
        Math.max(
          previous,
          Math.min(scenes.length - 1, Math.floor(progress + 0.7)),
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
      element.dataset.night = String(time >= 0.72);
      const leaveBy = window.innerWidth < window.innerHeight ? 0.42 : 0.55;
      chapters.forEach((chapter, i) => {
        const pose = sceneFrame(progress, i, scenes.length, leaveBy);
        const visible = enabled ? pose.visible : i === active;
        const passing = enabled && visible && pose.role !== 'rest';
        // An outgoing chapter takes the shape of the entrance covering it.
        const authored =
          pose.role === 'out' ? scenes[i + 1]?.entrance : scenes[i].entrance;
        const entrance = shaped && authored !== 'fade' ? authored : undefined;
        const fading = passing && pose.role === 'in' && !entrance;
        // Opacity as well as visibility: a scene's own `visibility: visible`
        // children must not leak out of a hidden chapter.
        chapter.style.visibility = visible ? 'visible' : 'hidden';
        chapter.style.opacity = !visible
          ? '0'
          : fading
            ? String(pose.wipe)
            : '1';
        chapter.style.setProperty(
          '--subject',
          String(passing ? pose.subject : 1),
        );
        chapter.style.setProperty('--copy', String(passing ? pose.copy : 1));
        chapter.style.setProperty(
          '--wipe',
          passing ? pose.wipe.toFixed(4) : '1',
        );
        if (passing) {
          chapter.dataset.wipe = pose.role;
          chapter.dataset.entrance = entrance ?? 'fade';
        } else {
          delete chapter.dataset.wipe;
          delete chapter.dataset.entrance;
        }
        chapter.dataset.moving = String(enabled && i === active);
        chapter.inert = i !== active;
      });
      // Keep settling after the scroll stops, then go quiet.
      if (lean) schedule();
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

  // Once the opening scene has everything it needs, quietly fetch the next
  // one, so the first paint never shares its bandwidth.
  useEffect(() => {
    if (!ready || scenes.length < 2) return;
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      timer = setTimeout(
        () => setLoadedThrough(previous => Math.max(previous, 1)),
        600,
      );
    };
    if (document.readyState === 'complete') next();
    else window.addEventListener('load', next, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', next);
    };
  }, [ready, scenes.length]);

  // A single shooting star per session, a little while after night falls.
  const night =
    current === scenes.length - 1 && (scenes.at(-1)?.skyTime ?? 0) >= 0.9;
  useEffect(() => {
    const element = root.current;
    if (!element || !enabled || !night) return;
    try {
      if (sessionStorage.getItem('world-meteor-seen')) return;
    } catch {
      /* Storage is optional; without it the star may return next visit. */
    }
    const timer = setTimeout(
      () => {
        element.dataset.meteor = 'true';
        try {
          sessionStorage.setItem('world-meteor-seen', 'true');
        } catch {
          /* Storage is optional. */
        }
      },
      2500 + Math.random() * 4000,
    );
    return () => clearTimeout(timer);
  }, [enabled, night]);

  return (
    <main
      id="world-main"
      tabIndex={-1}
      ref={root}
      className={`world-journey ${ready ? 'is-ready' : ''}`}
      data-scene={scenes[current].id}
      data-ended={ended}
      style={variables({
        '--scene-count': scenes.length,
        '--epilogue': EPILOGUE,
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
            <SceneCopy
              scene={scene}
              first={i === 0}
              interactive={ready}
              active={current === i}
            />
          </section>
        ))}
        <JourneyEnding
          onReach={() => {
            const element = root.current;
            if (!element || ended) return;
            window.scrollTo({
              top:
                element.offsetTop + element.offsetHeight - window.innerHeight,
              behavior: 'instant',
            });
          }}
        />
        {!ended ? (
          <a
            className="world-wander"
            data-invite={dawn && current === 0}
            href={
              current < scenes.length - 1
                ? `#${scenes[current + 1].id}${ready ? '' : '-scene'}`
                : '#end'
            }
            aria-label={
              dawn && current === 0
                ? undefined
                : current < scenes.length - 1
                  ? `Continue to ${scenes[current + 1].name}`
                  : 'Continue to the end of the day'
            }
            onClick={event => {
              if (!ready) return;
              event.preventDefault();
              glide();
            }}
            onPointerDown={pressArrow}
            onMouseDown={keepFocus}
            onPointerUp={liftArrow}
          >
            <ArrowDown size={26} strokeWidth={1.35} aria-hidden="true" />
            {/* Always present and centred above the arrow, so the arrow never
                moves; it fades in at dawn and away once the day begins. */}
            <span
              className="world-wander-invite"
              aria-hidden={!(dawn && current === 0)}
            >
              Spend a day with me
            </span>
          </a>
        ) : (
          // At the day's end the same arrow turns round: back to dawn.
          <button
            className="world-wander world-wander-back"
            type="button"
            onClick={backToDawn}
            onPointerDown={pressArrow}
            onMouseDown={keepFocus}
            onPointerUp={liftArrow}
          >
            <ArrowUp size={22} strokeWidth={1.35} aria-hidden="true" />
            <span>Back to dawn</span>
          </button>
        )}
      </div>
      {[...scenes.map(scene => scene.id), 'end'].map((id, i) => (
        <span
          className="world-stop"
          id={id}
          key={id}
          style={{
            top: `calc((100% - 100lvh) * ${chapterStop(i, scenes.length)})`,
          }}
          aria-hidden="true"
        />
      ))}
    </main>
  );
}

/** Empty scene lists remain a valid editing state. */
type Clock = { current: number };
/** Ignore arrow taps for `ms` from now (see `settledAt`). */
function holdTaps(until: Clock, ms: number): void {
  until.current = Math.max(until.current, performance.now() + ms);
}
function tapsHeld(until: Clock): boolean {
  return performance.now() < until.current;
}

/**
 * How far the journey scrolls from dawn to the day's end. Measured against the
 * fixed scene viewport (the large viewport), not `innerHeight`: on phones that
 * changes mid-swipe as the browser's toolbar shrinks and grows, which made
 * scenes lurch. With the toolbar showing, the last few pixels of scroll simply
 * rest at the end.
 */
function journeyTravel(element: HTMLElement): number {
  const viewport = element.querySelector<HTMLElement>('.world-viewport');
  return Math.max(
    0,
    element.offsetHeight - (viewport?.offsetHeight ?? window.innerHeight),
  );
}

export function WorldJourney({
  scenes,
}: {
  scenes: readonly WorldScene[];
}): JSX.Element {
  if (!scenes.length)
    return (
      <main id="world-main" tabIndex={-1} className="world-empty">
        <h1>Out exploring.</h1>
        <p>The desk and the writing are still here.</p>
      </main>
    );
  return <PopulatedJourney scenes={scenes} />;
}

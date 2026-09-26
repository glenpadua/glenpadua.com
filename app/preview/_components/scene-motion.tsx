'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Pause, Play } from 'lucide-react';

const MotionContext = createContext({
  paused: false,
  reduced: true,
  enabled: false,
  toggle: () => {},
});

export function SceneMotionProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(preference.matches);
    const visibility = () => setVisible(!document.hidden);
    sync();
    visibility();
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  return (
    <MotionContext.Provider
      value={{
        paused,
        reduced,
        enabled: !paused && !reduced && visible,
        toggle: () => setPaused(value => !value),
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function MotionToggle(): JSX.Element {
  const { paused, reduced, toggle } = useContext(MotionContext);
  return (
    <button
      className="motion-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      disabled={reduced}
      aria-label={
        reduced
          ? 'Motion disabled by your reduced motion preference'
          : paused
            ? 'Resume scene motion'
            : 'Pause scene motion'
      }
    >
      {paused || reduced ? <Play size={13} /> : <Pause size={13} />}
      <span>
        {reduced ? 'Reduced motion' : paused ? 'Motion paused' : 'Pause motion'}
      </span>
    </button>
  );
}

// One policy for every chapter. Events schedule at most one frame; no idle RAF loop.
export function useSceneMotion() {
  const root = useRef<HTMLElement>(null);
  const { enabled } = useContext(MotionContext);
  const [onScreen, setOnScreen] = useState(false);
  const moving = enabled && onScreen;
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (!moving) {
      // Pause keeps the current composition; reduced-motion starts at zero.
      return;
    }
    let frame = 0;
    let x = 0;
    let y = 0;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const progress = Math.max(
        -1,
        Math.min(
          1,
          (window.innerHeight / 2 - rect.top - rect.height / 2) /
            window.innerHeight,
        ),
      );
      element.style.setProperty('--look-x', `${x}px`);
      element.style.setProperty('--look-y', `${y}px`);
      element.style.setProperty('--scroll-drift', `${progress * 36}px`);
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = element.getBoundingClientRect();
      x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      schedule();
    };
    const reset = () => {
      x = 0;
      y = 0;
      schedule();
    };
    schedule();
    element.addEventListener('pointermove', pointer);
    element.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('pointermove', pointer);
      element.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [moving]);
  return { root, moving };
}

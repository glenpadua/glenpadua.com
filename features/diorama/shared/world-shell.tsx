'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Eye } from 'lucide-react';
import {
  MotionToggle,
  useMotionPolicy,
} from '@/features/diorama/shared/scene-motion';
import { contactHref } from '../data/site';
import { worldRoutes } from '../lib/routes';
export function WorldShell({ children }: { children: ReactNode }): JSX.Element {
  const path = usePathname();
  const { enabled } = useMotionPolicy();
  // “Show me”: every interactive object glints for a few seconds.
  const [reveal, setReveal] = useState(false);
  const revealTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const showAll = useCallback(() => {
    setReveal(true);
    clearTimeout(revealTimer.current);
    revealTimer.current = setTimeout(() => setReveal(false), 3200);
  }, []);
  useEffect(() => () => clearTimeout(revealTimer.current), []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const typing = target?.closest(
        'input, textarea, [contenteditable="true"]',
      );
      if (event.key === '?' && !typing) showAll();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showAll]);
  // The first time each page is seen in a visit, show everything once.
  useEffect(() => {
    const key = `world-arrival:${path}`;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      /* Storage is optional; the hint may repeat. */
    }
    // Marked as shown only when it actually runs (a cancelled mount, or
    // leaving within a second, doesn't use it up).
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(key, 'shown');
      } catch {
        /* Storage is optional. */
      }
      showAll();
    }, 1400);
    return () => clearTimeout(timer);
  }, [path, showAll]);
  // Now and then one object catches the light, so the scene stays clean but
  // still hints at what can be touched.
  useEffect(() => {
    if (!enabled) return;
    let last: HTMLElement | null = null;
    const timer = setInterval(() => {
      if (document.hidden) return;
      const cues = [
        ...document.querySelectorAll<HTMLElement>('.world .world-cue'),
      ].filter(cue => {
        if (!cue.querySelector('.world-cue-mark') || cue.closest('[inert]'))
          return false;
        if ((cue as HTMLButtonElement).disabled) return false;
        const r = cue.getBoundingClientRect();
        const onScreen =
          r.bottom > 0 &&
          r.right > 0 &&
          r.top < window.innerHeight &&
          r.left < window.innerWidth;
        return (
          onScreen && cue.checkVisibility?.({ opacityProperty: true }) !== false
        );
      });
      const choices = cues.filter(cue => cue !== last);
      const pick =
        choices[Math.floor(Math.random() * choices.length)] ?? cues[0];
      if (!pick) return;
      last = pick;
      pick.dataset.glint = 'true';
      setTimeout(() => delete pick.dataset.glint, 1800);
    }, 4200);
    return () => clearInterval(timer);
  }, [enabled, path]);

  // The pre-paint arrival marker (see world-layout.tsx) describes only the
  // page that was loaded; any client navigation afterwards clears it.
  const loadedPath = useRef(path);
  useEffect(() => {
    if (path !== loadedPath.current)
      document.getElementById('world-returning')?.remove();
  }, [path]);
  // Full page loads between world pages morph by default; honour Pause.
  useEffect(() => {
    if (enabled) return;
    const skip = (event: Event) =>
      (
        event as Event & { viewTransition?: { skipTransition(): void } | null }
      ).viewTransition?.skipTransition();
    window.addEventListener('pageswap', skip);
    return () => window.removeEventListener('pageswap', skip);
  }, [enabled]);
  const room = path.endsWith('/work')
    ? 'work'
    : path.endsWith('/writing')
      ? 'writing'
      : 'home';
  return (
    <div
      className="world"
      data-room={room}
      data-motion={enabled}
      data-reveal={reveal}
    >
      <a className="world-skip" href="#world-main">
        Skip to content
      </a>
      <header className="world-header">
        <Link
          prefetch={false}
          className="world-signature"
          href={worldRoutes.home}
          aria-label="Glen Padua — home"
        >
          glen padua<span>.</span>
        </Link>
        <nav aria-label="Main navigation">
          {[
            ['Home', worldRoutes.home],
            ['Work', worldRoutes.work],
            ['Writing', worldRoutes.writing],
          ].map(([label, href]) => (
            <Link
              prefetch={false}
              href={href}
              key={href}
              className={
                href === worldRoutes.home ? 'world-nav-home' : undefined
              }
              aria-current={path === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <a
            className="world-nav-hello"
            href={contactHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="world-nav-say">Say </span>hello{' '}
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      {children}
      <div className="world-utility">
        <button
          className="world-reveal"
          type="button"
          onClick={showAll}
          aria-label="Show what you can interact with"
          title="Show what you can interact with (?)"
        >
          <Eye size={17} strokeWidth={1.6} aria-hidden="true" />
        </button>
        <MotionToggle />
      </div>
    </div>
  );
}

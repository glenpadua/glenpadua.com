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
import { ArrowUpRight, Eye } from 'lucide-react';
import {
  MotionToggle,
  useMotionPolicy,
} from '@/features/diorama/shared/scene-motion';
import { contactHref } from '../data/site';
import { worldRoutes } from '../lib/routes';
import { worldAsset } from '../lib/assets';
import { weddingWebsite } from '../rooms/work/content';

/*
 * Each room's opening paintings, as its <img>/<picture> would choose them, so
 * warming a room fetches exactly the files it will show.
 */
const roomArt: Record<string, (portrait: boolean) => HTMLImageElement[]> = {
  [worldRoutes.work]: portrait => [
    art(portrait, 'work-globe-room', 'work-globe-room-portrait'),
    plain(weddingWebsite.portrait),
  ],
  [worldRoutes.writing]: portrait => [
    art(portrait, 'writing', 'writing-portrait-v1'),
    plain(
      worldAsset(`stories-writing-clean-${portrait ? 'portrait' : 'desktop'}`),
    ),
  ],
};
function art(portrait: boolean, name: string, portraitName: string) {
  if (portrait) return plain(worldAsset(portraitName));
  const image = new Image();
  image.fetchPriority = 'low';
  image.sizes = '100vw';
  image.srcset = `${worldAsset(`${name}-900`)} 900w, ${worldAsset(name)} 1536w`;
  return image;
}
function plain(src: string) {
  const image = new Image();
  image.fetchPriority = 'low';
  image.src = src;
  return image;
}
const warmed = new Set<string>();
/** Fetch a room's paintings ahead of a visit (once per page load). */
function warmRoom(path: string) {
  if (warmed.has(path) || !roomArt[path]) return;
  warmed.add(path);
  roomArt[path](window.matchMedia('(max-width:760px)').matches);
}
export function WorldShell({ children }: { children: ReactNode }): JSX.Element {
  const path = usePathname();
  const { enabled } = useMotionPolicy();
  // “Show me”: every interactive object glints for a few seconds.
  // A reveal belongs to the page it was asked on; moving on ends it.
  const [revealedOn, setRevealedOn] = useState<string | null>(null);
  const reveal = revealedOn === path;
  const revealTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const showAll = useCallback(() => {
    setRevealedOn(path);
    clearTimeout(revealTimer.current);
    revealTimer.current = setTimeout(() => setRevealedOn(null), 3200);
  }, [path]);
  useEffect(() => () => clearTimeout(revealTimer.current), []);
  // Once this page has settled, fetch the other rooms' paintings quietly, so
  // walking into a room finds its painting already there.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const warmOthers = () => {
      timer = setTimeout(() => {
        for (const room of Object.keys(roomArt))
          if (room !== path) warmRoom(room);
      }, 2500);
    };
    if (document.readyState === 'complete') warmOthers();
    else window.addEventListener('load', warmOthers, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', warmOthers);
    };
  }, [path]);
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
  // When someone lingers on a scene (or room) for a moment, show what can be
  // touched there, once per scene per visit. Arrival is too early: people are
  // reading the words, not looking at the painting yet.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const place = () =>
      `world-linger:${path}:${
        document.querySelector<HTMLElement>('.world-journey')?.dataset.scene ??
        ''
      }`;
    const settle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const key = place();
        try {
          if (sessionStorage.getItem(key)) return;
          sessionStorage.setItem(key, 'shown');
        } catch {
          /* Storage is optional; the hint may repeat. */
        }
        showAll();
      }, 2600);
    };
    settle();
    window.addEventListener('scroll', settle, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', settle);
    };
  }, [path, showAll]);
  // Objects notice you: as a pointer comes near something that can be
  // touched, it warms (`--near`, 0–1). A touch anywhere warms what is near
  // the finger for a moment. Nothing appears or moves under the pointer.
  useEffect(() => {
    let frame = 0;
    let at: { x: number; y: number } | null = null;
    const warmed = new Set<HTMLElement>();
    let fade: ReturnType<typeof setTimeout>;
    const reach = (touch: boolean) => (touch ? 170 : 150);
    const warm = (touch: boolean) => {
      frame = 0;
      if (!at) return;
      const cues = document.querySelectorAll<HTMLElement>('.world .world-cue');
      for (const cue of cues) {
        if (cue.closest('[inert]')) continue;
        const r = cue.getBoundingClientRect();
        const d = Math.hypot(
          at.x - (r.left + r.width / 2),
          at.y - (r.top + r.height / 2),
        );
        const near = Math.max(0, 1 - d / reach(touch));
        if (near > 0) {
          cue.style.setProperty('--near', near.toFixed(2));
          cue.dataset.near = 'true';
          warmed.add(cue);
        } else if (warmed.has(cue)) {
          cue.style.removeProperty('--near');
          delete cue.dataset.near;
          warmed.delete(cue);
        }
      }
    };
    const cool = () => {
      for (const cue of warmed) {
        cue.style.removeProperty('--near');
        delete cue.dataset.near;
      }
      warmed.clear();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      at = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(() => warm(false));
    };
    const touch = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      at = { x: event.clientX, y: event.clientY };
      warm(true);
      clearTimeout(fade);
      fade = setTimeout(cool, 1100);
    };
    const leave = () => {
      at = null;
      cool();
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerdown', touch, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', cool, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fade);
      cool();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerdown', touch);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', cool);
    };
  }, [path]);
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
              href={href}
              key={href}
              // Pointing at or touching a room's link starts its painting.
              onPointerEnter={() => warmRoom(href)}
              onPointerDown={() => warmRoom(href)}
              onFocus={() => warmRoom(href)}
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
            <span className="world-nav-say">Say </span>hello
            <ArrowUpRight
              className="world-nav-leave"
              size={14}
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        </nav>
      </header>
      {children}
      <div className="world-utility">
        <button
          className="world-reveal"
          type="button"
          onClick={showAll}
          aria-label="Show things to touch"
          title="Show things to touch (?)"
        >
          <Eye size={17} strokeWidth={1.6} aria-hidden="true" />
          <span aria-hidden="true">Things to touch</span>
        </button>
        <MotionToggle />
      </div>
    </div>
  );
}

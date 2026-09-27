'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';
import {
  MotionToggle,
  useMotionPolicy,
} from '@/features/diorama/shared/scene-motion';
import { contactHref } from '../data/site';
import { worldRoutes } from '../lib/routes';
export function WorldShell({ children }: { children: ReactNode }): JSX.Element {
  const path = usePathname();
  const { enabled } = useMotionPolicy();
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
    : path.endsWith('/stories')
      ? 'stories'
      : 'home';
  return (
    <div className="world" data-room={room} data-motion={enabled}>
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
            ['Stories', worldRoutes.stories],
          ].map(([label, href]) => (
            <Link
              prefetch={false}
              href={href}
              key={href}
              aria-current={path === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <div className="world-utility">
        <MotionToggle />
        <a href={contactHref} target="_blank" rel="noopener noreferrer">
          Say hello <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

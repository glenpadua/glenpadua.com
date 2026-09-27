'use client';
import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { journeyEnding } from '../data/ending';

const external = (href: string) => /^https?:\/\//.test(href);

/**
 * The day's last words, over the night sky after the city. Server HTML and
 * no-JavaScript visits show it as an ordinary block after the chapters.
 */
export function JourneyEnding({
  interactive,
  onRestart,
  onReach,
}: {
  interactive: boolean;
  onRestart: () => void;
  /** Keyboard focus arriving here brings the ending into view. */
  onReach: () => void;
}): JSX.Element {
  return (
    <section
      className="world-ending"
      aria-labelledby="world-ending-title"
      onFocus={onReach}
    >
      <h2 id="world-ending-title">{journeyEnding.title}</h2>
      <ul className="world-ending-links">
        {journeyEnding.links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              prefetch={false}
              target={external(href) ? '_blank' : undefined}
              rel={external(href) ? 'noopener noreferrer' : undefined}
            >
              {label}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="world-ending-social">
        {journeyEnding.social.map(({ label, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ))}
      </p>
      <button
        className="world-ending-again"
        type="button"
        onClick={onRestart}
        hidden={!interactive}
      >
        <ArrowUp size={15} aria-hidden="true" />
        {journeyEnding.again}
      </button>
    </section>
  );
}

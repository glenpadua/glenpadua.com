'use client';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiGithub, SiInstagram, SiTwitter } from 'react-icons/si';
import { journeyEnding } from '../data/ending';

const external = (href: string) => /^https?:\/\//.test(href);
const socialIcons = {
  Instagram: SiInstagram,
  GitHub: SiGithub,
  Twitter: SiTwitter,
};

/**
 * The day's last words, over the night sky after the city. Server HTML and
 * no-JavaScript visits show it as an ordinary block after the chapters. The
 * way back to dawn is the journey's own arrow, turned round.
 */
export function JourneyEnding({
  onReach,
}: {
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
        {journeyEnding.links.map(({ label, href }) => {
          const leaves = external(href);
          const Arrow = leaves ? ArrowUpRight : ArrowRight;
          return (
            <li key={href}>
              <Link
                href={href}
                prefetch={false}
                target={leaves ? '_blank' : undefined}
                rel={leaves ? 'noopener noreferrer' : undefined}
              >
                {label}
                <Arrow size={15} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="world-ending-social" aria-label="Elsewhere">
        {journeyEnding.social.map(({ label, href }) => {
          const Icon = socialIcons[label];
          return (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                title={label}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

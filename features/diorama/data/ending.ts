import { contactHref, socialLinks } from './site';
import { worldRoutes } from '../lib/routes';

/** The homepage's last words, after the city. Editable copy. */
export const journeyEnding = {
  title: 'That’s the day.',
  links: [
    { label: 'See what I’m working on', href: worldRoutes.work },
    { label: 'Read a story', href: worldRoutes.stories },
    { label: 'Say hello', href: contactHref },
  ],
  social: [
    { label: 'Instagram', href: socialLinks.instagram },
    { label: 'GitHub', href: socialLinks.github },
    { label: 'Twitter', href: socialLinks.twitter },
  ],
  again: 'Start the day again',
} as const;

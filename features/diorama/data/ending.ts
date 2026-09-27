import { contactHref, socialLinks } from './site';
import { worldRoutes } from '../lib/routes';

/** The homepage's last words, after the city. Editable copy. */
export const journeyEnding = {
  title: 'That’s the day.',
  links: [
    { label: 'See what I’m working on', href: worldRoutes.work },
    { label: 'Read something I wrote', href: worldRoutes.writing },
    { label: 'Say hello', href: contactHref },
  ],
  social: [
    { label: 'Instagram', href: socialLinks.instagram },
    { label: 'GitHub', href: socialLinks.github },
    { label: 'Twitter', href: socialLinks.twitter },
  ],
} as const;

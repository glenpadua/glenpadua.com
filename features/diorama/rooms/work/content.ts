import { worldRoutes } from '../../lib/routes';
import type { GlobePlace } from './globe-motion';

export const weddingWebsite = {
  href: 'https://fenimeetsfiltercoffee.vercel.app/',
  label: 'Our wedding website, built by Glen (opens in a new tab)',
  hint: 'Our wedding · built by me ↗',
  portrait: '/assets/world/work-wedding-portrait-v2.webp',
  description:
    'An illustrated wedding portrait of Glen and Millusha kissing outside a white church.',
} as const;

export interface DeskProject {
  id: string;
  name: string;
  status: string;
  teaser: string;
  paragraphs: readonly string[];
  link?: { label: string; href: string };
}
export const deskProjects: readonly DeskProject[] = [
  {
    id: 'world',
    name: 'This little world',
    status: 'Current experiment',
    teaser: 'I could’ve used a template.\nAnyway, here we are.',
    paragraphs: [
      'A personal website with a lake, a beach, and a desk I should probably be sitting at.',
      'Illustrated layers, real HTML, native scrolling. The words and projects can change without repainting the scenery. The original blog is still right where it was.',
    ],
    link: { label: 'Explore the world', href: worldRoutes.home },
  },
  {
    id: 'uncommon',
    name: 'Uncommon UI',
    status: 'Open source · from the archive',
    teaser: 'The building blocks.\nAnd a few less common ones.',
    paragraphs: [
      'A React component library I built at Zephony, with independently published packages, tests and Storybook examples.',
      'I set up the monorepo, contribution guidelines and continuous integration, and built the components. This is earlier work, preserved here with its original source.',
    ],
    link: {
      label: 'View the source',
      href: 'https://github.com/Zephony/uncommon-ui',
    },
  },
  {
    id: 'new-faces',
    name: 'New Faces',
    status: 'Client work · at Zephony',
    teaser: 'From a new lead\nto the whole operation.',
    paragraphs: [
      'A custom CRM for an Italian talent management agency, covering the journey from leads to students.',
      'I helped shape the application through several iterations and built its frontend in React and Redux, including a rules engine, custom search filters and activity logging.',
    ],
    link: { label: 'Original project notes', href: '/work' },
  },
  {
    id: 'staypal',
    name: 'StayPal',
    status: 'Exploration',
    teaser: 'An idea on the desk.\nStill finding its shape.',
    paragraphs: [
      'I’m exploring what could make life easier for hosts: guest questions, day-to-day operations, and the bits that keep interrupting the day.',
      'The work is still exploratory. A useful tool, a product, custom work—the shape is open. No launched-business victory lap yet.',
    ],
  },
];

/** Places Glen has lived, in his order; a tap on the globe tours them. */
export const livedPlaces: readonly GlobePlace[] = [
  {
    name: 'Coimbatore',
    lat: 11.02,
    lon: 76.96,
    note: 'Hometown. School, college, everything.',
  },
  {
    name: 'Bangalore',
    lat: 12.97,
    lon: 77.59,
    note: 'Eight years. Most of my working life.',
  },
  { name: 'Kochi', lat: 9.93, lon: 76.27, note: 'Lived here for two years.' },
  { name: 'Bali', lat: -8.65, lon: 115.22, note: 'A two-month stay.' },
  {
    name: 'Goa',
    lat: 15.49,
    lon: 73.83,
    note: 'My wife’s home, and my second.',
  },
  { name: 'Lisbon', lat: 38.72, lon: -9.14, note: 'Lived here for a month.' },
  { name: 'Valencia', lat: 39.47, lon: -0.38, note: 'Home, for now.' },
];

/** Places visited: quieter pins, named for screen readers only. */
export const visitedPlaces: readonly GlobePlace[] = [
  { name: 'Hanoi', lat: 21.03, lon: 105.85 },
  { name: 'Da Nang', lat: 16.05, lon: 108.2 },
  { name: 'Bangkok', lat: 13.76, lon: 100.5 },
  { name: 'Paris', lat: 48.86, lon: 2.35 },
  { name: 'Annecy', lat: 45.9, lon: 6.13 },
  { name: 'Berlin', lat: 52.52, lon: 13.4 },
  { name: 'Dresden', lat: 51.05, lon: 13.74 },
  { name: 'Prague', lat: 50.08, lon: 14.44 },
  { name: 'Amsterdam', lat: 52.37, lon: 4.9 },
  { name: 'Barcelona', lat: 41.39, lon: 2.17 },
];

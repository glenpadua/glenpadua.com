import { worldRoutes } from '../../lib/routes';

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

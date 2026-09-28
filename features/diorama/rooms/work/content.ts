import type { GlobePlace } from './globe-motion';
import { contactHref } from '../../data/site';

export const weddingWebsite = {
  href: 'https://fenimeetsfiltercoffee.vercel.app/',
  label: 'Our wedding website, built by Glen (opens in a new tab)',
  hint: 'Our wedding · built by me ↗\uFE0E',
  portrait: '/assets/world/work-wedding-portrait-v2.webp',
  description:
    'An illustrated wedding portrait of Glen and Millusha kissing outside a white church.',
} as const;

/*
 * The Work monitor is a small desktop. Each file opens a window.
 * DRAFT COPY: assembled from Glen's projects and old site for the prototype;
 * Glen is reviewing every line before this goes public.
 */
export type DeskIcon =
  | 'chat'
  | 'plate'
  | 'folder'
  | 'career'
  | 'inbox'
  | 'trash';

export interface DeskFile {
  id: string;
  name: string;
  icon: DeskIcon;
  /** Short, honest status shown as a chip. */
  status?: string;
  title: string;
  /** Problem → what I did → where it's at, in plain words. */
  blocks?: readonly { label: string; text: string }[];
  /** A dated list instead of blocks (career). */
  timeline?: readonly { when: string; what: string; detail: string }[];
  paragraphs?: readonly string[];
  /** Crumpled old projects, shown as a grid of icons (trash). */
  scraps?: readonly { name: string; icon: ScrapIcon }[];
  link?: { label: string; href: string };
}

export type ScrapIcon = 'chart' | 'piggy' | 'siren' | 'shapes' | 'file';

/** Sticky notes on the desktop; one is picked at random per visit. */
export const deskNotes: readonly string[] = [
  'Buy oat milk. Fix that one bug. Leg day (lol).',
  'It was DNS. It’s always DNS.',
  'Do not deploy on Friday. (Deployed on Friday.)',
  'Water the plants. They know.',
  'Arsenal at 9. Nothing else is scheduled.',
  'Rename the variable. Rename it back.',
];

export const deskFiles: readonly DeskFile[] = [
  {
    id: 'staypal',
    name: 'StayPal',
    icon: 'chat',
    status: 'Paused · pilot-ready',
    title: 'StayPal',
    blocks: [
      {
        label: 'The problem',
        text: 'Short-term rental hosts answer the same guest questions at every hour: door codes, wifi, late arrivals, the boiler.',
      },
      {
        label: 'What I built',
        text: 'A WhatsApp co-host. A router hands each message to one of seven specialist agents; it understands voice notes and photos, and escalates anything urgent to the host with context.',
      },
      {
        label: 'Where it’s at',
        text: 'Paused while I go back to talking with hosts before building more. The site is live.',
      },
    ],
    link: { label: 'staypal.ai', href: 'https://www.staypal.ai/' },
  },
  {
    id: 'purrfect-plate',
    name: 'Purrfect Plate',
    icon: 'plate',
    status: 'In progress · with Millusha',
    title: 'Purrfect Plate',
    blocks: [
      {
        label: 'The problem',
        text: 'Our favourite recipes lived in screenshots, saved reels and half-remembered videos.',
      },
      {
        label: 'What we’re building',
        text: 'A shared recipe library that turns a cooking video into a recipe, with every step traced back to the captions, audio or frame it came from. Plus a pantry and a shopping list. One app on the web and on our phones.',
      },
      {
        label: 'Where it’s at',
        text: 'We cook with it at home. Not open to the public yet.',
      },
    ],
  },
  {
    id: 'client-work',
    name: 'Client work',
    icon: 'folder',
    status: 'Zephony · 2017–19',
    title: 'Client work',
    blocks: [
      {
        label: 'The setting',
        text: 'I co-founded a small studio and led frontend for five or six clients at a time, mostly small businesses in Italy.',
      },
      {
        label: 'What I built',
        text: 'A CRM that took a talent agency from lead to enrolled student, with a rules engine and activity log. A configurator for renting sports equipment. An online store with Stripe, PayPal and translations.',
      },
      {
        label: 'What stuck',
        text: 'Start from how the business actually works, not from the stack.',
      },
    ],
  },
  {
    id: 'career',
    name: 'Career',
    icon: 'career',
    status: 'Remote.com · since 2022',
    title: 'Career',
    timeline: [
      {
        when: '2022–',
        what: 'Remote.com',
        detail: 'Senior engineer, now on the AI team.',
      },
      {
        when: '2021–22',
        what: 'Airbase',
        detail: 'Growth and reporting; built the partner dashboard frontend.',
      },
      {
        when: '2019–21',
        what: 'Synup',
        detail: 'Frontend for reputation management used by 100k+ businesses.',
      },
      {
        when: '2017–19',
        what: 'Zephony',
        detail: 'Co-founder. Client work across CRM, commerce and rentals.',
      },
      {
        when: '2015–17',
        what: 'Cognizant',
        detail: 'Performance engineering for Walt Disney Parks and Resorts.',
      },
    ],
  },
  {
    id: 'inbox',
    name: 'Inbox',
    icon: 'inbox',
    title: 'Inbox',
    paragraphs: [
      'I’m always curious how other people work, and what slows them down.',
      'If you’d like to swap notes, I’m up for a chat.',
    ],
    link: { label: 'Say hello', href: contactHref },
  },
  {
    id: 'trash',
    name: 'Trash',
    icon: 'trash',
    title: 'Trash',
    paragraphs: ['Dead ideas, kept for sentimental reasons.'],
    scraps: [
      { name: 'Networthy', icon: 'chart' },
      { name: 'Piggy', icon: 'piggy' },
      { name: 'Content Cop', icon: 'siren' },
      { name: 'Uncommon UI', icon: 'shapes' },
      { name: 'side-project (2)', icon: 'file' },
      { name: 'side-project (3)', icon: 'file' },
    ],
  },
];

/** Now-and-then desktop notifications while nobody is reading. */
export const deskToasts: readonly string[] = [
  'Build passed. Suspicious.',
  'Reminder: stretch. The leg that’s left.',
  'Millusha: dinner’s ready.',
  'You have 43 tabs open. Surely not.',
  'Backup complete. Probably.',
];

/*
 * The laptop's Slack channels. Each click on a channel shows its next
 * conversation, round and round. DRAFT COPY for Glen to review; everyone
 * except Glen is made up, so no real colleague is quoted.
 */
export interface SlackMessage {
  from: string;
  text: string;
}
export interface SlackChannel {
  name: string;
  conversations: readonly (readonly SlackMessage[])[];
}

export const slackChannels: readonly SlackChannel[] = [
  {
    name: 'dev-team-ai',
    conversations: [
      [
        { from: 'Glen', text: 'Eval run finished. 47 out of 50.' },
        { from: 'Priya', text: 'And the other three?' },
        {
          from: 'Glen',
          text: 'I read them. The model was right and my expected answers were wrong.',
        },
        { from: 'Priya', text: 'So 50 out of 50 and you get a 47.' },
      ],
      [
        { from: 'Tomás', text: 'Who added “please” to the system prompt?' },
        { from: 'Glen', text: 'Me. Scores went up two points.' },
        { from: 'Tomás', text: 'I hate that this works.' },
      ],
      [
        { from: 'Glen', text: 'Hot take: most AI bugs are data bugs.' },
        { from: 'Priya', text: 'Most bugs are data bugs.' },
        { from: 'Glen', text: 'Even hotter take, noted.' },
      ],
    ],
  },
  {
    name: 'random',
    conversations: [
      [
        { from: 'Maya', text: 'Is anyone else’s cat attending this standup?' },
        { from: 'Glen', text: 'No cat here. The plants are listening though.' },
        { from: 'Maya', text: 'Silent stakeholders.' },
      ],
      [
        { from: 'Glen', text: 'Valencia is 31°C today. In September.' },
        { from: 'Jonas', text: 'Berlin is 12 and raining. Sideways.' },
        { from: 'Glen', text: 'Let’s never compare weather again.' },
      ],
      [
        { from: 'Jonas', text: 'Share your desk setup, go.' },
        {
          from: 'Glen',
          text: 'Monitor, laptop, globe, Arsenal scarf. Essentials.',
        },
      ],
    ],
  },
  {
    name: 's-anime',
    conversations: [
      [
        { from: 'Glen', text: 'Finished Frieren. I am not okay.' },
        { from: 'Kenji', text: 'Nobody is. Welcome.' },
      ],
      [
        { from: 'Kenji', text: 'One Piece: start from episode 1 or skip?' },
        { from: 'Glen', text: 'Start from 1. Clear your calendar. For years.' },
      ],
      [
        { from: 'Glen', text: 'Rewatching Haikyuu for motivation.' },
        { from: 'Kenji', text: 'For work?' },
        { from: 'Glen', text: 'For pull-ups.' },
      ],
    ],
  },
  {
    name: 's-football',
    conversations: [
      [
        { from: 'Glen', text: '2–0 up at 80 minutes.' },
        { from: 'Sam', text: 'Relax, it’s done.' },
        { from: 'Glen', text: 'I support Arsenal. It is never done.' },
      ],
      [
        { from: 'Sam', text: 'Title this year?' },
        { from: 'Glen', text: 'Ask me in May. From behind a cushion.' },
      ],
      [
        { from: 'Glen', text: 'Moving meetings for the North London derby.' },
        { from: 'Sam', text: 'Is that allowed?' },
        { from: 'Glen', text: 'It’s in my calendar as “focus time”.' },
      ],
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

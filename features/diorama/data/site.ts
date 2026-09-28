/** Who the site belongs to, where it lives, and where else to find Glen. */
export const site = {
  url: 'https://glenpadua.com',
  name: 'Glen Padua',
  title: 'Glen Padua — engineer and maker of things',
  description:
    'I’m Glen Padua, an engineer at Remote.com. I build things for problems worth solving, and write about life, work and the occasional change of mind.',
  /** The default link-preview card: the lake, first thing in the morning. */
  image: {
    url: '/assets/world/og-lake-v1.jpg',
    width: 1200,
    height: 630,
    alt: 'An illustrated lake at dawn, with Glen doing pull-ups on a green bar in the meadow.',
  },
  twitter: '@glenp01',
} as const;

export const contactHref = 'https://www.linkedin.com/in/glen-padua/';
export const socialLinks = {
  instagram: 'https://www.instagram.com/404legnotfound/',
  github: 'https://github.com/glenpadua',
  twitter: 'https://twitter.com/glenp01',
} as const;

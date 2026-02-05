import type { SkillCardItem } from '@/types/content';

export const frontendCards: SkillCardItem[] = [
  {
    id: 1,
    text: 'HTML5',
    logo: '/assets/html5.svg',
    color: '#f05837',
    desc: 'I use semantic markup wherever needed and have good understanding of ARIA requirements.',
  },
  {
    id: 2,
    text: 'CSS3',
    logo: '/assets/css3.svg',
    color: '#007bff',
    desc: 'Have good understanding of flexbox and grid and use the appropriate tools to ensure cross browser compatibility.',
  },
  {
    id: 3,
    text: 'ES6',
    logo: '/assets/javascript.svg',
    color: '#d9ac2a',
    desc: 'Comfortable with ES6+ syntax and trying to stick to the functional programming paradigm.',
  },
  {
    id: 4,
    text: 'React',
    logo: '/assets/react.svg',
    color: 'rgba(12, 53, 130, 1)',
    desc: 'I make use of Modern React conventions like hooks while creating reusable components.',
  },
  {
    id: 5,
    text: 'Redux',
    logo: '/assets/redux.svg',
    color: '#242527',
    desc: 'Used as a last resort when state becomes too complicated to handle. Looking into redux-toolkit too.',
  },
  {
    id: 6,
    text: 'NextJS',
    logo: '/assets/next-js.svg',
    color: '#0077fe',
    desc: 'Preferred React framework when in the need for a static site like this one.',
  },
  {
    id: 7,
    text: 'Storybook',
    logo: '/assets/storybook.png',
    color: '#363636',
    desc: 'My goto for documenting and building components in isolation.',
  },
  {
    id: 8,
    text: 'Testing Library',
    logo: '/assets/testing-library.png',
    color: '#0862ad',
    desc: 'A sucker for behavioural testing promoted by Kent C. Dodds. Looking to follow TDD more.',
  },
];

export const otherCards: SkillCardItem[] = [
  {
    id: 1,
    text: 'GraphQL',
    logo: '/assets/graphql.svg',
    color: '#007bff',
    desc: 'Have an understanding of GraphQL schema along with the consumption of APIs using ApolloClient.',
  },
  {
    id: 2,
    text: 'Framer Motion',
    logo: '/assets/framer-motion.svg',
    color: '#363636',
    filter:
      'invert(100%) sepia(11%) saturate(7496%) hue-rotate(286deg) brightness(114%) contrast(110%)',
    desc: 'Love the declarative animations on offer. Looking to understand and leverage advanced animation techiniques.',
  },
  {
    id: 3,
    text: 'Wordpress',
    logo: '/assets/wordpress.svg',
    color: '#07263b',
    desc: 'Have hosted a few WordPress sites and also dabbled with some PHP to customize some of the themes using child themes.',
  },
  {
    id: 4,
    text: 'Photoshop',
    logo: '/assets/photoshop.svg',
    color: '#001d26',
    desc: 'Have used photoshop over the years both for simple designs as well as mockups.',
  },
  {
    id: 5,
    text: 'Sketch',
    logo: '/assets/sketch.svg',
    color: '#3b1e61',
    desc: 'Switched to Sketch on and off when the need for higher fidelity mockups arise.',
  },
  {
    id: 6,
    text: 'NodeJS',
    logo: '/assets/nodejs.svg',
    color: '#333333',
    desc: 'Dabbled with NodeJS in the past, with Express as well as building a CLI tool.',
  },
  {
    id: 7,
    text: 'Babel',
    logo: '/assets/babel.svg',
    color: '#3b3c37',
    desc: 'Learning to use Babel more than just a transpiler but understanding its plugin ecosystem to do more.',
  },
  {
    id: 8,
    text: 'Lerna',
    logo: '/assets/lerna.svg',
    color: 'linear-gradient(40deg, #00fff0 0%, #677ef8 50%, #cc00ff 100%)',
    desc: 'Used lerna along with yarn-workspaces to create a monorepo.',
  },
];

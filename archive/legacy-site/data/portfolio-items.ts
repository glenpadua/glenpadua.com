import type { PortfolioItem } from '@/types/content';

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Uncommon UI',
    tags: [
      { name: 'Open Source', color: 'black' },
      { name: 'React', color: '#5ed3f2' },
      { name: 'Storybook', color: '#ff4785' },
      {
        name: 'Lerna',
        color: 'linear-gradient(40deg, #00fff0 0%, #677ef8 50%, #cc00ff 100%)',
      },
    ],
    links: [
      { iconKey: 'github', url: 'https://github.com/Zephony/uncommon-ui' },
      { iconKey: 'storybook', url: 'https://zephony.github.io/uncommon-ui/' },
      { iconKey: 'npm', url: 'https://www.npmjs.com/org/uncommonui' },
    ],
    summary:
      'An open source React component library that will contain everything from standard UI components which will serve as building blocks to building more experimental ones that push the boundaries of UI/UX.',
    sections: [
      {
        heading: 'What I Brought',
        bullets: [
          "Set up a monorepo with Lerna allowing for every component to be published as it's own individual package.",
          'Built out each of the UI components while writing tests and stories for each of them.',
          'Set up contribution guidelines with precommit hooks and continuous integration with Circle CI.',
        ],
      },
      {
        heading: 'Key Takeways',
        bullets: [
          'An understanding of how to properly setup and structure a modern component library that can be shared across teams',
          'Better understanding of managing an open source repo and adhering to high standards for when the contributing community and users of the library grows.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'My Website',
    tags: [
      { name: 'NextJS', color: '#5ed3f2' },
      { name: 'Prismic', color: '#5163ba' },
      { name: 'GraphQL', color: '#de34a5' },
      { name: 'framer-motion', color: '#181818' },
    ],
    links: [
      { iconKey: 'github', url: 'https://github.com/glenpadua/glenpadua.com' },
    ],
    summary:
      'A clean modern single page website built with the JAMstack to showcase my portfolio. It also gives an insight into my life and thoughts in the form of a blog and smaller snippets.',
    sections: [
      {
        heading: 'What I Brought',
        bullets: [
          'Designed the whole site from scratch with Sketch with the idea of combining my personality with the UI elements on display.',
          'Custom blog using Prismic as the headless CMS and consuming it using Apollo GraphQL.',
        ],
      },
      {
        heading: 'Key Takeaways',
        bullets: [
          'Learnt to use amazing libraries like framer-motion for simple declarative animations.',
          'A personal website is the best way to iteratively try out cool new things.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Synup',
    tags: [
      { name: 'React', color: '#5ed3f2' },
      { name: 'Redux', color: '#764abc' },
      { name: 'GraphQL', color: '#de34a5' },
      { name: 'styled-components', color: '#3d3d3d' },
    ],
    links: [{ iconKey: 'globe', url: 'http://synup.com/' }],
    summary:
      'Frontend Engineer in a team at Synup building a product which serves as a digital profile and reputation management solution serving over 100k+ SMBs and Enterprises.',
    sections: [
      {
        heading: 'What I Brought',
        bullets: [
          'Encouraged the team to follow a component driven development approach using Storybook.',
          'Improved codebase with with setting up pre-commit hooks to check for linting and building out a coding standards document.',
        ],
      },
      {
        heading: 'Key Takeaways',
        bullets: [
          'Learnt to work with legacy React code and GraphQL.',
          'Learnt how to work following the Agile methodology.',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Noleggiocampi',
    tags: [
      { name: 'React', color: '#5ed3f2' },
      { name: 'Redux', color: '#764abc' },
      { name: 'Storybook', color: '#ff4785' },
      { name: 'styled-components', color: '#3d3d3d' },
    ],
    links: [
      { iconKey: 'globe', url: 'https://noleggia.noleggiocampi.it/noleggia' },
    ],
    summary:
      'A customized online sports rental system that allowed users to pick and choose various components as required for various sports such as volleyball and football which would then be brought over and set up for them.',
    sections: [
      {
        heading: 'What I Brought',
        bullets: [
          'Built the entire frontend as a Progressive Web App that persisted state in Local Storage.',
          'Built out a custom configurator where users could add and remove components they needed which would then be visually reflected on the UI.',
        ],
      },
      {
        heading: 'Key Takeaways',
        bullets: [
          'Learnt to build out components in isolation using a component driven development approach with Storybook.',
          'Learnt the quirks of CSS for custom emails.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Mi Alma',
    tags: [
      { name: 'E-commerce', color: 'green' },
      { name: 'React', color: '#5ed3f2' },
      { name: 'Redux', color: '#764abc' },
      { name: 'Stripe', color: '#7a73ff' },
      { name: 'Paypal', color: '#266fbb' },
    ],
    links: [],
    summary:
      'A modern SPA e-commerce store built for a smooth user experience, for an Italian sandal company complete with a custom dashboard to manage orders, inventory, tax, shipping information and much more.',
    sections: [
      {
        heading: 'What I Brought',
        bullets: [
          'Built the entire frontend with fluid responsive design along with pixel perfect renditions of the mockups.',
          'Built a Cart functionality made from a persistent Redux store.',
        ],
      },
      {
        heading: 'Key Takeaways',
        bullets: [
          'Learnt about the intricacies of integrating Payment gateways like Stripe and PayPal.',
          'Learnt to implement an i18n system to switch between languages.',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'New Faces',
    tags: [
      { name: 'CRM', color: 'brown' },
      { name: 'React', color: '#5ed3f2' },
      { name: 'Redux', color: '#764abc' },
      { name: 'Sass', color: '#cf6499' },
    ],
    links: [],
    summary:
      'A full-fledged CRM for an Italian talent management agency to manage their entire flow of clients from their journey as leads all the way to managing their functions as students of the agency.',
    sections: [
      {
        heading: 'What I Brought',
        bullets: [
          'Played a part in architecting the application and interface through multiple iterations while learning and building out the entire frontend with React and Redux.',
          'Built out custom features like a rules engine, customized search filter, activity logging, just to name a few.',
        ],
      },
      {
        heading: 'Key Takeaways',
        bullets: [
          'Learnt how to plan for a large scale project and split work into phases of completion.',
          'Learnt that using a design framework like Material UI is not always the best option.',
        ],
      },
    ],
  },
];

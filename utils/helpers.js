import {
  FaTv,
  FaUserNinja,
  FaLaptop,
  FaLaptopCode,
  FaFistRaised,
  FaSocks,
  FaBookReader,
  FaBlog,
  FaMicroblog,
  FaSpotify,
} from 'react-icons/fa';

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const menuItems = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Skills',
    url: '/skills',
  },
  {
    name: 'Work',
    url: '/work',
  },
  {
    name: 'Blog',
    url: '/blog',
  },
];

export const categories = [
  {
    name: 'All',
    category: '',
    url: '/blog',
  },
  {
    name: 'Work',
    category: 'work',
    url: '/blog?category=work',
  },
  {
    name: 'Tech',
    category: 'tech',
    url: '/blog?category=tech',
  },
  {
    name: 'Chronicles of an Amputee',
    category: 'amputee',
    url: '/blog?category=amputee',
  },
];

export const aboutCards = [
  {
    id: 1,
    title: 'FRONTEND NINJA',
    icon: <FaUserNinja />,
    info: (
      <i>
        "Because I <b>React</b> quickly."
      </i>
    ),
    color: 'rgba(0, 0, 0, 0.7)',
    link: '/skills',
  },
  {
    id: 2,
    title: 'CURRENTLY WORKING AT',
    icon: <FaLaptop />,
    info: (
      <i>
        "<b>Remote</b> - Global standard for everything remote!"
      </i>
    ),
    color: '#2E2989',
    href: 'https://remote.com',
  },
  {
    id: 3,
    title: 'CURRENT PET PROJECT',
    icon: <FaLaptopCode />,
    info: (
      <i>
        "<b>Stumpedd</b> - For Amputees by an Amputee"
      </i>
    ),
    color: '#be9063',
    link: '/work',
  },
  {
    id: 4,
    title: 'LATEST BLOG POST',
    icon: <FaBlog />,
    info: <i>"Do you have an ideal dream job?"</i>,
    color: '#99CCFF',
    link: '/blog/do-you-have-an-ideal-dream-job',
  },
  {
    id: 5,
    title: 'LATEST SNIPPET',
    icon: <FaMicroblog />,
    info: <i>"Free up space with npkill"</i>,
    color: '#FFCC00',
    link: '/snippets/free-up-space-with-npkill',
  },
  {
    id: 6,
    title: 'ZEPHONY',
    icon: <FaFistRaised />,
    info: <i>"Startup I Co-Founded in 2017"</i>,
    color: '#6465a5',
    link: '/work',
  },
  {
    id: 7,
    title: 'CHRONICLES OF AN AMPUTEE',
    icon: <FaSocks />,
    info: <i>"One small step for man, one giant hop for me"</i>,
    color: '#d9ac2a',
    link: '/blog?category=amputee',
  },
  {
    id: 8,
    title: 'CURRENTLY WATCHING',
    icon: <FaTv />,
    info: (
      <>
        <i>"Chainsaw Man"</i> <span>🪚</span>
      </>
    ),
    color: '#C2462F',
    href: 'https://myanimelist.net/anime/44511/Chainsaw_Man',
  },
  {
    id: 9,
    title: 'CURRENTLY READING',
    icon: <FaBookReader />,
    info: (
      <i style={{ fontSize: '0.9em' }}>
        <b>"The Almanack of Naval Ravikant"</b> by Eric Jorgenson
      </i>
    ),
    color: '#7B7A7C',
    href: 'https://amzn.to/3NEXICh',
  },
  // {
  //   id: 10,
  //   title: 'CURRENTLY LISTENING TO',
  //   icon: <FaSpotify />,
  //   info: (
  //     <i>
  //       <b>"Song Title"</b> by Artist
  //     </i>
  //   ),
  //   color: '#40d15d',
  //   href:
  //     'https://open.spotify.com/album/3qPIe6YsuQ0qzg6bSEQjfv?highlight=spotify:track:3c9xinOHrEqF39omS0Czj1',
  // },
];

export const frontendCards = [
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

export const otherCards = [
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
    color: 'linear-gradient( 40deg, #00fff0 0%, #677ef8 50%, #cc00ff 100% )',
    desc: 'Used lerna along with yarn-workspaces to create a monorepo.',
  },
];

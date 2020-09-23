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
  {
    name: 'Snippets',
    url: '/snippets',
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
        "<b>Synup</b>, not to be confused with Sign Up"
      </i>
    ),
    color: 'rgba(12, 53, 130, 0.7)',
    link: '/work',
  },
  {
    id: 3,
    title: 'CURRENT PET PROJECT',
    icon: <FaLaptopCode />,
    info: (
      <i>
        "<b>Uncommon UI</b> - The Component Utopia"
      </i>
    ),
    color: '#be9063',
    link: '/work',
  },
  {
    id: 4,
    title: 'LATEST BLOG POST',
    icon: <FaBlog />,
    info: <i>"Title of the Blog Post"</i>,
    color: '#acddfa',
    link: '/blog',
  },
  {
    id: 5,
    title: 'LATEST SNIPPET',
    icon: <FaMicroblog />,
    info: <i>"Title of the Snippet"</i>,
    color: '#f4d721',
    link: '/snippets',
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
    link: '/blog',
  },
  {
    id: 8,
    title: 'CURRENTLY WATCHING',
    icon: <FaTv />,
    info: <i>"JoJo's Bizzare Adventure"</i>,
    color: '#f35eb7',
    href: 'https://www.imdb.com/title/tt2359704/',
  },
  {
    id: 9,
    title: 'CURRENTLY READING',
    icon: <FaBookReader />,
    info: (
      <i style={{ fontSize: '0.9em' }}>
        <b>"How to be a Productivity Ninja"</b> by Graham Allcot
      </i>
    ),
    color: '#f05837',
    href: 'https://www.goodreads.com/user/show/92235776-glen-padua',
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
  },
  {
    id: 2,
    text: 'CSS3',
    logo: '/assets/css3.svg',
    color: '#007bff',
  },
  {
    id: 3,
    text: 'ES6',
    logo: '/assets/javascript.svg',
    color: '#d9ac2a',
  },
  {
    id: 4,
    text: 'React',
    logo: '/assets/react.svg',
    color: 'rgba(12, 53, 130, 1)',
  },
  {
    id: 5,
    text: 'Redux',
    logo: '/assets/redux.svg',
    color: '#242527',
  },
  {
    id: 6,
    text: 'Storybook',
    logo: '/assets/storybook.png',
    color: '#363636',
  },
  {
    id: 7,
    text: 'NextJS',
    logo: '/assets/next-js.svg',
    color: '#cc99cb',
  },
  {
    id: 8,
    text: 'Testing Library',
    logo: '/assets/testing-library.png',
    color: '#0862ad',
  },
];

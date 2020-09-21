import React from 'react';
import styled from 'styled-components';
import AboutCard from './';
import {
  FaTv,
  FaUserNinja,
  FaLaptop,
  FaLaptopCode,
  FaFistRaised,
  FaSocks,
  FaBookReader,
} from 'react-icons/fa';

export default {
  title: 'Site/About Card',
  component: AboutCard,
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CardWrapper = styled.div`
  width: 350px;
  margin: 20px;
`;

const items = [
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
    href: 'https://synup.com',
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
    href: 'https://github.com/Zephony/uncommon-ui',
  },
  {
    id: 4,
    title: 'STARTUP I CO-FOUNDED',
    icon: <FaFistRaised />,
    info: (
      <i>
        "<b>Zephony</b>, with my buddy Kevin"
      </i>
    ),
    color: '#6465a5',
    href: 'http://zephony.com/',
  },
  {
    id: 5,
    title: 'CHRONICLES OF AN AMPUTEE',
    icon: <FaSocks />,
    info: <i>"One small step for man, one giant hop for me"</i>,
    color: '#d9ac2a',
    link: '/blog',
  },
  {
    id: 6,
    title: 'CURRENT WATCH',
    icon: <FaTv />,
    info: (
      <i>
        "An anime about Basketball called <b>Haikyuu</b>"
      </i>
    ),
    color: 'rgba(241, 147, 0, 0.8)',
    href: 'https://www.imdb.com/title/tt3398540/',
  },
  {
    id: 7,
    title: 'CURRENT READ',
    icon: <FaBookReader />,
    info: (
      <i style={{ fontSize: '14px' }}>
        "Think and Grow Rich" - Napoleon Hill
        <br />
        "How to be a Productivity Ninja" - Graham Allcot
      </i>
    ),
    color: '#f05837',
    href: 'https://www.goodreads.com/user/show/92235776-glen-padua',
  },
];

export const BasicCards = () => (
  <Wrapper>
    {items.map(item => (
      <CardWrapper key={item.id}>
        <AboutCard {...item} />
      </CardWrapper>
    ))}
  </Wrapper>
);

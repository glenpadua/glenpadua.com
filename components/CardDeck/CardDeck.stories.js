import React from 'react';
import styled from 'styled-components';
import CardDeck from './';
import ReactLogo from 'assets/react.svg';
import GraphqlLogo from 'assets/graphql.svg';
import Html5Logo from 'assets/html5.svg';
import CSS3Logo from 'assets/css3.svg';
import JSLogo from 'assets/javascript.svg';
import ReduxLogo from 'assets/redux.svg';
import JestLogo from 'assets/jest.svg';
import RTLLogo from 'assets/testing-library.png';
import StorybookLogo from 'assets/storybook.png';
import StyledLogo from 'assets/styled.png';

export default {
  title: 'Site/Card Deck',
  component: CardDeck,
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  padding: 0 20px;
`;

const cards = [
  {
    id: 1,
    text: 'HTML5',
    logo: Html5Logo,
    color: '#f05837',
  },
  {
    id: 2,
    text: 'CSS3',
    logo: CSS3Logo,
    color: '#007bff',
  },
  {
    id: 3,
    text: 'ES6',
    logo: JSLogo,
    color: '#d9ac2a',
  },
  {
    id: 4,
    text: 'React',
    logo: ReactLogo,
    color: 'rgba(12, 53, 130, 1)',
  },
  {
    id: 5,
    text: 'Redux',
    logo: ReduxLogo,
    color: '#242527',
  },
  {
    id: 6,
    text: 'Jest',
    logo: JestLogo,
    color: '#c1a813',
  },
  {
    id: 7,
    text: 'Testing Library',
    logo: RTLLogo,
    color: '#0862ad',
  },
  {
    id: 8,
    text: 'Styled Components',
    logo: StyledLogo,
    color: '#363636',
  },
];

// A few hands of cards that I can play when needed
// What other card tricks could he possibly have up his sleeve?
// title="Frontend Deck"
// description='Cards are power; learn to harness that power, and you will be forever rewarded." - James Swain'
// "Life is like a game of cards. The hand you are dealt is determinism; the way you play it is free will." - Jawaharlal Nehru
// "Cards are power; learn to harness that power, and you will be forever rewarded." - James Swain

export const HandOfCards = () => (
  <Wrapper>
    <CardDeck cards={cards} />
  </Wrapper>
);

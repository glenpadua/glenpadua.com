'use client';

import React from 'react';
import styled from 'styled-components';
import SkillCard from 'components/SkillCard';

const generateNthChildrenStyles = (cards, initialStyles, increments) => {
  let { translateX, translateY, angle, left } = initialStyles;
  let { translateXIncrement, angleIncrement, leftIncrement } = increments;
  let styles = cards.reduce((acc, card) => {
    acc += `li:nth-child(${card.id}) {
      transform: translate(${translateX}px, ${translateY}px) rotate(${angle}deg);
      left: ${left}px;
    }
    
    `;
    translateX += translateXIncrement;
    angle += angleIncrement;
    left += leftIncrement;
    return acc;
  }, '');
  return styles;
};

const Wrapper = styled.ul`
  list-style-type: none;
  position: relative;
  width: 260px;
  height: 200px;

  @media only screen and (min-width: 601px) {
    height: 340px;
    width: 450px;
  }

  li {
    position: absolute;
    top: 0;
    transition: top 0.2s;

    &:hover {
      top: -30px;

      :after {
        content: '';
        position: absolute;
        left: -20px;
        top: 30px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
      }
    }
  }

  ${props =>
    generateNthChildrenStyles(
      props.$cards,
      {
        translateX: 0,
        translateY: 0,
        angle: -32,
        left: 0,
      },
      {
        translateXIncrement: 30,
        angleIncrement: 8,
        leftIncrement: 10,
      }
    )}

  @media only screen and (max-width: 600px) {
    ${props =>
      generateNthChildrenStyles(
        props.$cards,
        {
          translateX: 0,
          translateY: 0,
          angle: -15,
          left: 0,
        },
        {
          translateXIncrement: 16,
          angleIncrement: 5,
          leftIncrement: 6,
        }
      )}
  }
`;

const CardDeck = ({ cards, onCardClick }) => (
  <Wrapper $cards={cards}>
    {cards.map(card => (
      <SkillCard key={card.id} onClick={() => onCardClick(card)} {...card} />
    ))}
  </Wrapper>
);

export default CardDeck;

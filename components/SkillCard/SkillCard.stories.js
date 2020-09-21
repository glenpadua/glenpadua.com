import React from 'react';
import styled from 'styled-components';
import SkillCard from './';
import ReactLogo from 'public/assets/react.svg';
import GraphqlLogo from 'public/assets/graphql.svg';

export default {
  title: 'Site/Skill Card',
  component: SkillCard,
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CardWrapper = styled.div`
  margin: 20px;
`;

const cards = [
  {
    id: 1,
    text: 'React',
    logo: ReactLogo,
    color: 'rgba(12, 53, 130, 0.7)',
  },
  {
    id: 1,
    text: 'Graphql',
    logo: GraphqlLogo,
    color: 'rgb(22, 30, 39)',
  },
];

export const BasicCards = () => (
  <Wrapper>
    {cards.map(card => (
      <CardWrapper key={card.id}>
        <SkillCard {...card} />
      </CardWrapper>
    ))}
  </Wrapper>
);

import React from 'react';
import styled from 'styled-components';
import AboutCard from './';

export default {
  title: 'Site/About Card',
  component: AboutCard,
};

const Wrapper = styled.div`
  width: 400px;
`;

export const Basic = () => (
  <Wrapper>
    <AboutCard />
  </Wrapper>
);

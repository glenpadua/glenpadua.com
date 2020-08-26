import React from 'react';
import styled from 'styled-components';
import Header from './';

export default {
  title: 'Site/Header',
  component: Header,
};

const Wrapper = styled.div`
  width: 100%;
`;

export const Basic = () => (
  <Wrapper>
    <Header />
  </Wrapper>
);

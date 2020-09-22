import React from 'react';
import styled from 'styled-components';
import PageTitle from './';

export default {
  title: 'Site/Page Title',
  component: PageTitle,
};

const Wrapper = styled.div`
  width: 100%;
`;

export const Basic = () => (
  <Wrapper>
    <PageTitle>Hello I'm Glen!</PageTitle>
  </Wrapper>
);

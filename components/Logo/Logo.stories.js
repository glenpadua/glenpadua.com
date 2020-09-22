import React from 'react';
import styled from 'styled-components';
import Logo from './';

export default {
  title: 'Site/Logo',
  component: Logo,
};

const Wrapper = styled.div`
  width: 100%;
`;

export const SmallLogo = () => (
  <Wrapper>
    <Logo size="small" />
  </Wrapper>
);

export const MediumLogo = () => (
  <Wrapper>
    <Logo size="medium" />
  </Wrapper>
);

export const LargeLogo = () => (
  <Wrapper>
    <Logo size="large" />
  </Wrapper>
);

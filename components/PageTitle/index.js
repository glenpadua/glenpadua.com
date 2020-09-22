import React from 'react';
import styled, { css } from 'styled-components';

const Text = styled.h1`
  color: #000;
  font-weight: 300;
`;

const PageTitle = ({ children }) => <Text>{children}</Text>;

export default PageTitle;

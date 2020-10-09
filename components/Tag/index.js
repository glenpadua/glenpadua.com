import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #fff;
  background: ${props => props.color};
  font-weight: 300;
  font-size: 0.7em;
  padding: 5px 10px;
  border-radius: 16px;
  display: inline;
`;

const Tag = ({ children, color = '#000' }) => (
  <Wrapper color={color}>{children}</Wrapper>
);

export default Tag;

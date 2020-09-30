import React from 'react';
import styled from 'styled-components';
import Tag from './';

export default {
  title: 'Site/Tag',
  component: Tag,
};

const Wrapper = styled.div`
  width: 100%;
`;

export const Basic = () => (
  <Wrapper>
    <Tag color="blue">Zephony</Tag>
  </Wrapper>
);

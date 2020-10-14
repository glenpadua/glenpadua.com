import React from 'react';
import styled from 'styled-components';
import Snippet from './';

export default {
  title: 'Site/Snippet',
  component: Snippet,
};

const Wrapper = styled.div`
  width: 80%;
`;

export const Basic = () => (
  <Wrapper>
    <Snippet
      title="Deploying Next.js Apps"
      published="April	9, 2020"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus."
      truncate={400}
    />
  </Wrapper>
);

import React from 'react';
import styled from 'styled-components';
import BlogItem from './';

export default {
  title: 'Site/Blog Item',
  component: BlogItem,
};

const Wrapper = styled.div`
  width: 100%;
`;

export const Basic = () => (
  <Wrapper>
    <BlogItem
      img="https://images.prismic.io/nextjs-blog-example/06995460-5c8a-4295-b7e0-3e65ac13e404_cover2.jpg?auto=compress,format"
      title="Deploying Next.js Apps"
      published="April	9, 2020"
      preview="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus."
    />
  </Wrapper>
);

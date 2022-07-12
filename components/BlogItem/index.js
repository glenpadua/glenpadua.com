import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.a)`
  text-decoration: none;
  width: 100%;
  display: block;
  cursor: pointer;
  color: #000;
`;

const Content = styled.div`
  padding: 10px 15px;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1.4em;
`;

const Published = styled.time`
  font-weight: 300;
  font-size: 0.8em;
`;

const Preview = styled.p`
  margin-top: 10px;
  font-weight: 300;
  font-size: 1em;
  line-height: 1.4;
`;

const BlogItem = ({ uid, img, title, published, preview }) => (
  <Link as={`/blog/${uid}`} href={`/blog/[uid]`} passHref>
    <Wrapper whileHover={{ x: 10 }}>
      <Content>
        <Title>{title}</Title>
        <Published>{published}</Published>
        <Preview>{preview}</Preview>
      </Content>
    </Wrapper>
  </Link>
);

export default BlogItem;

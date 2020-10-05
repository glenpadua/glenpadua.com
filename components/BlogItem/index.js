import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { hrefResolver, linkResolver } from 'prismic-configuration';

const Wrapper = styled(motion.a)`
  width: 100%;
  display: block;
  margin-bottom: 40px;
  height: 380px;
  background: #fff;
  border-radius: 16px;
  cursor: pointer;
`;

const Image = styled.div`
  width: 100%;
  height: 150px;
  background: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: centre;
  background-size: cover;
  border-radius: 16px 16px 0 0;
`;

const Content = styled.div`
  padding: 10px 15px;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1.5em;
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

const BlogItem = ({ img, title, published, preview }) => (
  <Wrapper
    whileHover={{ scale: 1.1 }}
    initial={{ scale: 0 }}
    animate={{ scale: 1, transition: { duration: 0.5 } }}
  >
    <Image src={img} />
    <Content>
      <Title>{title}</Title>
      <Published>{published}</Published>
      <Preview>{preview}</Preview>
    </Content>
  </Wrapper>
);

export default BlogItem;

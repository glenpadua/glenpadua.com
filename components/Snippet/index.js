import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RichText } from 'prismic-reactjs';

import SliceZone from 'components/BlogPost/SliceZone';

const Wrapper = styled(motion.a)`
  width: 100%;
  display: block;
  text-decoration: none;
  color: #000;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1.4em;
`;

const Published = styled.time`
  font-weight: 300;
  font-size: 0.8em;
`;

const Content = styled.p`
  margin-top: 10px;
  font-weight: 300;
  font-size: 1em;
  line-height: 1.4;
`;

const Snippet = ({ uid, title, published, body, truncate }) => {
  return (
    <Link as={`/snippets/${uid}`} href={`/snippets/[uid]`} passHref>
      <Wrapper whileHover={{ x: 10 }}>
        <Title>{title}</Title>
        <Published>{published}</Published>
        <Content>
          {truncate ? (
            `${RichText.asText(body[0].primary.text).substring(0, truncate)}...`
          ) : (
            <SliceZone body={body} />
          )}
        </Content>
      </Wrapper>
    </Link>
  );
};

export default Snippet;

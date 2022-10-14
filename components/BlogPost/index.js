import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PrismicText } from '@prismicio/react';

import SliceZone from './SliceZone';

import DisqusComments from 'components/DisqusComments';

const Wrapper = styled.article`
  width: 100%;
  max-width: 800px;
  line-height: 1.5;
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 500;
  margin-bottom: 2rem;
  text-align: center;
`;

const CoverWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Cover = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 450px;
  margin-bottom: 2rem;
`;

const BlogPost = ({ post }) => {
  const [url, setUrl] = useState('');
  const postData = post.data;
  useEffect(() => {
    // window is accessible here.
    setUrl(window.location.href);
  }, []);

  return (
    <Wrapper>
      <Title>
        <PrismicText field={postData.title} />
      </Title>
      {postData.show_cover_image && (
        <CoverWrapper>
          <Cover src={postData.cover_image.url} />
        </CoverWrapper>
      )}
      <SliceZone body={postData.body} />
      <DisqusComments url={url} post={postData} />
    </Wrapper>
  );
};

export default BlogPost;

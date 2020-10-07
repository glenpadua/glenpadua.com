import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { GET_POST } from 'utils/queries';
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
  align-self: flex-start;
`;

const Cover = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 2rem;
`;

const BlogPost = () => {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const { uid } = router.query;
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { uid },
  });

  useEffect(() => {
    // window is accessible here.
    setUrl(window.location.href);
  }, []);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;
  const post = data.allPosts.edges[0].node;
  return (
    <Wrapper>
      <Title>{RichText.asText(post.title)}</Title>
      <Cover src={post.cover_image.url} />
      <SliceZone body={post.body} />
      <DisqusComments url={url} post={post} />
    </Wrapper>
  );
};

export default BlogPost;

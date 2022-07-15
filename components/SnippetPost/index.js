import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PrismicText } from '@prismicio/react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { GET_SNIPPETS } from 'utils/queries';
import SliceZone from 'components/BlogPost/SliceZone';
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

const SnippetPost = () => {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const { uid } = router.query;
  const { loading, error, data } = useQuery(GET_SNIPPETS, {
    variables: { uid },
  });

  useEffect(() => {
    // window is accessible here.
    setUrl(window.location.href);
  }, []);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;
  const snippet = data.allSnippets.edges[0].node;
  return (
    <Wrapper>
      <Title>
        <PrismicText field={snippet.title} />
      </Title>
      <SliceZone body={snippet.body} />
      <DisqusComments url={url} post={snippet} />
    </Wrapper>
  );
};

export default SnippetPost;

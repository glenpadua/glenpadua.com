import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_POST } from 'utils/queries';

import PageTitle from 'components/PageTitle';

const Wrapper = styled.article`
  width: 100%;
  max-width: 800px;
`;

const BlogPost = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { uid },
  });
  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;
  const post = data.allPosts.edges[0].node;
  return (
    <Wrapper>
      <PageTitle>{RichText.asText(post.title)}</PageTitle>
    </Wrapper>
  );
};

export default BlogPost;

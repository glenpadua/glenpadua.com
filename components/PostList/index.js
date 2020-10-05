import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import { format } from 'date-fns';

import { ALL_POSTS } from 'utils/queries';
import BlogItem from 'components/BlogItem';

const Wrapper = styled.ul`
  margin-top: 20px;
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Item = styled.li`
  width: 100%;
  margin: 20px 0;

  @media only screen and (min-width: 600px) {
    margin: 20px;
    max-width: 300px;
  }

  @media only screen and (min-width: 992px) {
    max-width: 300px;
    margin: 20px 30px;
  }
`;

const PostList = () => {
  const { loading, error, data } = useQuery(ALL_POSTS, {
    variables: {},
  });
  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;
  const { allPosts } = data;
  return (
    <Wrapper>
      {allPosts.edges.map(post => {
        const title = RichText.asText(post.node.title);
        const published = format(new Date(post.node.date), 'MMM d, yyyy');
        const preview = RichText.asText(post.node.preview);
        const image = post.node.cover_image.url;
        return (
          <Item key={post.node._meta.id}>
            <BlogItem
              img={image}
              title={title}
              published={published}
              preview={preview}
            />
          </Item>
        );
      })}
    </Wrapper>
  );
};

export default PostList;

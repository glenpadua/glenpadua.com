import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import { format } from 'date-fns';

import { GET_ALL_POSTS } from 'utils/queries';
import BlogItem from 'components/BlogItem';

const Wrapper = styled.ul`
  margin-top: 20px;
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

const Item = styled.li`
  width: 100%;
  margin: 10px 0;
  max-width: 800px;
`;

const PostList = ({ category }) => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS, {
    variables: category
      ? {
          where: { category },
        }
      : {},
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
        const uid = post.node._meta.uid;
        return (
          <Item key={post.node._meta.id}>
            <BlogItem
              uid={uid}
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

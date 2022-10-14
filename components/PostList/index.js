import styled from 'styled-components';
import * as prismicH from '@prismicio/helpers';
import { format } from 'date-fns';

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

const PostList = ({ posts, category }) => {
  const postsByCategory = category
    ? posts.filter(post => post.data.category === category)
    : posts;
  return (
    <Wrapper>
      {postsByCategory.map(({ data, id, uid, first_publication_date }) => {
        const title = prismicH.asText(data.title);
        const published = format(
          new Date(first_publication_date),
          'MMM d, yyyy'
        );
        const preview = prismicH.asText(data.preview);
        const image = data.cover_image.url;
        return (
          <Item key={id}>
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

import styled from 'styled-components';
import Layout from 'components/Layout';
import BlogPost from 'components/BlogPost';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

export default function BlogPostPage({ post }) {
  return (
    <Layout>
      <Wrapper>
        <BlogPost post={post} />
      </Wrapper>
    </Layout>
  );
}

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import PostList from 'components/PostList';
import { MainNav } from 'components/Header';
import { NavItem } from 'components/Header/MobileNav';
import { categories } from 'utils/helpers';
import { createClient } from 'prismicio';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Categories = styled.div`
  margin-top: 30px;

  @media only screen and (min-width: 600px) {
    margin-top: 50px;
  }
`;

const Nav = styled(MainNav)`
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  li {
    margin-bottom: 10px;
  }
`;

const Blog = ({ posts }) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <React.Fragment>
      <Head>
        <title>Blog</title>
      </Head>
      <Layout>
        <Wrapper>
          <PageTitle>
            Blog Posts{' '}
            <span role="img" aria-label="book">
              📖
            </span>
          </PageTitle>
          <Categories>
            <Nav>
              {categories.map(item => (
                <NavItem
                  key={item.name}
                  name={item.name}
                  url={item.url}
                  isActive={
                    (item.category === '' && !category) ||
                    item.category === category
                  }
                />
              ))}
            </Nav>
          </Categories>
          <PostList posts={posts} category={category} />
        </Wrapper>
      </Layout>
    </React.Fragment>
  );
};

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const posts = await client.getAllByType('post');
  return {
    props: {
      posts,
    },
  };
}

export default Blog;

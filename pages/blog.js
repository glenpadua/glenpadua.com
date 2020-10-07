import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import PostList from 'components/PostList';
import { GET_ALL_POSTS } from 'utils/queries';
import { initializeApollo } from 'lib/apolloClient';
import { MainNav } from 'components/Header';
import { NavItem } from 'components/Header/MobileNav';
import { categories } from 'utils/helpers';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Categories = styled.div`
  margin-top: 50px;
`;

const Blog = () => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <React.Fragment>
      <Head>
        <title>Blog</title>
      </Head>
      <Layout>
        <Wrapper>
          <PageTitle>Blog Posts</PageTitle>
          <Categories>
            <MainNav>
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
            </MainNav>
          </Categories>
          <PostList category={category} />
        </Wrapper>
      </Layout>
    </React.Fragment>
  );
};

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_POSTS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default Blog;

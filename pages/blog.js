import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import PostList from 'components/PostList';
import { GET_ALL_POSTS } from 'utils/queries';
import { initializeApollo } from 'lib/apolloClient';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Blog = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Blog</title>
      </Head>
      <Layout>
        <Wrapper>
          <PageTitle>Blog Posts</PageTitle>
          <PostList />
        </Wrapper>
      </Layout>
    </React.Fragment>
  );
};

export async function getStaticProps() {
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

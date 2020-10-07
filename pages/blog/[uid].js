import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import Layout from 'components/Layout';
import { GET_ALL_POST_UIDS, GET_POST } from 'utils/queries';
import { initializeApollo } from 'lib/apolloClient';
import BlogPost from 'components/BlogPost';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

export default function Post() {
  return (
    <React.Fragment>
      <Head>
        <title>Blog</title>
      </Head>
      <Layout>
        <Wrapper>
          <BlogPost />
        </Wrapper>
      </Layout>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_ALL_POST_UIDS,
  });

  return {
    paths: data.allPosts.edges.map(item => ({
      params: { uid: item.node._meta.uid },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const { uid } = params;

  await apolloClient.query({
    query: GET_POST,
    variables: {
      uid,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

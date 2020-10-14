import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import { GET_SNIPPETS } from 'utils/queries';
import { initializeApollo } from 'lib/apolloClient';
import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import SnippetList from 'components/SnippetList';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Snippets = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Snippets</title>
      </Head>
      <Layout>
        <Wrapper>
          <PageTitle>Tiny Posts</PageTitle>
          <SnippetList />
        </Wrapper>
      </Layout>
    </React.Fragment>
  );
};

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_SNIPPETS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default Snippets;

import styled from 'styled-components';
import Head from 'next/head';

import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
`;

const Snippets = () => {
  return (
    <>
      <Head>
        <title>Snippets</title>
      </Head>
      <Layout>
        <Wrapper>
          <PageTitle>Tiny Posts</PageTitle>
        </Wrapper>
      </Layout>
    </>
  );
};

export default Snippets;

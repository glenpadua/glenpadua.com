import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import Layout from 'components/Layout';
import BlogPost from 'components/BlogPost';
import { createClient } from '../../prismicio';
import * as prismicH from '@prismicio/helpers';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

export default function Post({ post }) {
  return (
    <React.Fragment>
      <Head>
        <title>Blog</title>
      </Head>
      <Layout>
        <Wrapper>
          <BlogPost post={post} />
        </Wrapper>
      </Layout>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const client = createClient();
  const posts = await client.getAllByType('post');
  return {
    paths: posts.map(post => prismicH.asLink(post)),
    fallback: false,
  };
}

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const post = await client.getByUID('post', params.uid);

  return {
    props: { post },
  };
}

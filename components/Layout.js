import { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

import { initGA, logPageView } from 'utils/analytics';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;

  @media only screen and (min-width: 1100px) {
    padding: 20px 40px;
  }
`;

const Info = styled.p`
  margin-top: 10px;
  font-size: 0.8em;
  opacity: 0.5;
  text-align: center;
`;

const Layout = props => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />

        <link rel="shortcut icon" href="/assets/favicon.ico" />
      </Head>
      <Wrapper>
        <Header />
        {props.children}
      </Wrapper>
      <Footer />
    </>
  );
};

export default Layout;

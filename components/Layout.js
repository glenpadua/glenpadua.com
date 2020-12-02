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
    <React.Fragment>
      <Head>
        <link rel="shortcut icon" href="/assets/favicon.ico" />
      </Head>
      <Wrapper>
        <Header />
        {props.children}
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;

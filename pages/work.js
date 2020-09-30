import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import FolioBlock from 'components/FolioBlock';
import { portfolioItems, SubHeading, Para } from 'utils/portfolio';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Portfolio = styled.div`
  display: flex;
  margin-top: 60px;
  justify-content: space-between;
`;

const PortfolioItems = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;

  @media only screen and (min-width: 600px) {
    width: 48%;
  }

  @media only screen and (min-width: 900px) {
    justify-content: space-around;
  }

  @media only screen and (min-width: 1100px) {
    justify-content: center;
  }
`;

const Extra = styled.div`
  display: none;
  width: 48%;
  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.75);
  padding: 20px;

  @media only screen and (min-width: 600px) {
    display: block;
    background: #fff;
  }
`;

const Work = () => {
  return (
    <>
      <Head>
        <title>Work</title>
      </Head>
      <Layout>
        <Wrapper>
          <PageTitle>Stuff I've Done</PageTitle>
          <Portfolio>
            <PortfolioItems>
              {portfolioItems.map(portfolio => (
                <FolioBlock
                  key={portfolio.id}
                  title={portfolio.title}
                  tags={portfolio.tags}
                  links={portfolio.links}
                >
                  {portfolio.children}
                </FolioBlock>
              ))}
            </PortfolioItems>
            <Extra>
              <SubHeading>My Journey so Far</SubHeading>
              <Para>
                I started off my Web Developer journey in college where I built
                websites for internal college activities.
              </Para>
              <Para>
                Right after college I had a small stint as a Performance
                Engineer for Cognizant where I tested and tuned the performance
                of Walt Disney Parks and Resorts applications.
              </Para>
              <Para>
                I left then to co-found a remote startup called Zephony where we
                built custom web applications like CRMs and E-commerce for
                clients all over the world. I worked as the sole Frontend
                Developer and built SPAs using React.
              </Para>
              <Para>
                I currently work as a Frontend Engineer for Synup where we build
                and ship features to our ever growing SaaS product.
              </Para>
            </Extra>
          </Portfolio>
        </Wrapper>
      </Layout>
    </>
  );
};

export default Work;

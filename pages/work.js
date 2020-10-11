import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import FolioBlock from 'components/FolioBlock';
import Timeline from 'components/Timeline';
import { portfolioItems } from 'utils/portfolio';
import { timelineItems } from 'utils/timeline';

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
  max-height: 500px;
  align-items: flex-start;

  @media only screen and (min-width: 600px) {
    width: 49%;
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
  width: 49%;

  @media only screen and (min-width: 600px) {
    display: block;
  }
`;

const Work = () => {
  const [currentlyOpen, setCurrentlyOpen] = useState(0);
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
              {portfolioItems.map(portfolio => {
                return (
                  (currentlyOpen === 0 || portfolio.id === currentlyOpen) && (
                    <FolioBlock
                      key={portfolio.id}
                      portfolio={portfolio}
                      currentlyOpen={currentlyOpen}
                      setCurrentlyOpen={setCurrentlyOpen}
                    >
                      {portfolio.children}
                    </FolioBlock>
                  )
                );
              })}
            </PortfolioItems>
            <Extra>
              <Timeline items={timelineItems} />
            </Extra>
          </Portfolio>
        </Wrapper>
      </Layout>
    </>
  );
};

export default Work;

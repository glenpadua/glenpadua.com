import styled from 'styled-components';
import Head from 'next/head';

import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import AboutCard from 'components/AboutCard';
import { aboutCards } from 'utils/helpers';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
`;

const Cards = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const CardWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 20px 0;

  @media only screen and (min-width: 600px) {
    margin: 20px;
  }

  @media only screen and (min-width: 992px) {
    max-width: 350px;
    margin: 20px;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Wrapper>
          <PageTitle>
            Hello I'm Glen!{' '}
            <span role="img" aria-label="hand-wave">
              👋
            </span>
          </PageTitle>
          <Cards>
            {aboutCards.map(item => (
              <CardWrapper key={item.id}>
                <AboutCard {...item} />
              </CardWrapper>
            ))}
          </Cards>
        </Wrapper>
      </Layout>
    </>
  );
}

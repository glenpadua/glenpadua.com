import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import CardDeck from 'components/CardDeck';
import SkillCard from 'components/SkillCard';
import { frontendCards } from 'utils/helpers';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Decks = styled.div`
  width: 100%;
  margin-top: 50px;

  @media only screen and (min-width: 600px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Section = styled.section`
  padding: 10px;
  margin-bottom: 60px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 992px) {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &:nth-child(2) {
      flex-direction: row-reverse;
    }
  }
`;

const Deck = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-weight: 400;

  @media only screen and (min-width: 601px) {
    font-size: 1.8em;
  }
`;

const Info = styled.div`
  @media only screen and (min-width: 992px) {
    width: 40%;
  }
`;

const SelectedCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    display: block;
  }

  p {
    font-size: 1.1em;
    margin-top: 30px;
  }

  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const Quote = styled.p`
  font-weight: 300;
  font-size: 0.9em;

  @media only screen and (min-width: 600px) {
    font-size: 1.2em;
  }
`;

const Skills = () => {
  const [selectedFrontendCard, setSelectedCard] = useState(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <>
      <Head>
        <title>Skills</title>
      </Head>
      <Layout>
        <Wrapper>
          <PageTitle>My Deck of Skills</PageTitle>
          <Decks>
            <Section>
              <Deck>
                <CardDeck
                  cards={frontendCards}
                  onCardClick={card => setSelectedCard(card)}
                />
                <Title>FRONTEND DECK</Title>
              </Deck>
              <Info>
                {selectedFrontendCard && width > 992 ? (
                  <SelectedCard>
                    <SkillCard {...selectedFrontendCard} />
                    <p>
                      Something interesting about this skill that I've done in a
                      few words that will really hit home with whoever reads it.
                    </p>
                  </SelectedCard>
                ) : (
                  <Quote>
                    <i>
                      “Cards are power; learn to harness that power, and you
                      will be forever rewarded."
                    </i>{' '}
                    - James Swain
                  </Quote>
                )}
              </Info>
            </Section>
            <Section>
              <Deck>
                <CardDeck
                  cards={frontendCards}
                  onCardClick={card => setSelectedCard(card)}
                />
                <Title>TECH DECK</Title>
              </Deck>
              <Info>
                {selectedFrontendCard && width > 992 ? (
                  <SelectedCard>
                    <SkillCard {...selectedFrontendCard} />
                    <p>
                      Something interesting about this skill that I've done in a
                      few words that will really hit home with whoever reads it.
                    </p>
                  </SelectedCard>
                ) : (
                  <Quote>
                    <i>
                      "Life is like a game of cards. The hand you are dealt is
                      determinism; the way you play it is free will."
                    </i>{' '}
                    - Jawaharlal Nehru
                  </Quote>
                )}
              </Info>
            </Section>
          </Decks>
        </Wrapper>
      </Layout>
    </>
  );
};

export default Skills;

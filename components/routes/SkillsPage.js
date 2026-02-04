'use client';

import { useState } from 'react';
import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import CardDeck from 'components/CardDeck';
import SkillCard from 'components/SkillCard';
import { frontendCards, otherCards } from 'utils/helpers';

const quoteClassName = 'text-[0.9em] font-light min-[600px]:text-[1.2em]';

export default function SkillsPage() {
  const [selectedFrontendCard, setSelectedFrontendCard] = useState(null);
  const [selectedOtherCard, setSelectedOtherCard] = useState(null);

  return (
    <Layout>
      <div className="mt-[30px] w-full">
        <PageTitle>
          My Deck of Skills{' '}
          <span role="img" aria-label="clubs">
            ♣
          </span>
        </PageTitle>

        <div className="mt-[50px] w-full min-[600px]:flex min-[600px]:flex-wrap min-[600px]:justify-center">
          <section className="mb-[60px] flex flex-col items-center px-2.5 text-center lg:w-[90%] lg:flex-row lg:justify-between">
            <div className="mb-5">
              <CardDeck
                cards={frontendCards}
                onCardClick={card => setSelectedFrontendCard(card)}
              />
              <h2 className="text-[1.8em] font-normal max-[600px]:text-[1.4em]">
                FRONTEND DECK
              </h2>
            </div>

            <div className="lg:w-[40%]">
              {selectedFrontendCard ? (
                <>
                  <div className="hidden flex-col items-center lg:flex">
                    <SkillCard
                      {...selectedFrontendCard}
                      onClick={() => setSelectedFrontendCard(null)}
                    />
                    <p className="mt-[30px] text-[1.1em]">{selectedFrontendCard.desc}</p>
                  </div>
                  <p className={`lg:hidden ${quoteClassName}`}>
                    <i>
                      “Cards are power; learn to harness that power, and you will be
                      forever rewarded."
                    </i>{' '}
                    - James Swain
                  </p>
                </>
              ) : (
                <p className={quoteClassName}>
                  <i>
                    “Cards are power; learn to harness that power, and you will be
                    forever rewarded."
                  </i>{' '}
                  - James Swain
                </p>
              )}
            </div>
          </section>

          <section className="mb-[60px] flex flex-col items-center px-2.5 text-center lg:w-[90%] lg:flex-row-reverse lg:justify-between">
            <div className="mb-5">
              <CardDeck
                cards={otherCards}
                onCardClick={card => setSelectedOtherCard(card)}
              />
              <h2 className="text-[1.8em] font-normal max-[600px]:text-[1.4em]">
                TECH DECK
              </h2>
            </div>

            <div className="lg:w-[40%]">
              {selectedOtherCard ? (
                <>
                  <div className="hidden flex-col items-center lg:flex">
                    <SkillCard
                      {...selectedOtherCard}
                      onClick={() => setSelectedOtherCard(null)}
                    />
                    <p className="mt-[30px] text-[1.1em]">{selectedOtherCard.desc}</p>
                  </div>
                  <p className={`lg:hidden ${quoteClassName}`}>
                    <i>
                      "Life is like a game of cards. The hand you are dealt is
                      determinism; the way you play it is free will."
                    </i>{' '}
                    - Jawaharlal Nehru
                  </p>
                </>
              ) : (
                <p className={quoteClassName}>
                  <i>
                    "Life is like a game of cards. The hand you are dealt is
                    determinism; the way you play it is free will."
                  </i>{' '}
                  - Jawaharlal Nehru
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

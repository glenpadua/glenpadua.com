'use client';

import { useState } from 'react';
import { PageTitle } from '@/app/components/layout/page-title';
import { CardDeck } from '@/app/skills/_components/card-deck';
import { SkillCard } from '@/app/skills/_components/skill-card';
import { frontendCards, otherCards } from '@/data/skill-cards';
import type { SkillCardItem } from '@/types/content';

const quoteClassName = 'text-[0.9em] font-light min-[600px]:text-[1.2em]';

export function SkillsContent(): JSX.Element {
  const [selectedFrontendCard, setSelectedFrontendCard] =
    useState<SkillCardItem | null>(null);
  const [selectedOtherCard, setSelectedOtherCard] =
    useState<SkillCardItem | null>(null);

  return (
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
                    text={selectedFrontendCard.text}
                    logo={selectedFrontendCard.logo}
                    color={selectedFrontendCard.color}
                    filter={selectedFrontendCard.filter}
                    onClick={() => setSelectedFrontendCard(null)}
                  />
                  <p className="mt-[30px] text-[1.1em]">
                    {selectedFrontendCard.desc}
                  </p>
                </div>
                <p className={`lg:hidden ${quoteClassName}`}>
                  <i>
                    Cards are power; learn to harness that power, and you will
                    be forever rewarded.
                  </i>{' '}
                  - James Swain
                </p>
              </>
            ) : (
              <p className={quoteClassName}>
                <i>
                  Cards are power; learn to harness that power, and you will be
                  forever rewarded.
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
                    text={selectedOtherCard.text}
                    logo={selectedOtherCard.logo}
                    color={selectedOtherCard.color}
                    filter={selectedOtherCard.filter}
                    onClick={() => setSelectedOtherCard(null)}
                  />
                  <p className="mt-[30px] text-[1.1em]">
                    {selectedOtherCard.desc}
                  </p>
                </div>
                <p className={`lg:hidden ${quoteClassName}`}>
                  <i>
                    Life is like a game of cards. The hand you are dealt is
                    determinism; the way you play it is free will.
                  </i>{' '}
                  - Jawaharlal Nehru
                </p>
              </>
            ) : (
              <p className={quoteClassName}>
                <i>
                  Life is like a game of cards. The hand you are dealt is
                  determinism; the way you play it is free will.
                </i>{' '}
                - Jawaharlal Nehru
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

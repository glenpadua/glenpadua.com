'use client';

import { useEffect, useMemo, useState } from 'react';
import type { SkillCardItem } from '@/types/content';
import { SkillCard } from '@/app/skills/_components/skill-card';

function getCardStyle(
  index: number,
  isMobile: boolean,
): { transform: string; left: string } {
  const translateX = isMobile ? index * 16 : index * 30;
  const angle = isMobile ? -15 + index * 5 : -32 + index * 8;
  const left = isMobile ? index * 6 : index * 10;

  return {
    transform: `translate(${translateX}px, 0px) rotate(${angle}deg)`,
    left: `${left}px`,
  };
}

interface CardDeckProps {
  cards: SkillCardItem[];
  onCardClick: (card: SkillCardItem) => void;
}

export function CardDeck({ cards, onCardClick }: CardDeckProps): JSX.Element {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const syncWidth = () => setWidth(window.innerWidth);
    syncWidth();
    window.addEventListener('resize', syncWidth);
    return () => window.removeEventListener('resize', syncWidth);
  }, []);

  const isMobile = width <= 600;

  const cardStyles = useMemo(
    () => cards.map((_, index) => getCardStyle(index, isMobile)),
    [cards, isMobile],
  );

  return (
    <ul className="relative h-[200px] w-[260px] list-none sm:h-[340px] sm:w-[450px]">
      {cards.map((card, index) => (
        <li
          key={card.id}
          className="absolute top-0 transition-[top] duration-200 hover:-top-[30px]"
          style={cardStyles[index]}
        >
          <SkillCard
            text={card.text}
            logo={card.logo}
            color={card.color}
            filter={card.filter}
            onClick={() => onCardClick(card)}
          />
        </li>
      ))}
    </ul>
  );
}

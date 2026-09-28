'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { aboutIconMap } from '@/data/icon-maps';
import type { AboutCardItem } from '@/types/content';

const transitionDuration = '0.4s';

function renderInfo({
  infoSegments = [],
  infoItalic,
  infoClassName,
}: AboutCardItem): JSX.Element {
  const content = infoSegments.map((segment, index) => (
    <span
      key={`${segment.text}-${index}`}
      className={segment.bold ? 'font-bold' : undefined}
    >
      {segment.text}
    </span>
  ));

  const base = (
    <span className={cn('text-inherit', infoClassName)}>{content}</span>
  );

  return infoItalic ? <i>{base}</i> : base;
}

export function AboutCard(props: AboutCardItem): JSX.Element {
  const { title, iconKey, color, link, href } = props;
  const Icon = aboutIconMap[iconKey];

  const content = (
    <motion.div
      className="group relative flex h-[220px] w-full cursor-pointer flex-col items-center justify-between overflow-hidden rounded-[10px] bg-white pb-0 pt-5 text-[#4c5656] shadow-card transition-all"
      whileHover={{ y: -5, scale: 1.005 }}
      style={{ transitionDuration }}
    >
      <h3 className="z-[2] m-0 px-2.5 text-[1.3em] font-medium transition-colors duration-300 max-md:text-[1.1em] group-hover:text-white">
        {title}
      </h3>

      <div
        className="absolute top-1/2 z-0 h-[70px] w-[70px] -translate-y-1/2 rounded-full transition-transform duration-300 group-hover:scale-[8]"
        style={{ background: color }}
      />

      <div className="absolute top-1/2 z-[1] flex h-[70px] w-[70px] -translate-y-1/2 items-center justify-center rounded-full">
        <span className="absolute top-1/2 z-[2] h-[35px] -translate-y-1/2 text-[35px] text-white transition-all duration-300 group-hover:text-[45px]">
          {Icon ? <Icon /> : null}
        </span>
      </div>

      <div className="z-[2] mb-5 px-2.5 text-center text-[0.85em] font-light text-inherit transition-colors duration-300 md:text-base group-hover:text-white">
        {renderInfo(props)}
      </div>
    </motion.div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}

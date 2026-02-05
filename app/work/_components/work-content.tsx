'use client';

import { useState } from 'react';
import { PageTitle } from '@/app/components/layout/page-title';
import { Timeline } from '@/app/components/shared/timeline';
import { FolioBlock } from '@/app/work/_components/folio-block';
import { portfolioItems } from '@/data/portfolio-items';
import { timelineItems } from '@/data/timeline-items';

export function WorkContent(): JSX.Element {
  const [currentlyOpen, setCurrentlyOpen] = useState(0);

  return (
    <div className="mt-[30px] w-full">
      <PageTitle>
        Stuff I&apos;ve Done{' '}
        <span role="img" aria-label="laptop">
          💻
        </span>{' '}
      </PageTitle>

      <div className="mt-[60px] min-[900px]:flex min-[900px]:justify-between">
        <div className="relative flex w-full flex-wrap items-start justify-center min-[900px]:max-h-[500px] min-[900px]:w-[49%]">
          {portfolioItems.map(portfolio => {
            if (currentlyOpen !== 0 && portfolio.id !== currentlyOpen) {
              return null;
            }

            return (
              <FolioBlock
                key={portfolio.id}
                portfolio={portfolio}
                setCurrentlyOpen={setCurrentlyOpen}
              />
            );
          })}
        </div>

        <div className="mt-[200px] hidden min-[500px]:block min-[730px]:mt-0 min-[900px]:mt-0 min-[900px]:w-[49%]">
          <Timeline items={timelineItems} />
        </div>
      </div>
    </div>
  );
}

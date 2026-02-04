'use client';

import { useState } from 'react';
import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import FolioBlock from 'components/FolioBlock';
import Timeline from 'components/Timeline';
import { portfolioItems } from 'utils/portfolio';
import { timelineItems } from 'utils/timeline';

export default function WorkPage() {
  const [currentlyOpen, setCurrentlyOpen] = useState(0);

  return (
    <Layout>
      <div className="mt-[30px] w-full">
        <PageTitle>
          Stuff I've Done{' '}
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
    </Layout>
  );
}

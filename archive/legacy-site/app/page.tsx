import { SiteLayout } from '@/app/components/layout/site-layout';
import { PageTitle } from '@/app/components/layout/page-title';
import { AboutCard } from '@/app/_components/about-card';
import { aboutCards } from '@/data/about-cards';

export const metadata = {
  title: 'Home',
};

export default function Page(): JSX.Element {
  return (
    <SiteLayout>
      <div className="mt-[30px] w-full text-center">
        <PageTitle>
          Hello I&apos;m Glen!
          <span role="img" aria-label="hand-wave">
            👋
          </span>
        </PageTitle>

        <section className="mt-5 flex w-full flex-wrap justify-center">
          {aboutCards.map(item => (
            <div
              key={item.id}
              className="my-5 w-full max-w-[300px] min-[600px]:mx-5 lg:max-w-[350px]"
            >
              <AboutCard {...item} />
            </div>
          ))}
        </section>
      </div>
    </SiteLayout>
  );
}

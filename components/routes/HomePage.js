import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import AboutCard from 'components/AboutCard';
import { aboutCards } from 'utils/helpers';

export default function HomePage() {
  return (
    <Layout>
      <div className="mt-[30px] w-full text-center">
        <PageTitle>
          Hello I'm Glen!
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
    </Layout>
  );
}

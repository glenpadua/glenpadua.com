import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import PostList from 'components/PostList';
import { NavItem } from 'components/Header/MobileNav';
import { categories } from 'utils/helpers';

export default function BlogPage({ posts, category }) {
  return (
    <Layout>
      <div className="mt-[30px] flex w-full flex-col items-center">
        <PageTitle>
          Blog Posts{' '}
          <span role="img" aria-label="book">
            📖
          </span>
        </PageTitle>

        <div className="mt-[30px] min-[600px]:mt-[50px]">
          <ul className="flex list-none flex-wrap justify-center gap-x-8 gap-y-2.5">
            {categories.map(item => (
              <li key={item.name}>
                <NavItem
                  name={item.name}
                  url={item.url}
                  isActive={
                    (item.category === '' && !category) || item.category === category
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        <PostList posts={posts} category={category} />
      </div>
    </Layout>
  );
}

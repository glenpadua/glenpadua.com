import { PageTitle } from '@/app/components/layout/page-title';
import { NavItem } from '@/app/components/layout/nav-item';
import { PostList } from '@/app/blog/_components/post-list';
import { categories } from '@/data/blog-categories';
import type { BlogPostDocument } from '@/types/content';

interface BlogPageProps {
  posts: BlogPostDocument[];
  category: string;
}

export function BlogPage({ posts, category }: BlogPageProps): JSX.Element {
  return (
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
                  (item.category === '' && !category) ||
                  item.category === category
                }
              />
            </li>
          ))}
        </ul>
      </div>

      <PostList posts={posts} category={category} />
    </div>
  );
}

import BlogPage from 'components/routes/BlogPage';
import { createClient } from 'prismicio';

export const metadata = {
  title: 'Blog',
};

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams?.category;
  const category =
    typeof categoryParam === 'string'
      ? categoryParam
      : Array.isArray(categoryParam)
        ? categoryParam[0]
        : '';

  const client = createClient();
  const posts = await client.getAllByType('post');

  return <BlogPage posts={posts} category={category} />;
}

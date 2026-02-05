import { SiteLayout } from '@/app/components/layout/site-layout';
import { BlogPage } from '@/app/blog/_components/blog-page';
import { createClient } from '@/lib/prismic';
import type { BlogPostDocument } from '@/types/content';

export const metadata = {
  title: 'Blog',
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

export default async function Page({
  searchParams,
}: BlogPageProps): Promise<JSX.Element> {
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams?.category;
  const category =
    typeof categoryParam === 'string'
      ? categoryParam
      : Array.isArray(categoryParam)
        ? categoryParam[0]
        : '';

  const client = createClient();
  const posts = (await client.getAllByType(
    'post',
  )) as unknown as BlogPostDocument[];

  return (
    <SiteLayout>
      <BlogPage posts={posts} category={category} />
    </SiteLayout>
  );
}

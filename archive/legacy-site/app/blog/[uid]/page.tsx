import { cache } from 'react';
import type { Metadata } from 'next';
import * as prismicH from '@prismicio/helpers';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/app/components/layout/site-layout';
import { BlogPostPage } from '@/app/blog/_components/blog-post-page';
import { createClient } from '@/lib/prismic';
import type { BlogPostDocument } from '@/types/content';

const getPost = cache(async (uid: string): Promise<BlogPostDocument | null> => {
  const client = createClient();

  try {
    return (await client.getByUID('post', uid)) as unknown as BlogPostDocument;
  } catch {
    return null;
  }
});

export async function generateStaticParams(): Promise<Array<{ uid: string }>> {
  const client = createClient();
  const posts = (await client.getAllByType(
    'post',
  )) as unknown as BlogPostDocument[];

  return posts
    .filter(post => Boolean(post.uid))
    .map(post => ({ uid: post.uid as string }));
}

interface MetadataProps {
  params: Promise<{ uid: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.uid);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: prismicH.asText(post.data?.title as never) || 'Blog',
    description: prismicH.asText((post.data?.preview ?? null) as never) || '',
  };
}

interface BlogPostRouteProps {
  params: Promise<{ uid: string }>;
}

export default async function Page({
  params,
}: BlogPostRouteProps): Promise<JSX.Element> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.uid);

  if (!post) {
    notFound();
  }

  return (
    <SiteLayout>
      <BlogPostPage post={post} />
    </SiteLayout>
  );
}

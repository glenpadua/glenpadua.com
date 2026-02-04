import { cache } from 'react';
import * as prismicH from '@prismicio/helpers';
import { notFound } from 'next/navigation';
import BlogPostPage from 'components/routes/BlogPostPage';
import { createClient } from 'prismicio';

const getPost = cache(async uid => {
  const client = createClient();

  try {
    return await client.getByUID('post', uid);
  } catch {
    return null;
  }
});

export async function generateStaticParams() {
  const client = createClient();
  const posts = await client.getAllByType('post');

  return posts
    .filter(post => Boolean(post.uid))
    .map(post => ({ uid: post.uid }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.uid);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: prismicH.asText(post.data?.title) || 'Blog',
    description: prismicH.asText(post.data?.preview) || '',
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.uid);

  if (!post) {
    notFound();
  }

  return <BlogPostPage post={post} />;
}

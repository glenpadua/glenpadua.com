import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/features/diorama/articles/article-page';
import {
  loadArticle,
  loadArticleIndex,
} from '@/features/diorama/articles/load-articles';

export const revalidate = 3600;
type Props = { params: Promise<{ uid: string }> };

export async function generateStaticParams(): Promise<Array<{ uid: string }>> {
  return (await loadArticleIndex()).map(({ uid }) => ({ uid }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await loadArticle((await params).uid);
  return {
    title: article?.title || 'Page not found',
    description: article?.description,
    robots: { index: false, follow: false },
    ...(article && {
      alternates: { canonical: `https://glenpadua.com/blog/${article.uid}` },
    }),
  };
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const article = await loadArticle((await params).uid);
  if (!article) notFound();
  return <ArticlePage article={article} articles={await loadArticleIndex()} />;
}

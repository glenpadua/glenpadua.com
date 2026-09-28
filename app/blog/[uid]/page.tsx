import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/features/diorama/articles/article-page';
import { getArticleCover } from '@/features/diorama/articles/covers';
import {
  loadArticle,
  loadArticleIndex,
} from '@/features/diorama/articles/load-articles';
import { pageMetadata } from '@/features/diorama/lib/metadata';
import { articleHref } from '@/features/diorama/lib/routes';
import { site } from '@/features/diorama/data/site';

export const revalidate = 3600;
type Props = { params: Promise<{ uid: string }> };

export async function generateStaticParams(): Promise<Array<{ uid: string }>> {
  return (await loadArticleIndex()).map(({ uid }) => ({ uid }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await loadArticle((await params).uid);
  if (!article) return { title: 'Page not found' };
  const cover = getArticleCover(article.uid);
  return pageMetadata({
    title: article.title,
    description: article.description || site.description,
    path: articleHref(article.uid),
    image: { url: cover.shareSrc, width: 1200, height: 630, alt: cover.alt },
    openGraph: {
      type: 'article',
      publishedTime: article.date,
      authors: [site.url],
    },
  });
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const article = await loadArticle((await params).uid);
  if (!article) notFound();
  const posting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description || undefined,
    datePublished: article.date,
    image: `${site.url}${getArticleCover(article.uid).shareSrc}`,
    url: `${site.url}${articleHref(article.uid)}`,
    author: { '@type': 'Person', name: site.name, url: site.url },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(posting) }}
      />
      <ArticlePage article={article} articles={await loadArticleIndex()} />
    </>
  );
}

import type { MetadataRoute } from 'next';
import { site } from '@/features/diorama/data/site';
import { worldRoutes, articleHref } from '@/features/diorama/lib/routes';
import { loadArticleIndex } from '@/features/diorama/articles/load-articles';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [worldRoutes.home, worldRoutes.work, worldRoutes.writing].map(
    path => ({ url: `${site.url}${path === '/' ? '' : path}` }),
  );
  const articles = (await loadArticleIndex()).map(article => ({
    url: `${site.url}${articleHref(article.uid)}`,
    lastModified: article.date,
  }));
  return [...pages, ...articles];
}

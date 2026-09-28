import type { Metadata } from 'next';
import { site } from '../data/site';

interface PageMetadata {
  title: string;
  description: string;
  /** The page's own public path, used for its canonical URL. */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  /** Extra Open Graph fields, such as an article's publication date. */
  openGraph?: Metadata['openGraph'];
  /** Use the title as-is instead of the site's “%s — Glen Padua” template. */
  absoluteTitle?: boolean;
}

/**
 * One page's search and sharing metadata. Open Graph and Twitter images are
 * set on every page because Next.js replaces, rather than merges, a parent's
 * `openGraph` when a page declares its own.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = site.image,
  openGraph,
  absoluteTitle = false,
}: PageMetadata): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_GB',
      url: path,
      title: fullTitle,
      description,
      images: [image],
      ...openGraph,
    } as Metadata['openGraph'],
    twitter: {
      card: 'summary_large_image',
      creator: site.twitter,
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}

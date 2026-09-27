import { cache } from 'react';
import { asText, NotFoundError, type PrismicDocument } from '@prismicio/client';
import { createClient } from '@/lib/prismic';
import type { Article, ArticleSlice } from './model';

function toArticle(post: PrismicDocument): Article {
  const body = post.data.body ?? [];
  for (const slice of body) {
    if (!['text', 'quote', 'image_with_caption'].includes(slice.slice_type)) {
      throw new Error(
        `Unsupported article slice in ${post.uid}: ${slice.slice_type}`,
      );
    }
  }
  return {
    id: post.id,
    uid: post.uid!,
    title: asText(post.data.title) || post.uid!,
    description: asText(post.data.preview) || '',
    date: post.data.date || post.first_publication_date.slice(0, 10),
    category: post.data.category || '',
    body: body as ArticleSlice[],
  };
}

export const loadArticleIndex = cache(async (): Promise<Article[]> => {
  const posts = await createClient().getAllByType('post');
  return posts
    .filter(post => post.uid)
    .map(toArticle)
    .sort((a, b) => a.date.localeCompare(b.date));
});

export const loadArticle = cache(
  async (uid: string): Promise<Article | null> => {
    try {
      return toArticle(await createClient().getByUID('post', uid));
    } catch (error) {
      if (error instanceof NotFoundError) return null;
      // A CMS outage is not a missing article, nor a reason to omit its content.
      throw error;
    }
  },
);

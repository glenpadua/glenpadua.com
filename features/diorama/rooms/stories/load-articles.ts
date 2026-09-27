import { asText } from '@prismicio/client';
import { createClient } from '@/lib/prismic';
import { deskArticles, type DeskArticle } from './content';

export async function loadArticles(): Promise<DeskArticle[]> {
  let articles: DeskArticle[] = [...deskArticles];
  try {
    const posts = await createClient().getAllByType('post');
    const fresh = posts
      .filter(p => p.uid)
      .map(post => {
        const known = deskArticles.find(article => article.uid === post.uid);
        return {
          uid: post.uid!,
          title: asText(post.data.title) || known?.title || post.uid!,
          date: post.data.date || known?.date || '',
          category: known?.category || String(post.data.category || 'Stories'),
          note: known?.note || '',
          art: known?.art || 'lake-static',
        };
      });
    articles = [...fresh].sort((a, b) => {
      const ai = deskArticles.findIndex(x => x.uid === a.uid),
        bi = deskArticles.findIndex(x => x.uid === b.uid);
      return (
        (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi) ||
        b.date.localeCompare(a.date)
      );
    });
    if (!articles.length) articles = [...deskArticles];
  } catch {
    /* Known real posts remain readable during CMS outages. */
  }
  return articles;
}

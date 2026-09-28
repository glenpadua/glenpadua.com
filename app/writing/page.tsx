import { WritingRoom } from '@/features/diorama/rooms/writing/writing-room';
import { loadArticles } from '@/features/diorama/rooms/writing/load-articles';
import { pageMetadata } from '@/features/diorama/lib/metadata';

export const metadata = pageMetadata({
  title: 'Writing — a few loose pages',
  description:
    'Stories, opinions, tech and the occasional change of mind. From Glen Padua’s writing desk.',
  path: '/writing',
});

export const revalidate = 3600;

export default async function Writing(): Promise<JSX.Element> {
  return <WritingRoom articles={await loadArticles()} />;
}

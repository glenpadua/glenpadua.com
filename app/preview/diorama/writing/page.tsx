import { WritingRoom } from '@/features/diorama/rooms/writing/writing-room';
import { loadArticles } from '@/features/diorama/rooms/writing/load-articles';
export const metadata = {
  title: 'Writing — a few loose pages',
  description:
    'Stories, opinions, tech and the occasional change of mind. From Glen Padua’s writing desk.',
};
export const revalidate = 3600;
export default async function WritingPreview(): Promise<JSX.Element> {
  return <WritingRoom articles={await loadArticles()} />;
}

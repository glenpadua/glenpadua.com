import { StoriesRoom } from '@/features/diorama/rooms/stories/stories-room';
import { loadArticles } from '@/features/diorama/rooms/stories/load-articles';
export const metadata = {
  title: 'Stories — a few loose pages',
  description:
    'Stories, opinions, and the occasional change of mind. From Glen Padua’s writing desk.',
};
export const revalidate = 3600;
export default async function StoriesPreview(): Promise<JSX.Element> {
  return <StoriesRoom articles={await loadArticles()} />;
}

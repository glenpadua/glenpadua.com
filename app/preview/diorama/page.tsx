import type { Metadata } from 'next';
import { WorldJourney } from '@/features/diorama/screens/world-journey';
import { worldScenes } from '@/features/diorama/data/scenes';

export const metadata: Metadata = {
  title: 'A little world — Glen Padua',
  description:
    'Glen Padua. A lake, a beach, a few stories, and the things I make.',
  robots: { index: false, follow: false },
};

export default function DioramaPreview(): JSX.Element {
  return <WorldJourney scenes={worldScenes} />;
}

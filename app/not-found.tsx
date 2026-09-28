import type { Metadata } from 'next';
import { LostPage } from '@/features/diorama/screens/lost-page';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound(): JSX.Element {
  return <LostPage />;
}

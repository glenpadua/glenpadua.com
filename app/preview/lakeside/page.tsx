import type { Metadata } from 'next';
import { LakesideScene } from './_components/lakeside-scene';
import './scene.css';

export const metadata: Metadata = {
  title: 'A little room to explore — Glen Padua',
  description:
    'An engineer, a curious mind, and a work in progress. Step into a small illustrated world by Glen Padua.',
  robots: { index: false, follow: false },
};

export default function LakesidePage(): JSX.Element {
  return <LakesideScene />;
}

import type { Metadata } from 'next';
import { CoastScene } from '../_components/coast-scene';
import { FieldNote } from '../lakeside/_components/lakeside-scene';
import { SceneMotionProvider } from '../_components/scene-motion';
import '../lakeside/scene.css';
import '../diorama/journey.css';

export const metadata: Metadata = {
  title: 'The coast — Glen Padua',
  robots: { index: false, follow: false },
};

export default function CoastPreview(): JSX.Element {
  return (
    <SceneMotionProvider>
      <main className="lakeside-page">
        <CoastScene standalone />
        <FieldNote />
      </main>
    </SceneMotionProvider>
  );
}

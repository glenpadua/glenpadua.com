import type { Metadata } from 'next';
import {
  LakesideChapter,
  FieldNote,
} from '../lakeside/_components/lakeside-scene';
import { CoastScene } from '../_components/coast-scene';
import { SceneMotionProvider } from '../_components/scene-motion';
import '../lakeside/scene.css';
import './journey.css';

export const metadata: Metadata = {
  title: 'A little room to explore — Glen Padua',
  description: 'Two small worlds, a little movement, and room to explore.',
  robots: { index: false, follow: false },
};

export default function DioramaPreview(): JSX.Element {
  return (
    <SceneMotionProvider>
      <main className="lakeside-page diorama-journey">
        <LakesideChapter connected />
        <section className="scene-passage" aria-label="Between chapters">
          <span className="passage-line" aria-hidden="true" />
          <p>
            Sometimes, a change of scenery
            <br />
            is all it takes.
          </p>
          <a href="#coast">
            ON TO THE COAST <span aria-hidden="true">↓</span>
          </a>
        </section>
        <CoastScene />
        <FieldNote />
      </main>
    </SceneMotionProvider>
  );
}

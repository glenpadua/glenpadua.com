import type { ReactNode } from 'react';
import { SceneMotionProvider } from './shared/scene-motion';
import { WorldShell } from './shared/world-shell';
import './styles/index.css';

/** Route-independent layout: the preview route alone supplies noindex metadata. */
export function WorldLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <SceneMotionProvider>
      <WorldShell>{children}</WorldShell>
    </SceneMotionProvider>
  );
}

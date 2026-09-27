import type { ReactNode } from 'react';
import { SceneMotionProvider } from './shared/scene-motion';
import { WorldShell } from './shared/world-shell';
import './styles/index.css';

// First-paint faces: headings, the italic signature and body text. Preloading
// keeps full page loads (and their view transitions) from flashing fallbacks.
const fonts = [
  'lora-normal-latin',
  'lora-italic-latin',
  'nunito-sans-normal-latin',
];

/** Route-independent layout: the preview route alone supplies noindex metadata. */
export function WorldLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <SceneMotionProvider>
      {fonts.map(font => (
        <link
          key={font}
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href={`/assets/fonts/diorama/${font}.woff2`}
        />
      ))}
      <WorldShell>{children}</WorldShell>
    </SceneMotionProvider>
  );
}

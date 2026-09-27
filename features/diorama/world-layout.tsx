import type { ReactNode } from 'react';
import { SceneMotionProvider } from './shared/scene-motion';
import { WorldShell } from './shared/world-shell';
import { worldRoutes } from './lib/routes';
import './styles/index.css';

// First-paint faces: headings, the italic signature and body text. Preloading
// keeps full page loads (and their view transitions) from flashing fallbacks.
const fonts = [
  'lora-normal-latin',
  'lora-italic-latin',
  'nunito-sans-normal-latin',
];

/*
 * Runs while the page is still parsing, before first paint. Arriving at the
 * writing desk from an article (link or browser Back) adds a head style so the
 * papers are already on the desk: no deal-in, and the returning cover's view
 * transition lands on a paper that is not moving. Layouts persist across
 * client navigation, so this runs once per full page load.
 */
const arrival = `(function(){try{
var n=window.navigation,f=(n&&n.activation&&n.activation.from&&n.activation.from.url)||document.referrer;
if(!f||location.pathname.replace(/\\/$/,'')!==${JSON.stringify(worldRoutes.writing)})return;
var u=new URL(f);
if(u.origin!==location.origin||u.pathname.indexOf(${JSON.stringify(`${worldRoutes.blog}/`)})!==0)return;
var s=document.createElement('style');s.id='world-returning';
s.textContent='.writing-room .article-paper{animation:none!important}';
document.head.appendChild(s);
}catch(e){}})();`;

/** Route-independent layout: the preview route alone supplies noindex metadata. */
export function WorldLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <SceneMotionProvider>
      {/* Inline so development stylesheet reloading cannot drop the opt-in
          mid-navigation. Transition styling stays in page-transitions.css. */}
      <style>{'@view-transition{navigation:auto}'}</style>
      {/* Reveal a new page only once its main content exists, so a view
          transition never starts from a half-streamed document. */}
      <link rel="expect" href="#world-main" blocking="render" />
      <script dangerouslySetInnerHTML={{ __html: arrival }} />
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

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
 * writing desk from an article (link, Back or Forward) adds a head style so the
 * papers are already on the desk: no deal-in, and the returning cover's view
 * transition lands on a paper that is not moving. Browsers don't say where a
 * Back came from while the page is parsing, so every page notes its own path
 * in sessionStorage as it is left. Layouts persist across client navigation,
 * so this runs once per full page load.
 */
const arrival = `(function(){try{
var ss=window.sessionStorage,left=ss.getItem('world-leaving');ss.removeItem('world-leaving');window.__worldLeft=left;
if(left)document.documentElement.classList.add('art-arrive');
var note=function(){try{ss.setItem('world-leaving',location.pathname);}catch(e){}};addEventListener('pageswap',note);addEventListener('pagehide',note);addEventListener('beforeunload',note);
var n=window.navigation,f=left||(n&&n.activation&&n.activation.from&&n.activation.from.url)||document.referrer;
if(!f||location.pathname.replace(/\\/$/,'')!==${JSON.stringify(worldRoutes.writing)})return;
var u=new URL(f,location.href);
if(u.origin!==location.origin||u.pathname.indexOf(${JSON.stringify(`${worldRoutes.blog}/`)})!==0)return;
var s=document.createElement('style');s.id='world-returning';
s.textContent='.writing-room .article-paper{animation:none!important}';
document.head.appendChild(s);
}catch(e){}})();`;

/*
 * Only the paper that belongs to the article travels. Every desk paper's
 * picture carries a cover transition name, so without this the other papers'
 * pictures would fade in on their own and look like the desk being re-dealt.
 * Set as the page is swapped out or revealed (also after a back-forward cache
 * restore), and restored once the transition finishes.
 */
const coverFocus = `(function(){
var blog=${JSON.stringify(`${worldRoutes.blog}/`)};
function uidOf(url){try{var p=new URL(url,location.href).pathname;return p.indexOf(blog)===0?decodeURIComponent(p.slice(blog.length).replace(/\\/$/,'')):null;}catch(e){return null;}}
function focus(e,url){if(!e.viewTransition)return;var uid=uidOf(url||'');
var pics=[].slice.call(document.querySelectorAll('.paper-picture[data-cover]'));
pics.forEach(function(p){if(p.getAttribute('data-cover')!==uid){p.setAttribute('data-vt-hold',p.style.viewTransitionName||'');p.style.viewTransitionName='none';}});
e.viewTransition.finished.finally(function(){pics.forEach(function(p){if(p.hasAttribute('data-vt-hold')){p.style.viewTransitionName=p.getAttribute('data-vt-hold');p.removeAttribute('data-vt-hold');}});});}
addEventListener('pageswap',function(e){focus(e,e.activation&&e.activation.entry&&e.activation.entry.url);});
addEventListener('pagereveal',function(e){var n=window.navigation;focus(e,(n&&n.activation&&n.activation.from&&n.activation.from.url)||window.__worldLeft);});
})();`;

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
      <script dangerouslySetInnerHTML={{ __html: coverFocus }} />
      {/* With JavaScript, paintings wait under a blurred veil until ready
          (shared/art-veil.tsx); without it they simply load. */}
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.classList.add('art-gate')",
        }}
      />
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

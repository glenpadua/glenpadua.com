'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

/*
 * Waits for everything a painting needs (its <img>s, SVG <image>s and CSS
 * mask/background images), then marks the veil as painted. Written as plain
 * ES5 because it also runs inline, while the page is still being parsed, so a
 * first visit never waits for JavaScript to load before the art can appear.
 */
const watch = `function(v){
if(!v||v.getAttribute('data-painted'))return;
var el=v.parentElement,waits=[],urls={},done=false;
function finish(instant){if(done)return;done=true;v.setAttribute('data-painted',instant?'instant':'true');}
var nodes=el.querySelectorAll('*');
for(var i=0;i<nodes.length;i++){var n=nodes[i];
if(n===v||n.closest('noscript,script'))continue;
if(n.tagName==='IMG'){if(n.loading!=='lazy'&&(n.currentSrc||n.getAttribute('src'))&&!n.complete)waits.push(n);continue;}
if(n.tagName==='image'){var h=n.getAttribute('href')||n.getAttribute('xlink:href');if(h)urls[h]=1;}
var cs=getComputedStyle(n);[cs.maskImage||cs.webkitMaskImage,cs.backgroundImage].forEach(function(s){
var m=s&&s.match(/url\\(["']?([^"')]+)/);if(m&&m[1].indexOf('data:')!==0)urls[m[1]]=1;});}
Object.keys(urls).forEach(function(u){var im=new Image();im.src=u;if(!im.complete)waits.push(im);});
if(!waits.length)return finish(true);
var left=waits.length;
waits.forEach(function(im){var f=function(){if(--left===0)finish(false);};
im.addEventListener('load',f,{once:true});im.addEventListener('error',f,{once:true});});
setTimeout(function(){finish(false);},4500);
}`;

// After the first page load, veils render during client navigation, when a
// room's painting has usually been fetched already (see WorldShell).
let navigating = false;

/**
 * A blurred miniature of the painting, laid over its stage until the real
 * layers are ready, then dissolved in one piece. So a scene or room never
 * builds up layer by layer, and interface pieces never float over an empty
 * box. Place it as the last child of the painting's stage. Without
 * JavaScript it is never shown (`art-gate` is set by an inline script).
 */
export function ArtVeil({
  src,
  portrait,
  watchKey,
}: {
  /** A CSS `url(...)` from `data/placeholders.ts`. */
  src: string;
  /** The phone composition's placeholder, if it differs. */
  portrait?: string;
  /** Change it when the stage starts loading new art, to veil it again. */
  watchKey?: string | number | boolean;
}): JSX.Element {
  const veil = useRef<HTMLSpanElement>(null);
  const firstKey = useRef(watchKey);
  // Rendered by a client navigation: only veil if the art is actually slow,
  // so a painting that is already here never flickers through a blur.
  const [late] = useState(() => navigating);
  useEffect(() => {
    navigating = true;
  }, []);
  useEffect(() => {
    const element = veil.current;
    if (!element) return;
    // New art on a stage that was already shown (a later scene starting to
    // load): veil it again. On first mount keep what the inline script found.
    if (watchKey !== firstKey.current) {
      firstKey.current = watchKey;
      element.removeAttribute('data-painted');
    }
    // Client navigations and re-renders: the inline script only runs during
    // the first page load.
    new Function(`return ${watch}`)()(element);
  }, [watchKey]);
  return (
    <>
      <span
        ref={veil}
        className="art-veil"
        data-late={late || undefined}
        aria-hidden="true"
        suppressHydrationWarning
        style={
          {
            '--veil': src,
            '--veil-portrait': portrait ?? src,
          } as CSSProperties
        }
      />
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${watch})(document.currentScript.previousElementSibling)`,
        }}
      />
    </>
  );
}

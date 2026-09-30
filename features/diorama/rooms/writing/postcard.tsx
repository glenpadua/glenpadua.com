'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { revealDeskObject } from './reveal-object';
import { InteractionOrb } from '../../shared/interaction-orb';
import { CueLight } from '../../shared/cue-light';
import { worldAsset } from '../../lib/assets';
import { articleHref } from '../../lib/routes';
import { getArticleCover } from '../../articles/covers';
import './postcard.css';

const essay = 'do-you-have-an-ideal-dream-job';
// Verbatim from Glen's published essay, 12 July 2022; this is an excerpt,
// not an invented message or a claim about where the original postcard depicts.
const excerpt =
  'You want your work to fit in with your life and not your life fit in with your work.';

export function Postcard({
  onRead,
}: {
  onRead: (uid: string) => void;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const load = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = reject;
        image.src = src;
      });
    void Promise.all([
      load(worldAsset('writing-postcard-clean-desktop')),
      load('/assets/world/writing-postcard-clean-mask.svg'),
    ]).then(
      () => {
        if (!cancelled) setReady(true);
      },
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, []);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      revealDeskObject(
        closeButton.current?.closest<HTMLElement>('.writing-postcard-back') ??
          null,
      );
      closeButton.current?.focus({ preventScroll: true });
    }
  }, [open]);
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
  };
  return (
    <>
      <img
        className="writing-postcard-clean"
        data-ready={ready}
        src={worldAsset('writing-postcard-clean-desktop')}
        width={1536}
        height={1024}
        alt=""
        aria-hidden="true"
        onLoad={() => setReady(true)}
        onError={() => setReady(false)}
      />
      <InteractionOrb
        className={`writing-postcard-turn ${open ? 'postcard-is-open' : ''}`}
        label="Turn over the postcard"
        hint="A note from Bali"
        onClick={event => {
          opener.current = event.currentTarget;
          setOpen(true);
        }}
        marker={
          <>
            <CueLight />
            <span className="writing-postcard-front" aria-hidden="true">
              <svg className="postcard-desktop-front" viewBox="0 0 210 230">
                <defs>
                  <clipPath id="writing-postcard-edge">
                    <path d="M0 53 152 7 194 168 0 220Z" />
                  </clipPath>
                </defs>
                <image
                  href={worldAsset('writing')}
                  x="0"
                  y="-400"
                  width="1536"
                  height="1024"
                  clipPath="url(#writing-postcard-edge)"
                />
              </svg>
              <img
                className="postcard-phone-front"
                src={getArticleCover(essay).thumbnailSrc}
                alt=""
                width={600}
                height={300}
              />
            </span>
          </>
        }
      />
      {open && (
        <section
          className="writing-postcard-back"
          aria-label="A note from Bali"
          onKeyDown={event => {
            if (event.key === 'Escape') close();
          }}
        >
          <header>
            <span>Bali · July 2022</span>
            <button
              ref={closeButton}
              onClick={close}
              aria-label="Turn the postcard back"
            >
              <X size={16} />
            </button>
          </header>
          <blockquote>“{excerpt}”</blockquote>
          <p className="postcard-signature">— Glen</p>
          <a href={articleHref(essay)} onClick={() => onRead(essay)}>
            From “Do you have an ideal dream job?” →
          </a>
        </section>
      )}
    </>
  );
}

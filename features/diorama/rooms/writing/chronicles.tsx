'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { X } from 'lucide-react';
import { revealDeskObject } from './reveal-object';
import type { DeskArticle } from './content';
import { articleHref } from '../../lib/routes';
import { getArticleCover, coverTransition } from '../../articles/covers';

export function Chronicles({
  articles,
  lastUid,
  onClose,
  onRead,
}: {
  articles: readonly DeskArticle[];
  lastUid: string | null;
  onClose: () => void;
  onRead: (uid: string) => void;
}): JSX.Element {
  const heading = useRef<HTMLHeadingElement>(null);
  const chapters = articles
    .filter(a => a.chronicle !== undefined)
    .sort((a, b) => a.chronicle! - b.chronicle!);
  useEffect(() => {
    revealDeskObject(
      heading.current?.closest<HTMLElement>('.writing-chronicles') ?? null,
    );
    heading.current?.focus({ preventScroll: true });
  }, []);
  return (
    <section
      className="writing-chronicles"
      aria-labelledby="chronicles-title"
      onKeyDown={event => {
        if (event.key === 'Escape') onClose();
      }}
    >
      <header className="chronicles-heading">
        <h2 id="chronicles-title" ref={heading} tabIndex={-1}>
          Chronicles of an Amputee
        </h2>
        <button onClick={onClose} aria-label="Put the Chronicles away">
          <X size={18} />
        </button>
      </header>
      <ol className="chronicles-sheets">
        {chapters.map(a => {
          const cover = getArticleCover(a.uid);
          return (
            <li
              key={a.uid}
              style={{ '--chapter-order': a.chronicle! - 1 } as CSSProperties}
            >
              <a href={articleHref(a.uid)} onClick={() => onRead(a.uid)}>
                {lastUid === a.uid && (
                  <span className="writing-bookmark">
                    <span className="sr-only">Last opened. </span>
                  </span>
                )}
                <span className="chronicle-number">
                  Chapter {String(a.chronicle).padStart(2, '0')}
                </span>
                <h3>{a.title}</h3>
                <div
                  className="paper-picture"
                  data-cover={a.uid}
                  style={coverTransition(a.uid)}
                  suppressHydrationWarning
                >
                  <img
                    src={cover.thumbnailSrc}
                    alt=""
                    width={600}
                    height={300}
                    loading="lazy"
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

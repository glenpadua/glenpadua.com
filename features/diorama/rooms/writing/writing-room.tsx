'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Archive, ArrowRight, Shuffle, X } from 'lucide-react';
import { worldAsset } from '../../lib/assets';
import { coverTransition, getArticleCover } from '../../articles/covers';
import { articleHref } from '../../lib/routes';
import type { DeskArticle } from './content';
import { paperBatch } from '@/features/diorama/lib/travel';
import { InteractionOrb } from '../../shared/interaction-orb';
import { WritingHand } from './writing-hand';
import { ArtVeil } from '../../shared/art-veil';
import { artPlaceholders } from '../../data/placeholders';
import { useMotionPolicy } from '../../shared/scene-motion';
import './styles.css';

const warmed = new Set<string>();
function warmCover(src: string) {
  if (warmed.has(src)) return;
  warmed.add(src);
  new Image().src = src;
}

function warmBatch(articles: readonly DeskArticle[], page: number) {
  for (const a of paperBatch(articles, page, 4))
    warmCover(getArticleCover(a.uid).thumbnailSrc);
}

export function WritingRoom({
  articles,
}: {
  articles: readonly DeskArticle[];
}): JSX.Element {
  const [page, setPage] = useState(0);
  const [archive, setArchive] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [penResting, setPenResting] = useState(false);
  const [gathering, setGathering] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const { enabled } = useMotionPolicy();
  const pages = Math.ceil(articles.length / 4);
  // The next handful's pictures load quietly, so dealt papers arrive painted.
  useEffect(() => {
    const timer = setTimeout(() => warmBatch(articles, page + 1), 1500);
    return () => clearTimeout(timer);
  }, [articles, page]);
  // Gather the papers into a pile, then deal the next handful from it.
  const shuffle = () => {
    if (gathering) return;
    warmBatch(articles, page + 1);
    // Later handfuls are always dealt, even after returning from an article.
    document.getElementById('world-returning')?.remove();
    if (!enabled) return setPage(p => (p + 1) % pages);
    setGathering(true);
    setTimeout(() => {
      setPage(p => (p + 1) % pages);
      setShuffled(true);
      setGathering(false);
    }, 450);
  };
  // The archive: index cards that come out of the tray, anchored in the room.
  const opener = useRef<HTMLElement | null>(null);
  const cards = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  // The opener comes from the click itself: Safari doesn't focus clicked buttons.
  const openArchive = (from: HTMLElement) => {
    opener.current = from;
    setArchive(true);
    requestAnimationFrame(() => search.current?.focus());
  };
  const closeArchive = () => {
    setArchive(false);
    requestAnimationFrame(() => opener.current?.focus());
  };
  useEffect(() => {
    if (!archive) return;
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (cards.current?.contains(target) || opener.current?.contains(target))
        return;
      setArchive(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [archive]);
  const batch = paperBatch(articles, page, 4);
  const categories = ['All', ...new Set(articles.map(a => a.category))];
  const filtered = articles
    .filter(
      a =>
        (category === 'All' || category === a.category) &&
        a.title.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
  return (
    <main
      id="world-main"
      tabIndex={-1}
      className="world-room writing-room"
      data-pen-resting={penResting}
    >
      <h1 className="sr-only">Writing — a few loose pages</h1>
      <div className="room-art-stage">
        <picture>
          <source
            media="(max-width:760px)"
            srcSet={worldAsset('writing-portrait-v1')}
          />
          <img
            className="room-art"
            src={worldAsset('writing')}
            srcSet={`${worldAsset('writing-900')} 900w, ${worldAsset('writing')} 1536w`}
            sizes="100vw"
            width={1536}
            height={1024}
            alt="An overhead wooden writing desk, a lamp, coffee and archive tray. Glen’s crown and hands are visible below as he writes a note."
            fetchPriority="high"
          />
        </picture>
        <WritingHand />
        <div
          className="paper-spread"
          aria-label="Featured writing"
          data-gathering={gathering}
          data-dealt={shuffled ? 'pile' : undefined}
        >
          {batch.map((a, i) => {
            const cover = getArticleCover(a.uid);
            return (
              <a
                className={`article-paper paper-${i + 1}`}
                key={`${page}-${a.uid}`}
                href={articleHref(a.uid)}
                style={{ '--paper-order': i } as CSSProperties}
                // Start the full cover early so the morph lands on a painting.
                onPointerEnter={() => warmCover(cover.src)}
                onFocus={() => warmCover(cover.src)}
              >
                <div className="paper-meta">
                  <span>{a.category}</span>
                  <time dateTime={a.date}>{a.date.slice(0, 4)}</time>
                </div>
                <h2>{a.title}</h2>
                <div
                  className="paper-picture"
                  data-cover={a.uid}
                  style={coverTransition(a.uid)}
                >
                  <img
                    src={cover.thumbnailSrc}
                    style={{ objectPosition: cover.thumbnailPosition }}
                    alt=""
                    width={600}
                    height={Math.round((600 * cover.height) / cover.width)}
                    loading="lazy"
                  />
                </div>
                <p className="paper-note">{a.note}</p>
              </a>
            );
          })}
        </div>
        <span className="desk-coffee-steam" aria-hidden="true" />
        <InteractionOrb
          className="room-paper-shuffle"
          label="Look through the archive tray"
          hint="The rest of the pile"
          pressed={archive}
          onClick={event =>
            archive ? closeArchive() : openArchive(event.currentTarget)
          }
        />
        {archive && (
          <section
            ref={cards}
            className="archive-cards"
            role="dialog"
            aria-modal="false"
            aria-labelledby="archive-title"
            onKeyDown={event => {
              if (event.key === 'Escape') closeArchive();
            }}
          >
            <header className="archive-head">
              <h2 id="archive-title">The rest of the pile</h2>
              <button onClick={closeArchive} aria-label="Put the cards back">
                <X size={16} />
              </button>
            </header>
            <label className="archive-search">
              <span className="sr-only">Find something</span>
              <input
                ref={search}
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Find something…"
              />
            </label>
            <div className="archive-topics" aria-label="Filter by topic">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="archive-count" role="status">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </p>
            <ul className="archive-list">
              {filtered.map(a => (
                <li key={a.uid}>
                  <a href={articleHref(a.uid)}>
                    <span>
                      {a.category} · {a.date.slice(0, 4)}
                    </span>
                    <strong>{a.title}</strong>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            {!filtered.length && (
              <p className="archive-empty">
                No cards in this pile. Try another title or topic.
              </p>
            )}
          </section>
        )}
        <InteractionOrb
          className="room-pen-rest"
          label={penResting ? 'Resume writing' : 'Let the pen rest'}
          hint={penResting ? 'One more line' : 'A moment to think'}
          pressed={penResting}
          onClick={() => setPenResting(value => !value)}
        />
        <ArtVeil
          src={artPlaceholders.writing}
          portrait={artPlaceholders['writing-portrait']}
        />
      </div>
      <div className="writing-controls">
        <button onClick={shuffle} disabled={articles.length <= 4}>
          <Shuffle size={16} /> Shuffle the papers
        </button>
        <span className="writing-page" role="status">
          {page * 4 + 1}–{Math.min((page + 1) * 4, articles.length)} of{' '}
          {articles.length}
        </span>
        <button
          onClick={event =>
            archive ? closeArchive() : openArchive(event.currentTarget)
          }
          aria-expanded={archive}
        >
          <Archive size={16} /> All writing
        </button>
      </div>
      <noscript>
        <div className="world-noscript">
          <p>All writing</p>
          {articles.map(a => (
            <a key={a.uid} href={articleHref(a.uid)}>
              {a.title} →
            </a>
          ))}
        </div>
      </noscript>
    </main>
  );
}

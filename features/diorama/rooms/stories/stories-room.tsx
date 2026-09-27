'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Archive, ArrowUpRight, Shuffle } from 'lucide-react';
import Link from 'next/link';
import { worldAsset } from '../../lib/assets';
import { coverTransition, getArticleCover } from '../../articles/covers';
import { articleHref } from '../../lib/routes';
import type { DeskArticle } from './content';
import { WorldDialog } from '@/features/diorama/shared/world-dialog';
import { paperBatch } from '@/features/diorama/lib/travel';
import { InteractionOrb } from '../../shared/interaction-orb';
import { WritingHand } from './writing-hand';
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

export function StoriesRoom({
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
    if (!enabled) return setPage(p => (p + 1) % pages);
    setGathering(true);
    setTimeout(() => {
      setPage(p => (p + 1) % pages);
      setGathering(false);
    }, 320);
  };
  const opener = useRef<HTMLButtonElement>(null);
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
      className="world-room stories-room"
      data-pen-resting={penResting}
    >
      <h1 className="sr-only">Stories — a few loose pages</h1>
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
          aria-label="Featured stories"
          data-gathering={gathering}
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
                <div className="paper-picture" style={coverTransition(a.uid)}>
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
                <div className="paper-bottom">
                  Read the story <ArrowUpRight size={17} />
                </div>
              </a>
            );
          })}
        </div>
        <span className="desk-coffee-steam" aria-hidden="true" />
        <InteractionOrb
          className="room-paper-shuffle"
          label="Shuffle the story papers"
          hint="Another handful"
          disabled={articles.length <= 4}
          onClick={shuffle}
        />
        <InteractionOrb
          className="room-pen-rest"
          label={penResting ? 'Resume writing' : 'Let the pen rest'}
          hint={penResting ? 'One more line' : 'A moment to think'}
          pressed={penResting}
          onClick={() => setPenResting(value => !value)}
        />
      </div>
      <div className="stories-controls">
        <button onClick={shuffle} disabled={articles.length <= 4}>
          <Shuffle size={16} /> Shuffle the papers
        </button>
        <span className="stories-page" role="status">
          {page * 4 + 1}–{Math.min((page + 1) * 4, articles.length)} of{' '}
          {articles.length}
        </span>
        <button
          ref={opener}
          onClick={() => setArchive(true)}
          aria-haspopup="dialog"
        >
          <Archive size={16} /> All stories
        </button>
      </div>
      <noscript>
        <div className="world-noscript">
          <p>All stories</p>
          {articles.map(a => (
            <a key={a.uid} href={articleHref(a.uid)}>
              {a.title} ↗
            </a>
          ))}
        </div>
      </noscript>
      <WorldDialog
        open={archive}
        onOpenChange={value => {
          setArchive(value);
          if (!value) requestAnimationFrame(() => opener.current?.focus());
        }}
        title="The rest of the pile."
        eyebrow="Stories / archive"
      >
        <label className="archive-search">
          Find a story
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search by title"
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
          {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
        </p>
        <ul className="archive-list">
          {filtered.map(a => (
            <li key={a.uid}>
              <a href={articleHref(a.uid)}>
                <span>
                  {a.category} · {a.date.slice(0, 4)}
                </span>
                <strong>{a.title}</strong>
                <ArrowUpRight size={18} />
              </a>
            </li>
          ))}
        </ul>
        {!filtered.length && (
          <p>No papers in this pile. Try a different title or topic.</p>
        )}
        <Link prefetch={false} className="world-text-link" href="/blog">
          Visit the original blog ↗
        </Link>
      </WorldDialog>
    </main>
  );
}

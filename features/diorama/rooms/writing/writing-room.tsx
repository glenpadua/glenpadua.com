'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { worldAsset } from '../../lib/assets';
import { coverTransition, getArticleCover } from '../../articles/covers';
import { articleHref } from '../../lib/routes';
import type { DeskArticle } from './content';
import { paperBatch } from '@/features/diorama/lib/travel';
import { InteractionOrb } from '../../shared/interaction-orb';
import { CueLight } from '../../shared/cue-light';
import { WritingHand } from './writing-hand';
import { Chronicles } from './chronicles';
import { Postcard } from './postcard';
import { revealDeskObject } from './reveal-object';
import { ArtVeil } from '../../shared/art-veil';
import { artPlaceholders } from '../../data/placeholders';
import { useMotionPolicy } from '../../shared/scene-motion';
import { DESK_MEMORY_KEY, restoreDesk, serializeDesk } from './desk-state';
import './styles.css';
import './desk-objects.css';
import './chronicles.css';

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
  const [chronicles, setChronicles] = useState(false);
  const chroniclesOpener = useRef<HTMLButtonElement | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [penResting, setPenResting] = useState(false);
  const [lampOn, setLampOn] = useState(true);
  const [lastUid, setLastUid] = useState<string | null>(null);
  const [memoryReady, setMemoryReady] = useState(false);
  // Server output and the first client frame are already settled. Only a
  // confirmed first visit or a deliberate deal may opt into arrival motion.
  const [restored, setRestored] = useState(true);
  const [gathering, setGathering] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const { enabled } = useMotionPolicy();
  const pages = Math.max(1, Math.ceil(articles.length / 4));
  const shuffleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = sessionStorage.getItem(DESK_MEMORY_KEY);
        const memory = restoreDesk(raw, articles);
        setPage(memory.page);
        setLampOn(memory.lampOn);
        setLastUid(memory.lastUid);
        setChronicles(memory.chronicles);
        setRestored(Boolean(raw || document.getElementById('world-returning')));
      } catch {
        /* A desk works even when browser storage is unavailable. */
      }
      setMemoryReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [articles]);
  const saveDesk = (uid: string | null = lastUid) => {
    try {
      sessionStorage.setItem(
        DESK_MEMORY_KEY,
        serializeDesk({
          page,
          firstUid: articles[page * 4]?.uid ?? null,
          lastUid: uid,
          lampOn,
          chronicles,
        }),
      );
    } catch {
      /* Remembering the desk is optional. */
    }
  };
  useEffect(() => {
    if (!memoryReady) return;
    try {
      sessionStorage.setItem(
        DESK_MEMORY_KEY,
        serializeDesk({
          page,
          firstUid: articles[page * 4]?.uid ?? null,
          lastUid,
          lampOn,
          chronicles,
        }),
      );
    } catch {
      /* Remembering the desk is optional. */
    }
  }, [articles, page, lampOn, lastUid, chronicles, memoryReady]);
  const rememberArticle = (uid: string) => {
    // A back-forward cache restore also returns to a settled composition.
    setRestored(true);
    setLastUid(uid);
    // Write in the click, before a normal full-page article navigation leaves.
    saveDesk(uid);
  };
  useEffect(
    () => () => {
      if (shuffleTimer.current) clearTimeout(shuffleTimer.current);
    },
    [],
  );
  // The next handful's pictures load quietly, so dealt papers arrive painted.
  useEffect(() => {
    const timer = setTimeout(() => warmBatch(articles, page + 1), 1500);
    return () => clearTimeout(timer);
  }, [articles, page]);
  // Gather the papers into a pile, then deal the next handful from it.
  const shuffle = () => {
    if (gathering || articles.length <= 4) return;
    setChronicles(false);
    setRestored(false);
    warmBatch(articles, page + 1);
    // Later handfuls are always dealt, even after returning from an article.
    document.getElementById('world-returning')?.remove();
    if (!enabled) return setPage(p => (p + 1) % pages);
    setGathering(true);
    shuffleTimer.current = setTimeout(() => {
      setPage(p => (p + 1) % pages);
      setShuffled(true);
      setGathering(false);
      shuffleTimer.current = null;
    }, 450);
  };
  // The archive: index cards that come out of the tray, anchored in the room.
  const opener = useRef<HTMLElement | null>(null);
  const cards = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  // The opener comes from the click itself: Safari doesn't focus clicked buttons.
  const openArchive = (from: HTMLElement) => {
    opener.current = from;
    setChronicles(false);
    setArchive(true);
    requestAnimationFrame(() => {
      revealDeskObject(cards.current);
      search.current?.focus({ preventScroll: true });
    });
  };
  const closeArchive = () => {
    setArchive(false);
    requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
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
  const closeChronicles = () => {
    setRestored(true);
    setChronicles(false);
    requestAnimationFrame(() =>
      (
        chroniclesOpener.current ??
        document.querySelector<HTMLButtonElement>('.writing-chronicles-bundle')
      )?.focus({ preventScroll: true }),
    );
  };
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
      data-lamp={lampOn}
      data-restored={restored}
      data-collection={chronicles}
    >
      <h1 className="sr-only">Writing — a few loose pages</h1>
      <div className="room-art-stage">
        <picture>
          <source
            media="(max-width:520px), (max-aspect-ratio:13/10)"
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
        <div className="writing-desk-top" aria-hidden="true" />
        <WritingHand resting={penResting} />
        <Postcard onRead={rememberArticle} />
        <div className="writing-evening-shade" aria-hidden="true" />
        <InteractionOrb
          className="writing-lamp"
          label={lampOn ? 'Dim desk lamp' : 'Brighten desk lamp'}
          hint={lampOn ? 'Lights down' : 'Lights up'}
          pressed={!lampOn}
          onClick={() => setLampOn(value => !value)}
        />
        {!chronicles && (
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
                  onClick={() => rememberArticle(a.uid)}
                >
                  {lastUid === a.uid && (
                    <span className="writing-bookmark">
                      <span className="sr-only">Last opened. </span>
                    </span>
                  )}
                  <div className="paper-meta">
                    <span>{a.category}</span>
                    <time dateTime={a.date}>{a.date.slice(0, 4)}</time>
                  </div>
                  <h2>{a.title}</h2>
                  <div
                    className="paper-picture"
                    data-cover={a.uid}
                    style={coverTransition(a.uid)}
                    // The shared pageswap/pagereveal script temporarily holds
                    // other covers before React hydrates the returning desk.
                    suppressHydrationWarning
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
        )}
        {chronicles && (
          <Chronicles
            articles={articles}
            lastUid={lastUid}
            onClose={closeChronicles}
            onRead={rememberArticle}
          />
        )}
        {articles.some(a => a.chronicle) && (
          <InteractionOrb
            className="writing-chronicles-bundle"
            label="Chronicles of an Amputee, in chapter order"
            hint={
              chronicles ? 'Put the collection away' : 'Start at the beginning'
            }
            pressed={chronicles}
            onClick={event => {
              chroniclesOpener.current = event.currentTarget;
              setArchive(false);
              setRestored(chronicles);
              setChronicles(value => !value);
            }}
            marker={
              <>
                <CueLight />
                <span className="writing-bundle-label" aria-hidden="true">
                  <span className="writing-stack-clip" />
                  <img
                    src={getArticleCover('lottery-of-birth').thumbnailSrc}
                    width={600}
                    height={300}
                    alt=""
                  />
                  <span className="writing-bundle-title">
                    Chronicles<span>of an Amputee</span>
                  </span>
                </span>
              </>
            }
          />
        )}
        <span className="desk-coffee-steam" aria-hidden="true" />
        <InteractionOrb
          className="writing-more-pages"
          label="Shuffle the papers"
          hint="Another handful"
          disabled={articles.length <= 4}
          onClick={shuffle}
          marker={
            <>
              <CueLight />
              <span className="writing-paper-stack" aria-hidden="true">
                <span className="writing-stack-clip" />
                More pages
                <span className="writing-stack-lines" />
              </span>
            </>
          }
        />
        <InteractionOrb
          className="writing-archive-tab"
          label="All writing"
          hint="Look through the archive"
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
              <h2 id="archive-title">All writing</h2>
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
              {filtered.length === articles.length
                ? `${articles.length} pieces`
                : `${filtered.length} of ${articles.length} pieces`}
            </p>
            <ul className="archive-list">
              {filtered.map(a => (
                <li key={a.uid}>
                  <a
                    href={articleHref(a.uid)}
                    onClick={() => rememberArticle(a.uid)}
                  >
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
      <p className="sr-only" role="status">
        {chronicles
          ? 'On the desk: Chronicles of an Amputee, chapters 1 through 6 in order.'
          : articles.length
            ? `On the desk: ${batch.map(a => a.title).join(', ')}.`
            : 'There are no papers on the desk yet.'}
      </p>
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

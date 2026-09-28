'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal, flushSync } from 'react-dom';
import {
  ArrowUpRight,
  Bookmark,
  ChevronDown,
  MessageCircle,
  MoreHorizontal,
  Search,
  Slack,
  X,
} from 'lucide-react';
import { useMotionPolicy } from '../../shared/scene-motion';
import { slackChannels } from './content';
import { ValenciaClock } from './monitor-desktop';
import styles from './slack-profile.module.css';

/** Which pane is open: Glen's profile, or a channel's nth conversation. */
type View = { channel: null } | { channel: string; index: number };

/** The workspace chrome, shared by the painted laptop and the leaned-in view. */
function Workspace({
  big = false,
  view,
  onShow,
}: {
  big?: boolean;
  view?: View;
  onShow?: (channel: string | null) => void;
}): JSX.Element {
  const current = view?.channel ?? null;
  return (
    <>
      <span className={styles.workspace} aria-hidden={!big}>
        <Slack aria-hidden="true" />
        <b>remote.com</b>
        <ChevronDown aria-hidden="true" />
        {big ? (
          <a
            className={styles.visit}
            href="https://remote.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            remote.com <ArrowUpRight aria-hidden="true" />
          </a>
        ) : (
          <Search className={styles.search} aria-hidden="true" />
        )}
      </span>
      {big && onShow ? (
        <nav className={styles.sidebar} aria-label="Slack">
          <span aria-hidden="true">
            <MessageCircle /> Threads
          </span>
          <span aria-hidden="true">
            <Bookmark /> Saved
          </span>
          <span className={styles.section}>Direct messages</span>
          <button
            className={current === null ? styles.selected : undefined}
            aria-current={current === null ? 'page' : undefined}
            onClick={() => onShow(null)}
          >
            <i aria-hidden="true" /> Glen Padua <small>you</small>
          </button>
          <span className={styles.channels}>Channels</span>
          {slackChannels.map(({ name }) => (
            <button
              key={name}
              className={`${styles.channel} ${current === name ? styles.selected : ''}`}
              aria-current={current === name ? 'page' : undefined}
              onClick={() => onShow(name)}
            >
              # {name}
            </button>
          ))}
        </nav>
      ) : (
        <span className={styles.sidebar} aria-hidden="true">
          <span>
            <MessageCircle /> Threads
          </span>
          <span>
            <Bookmark /> Saved
          </span>
          <span className={styles.section}>Direct messages</span>
          <span className={styles.selected}>
            <i /> Glen Padua <small>you</small>
          </span>
          <span className={styles.channels}>Channels</span>
          <span className={styles.channelLine}>
            # <i />
          </span>
          <span className={styles.channelLine}>
            # <i />
          </span>
        </span>
      )}
    </>
  );
}

/** One conversation from a channel, its messages arriving one by one. */
function Conversation({
  channel,
  index,
}: {
  channel: string;
  index: number;
}): JSX.Element {
  const messages =
    slackChannels.find(c => c.name === channel)?.conversations[index] ?? [];
  return (
    <ol className={styles.messages}>
      {messages.map((message, i) => (
        <li
          key={i}
          className={styles.message}
          style={{ '--i': i } as CSSProperties}
        >
          <span
            className={styles.messageAvatar}
            data-glen={message.from === 'Glen'}
            aria-hidden="true"
          >
            {message.from[0]}
          </span>
          <p>
            <b>{message.from}</b>
            <span>{message.text}</span>
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * The laptop's Slack profile. Clicking the painted laptop leans in: the same
 * workspace comes forward, straightened, with the day job as profile fields
 * rather than a dialog of paragraphs. Channels open little conversations,
 * a different one each time.
 */
export function SlackProfile(): JSX.Element {
  const { enabled } = useMotionPolicy();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>({ channel: null });
  const laptop = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const changed = useRef(false);
  // The next conversation per channel; the first is picked at random.
  const next = useRef(new Map<string, number>());

  useEffect(() => {
    if (!changed.current) return;
    changed.current = false;
    (open ? closeButton : laptop).current?.focus();
  }, [open]);

  const lean = (value: boolean) => {
    changed.current = true;
    const apply = () => flushSync(() => setOpen(value));
    const start = (
      document as Document & { startViewTransition?: (cb: () => void) => void }
    ).startViewTransition;
    if (enabled && start) start.call(document, apply);
    else apply();
  };

  const show = (channel: string | null) => {
    if (channel === null) return setView({ channel: null });
    const total =
      slackChannels.find(c => c.name === channel)?.conversations.length ?? 1;
    const index =
      next.current.get(channel) ?? Math.floor(Math.random() * total);
    next.current.set(channel, (index + 1) % total);
    setView({ channel, index });
  };

  const root = open
    ? (document.querySelector('.world') ?? document.body)
    : null;

  return (
    <>
      <button
        ref={laptop}
        className={styles.screen}
        onClick={() => lean(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Lean in to Glen’s Slack profile at Remote.com"
        style={open ? { visibility: 'hidden' } : undefined}
      >
        <Workspace />
        <span className={styles.profile} aria-hidden="true">
          <span className={styles.profileBar}>
            Profile <MoreHorizontal />
          </span>
          <span className={styles.identity}>
            <span className={styles.avatar}>GP</span>
            <strong>Glen Padua</strong>
            <span className={styles.role}>Senior engineer</span>
            <span className={styles.company}>remote.com</span>
          </span>
        </span>
      </button>
      {root &&
        createPortal(
          <>
            <button
              className={styles.backdrop}
              aria-label="Back to the room"
              tabIndex={-1}
              onClick={() => lean(false)}
            />
            <section
              className={styles.window}
              role="dialog"
              aria-modal="false"
              aria-label="Glen’s Slack at Remote.com"
              onKeyDown={event => {
                if (event.key === 'Escape') lean(false);
              }}
            >
              <div className={styles.windowBody}>
                <Workspace big view={view} onShow={show} />
                <div className={styles.card}>
                  <div className={styles.cardBar}>
                    <span>
                      {view.channel ? `# ${view.channel}` : 'Profile'}
                    </span>
                    <button
                      ref={closeButton}
                      onClick={() => lean(false)}
                      aria-label="Back to the room"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className={styles.cardBody} aria-live="polite">
                    {view.channel ? (
                      <Conversation
                        key={`${view.channel}-${view.index}`}
                        channel={view.channel}
                        index={view.index}
                      />
                    ) : (
                      <>
                        <span className={styles.bigAvatar} aria-hidden="true">
                          GP
                        </span>
                        <h2>Glen Padua</h2>
                        <p className={styles.title}>
                          Senior engineer · AI team
                        </p>
                        <p className={styles.status}>
                          <i aria-hidden="true" /> Active · <ValenciaClock />
                        </p>
                        <dl className={styles.fields}>
                          <div>
                            <dt>Before</dt>
                            <dd>Airbase, Synup, and a studio I co-founded</dd>
                          </div>
                          <div>
                            <dt>Likes</dt>
                            <dd>Getting close to the actual problem</dd>
                          </div>
                        </dl>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>,
          root,
        )}
    </>
  );
}

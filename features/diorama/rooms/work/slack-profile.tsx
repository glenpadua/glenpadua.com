'use client';
import { useEffect, useRef, useState } from 'react';
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
import { ValenciaClock } from './monitor-desktop';
import styles from './slack-profile.module.css';

/** The workspace chrome, shared by the painted laptop and the leaned-in view. */
function Workspace({ big = false }: { big?: boolean }): JSX.Element {
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
        {big ? (
          <>
            <span className={styles.channel}># dev-team-ai</span>
            <span className={styles.channel}># random</span>
            <span className={styles.channel}># s-anime</span>
            <span className={styles.channel}># s-football</span>
          </>
        ) : (
          <>
            <span className={styles.channelLine}>
              # <i />
            </span>
            <span className={styles.channelLine}>
              # <i />
            </span>
          </>
        )}
      </span>
    </>
  );
}

/**
 * The laptop's Slack profile. Clicking the painted laptop leans in: the same
 * workspace comes forward, straightened, with the day job as profile fields
 * rather than a dialog of paragraphs.
 */
export function SlackProfile(): JSX.Element {
  const { enabled } = useMotionPolicy();
  const [open, setOpen] = useState(false);
  const laptop = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const changed = useRef(false);

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
              aria-labelledby="slack-name"
              onKeyDown={event => {
                if (event.key === 'Escape') lean(false);
              }}
            >
              <div className={styles.windowBody}>
                <Workspace big />
                <div className={styles.card}>
                  <div className={styles.cardBar}>
                    <span>Profile</span>
                    <button
                      ref={closeButton}
                      onClick={() => lean(false)}
                      aria-label="Back to the room"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.bigAvatar} aria-hidden="true">
                      GP
                    </span>
                    <h2 id="slack-name">Glen Padua</h2>
                    <p className={styles.title}>Senior engineer · AI team</p>
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

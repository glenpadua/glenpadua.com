import {
  Bookmark,
  ChevronDown,
  MessageCircle,
  MoreHorizontal,
  Search,
  Slack,
} from 'lucide-react';
import styles from './slack-profile.module.css';

/** A small, illustrative workspace; the whole screen opens Glen's work profile. */
export function SlackProfile({ onOpen }: { onOpen: () => void }): JSX.Element {
  return (
    <button
      className={styles.screen}
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label="Open Glen Padua’s Slack profile at remote.com"
    >
      <span className={styles.workspace} aria-hidden="true">
        <Slack />
        <b>remote.com</b>
        <ChevronDown />
        <Search className={styles.search} />
      </span>
      <span className={styles.body} aria-hidden="true">
        <span className={styles.sidebar}>
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
        <span className={styles.profile}>
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
      </span>
    </button>
  );
}

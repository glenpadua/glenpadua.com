import styles from './coffee-steam.module.css';

export function CoffeeSteam(): JSX.Element {
  return (
    <span className={styles.region} aria-hidden="true">
      <svg viewBox="0 0 48 100" fill="none" className={styles.trails}>
        <path className={styles.wisp} d="M19 104C5 87 32 73 20 53S9 26 19 9" />
        <path
          className={`${styles.wisp} ${styles.second}`}
          d="M31 104C43 86 19 73 30 52S39 29 29 12"
        />
      </svg>
    </span>
  );
}

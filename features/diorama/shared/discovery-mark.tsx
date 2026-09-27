/** A small outlined glint, distinct from the painted sun, stars and lamplight. */
export function DiscoveryMark(): JSX.Element {
  return (
    <svg
      className="world-cue-mark"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="#fff4d8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2 14.8 9.2 22 12 14.8 14.8 12 22 9.2 14.8 2 12 9.2 9.2Z" />
    </svg>
  );
}

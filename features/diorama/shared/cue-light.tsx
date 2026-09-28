/**
 * The sign that something can be touched: a ring of warm light on the
 * painting, not a symbol drawn over it. Its brightness comes from CSS
 * (nearness, lingering, glints and focus); see `interaction-orb.css`.
 */
export function CueLight(): JSX.Element {
  return <span className="world-cue-mark world-cue-light" aria-hidden="true" />;
}

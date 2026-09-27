import styles from './desk-wallpaper.module.css';

/*
 * Hand-drawn-looking contour lines: nested, slightly wobbly loops around two
 * gentle "hills", generated once from fixed numbers so every visit (and the
 * server render) draws the same map.
 */
function contour(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  wobble: number,
  seed: number,
) {
  const points = 18;
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2;
    const r =
      1 +
      wobble *
        (Math.sin(a * 3 + seed) * 0.6 + Math.sin(a * 5 + seed * 1.7) * 0.4);
    return [cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r];
  });
  // A closed Catmull-Rom curve through the points, written as cubic Béziers.
  const at = (i: number) => pts[(i + points) % points];
  let d = `M${at(0)[0].toFixed(1)} ${at(0)[1].toFixed(1)}`;
  for (let i = 0; i < points; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d}Z`;
}

const hills = [
  { cx: 770, cy: 330, rings: 7, step: 46, seed: 0.8 },
  { cx: 240, cy: 470, rings: 4, step: 40, seed: 2.3 },
];
const lines = hills.flatMap(hill =>
  Array.from({ length: hill.rings }, (_, k) =>
    contour(
      hill.cx + k * 6,
      hill.cy - k * 3,
      hill.step * (k + 1) * 1.35,
      hill.step * (k + 1) * 0.82,
      0.07 + k * 0.012,
      hill.seed + k * 0.9,
    ),
  ),
);

/** The desktop's quiet paper: gradient, grain, contour lines, a coffee ring. */
export function DeskWallpaper(): JSX.Element {
  return (
    <div className={styles.paper} aria-hidden="true">
      <svg
        className={styles.contours}
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        {lines.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {/* Someone put their mug down on the desktop. */}
        <g
          className={styles.ring}
          transform="translate(12 318) rotate(-8 125 150)"
        >
          <path d="M118 104c26-3 49 16 51 42 2 25-18 47-44 49-27 2-50-17-52-43-1-14 5-27 15-36" />
          <path d="M121 113c20-2 37 12 39 32" />
        </g>
      </svg>
    </div>
  );
}

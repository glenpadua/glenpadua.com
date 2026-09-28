import styles from './desk-wallpaper.module.css';

/**
 * The desktop's wallpaper: the homepage's day doodled on cream paper. The
 * lake at dawn (with a tiny Glen on the bar), the beach at midday and the
 * city at night, joined by a dotted trail, with a paper plane for the
 * travelling in between. Quiet enough to sit behind icons and windows.
 */
export function DeskWallpaper({
  dark = false,
}: {
  dark?: boolean;
}): JSX.Element {
  return (
    <div className={styles.paper} data-dark={dark} aria-hidden="true">
      <svg
        className={styles.doodles}
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        {/* Dawn at the lake. */}
        <g>
          <circle className={styles.sun} cx="212" cy="440" r="24" />
          <path
            className={styles.ink}
            d="M212 404v-10M184 414l-7-7M240 414l7-7M176 440h-10M248 440h10"
          />
          <path
            className={styles.hill}
            d="M96 502 176 424l38 40 50-62 84 100Z"
          />
          <path
            className={styles.water}
            d="M92 522q16-7 32 0t32 0 32 0 32 0 32 0 32 0 32 0M128 542q16-7 32 0t32 0 32 0 32 0 32 0"
          />
          <path
            className={styles.ink}
            d="M244 336q6-6 12 0 6-6 12 0M276 318q5-5 10 0 5-5 10 0"
          />
          {/* The pull-up bar, with someone on it. */}
          <path className={styles.ink} d="M362 452v76M410 452v76M356 458h60" />
          <circle className={styles.head} cx="386" cy="480" r="8" />
          <path
            className={styles.ink}
            d="M379 474l-6-16M393 474l6-16M386 488v20M386 508l-5 14M386 508l5 14"
          />
          <text className={styles.label} x="112" y="582">
            dawn
          </text>
        </g>

        {/* The trail through the day. */}
        <path
          className={styles.trail}
          d="M424 510c40 10 62-30 96-48M676 452c46-8 44-80 88-108"
        />

        {/* Midday on the beach. */}
        <g>
          <circle className={styles.sun} cx="628" cy="268" r="20" />
          <path
            className={styles.ink}
            d="M628 236v-9M628 300v9M596 268h-9M660 268h9M605 245l-6-6M651 245l6-6M605 291l-6 6M651 291l6 6"
          />
          <path className={styles.umbrella} d="M526 424q46-58 96 0Z" />
          <path
            className={styles.stripe}
            d="M558 424q10-40 16-50 6 10 16 50Z"
          />
          <path className={styles.ink} d="M574 400l10 72" />
          <path className={styles.ink} d="M508 474q76-14 156 0" />
          <path
            className={styles.water}
            d="M602 498q12-7 24 0t24 0 24 0M626 516q12-7 24 0t24 0"
          />
          <text className={styles.label} x="520" y="552">
            midday
          </text>
        </g>

        {/* Night in the city. */}
        <g>
          <path
            className={styles.moon}
            d="M936 138a24 24 0 1 0 20 38 19 19 0 1 1-20-38Z"
          />
          <path
            className={styles.ink}
            d="M790 176v10M785 181h10M872 150v8M868 154h8M912 212v8M908 216h8"
          />
          <path
            className={styles.city}
            d="M770 336v-84h34v84M808 336V212h40v124M852 336v-64h30v64M886 336V230h44v106"
          />
          <path
            className={styles.lights}
            d="M780 266h6v6h-6ZM790 290h6v6h-6ZM818 228h6v6h-6ZM832 252h6v6h-6ZM818 282h6v6h-6ZM862 286h6v6h-6ZM896 246h6v6h-6ZM914 270h6v6h-6ZM896 300h6v6h-6Z"
          />
          <path className={styles.ink} d="M756 336h192" />
          <text className={styles.label} x="820" y="372">
            night
          </text>
        </g>

        {/* A paper plane, somewhere between places. */}
        <g className={styles.plane}>
          <path className={styles.trail} d="M372 214c26-58 76-8 58-44" />
          <path className={styles.paperPlane} d="M430 170l34-16-10 32-8-11Z" />
          <path className={styles.ink} d="M446 175l18-21" />
        </g>

        {/* Someone put their mug down on the desktop. */}
        <g
          className={styles.ring}
          transform="translate(560 -60) rotate(-8 125 150)"
        >
          <path d="M118 104c26-3 49 16 51 42 2 25-18 47-44 49-27 2-50-17-52-43-1-14 5-27 15-36" />
          <path d="M121 113c20-2 37 12 39 32" />
        </g>
      </svg>
    </div>
  );
}

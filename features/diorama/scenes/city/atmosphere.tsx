import { useEffect, useState, type CSSProperties } from 'react';
import { cityLightStop } from './nightfall';

// Painting coordinates, attached to the layer that owns the illustrated object.
// Sparse strokes extend the painted reflections without warping the skyline.
const reflections = [
  [91, 656, 17],
  [147, 667, 12],
  [180, 651, 8],
  [337, 666, 20],
  [353, 687, 28],
  [347, 714, 17],
  [375, 705, 13],
  [430, 679, 16],
  [465, 657, 12],
  [495, 701, 16],
  [567, 658, 11],
  [584, 678, 17],
  [580, 718, 24],
  [648, 673, 13],
  [690, 660, 9],
] as const;
const windows = [
  [377, 534, 3, 5],
  [388, 551, 3, 5],
  [434, 565, 3, 5],
  [593, 568, 3, 4],
  [719, 583, 3, 4],
  [790, 554, 3, 5],
  [1001, 679, 10, 14],
  [1017, 679, 10, 14],
  [1035, 679, 9, 14],
  [879, 730, 8, 15],
  [906, 730, 7, 15],
  [1137, 660, 6, 9],
  [1340, 565, 5, 8],
] as const;

// The dusk entrance sweeps right to left (see `shared/scene-wipe.css`); a
// window switches on just after the dusk line has passed it.
const duskArrival = (x: number) =>
  Math.min(0.97, 1 - x / 1536 / 1.24 + 0.1).toFixed(3);

export function CitySkyline({ moving }: { moving: boolean }): JSX.Element {
  const [lit, setLit] = useState(() => windows.map((_, i) => i % 3 !== 0));
  useEffect(() => {
    if (!moving) return;
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      timer = setTimeout(
        () => {
          const window = Math.floor(Math.random() * windows.length);
          setLit(previous =>
            previous.map((value, i) => (i === window ? !value : value)),
          );
          next();
        },
        1400 + Math.random() * 3600,
      );
    };
    next();
    return () => clearTimeout(timer);
  }, [moving]);
  return (
    <svg
      className="city-skyline"
      viewBox="0 0 1536 1024"
      aria-hidden="true"
      data-moving={moving}
    >
      <g
        className="city-reflections"
        fill="none"
        stroke="#ffcd84"
        strokeLinecap="round"
      >
        {reflections.map(([x, y, width], i) => (
          <path
            key={`${x}-${y}`}
            d={`M${x} ${y}q${width / 2} -1 ${width} 0`}
            style={
              {
                '--city-delay': `${-i * 0.73}s`,
                '--lights-out': cityLightStop(x, y),
                '--city-period': `${4.8 + (i % 4) * 0.7}s`,
              } as CSSProperties
            }
          />
        ))}
      </g>
      <g className="city-windows" fill="#ffdb91">
        {windows.map(([x, y, width, height], i) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={width}
            height={height}
            data-lit={lit[i]}
            style={
              {
                '--lights-on': duskArrival(x),
                '--lights-out': cityLightStop(x, y),
              } as CSSProperties
            }
          />
        ))}
      </g>
      <g className="city-last-lights" fill="#edc887">
        <rect x="1017" y="679" width="10" height="14" />
        <rect x="593" y="568" width="3" height="4" />
        <rect x="1340" y="565" width="5" height="8" />
      </g>
    </svg>
  );
}

export function CityTerrace({
  moving,
  puff = 0,
}: {
  moving: boolean;
  /** Increments to send one bigger puff of steam from both cups. */
  puff?: number;
}): JSX.Element {
  return (
    <div
      className="city-terrace-atmosphere"
      aria-hidden="true"
      data-moving={moving}
    >
      <div className="city-lantern-light">
        <span className="city-lantern-halo" />
        <span className="city-lantern-flame" />
      </div>
      <svg
        key={puff}
        className="city-coffee"
        viewBox="0 0 1536 1024"
        fill="none"
        data-puff={puff > 0}
      >
        <g className="city-cup-steam city-cup-steam-glen">
          <path d="M1190 710c-7-9 7-14 1-23s-3-13 0-18" />
          <path d="M1197 707c5-7-5-11-2-19" />
        </g>
        <g className="city-cup-steam city-cup-steam-companion">
          <path d="M1294 712c-6-8 7-13 1-22s-3-12 0-17" />
          <path d="M1301 709c5-7-5-12-2-19" />
        </g>
      </svg>
      <svg className="city-breeze" viewBox="0 0 1536 1024">
        <g className="city-sprig city-sprig-near">
          <path
            d="M1468 1014q-7-44-35-71"
            fill="none"
            stroke="#394e31"
            strokeWidth="4"
          />
          <path d="M1458 984q-30 0-35-27 27 2 35 27Z" fill="#3e5736" />
          <path d="M1451 969q-4-28 17-39 7 25-17 39Z" fill="#51633b" />
          <path d="M1440 953q-26-1-29-22 25-1 29 22Z" fill="#354f35" />
        </g>
        <g className="city-sprig city-sprig-far">
          <path
            d="M1518 472q-19-36-14-68"
            fill="none"
            stroke="#465436"
            strokeWidth="3"
          />
          <path d="M1505 442q-25-5-23-28 22 7 23 28Z" fill="#455b38" />
          <path d="M1503 427q1-25 20-31 4 22-20 31Z" fill="#536440" />
          <path d="M1504 409q-17-9-12-27 18 10 12 27Z" fill="#3c5035" />
        </g>
      </svg>
    </div>
  );
}

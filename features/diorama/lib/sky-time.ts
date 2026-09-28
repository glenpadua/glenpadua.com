/** One reversible day, independent of chapter count or scroll direction. */
const limit = (value: number) => Math.max(0, Math.min(1, value));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (value: number) => {
  const t = limit(value);
  return t * t * (3 - 2 * t);
};

// A short golden-hour passage connects noon to night without a grey crossfade.
export const skyPalette = [
  { time: 0, top: '#bcb9cc', middle: '#efdbca', horizon: '#ffe9bb' },
  { time: 0.45, top: '#7bc5df', middle: '#c0e6ea', horizon: '#f6f0d5' },
  { time: 0.72, top: '#718bbd', middle: '#ddb2b0', horizon: '#f4c58f' },
  { time: 1, top: '#15263f', middle: '#354a71', horizon: '#8b8391' },
] as const;

function colour(a: string, b: string, t: number) {
  const channels = [1, 3, 5].map(i =>
    Math.round(
      mix(parseInt(a.slice(i, i + 2), 16), parseInt(b.slice(i, i + 2), 16), t),
    ),
  );
  return `rgb(${channels.join(', ')})`;
}

export function journeyTime(progress: number, times: readonly number[]) {
  if (!times.length) return 0;
  const position = Math.max(0, Math.min(times.length - 1, progress));
  const index = Math.floor(position);
  const next = Math.min(index + 1, times.length - 1);
  const morning = Math.max(times[index], times[next]) <= 0.45;
  return limit(
    mix(
      times[index],
      times[next],
      // Let each scene settle, then change light with its landscape transition.
      // Night should not arrive while the beach copy is still fully visible.
      ease(morning ? position - index : (position - index - 0.38) / 0.62),
    ),
  );
}

export function skyStyle(
  time: number,
  sunrise?: { x: number; y: number },
): Record<string, string | number> {
  const t = limit(time);
  const end = skyPalette.findIndex(stop => stop.time >= t);
  const b = skyPalette[Math.max(1, end)];
  const a = skyPalette[Math.max(0, end - 1)];
  const blend = ease((t - a.time) / (b.time - a.time));
  const night = ease((t - 0.73) / 0.27);
  const sunTravel = limit(t / 0.9);
  const moonTravel = ease((t - 0.64) / 0.36);
  const arc = (start: number, end: number, peak: number) =>
    mix(start, end, sunTravel) -
    ((start + end) / 2 - peak) * Math.sin(Math.PI * sunTravel);
  return {
    '--sky-top': colour(a.top, b.top, blend),
    '--sky-middle': colour(a.middle, b.middle, blend),
    '--sky-horizon': colour(a.horizon, b.horizon, blend),
    '--sky-night': ease((t - 0.67) / 0.33),
    '--sky-daylight': ease(t / 0.3),
    '--sky-day': 1 - ease((t - 0.66) / 0.22),
    '--sky-sun-x': `${mix(sunrise?.x ?? 78, 12, sunTravel)}cqw`,
    '--sky-sun-y': `${arc(sunrise?.y ?? 50, 72, 10)}cqh`,
    '--sky-sun-y-portrait': `${arc(sunrise?.y ?? 67, 76, 40)}cqh`,
    '--sky-sun-opacity': 1 - ease((t - 0.83) / 0.07),
    '--sky-moon-x': `${mix(96, 79, moonTravel)}cqw`,
    '--sky-moon-y': `${mix(74, 19, moonTravel)}cqh`,
    '--sky-moon-y-portrait': `${mix(78, 40, moonTravel)}cqh`,
    '--sky-moon-opacity': ease((t - 0.64) / 0.1),
    '--sky-cloud-ink': colour('#fff0d8', '#8384a5', night),
    '--sky-cloud-shade': colour('#ddded1', '#737994', night),
    '--sky-cloud-rim': colour('#fff2d4', '#c79394', night),
    '--sky-cloud-opacity': mix(0.64, 0.5, night),
    '--sky-star-motion': t > 0.67 ? 'running' : 'paused',
    '--sky-bird-motion': t < 0.88 ? 'running' : 'paused',
  };
}

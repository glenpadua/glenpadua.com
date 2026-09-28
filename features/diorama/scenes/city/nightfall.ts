const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};

/** Stable districts: their river reflections share the waterfront's switch. */
export function cityLightStop(x: number, y: number): number {
  const district = Math.min(11, Math.floor(x / 128));
  const floor = y > 760 ? 2 : y > 650 && x > 800 ? 1 : 0;
  return 0.045 + ((district * 7 + floor * 11 + 3) % 19) * 0.028;
}

export interface CityLightGroup {
  stop: number;
  pixels: number[];
}
export interface CityNightPainting {
  original: Uint8ClampedArray;
  unlit: Uint8ClampedArray;
  groups: CityLightGroup[];
}

/** Find warm islands in the painting, excluding the large connected sunset. */
export function prepareCityNight(
  original: Uint8ClampedArray,
  width: number,
  height: number,
): CityNightPainting {
  const unlit = original.slice();
  const count = width * height;
  const candidates = new Uint8Array(count);
  const groups = new Map<number, number[]>();
  for (let p = Math.floor(height * 0.47) * width; p < count; p++) {
    const i = p * 4;
    if (
      original[i] > 105 &&
      original[i + 1] > 75 &&
      original[i] - original[i + 2] > 18
    )
      candidates[p] = 1;
  }
  const queue = new Int32Array(count);
  for (let p = 0; p < count; p++) {
    if (!candidates[p]) continue;
    let tail = 1,
      head = 0,
      sumX = 0,
      sumY = 0;
    queue[0] = p;
    candidates[p] = 0;
    while (head < tail) {
      const at = queue[head++],
        x = at % width,
        y = Math.floor(at / width);
      sumX += x;
      sumY += y;
      for (const next of [
        x > 0 ? at - 1 : -1,
        x < width - 1 ? at + 1 : -1,
        at - width,
        at + width,
      ]) {
        if (next >= 0 && next < count && candidates[next]) {
          candidates[next] = 0;
          queue[tail++] = next;
        }
      }
    }
    // The horizon is a single large warm field, not a window or reflection.
    if (tail > count * 0.018) continue;
    const stop = cityLightStop(
      (sumX / tail / width) * 1536,
      (sumY / tail / height) * 1024,
    );
    const group = groups.get(stop) ?? [];
    for (let n = 0; n < tail; n++) {
      const at = queue[n],
        i = at * 4,
        x = at % width,
        y = Math.floor(at / width);
      const r = original[i],
        b = original[i + 2];
      const amount = clamp((r - b - 12) / 35);
      const water = x / width < 0.49 && y / height > 0.63 && y / height < 0.735;
      // Sample the nearby unlit painting, not a near-black replacement.
      // This removes the emitted light while keeping the wall/water beneath it.
      const neighbours: number[] = [];
      const directions = water
        ? [
            [-1, 0],
            [1, 0],
          ]
        : [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1],
          ];
      for (const radius of [2, 5, 10, 20, 40]) {
        const distance = Math.max(1, Math.round((radius * width) / 1024));
        for (const [dx, dy] of directions) {
          const nx = x + dx * distance,
            ny = y + dy * distance;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          const j = (ny * width + nx) * 4;
          if (
            original[j] - original[j + 2] < 12 &&
            original[j] + original[j + 1] + original[j + 2] > 90
          )
            neighbours.push(j);
        }
        if (neighbours.length >= (water ? 2 : 3)) break;
      }
      const target = neighbours.length
        ? [0, 1, 2].map(
            c =>
              (neighbours.reduce((sum, j) => sum + original[j + c], 0) /
                neighbours.length) *
              (water ? 1 : 0.88),
          )
        : [b * 0.75, b * 0.95, b * 1.2];
      for (let c = 0; c < 3; c++)
        unlit[i + c] = original[i + c] + (target[c] - original[i + c]) * amount;
      group.push(i);
    }
    groups.set(stop, group);
  }
  return {
    original,
    unlit,
    groups: [...groups]
      .map(([stop, pixels]) => ({ stop, pixels }))
      .sort((a, b) => a.stop - b.stop),
  };
}

/** Update only light pixels at a district threshold, in either scroll direction. */
export function switchCityLights(
  frame: Uint8ClampedArray,
  painting: CityNightPainting,
  ending: number,
): number {
  let off = 0;
  for (const group of painting.groups) {
    const extinguished = ending >= group.stop;
    const source = extinguished ? painting.unlit : painting.original;
    if (extinguished) off++;
    for (const i of group.pixels) {
      frame[i] = source[i];
      frame[i + 1] = source[i + 1];
      frame[i + 2] = source[i + 2];
    }
  }
  return off;
}

/** Multipliers preserve black levels and the painting's contrast. */
export function cityNightTint(ending: number): {
  sky: number[];
  ember: number[];
  city: number[];
} {
  const night = smooth(ending / 0.65);
  const cool = smooth((ending - 0.48) / 0.48);
  const mix = (to: number[]) => to.map(n => 1 + (n - 1) * night);
  return {
    sky: mix([0.13, 0.2, 0.36]),
    ember: mix(
      [0.62, 0.49, 0.45].map((n, i) => n + ([0.1, 0.17, 0.32][i] - n) * cool),
    ),
    city: mix([0.32, 0.45, 0.66]),
  };
}

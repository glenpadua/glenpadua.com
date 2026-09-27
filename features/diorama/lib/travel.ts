/** Pure, reversible choreography. One native viewport of travel per chapter. */
export const clamp = (n: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, n));
export const smooth = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};
export function sceneFrame(progress: number, index: number, count: number) {
  const local = progress - index;
  const enter = index === 0 ? 1 : smooth((local + 0.38) / 0.38);
  const exit = index === count - 1 ? 0 : smooth((local - 0.62) / 0.38);
  return {
    opacity: enter * (1 - exit),
    subject:
      (index === 0 ? 1 : smooth((local + 0.13) / 0.13)) *
      (1 - smooth((local - 0.62) / 0.13)),
    travel: (1 - enter) * 38 + exit * 48,
    drift: clamp(local, -1, 1) * 20,
  };
}
export function paperBatch<T>(
  items: readonly T[],
  page: number,
  size: number,
): T[] {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const start = (((page % pages) + pages) % pages) * size;
  return items.slice(start, start + size);
}

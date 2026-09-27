/** Reversible wipes on a fixed stage. Scroll never displaces grounded art. */
export const clamp = (n: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, n));
export const smooth = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};
const ramp = (t: number, from: number, to: number) =>
  smooth((t - from) / (to - from));

/** Share of each chapter's scroll spent handing over to the next one. */
const PASSAGE = 0.38;
/**
 * Incoming people appear only after the outgoing ones have gone, so a visitor
 * never sees two Glens at once.
 */
export const PEOPLE_HANDOFF = 0.85;

export type SceneRole = 'rest' | 'in' | 'out';
export interface SceneFrame {
  visible: boolean;
  /** `in` is uncovered over an opaque `out`; both share one `wipe` value. */
  role: SceneRole;
  wipe: number;
  /** Characters, props and discoveries. */
  subject: number;
  copy: number;
}

export function sceneFrame(
  progress: number,
  index: number,
  count: number,
  /**
   * Wipe amount by which outgoing people have gone. Portrait stages place
   * people closer to the entrance edges, so they leave sooner there.
   */
  leaveBy = 0.55,
): SceneFrame {
  const local = progress - index;
  const enter = index === 0 ? 1 : smooth((local + PASSAGE) / PASSAGE);
  const exit =
    index === count - 1 ? 0 : smooth((local - (1 - PASSAGE)) / PASSAGE);
  if (exit > 0)
    return {
      visible: exit < 1,
      role: 'out',
      wipe: exit,
      // The outgoing subject stays grounded while the edge approaches, then
      // leaves just ahead of it rather than being sliced as it passes.
      subject: 1 - ramp(exit, leaveBy - 0.25, leaveBy),
      copy: 1 - ramp(exit, 0, 0.25),
    };
  if (enter < 1)
    return {
      visible: enter > 0,
      role: 'in',
      wipe: enter,
      subject: ramp(enter, PEOPLE_HANDOFF, 1),
      copy: ramp(enter, 0.8, 1),
    };
  return { visible: true, role: 'rest', wipe: 1, subject: 1, copy: 1 };
}
/** Viewport heights of quiet scroll after the last chapter: the day's end. */
export const EPILOGUE = 0.8;

/** Where a scroll fraction (0–1 of the journey) sits: chapters, then the end. */
export function journeyPosition(fraction: number, count: number) {
  const along = clamp(fraction) * (count - 1 + EPILOGUE);
  return {
    progress: Math.min(along, count - 1),
    ending: clamp((along - (count - 1)) / EPILOGUE),
  };
}

/** Scroll fraction at which a chapter rests; `count` is the day's end. */
export const chapterStop = (index: number, count: number) =>
  index / (count - 1 + EPILOGUE);

export function paperBatch<T>(
  items: readonly T[],
  page: number,
  size: number,
): T[] {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const start = (((page % pages) + pages) % pages) * size;
  return items.slice(start, start + size);
}

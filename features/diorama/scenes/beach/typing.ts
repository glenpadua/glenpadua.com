/** A few quiet keypresses, then a short thinking pause. The static painting stays fixed behind an opaque keyboard patch. */
const beats = [
  { frame: 0, duration: 260 },
  { frame: 1, duration: 140 },
  { frame: 0, duration: 220 },
  { frame: 1, duration: 120 },
  { frame: 0, duration: 520 },
] as const;
export const TYPING_CYCLE_MS = beats.reduce(
  (sum, beat) => sum + beat.duration,
  0,
);
export function typingStateAt(elapsed: number) {
  let time = Math.max(0, elapsed) % TYPING_CYCLE_MS;
  for (const beat of beats) {
    if (time < beat.duration)
      return { frame: beat.frame, untilNextMs: beat.duration - time };
    time -= beat.duration;
  }
  return { frame: 0, untilNextMs: beats[0].duration };
}

// Painting-space rectangle entirely inside opaque hand/shirt/keyboard pixels.
// It excludes the face, umbrella, legs and ground shadow in both source frames.
export const TYPING_PATCH = {
  left: 420,
  top: 596,
  right: 530,
  bottom: 662,
  size: 900,
} as const;
export const TYPING_PATCH_CLIP = `inset(${(TYPING_PATCH.top / TYPING_PATCH.size) * 100}% ${(1 - TYPING_PATCH.right / TYPING_PATCH.size) * 100}% ${(1 - TYPING_PATCH.bottom / TYPING_PATCH.size) * 100}% ${(TYPING_PATCH.left / TYPING_PATCH.size) * 100}%)`;

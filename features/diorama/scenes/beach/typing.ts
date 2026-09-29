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

// Six quiet typing phrases, then hands off the keyboard for a forward stretch.
export const BEACH_TYPING_MS = TYPING_CYCLE_MS * 6;
const stretchBeats = [
  { frame: 2, duration: 200 }, // gather the hands, still looking toward the keys
  { frame: 3, duration: 200 }, // lift the head with the shoulders
  { frame: 4, duration: 200 }, // extend together
  { frame: 5, duration: 1500 }, // hold the wrist/hand stretch
  { frame: 4, duration: 200 }, // bend the elbows again
  { frame: 3, duration: 200 }, // ease out of the neck stretch
  { frame: 2, duration: 200 }, // lower the gaze and bring the hands back
  { frame: 0, duration: 400 }, // settle on the keys before typing
] as const;
export const BEACH_WORK_CYCLE_MS =
  BEACH_TYPING_MS + stretchBeats.reduce((sum, beat) => sum + beat.duration, 0);

export function beachWorkStateAt(elapsed: number) {
  let time = Math.max(0, elapsed) % BEACH_WORK_CYCLE_MS;
  if (time < BEACH_TYPING_MS) {
    const state = typingStateAt(time);
    return {
      ...state,
      phase: 'typing' as const,
      untilNextMs: Math.min(state.untilNextMs, BEACH_TYPING_MS - time),
    };
  }
  time -= BEACH_TYPING_MS;
  for (const beat of stretchBeats) {
    if (time < beat.duration) {
      return {
        frame: beat.frame,
        phase: beat.frame === 0 ? ('settle' as const) : ('stretch' as const),
        untilNextMs: beat.duration - time,
      };
    }
    time -= beat.duration;
  }
  return { frame: 0, phase: 'typing' as const, untilNextMs: beats[0].duration };
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

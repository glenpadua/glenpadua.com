// Whole illustrated poses in a 5 × 2 atlas. Times are milliseconds; y is in
// the character's 600 × 720 painting coordinates. The apparatus never moves.
type Phase =
  | 'pullup'
  | 'release'
  | 'land'
  | 'rest'
  | 'shake'
  | 'prepare'
  | 'jump';
type Beat = {
  frame: number;
  duration: number;
  phase: Phase;
  rep?: number;
  fromY?: number;
  toY?: number;
};

const rep: Beat[] = [
  { frame: 0, duration: 700, phase: 'pullup' },
  { frame: 1, duration: 160, phase: 'pullup' },
  { frame: 2, duration: 160, phase: 'pullup' },
  { frame: 3, duration: 420, phase: 'pullup' },
  { frame: 2, duration: 180, phase: 'pullup' },
  { frame: 1, duration: 180, phase: 'pullup' },
  { frame: 0, duration: 520, phase: 'pullup' },
];

export const pullupRoutine: readonly Beat[] = [
  ...[1, 2, 3].flatMap(n => rep.map(beat => ({ ...beat, rep: n }))),
  { frame: 4, duration: 180, phase: 'release', fromY: 0, toY: 20 },
  { frame: 5, duration: 180, phase: 'land' },
  { frame: 6, duration: 650, phase: 'rest' },
  ...Array.from({ length: 4 }, () => [
    { frame: 7, duration: 120, phase: 'shake' as const },
    { frame: 6, duration: 120, phase: 'shake' as const },
  ]).flat(),
  { frame: 6, duration: 900, phase: 'rest' },
  { frame: 8, duration: 220, phase: 'prepare' },
  { frame: 9, duration: 280, phase: 'jump', fromY: 34, toY: 0 },
];

export const pullupDuration = pullupRoutine.reduce(
  (sum, beat) => sum + beat.duration,
  0,
);

export function pullupPose(elapsed: number) {
  let time = Math.max(0, elapsed) % pullupDuration;
  for (const beat of pullupRoutine) {
    if (time < beat.duration) {
      const progress = time / beat.duration;
      // Gravity accelerates the short drop; the upward hop slows at the grip.
      const travel =
        beat.phase === 'release' ? progress ** 2 : 1 - (1 - progress) ** 2;
      const y =
        (beat.fromY ?? 0) + ((beat.toY ?? 0) - (beat.fromY ?? 0)) * travel;
      return { frame: beat.frame, phase: beat.phase, rep: beat.rep, y };
    }
    time -= beat.duration;
  }
  return { frame: 0, phase: 'pullup' as const, rep: 1, y: 0 };
}

export type PullupClock = { elapsed: number; cheers: number };

/** A cheer quickens three reps, waiting through a recovery if necessary.
 * It never resets the pose or teleports a grounded character onto the bar. */
export function advancePullup(clock: PullupClock, delta: number): PullupClock {
  const before = pullupPose(clock.elapsed);
  const speed = clock.cheers > 0 && before.phase === 'pullup' ? 2.5 : 1;
  // Resume from the same pose after suspension, rather than catching up.
  const elapsed =
    (clock.elapsed + Math.max(0, Math.min(delta, 50)) * speed) % pullupDuration;
  const after = pullupPose(elapsed);
  const completedRep = before.phase === 'pullup' && before.rep !== after.rep;
  return { elapsed, cheers: Math.max(0, clock.cheers - Number(completedRep)) };
}

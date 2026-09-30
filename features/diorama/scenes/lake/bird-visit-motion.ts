import {
  advancePullup,
  pullupDuration,
  pullupPose,
  pullupWait,
  type PullupClock,
} from './pullup-routine.ts';

export const birdPerch = { x: 164, y: 177 };
export const birdArrivalDuration = 2800;
export const birdPerchDuration = 2400;
export const birdDepartureDuration = 1800;
export const birdDepartureAt = birdArrivalDuration + birdPerchDuration;
export const birdVisitDuration = birdDepartureAt + birdDepartureDuration;
export type BirdFlightRoute = { entryX: number; exitX: number };
// Safe before the first layout measurement; both ends clear the whole painting.
export const defaultBirdFlightRoute: BirdFlightRoute = {
  entryX: -2100,
  exitX: 1200,
};

export function getBirdFlightRoute(
  character: { left: number; width: number },
  viewport: { left: number; width: number },
): BirdFlightRoute | null {
  if (
    ![character.left, character.width, viewport.left, viewport.width].every(
      Number.isFinite,
    ) ||
    character.width <= 0 ||
    viewport.width <= 0
  )
    return null;
  const scale = character.width / 600;
  // The 80px sprite window must be wholly beyond the visible scene's edge,
  // including when the portrait painting is much wider than the screen.
  return {
    entryX: (viewport.left - character.left) / scale - 80,
    exitX: (viewport.left + viewport.width - character.left) / scale + 80,
  };
}
export type LakeCharacterClock = {
  exercise: PullupClock;
  activeMs: number;
  nextVisitMs: number;
  visitMs: number | null;
  visits: number;
};
export function initialLakeCharacterClock(): LakeCharacterClock {
  return {
    exercise: { elapsed: 0, cheers: 0 },
    activeMs: 0,
    nextVisitMs: 27000,
    visitMs: null,
    visits: 0,
  };
}

const finalRest = (clock: LakeCharacterClock) =>
  pullupPose(clock.exercise.elapsed).phase === 'rest' &&
  clock.exercise.elapsed >= pullupDuration - 1400;

export function birdVisitPose(
  elapsed: number | null,
  route: BirdFlightRoute = defaultBirdFlightRoute,
) {
  if (elapsed === null)
    return {
      visible: false,
      x: birdPerch.x,
      y: birdPerch.y,
      frame: 0,
      glancing: false,
      phase: 'away',
      travelling: false,
      untilNextMs: Infinity,
    };
  const flying = elapsed < birdArrivalDuration || elapsed >= birdDepartureAt;
  let x = birdPerch.x,
    y = birdPerch.y;
  if (elapsed < birdArrivalDuration) {
    const u = Math.min(1, elapsed / birdArrivalDuration);
    const ease = 1 - (1 - u) ** 2;
    x = route.entryX + (birdPerch.x - route.entryX) * ease;
    y -= 130 * (1 - ease) + Math.sin(u * Math.PI) * 24;
  } else if (elapsed >= birdDepartureAt) {
    const u = Math.min(1, (elapsed - birdDepartureAt) / birdDepartureDuration);
    x += (route.exitX - birdPerch.x) * u ** 1.4;
    y -= 130 * Math.sin((u * Math.PI) / 2);
  }
  const perchedMs = elapsed - birdArrivalDuration;
  const boundaries = [
    birdArrivalDuration,
    ...[350, 700, 1300, 1600, 1770, 1950, 2400].map(
      time => birdArrivalDuration + time,
    ),
    birdVisitDuration,
  ];
  return {
    visible: elapsed < birdVisitDuration,
    x,
    y,
    frame: flying
      ? 3 + (Math.floor(elapsed / 85) % 3)
      : perchedMs >= 700 && perchedMs < 1300
        ? 1
        : perchedMs >= 1600 && perchedMs < 1770
          ? 2
          : 0,
    glancing: perchedMs >= 350 && perchedMs < 1950,
    phase:
      elapsed < birdArrivalDuration
        ? 'arriving'
        : elapsed >= birdDepartureAt
          ? 'leaving'
          : 'perched',
    travelling: flying,
    untilNextMs:
      (boundaries.find(end => end > elapsed) ?? birdVisitDuration) - elapsed,
  };
}

// A bird only borrows a grounded rest. The exercise clock stops there, then
// resumes from the same drawing, even when a cheer is queued during the visit.
export function advanceLakeCharacter(
  clock: LakeCharacterClock,
  delta: number,
  scheduledWait = 0,
  allowVisit = true,
): LakeCharacterClock {
  const next = { ...clock, exercise: { ...clock.exercise } };
  if (!allowVisit) next.visitMs = null;
  let remaining = Math.max(0, Math.min(delta, scheduledWait + 50));
  const welcome = () => {
    if (
      allowVisit &&
      next.visitMs === null &&
      next.activeMs >= next.nextVisitMs &&
      finalRest(next)
    )
      next.visitMs = 0;
  };
  welcome();
  while (remaining > 0) {
    if (next.visitMs !== null) {
      const step = Math.min(remaining, birdVisitDuration - next.visitMs);
      next.visitMs += step;
      next.activeMs += step;
      remaining -= step;
      if (next.visitMs >= birdVisitDuration) {
        next.visitMs = null;
        next.visits++;
        next.nextVisitMs = next.activeMs + 46000 + (next.visits % 3) * 9000;
      }
    } else {
      const wait = pullupWait(next.exercise) ?? remaining;
      const due =
        allowVisit && finalRest(next)
          ? Math.max(0, next.nextVisitMs - next.activeMs)
          : Infinity;
      const step = Math.min(remaining, wait, due || Infinity);
      next.exercise = advancePullup(next.exercise, step, step);
      next.activeMs += step;
      remaining -= step;
      welcome();
    }
  }
  return next;
}

export function lakeCharacterWait(
  clock: LakeCharacterClock,
  allowVisit = true,
): number | null {
  if (clock.visitMs !== null) {
    const bird = birdVisitPose(clock.visitMs);
    return bird.travelling ? null : bird.untilNextMs;
  }
  const wait = pullupWait(clock.exercise);
  if (wait === null || !allowVisit || !finalRest(clock)) return wait;
  return Math.min(wait, Math.max(0, clock.nextVisitMs - clock.activeMs));
}

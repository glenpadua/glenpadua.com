// Complete, coordinated exchanges. Randomness chooses the next exchange and
// its quiet interval, never independent body parts or frames during render.
export type CityMoment =
  | 'conversation'
  | 'laugh'
  | 'glen-sip'
  | 'companion-sip';
type Beat = { frame: number; duration: number };
const beat = (frame: number, duration: number): Beat => ({ frame, duration });
export const cityMoments: Record<CityMoment, readonly Beat[]> = {
  conversation: [
    beat(1, 500),
    beat(2, 700),
    beat(3, 280),
    beat(2, 220),
    beat(3, 260),
    beat(2, 500),
    beat(4, 300),
    beat(2, 220),
    beat(4, 260),
    beat(2, 850),
    beat(1, 350),
  ],
  laugh: [
    beat(1, 450),
    beat(2, 600),
    beat(4, 280),
    beat(2, 300),
    beat(5, 300),
    beat(2, 180),
    beat(5, 350),
    beat(2, 1100),
    beat(1, 350),
  ],
  'glen-sip': [beat(6, 320), beat(7, 1100), beat(6, 320)],
  'companion-sip': [beat(8, 320), beat(9, 1100), beat(8, 320)],
};
const choices: readonly CityMoment[] = [
  'conversation',
  'conversation',
  'laugh',
  'glen-sip',
  'companion-sip',
];
const unit = (value: number) => Math.max(0, Math.min(0.999999, value));
export type CityClock = {
  moment: CityMoment;
  /** -1 is the quiet interval before the next exchange. */
  beat: number;
  remaining: number;
  queuedSip: boolean;
  nextSip: 'glen-sip' | 'companion-sip';
};
export const initialCityClock = (): CityClock => ({
  moment: 'conversation',
  beat: -1,
  remaining: 2600,
  queuedSip: false,
  nextSip: 'glen-sip',
});
export function cityPose(clock: CityClock) {
  return {
    frame: clock.beat < 0 ? 0 : cityMoments[clock.moment][clock.beat].frame,
    phase: clock.beat < 0 ? 'idle' : clock.moment,
  };
}
function sip(clock: CityClock): CityClock {
  return {
    ...clock,
    moment: clock.nextSip,
    beat: 0,
    remaining: cityMoments[clock.nextSip][0].duration,
    queuedSip: false,
    nextSip: clock.nextSip === 'glen-sip' ? 'companion-sip' : 'glen-sip',
  };
}
/** Start promptly at rest; during an exchange, coalesce clicks into one sip. */
export function requestCitySip(clock: CityClock): CityClock {
  return clock.beat < 0 ? sip(clock) : { ...clock, queuedSip: true };
}
export function advanceCityClock(
  previous: CityClock,
  delta: number,
  random: () => number,
): CityClock {
  let clock = { ...previous };
  let remaining = Math.max(0, delta);
  while (remaining >= clock.remaining) {
    remaining -= clock.remaining;
    if (clock.beat < 0) {
      clock.beat = 0;
      clock.remaining = cityMoments[clock.moment][0].duration;
    } else if (clock.beat + 1 < cityMoments[clock.moment].length) {
      clock.beat++;
      clock.remaining = cityMoments[clock.moment][clock.beat].duration;
    } else if (clock.queuedSip) {
      // Complete the return to a resting pose before raising a cup.
      clock = { ...clock, moment: clock.nextSip, beat: -1, remaining: 350 };
      clock.nextSip =
        clock.nextSip === 'glen-sip' ? 'companion-sip' : 'glen-sip';
      clock.queuedSip = false;
    } else {
      const available = choices.filter(choice => choice !== clock.moment);
      clock = {
        ...clock,
        moment: available[Math.floor(unit(random()) * available.length)],
        beat: -1,
        remaining: 5000 + Math.floor(unit(random()) * 5001),
      };
    }
  }
  clock.remaining -= remaining;
  return clock;
}

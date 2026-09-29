import test from 'node:test';
import assert from 'node:assert/strict';
import {
  advancePullup,
  pullupDuration,
  pullupPose,
  pullupRoutine,
} from '../features/diorama/scenes/lake/pullup-routine.ts';

const releaseAt = pullupRoutine
  .filter(beat => beat.phase === 'pullup')
  .reduce((sum, beat) => sum + beat.duration, 0);

test('three complete reps lead through a grounded recovery back to the same grip', () => {
  const phases = [];
  let tops = 0;
  let previous;
  for (let time = 0; time < pullupDuration; time += 10) {
    const pose = pullupPose(time);
    assert.ok(pose.frame >= 0 && pose.frame < 10);
    if (pose.phase !== phases.at(-1)) phases.push(pose.phase);
    if (pose.frame === 3 && previous !== 3) tops++;
    previous = pose.frame;
    if (['land', 'rest', 'shake', 'prepare'].includes(pose.phase)) {
      assert.equal(pose.y, 0, 'grounded poses must not float');
    }
  }
  assert.equal(tops, 3);
  assert.deepEqual(phases, [
    'pullup',
    'release',
    'land',
    'rest',
    'shake',
    'rest',
    'prepare',
    'jump',
  ]);
  assert.deepEqual(pullupPose(pullupDuration), pullupPose(0));
  assert.ok(
    pullupPose(pullupDuration - 1).y < 0.01,
    'reach settles at the original grip',
  );
});

test('release accelerates down and the hop decelerates toward the bar', () => {
  const first = pullupPose(releaseAt + 45).y;
  const second = pullupPose(releaseAt + 90).y;
  const third = pullupPose(releaseAt + 135).y;
  assert.ok(third - second > second - first);
  assert.ok(
    pullupPose(pullupDuration - 280).y > pullupPose(pullupDuration - 140).y,
  );
  assert.ok(
    pullupPose(pullupDuration - 140).y > pullupPose(pullupDuration - 1).y,
  );
});

test('a cheer on the ground waits, then quickens exactly three reps without a pose reset', () => {
  let clock = { elapsed: releaseAt + 400, cheers: 3 };
  assert.equal(advancePullup(clock, 20).elapsed, clock.elapsed + 20);
  let repEnds = 0;
  let previous = pullupPose(clock.elapsed);
  for (let ticks = 0; ticks < 2000 && clock.cheers; ticks++) {
    const next = advancePullup(clock, 20);
    const pose = pullupPose(next.elapsed);
    if (previous.phase === 'pullup' && previous.rep !== pose.rep) repEnds++;
    if (previous.phase !== 'pullup') assert.equal(next.cheers, clock.cheers);
    clock = next;
    previous = pose;
  }
  assert.equal(repEnds, 3);
  assert.equal(clock.cheers, 0);
});

test('pausing preserves a mid-jump pose and a delayed frame cannot skip the recovery', () => {
  const clock = { elapsed: pullupDuration - 150, cheers: 0 };
  assert.deepEqual(advancePullup(clock, 0), clock);
  assert.deepEqual(advancePullup(clock, 60_000), advancePullup(clock, 50));
});

test('all ten served poses contain one connected figure with no detached pixels', async () => {
  const { default: sharp } = await import('sharp');
  for (let frame = 0; frame < 10; frame++) {
    const pixels = await sharp(
      'public/assets/world/lake-pullup-routine-v1.webp',
    )
      .extract({
        left: (frame % 5) * 600,
        top: Math.floor(frame / 5) * 720,
        width: 600,
        height: 720,
      })
      .ensureAlpha()
      .raw()
      .toBuffer();
    const seen = new Uint8Array(600 * 720);
    const queue = new Int32Array(seen.length);
    let components = 0;
    for (let n = 0; n < seen.length; n++) {
      if (seen[n] || !pixels[n * 4 + 3]) continue;
      components++;
      let read = 0,
        end = 1;
      queue[0] = n;
      seen[n] = 1;
      while (read < end) {
        const p = queue[read++],
          x = p % 600,
          y = Math.floor(p / 600);
        for (const q of [
          x > 0 ? p - 1 : -1,
          x < 599 ? p + 1 : -1,
          y > 0 ? p - 600 : -1,
          y < 719 ? p + 600 : -1,
        ]) {
          if (q >= 0 && !seen[q] && pixels[q * 4 + 3]) {
            seen[q] = 1;
            queue[end++] = q;
          }
        }
      }
    }
    assert.equal(components, 1, `Pose ${frame} contains a detached mark`);
  }
});

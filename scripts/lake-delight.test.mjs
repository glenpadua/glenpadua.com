import test from 'node:test';
import assert from 'node:assert/strict';
import {
  advanceLakeCharacter,
  birdArrivalDuration,
  birdPerch,
  birdVisitDuration,
  birdVisitPose,
  getBirdFlightRoute,
  initialLakeCharacterClock,
  lakeCharacterWait,
} from '../features/diorama/scenes/lake/bird-visit-motion.ts';
import {
  pullupDuration,
  pullupPose,
} from '../features/diorama/scenes/lake/pullup-routine.ts';
import {
  stoneContacts,
  stoneRipplePose,
  stoneSkipDuration,
  stoneSkipPose,
} from '../features/diorama/scenes/lake/stone-skip-motion.ts';
import {
  lakePaintingSize,
  lakeShoreline,
} from '../features/diorama/scenes/lake/water-config.ts';

test('all three stone contacts are inside the actual painted shoreline', () => {
  for (const contact of stoneContacts) {
    const x = (contact.x / lakePaintingSize.width) * 100;
    const y = (contact.y / lakePaintingSize.height) * 100;
    let inside = false;
    for (
      let i = 0, j = lakeShoreline.length - 1;
      i < lakeShoreline.length;
      j = i++
    ) {
      const [xi, yi] = lakeShoreline[i];
      const [xj, yj] = lakeShoreline[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
        inside = !inside;
    }
    assert.ok(inside, `Contact ${x},${y} lands on grass`);
    const pose = stoneSkipPose(contact.at);
    assert.ok(Math.abs(pose.x - contact.x) < 1e-8);
    assert.ok(Math.abs(pose.y - contact.y) < 1e-8);
    const after = stoneSkipPose(contact.at + 0.001);
    assert.ok(
      Math.hypot(after.x - pose.x, after.y - pose.y) < 0.01,
      'a bounce must not teleport',
    );
  }
});

test('successive skips shrink and every ripple expires without an idle animation', () => {
  let previousScale = 2;
  for (const contact of stoneContacts) {
    const pose = stoneSkipPose(contact.at);
    assert.ok(pose.scale < previousScale);
    previousScale = pose.scale;
  }
  for (let i = 0; i < 3; i++) {
    assert.equal(stoneRipplePose(stoneContacts[i].at - 1, i).opacity, 0);
    assert.ok(stoneRipplePose(stoneContacts[i].at + 100, i).opacity > 0);
    assert.equal(stoneRipplePose(stoneSkipDuration, i).opacity, 0);
  }
  assert.equal(stoneSkipPose(stoneSkipDuration).opacity, 0);
});

test('the bird waits until the introduction is over and only borrows a grounded rest', () => {
  let clock = initialLakeCharacterClock();
  while (clock.visitMs === null) {
    const wait = lakeCharacterWait(clock);
    const delta = wait ?? 16;
    clock = advanceLakeCharacter(clock, delta, wait ?? 0);
    assert.ok(clock.activeMs < 40000, 'the first visit must eventually arrive');
  }
  assert.ok(clock.activeMs >= 27000);
  const resting = clock.exercise.elapsed;
  assert.equal(pullupPose(resting).phase, 'rest');
  assert.equal(pullupPose(resting).frame, 6);
  assert.equal(pullupPose(resting).y, 0);
  while (clock.visitMs !== null) {
    const wait = lakeCharacterWait(clock);
    clock = advanceLakeCharacter(clock, wait ?? 16, wait ?? 0);
    if (clock.visitMs !== null) assert.equal(clock.exercise.elapsed, resting);
    else
      assert.ok(
        clock.exercise.elapsed - resting <= 50,
        'only the remaining frame time may resume the exercise',
      );
  }
  assert.equal(clock.visits, 1);
  assert.ok(clock.nextVisitMs - clock.activeMs >= 46000);
  assert.equal(birdVisitPose(clock.visitMs).visible, false);
});

test('Glen only glances at a perched bird and starts exercising after it leaves', () => {
  for (let time = 0; time < birdVisitDuration; time += 10) {
    const bird = birdVisitPose(time);
    if (bird.glancing) {
      assert.equal(bird.phase, 'perched');
      assert.equal(bird.x, birdPerch.x);
      assert.equal(bird.y, birdPerch.y);
    }
  }
  assert.equal(birdVisitPose(birdVisitDuration).visible, false);
  const clock = {
    ...initialLakeCharacterClock(),
    exercise: { elapsed: pullupDuration - 1400, cheers: 3 },
    activeMs: 30000,
    visitMs: birdVisitDuration - 200,
  };
  const after = advanceLakeCharacter(clock, 200, 200);
  assert.equal(after.visitMs, null);
  assert.equal(after.exercise.elapsed, clock.exercise.elapsed);
  assert.equal(
    after.exercise.cheers,
    3,
    'cheering must not interrupt the visitor or count resting as a rep',
  );
  const resume = advanceLakeCharacter(after, 100, 100);
  assert.equal(resume.exercise.elapsed, after.exercise.elapsed + 100);
});

test('pause preserves a flying bird; missing optional artwork never holds the workout', () => {
  const clock = {
    ...initialLakeCharacterClock(),
    exercise: { elapsed: pullupDuration - 1400, cheers: 0 },
    activeMs: 30000,
    visitMs: 350,
  };
  assert.deepEqual(advanceLakeCharacter(clock, 0), clock);
  assert.deepEqual(
    advanceLakeCharacter(clock, 60000),
    advanceLakeCharacter(clock, 50),
  );
  const fallback = advanceLakeCharacter(clock, 100, 100, false);
  assert.equal(fallback.visitMs, null);
  assert.equal(fallback.exercise.elapsed, clock.exercise.elapsed + 100);
  assert.equal(lakeCharacterWait(fallback, false), 800);
  assert.equal(
    lakeCharacterWait(clock),
    null,
    'only flights use continuous frames',
  );
  assert.ok(
    lakeCharacterWait({ ...clock, visitMs: birdArrivalDuration + 350 }) >= 350,
    'a perched drawing sleeps',
  );
});

test('the whole bird enters from the left edge and clears the right edge at every layout', () => {
  for (const [character, viewport] of [
    [
      { left: 894, width: 269 },
      { left: 0, width: 1280 },
    ],
    [
      { left: 608, width: 310 },
      { left: 0, width: 1110 },
    ],
    [
      { left: 173, width: 188 },
      { left: 0, width: 390 },
    ],
    [
      { left: 149, width: 181 },
      { left: 0, width: 320 },
    ],
  ]) {
    const route = getBirdFlightRoute(character, viewport);
    assert.ok(route);
    const scale = character.width / 600;
    const entry = birdVisitPose(0, route);
    const exit = birdVisitPose(birdVisitDuration - 1, route);
    assert.ok(character.left + (entry.x + 40) * scale < viewport.left);
    assert.ok(
      character.left + (exit.x - 40) * scale > viewport.left + viewport.width,
      'the bird must leave the screen before becoming invisible',
    );
    let previous = entry.x;
    for (let time = 20; time < birdVisitDuration; time += 20) {
      const pose = birdVisitPose(time, route);
      assert.ok(
        pose.x >= previous,
        'flight should keep travelling left to right',
      );
      previous = pose.x;
    }
    const landing = birdVisitPose(birdArrivalDuration - 1, route);
    assert.ok(Math.hypot(landing.x - birdPerch.x, landing.y - birdPerch.y) < 1);
  }
  assert.equal(
    getBirdFlightRoute({ left: 0, width: 0 }, { left: 0, width: 390 }),
    null,
  );
});

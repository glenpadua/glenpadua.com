import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FOOTBALL,
  footballPose,
} from '../features/diorama/scenes/beach/football.ts';

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, a + ' != ' + b);

test('prosthetic links keep their lengths through the entire sole roll', () => {
  for (let frame = 0; frame <= 280; frame++) {
    const pose = footballPose(frame / 280);
    close(
      distance(FOOTBALL.hip, pose.knee),
      distance(FOOTBALL.hip, FOOTBALL.knee),
    );
    close(
      distance(pose.knee, pose.ankle),
      distance(FOOTBALL.knee, FOOTBALL.ankle),
    );
    assert.ok(
      pose.ankle.x > FOOTBALL.hip.x,
      'The leg never crosses to the other side.',
    );
  }
});

test('foot and ball travel together without sliding or leaving the sand', () => {
  for (let frame = 0; frame <= 280; frame++) {
    const pose = footballPose(frame / 280);
    close(pose.ankle.y, FOOTBALL.ankle.y);
    close(pose.ankle.x - FOOTBALL.ankle.x, pose.roll);
    close(((pose.ballAngle * Math.PI) / 180) * FOOTBALL.ball.radius, pose.roll);
    assert.ok(pose.roll >= -34 && pose.roll <= 0);
  }
});

test('the touch begins and ends at the approved pose with a quiet reversal', () => {
  for (const time of [0, 1, -1, 2]) {
    const pose = footballPose(time);
    close(pose.upperAngle, 0);
    close(pose.lowerAngle, 0);
    close(pose.roll, 0);
  }
  assert.ok(Math.abs(footballPose(0.0001).roll) < 0.00001);
  assert.ok(Math.abs(footballPose(0.9999).roll) < 0.00001);
  close(footballPose(0.25).roll, footballPose(0.75).roll);
});

test('unavailable WebGL leaves the underlying painting as the fallback', async t => {
  const { createBeachWater } =
    await import('../features/diorama/scenes/beach/water-renderer.ts');
  let attempts = 0;
  const canvas = {
    width: 1,
    height: 1,
    style: {},
    addEventListener() {},
    removeEventListener() {},
    setAttribute() {},
    getContext() {
      attempts++;
      return null;
    },
  };
  t.mock.method(console, 'error', () => {});
  assert.equal(
    await createBeachWater(canvas, '/assets/world/beach-back.webp'),
    null,
  );
  assert.ok(
    attempts > 0,
    'Exercise the actual unavailable graphics context path.',
  );
  assert.equal(
    canvas.style.opacity,
    undefined,
    'The hidden canvas is never revealed.',
  );
});

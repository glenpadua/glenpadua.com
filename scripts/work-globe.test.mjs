import test from 'node:test';
import assert from 'node:assert/strict';
import {
  advanceGlobe,
  dragRotation,
  releaseVelocity,
  wrapAngle,
} from '../features/diorama/rooms/work/globe-motion.ts';

test('globe flicks slow to rest and stop requesting updates', () => {
  let state = { angle: 0, velocity: 7 };
  let frames = 0;
  while (state.velocity && frames < 400) {
    const next = advanceGlobe(state.angle, state.velocity, 1 / 60);
    assert.ok(Math.abs(next.velocity) <= Math.abs(state.velocity));
    state = next;
    frames++;
  }
  assert.equal(state.velocity, 0);
  assert.ok(frames < 200);
  assert.ok(state.angle > 2 && state.angle < 3);
});

test('coasting has the same travel at 30 and 60 frames per second', () => {
  const travel = fps => {
    let state = { angle: 0, velocity: 3 };
    for (let i = 0; i < fps; i++)
      state = advanceGlobe(state.angle, state.velocity, 1 / fps);
    return state.angle;
  };
  assert.ok(Math.abs(travel(30) - travel(60)) < 1e-10);
});

test('opposite drag directions reverse spin and scale with globe size', () => {
  assert.equal(dragRotation(25, 100), dragRotation(50, 200));
  assert.equal(dragRotation(-25, 100), -dragRotation(25, 100));
  assert.equal(releaseVelocity(100, 0), 7);
  assert.equal(releaseVelocity(-100, 0), -7);
});

test('stopped motion stays stopped and long frame gaps cannot jump the globe', () => {
  assert.deepEqual(advanceGlobe(1, 0, 100), { angle: 1, velocity: 0 });
  assert.deepEqual(advanceGlobe(1, 3, 100), advanceGlobe(1, 3, 0.05));
  assert.ok(wrapAngle(-0.1) > 0);
});

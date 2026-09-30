import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceSaver } from '../features/diorama/rooms/work/screen-saver-motion.ts';

test('two wall bounces near a corner do not count as corner contacts', () => {
  let position = { x: 0.99, y: 0.95, dx: 1, dy: 1 };
  let corners = 0;
  let bounces = 0;
  for (let frame = 0; frame < 6; frame++) {
    const next = advanceSaver(position, 100, 100, 100, 0.01);
    position = next.position;
    corners += next.corners;
    bounces += next.bounces;
  }
  assert.equal(bounces, 2);
  assert.equal(corners, 0);
});

test('an unmeasured or collapsed field never scores or loses its saved position', () => {
  const position = { x: 0.25, y: 0.2, dx: 1, dy: 1 };
  for (const [width, height] of [
    [0, 0],
    [300, 0],
    [0, 200],
  ]) {
    const next = advanceSaver(position, width, height, 28, 1 / 60);
    assert.equal(next.corners, 0);
    assert.equal(next.bounces, 0);
    assert.deepEqual(next.position, position);
  }
});

test('each of the four true corners counts once and reverses both axes', () => {
  for (const dx of [-1, 1]) {
    for (const dy of [-1, 1]) {
      let next = advanceSaver(
        { x: dx > 0 ? 0.99 : 0.01, y: dy > 0 ? 0.99 : 0.01, dx, dy },
        100,
        100,
        100,
        0.01,
      );
      assert.equal(next.corners, 1);
      assert.equal(next.bounces, 1);
      assert.equal(next.position.dx, -dx);
      assert.equal(next.position.dy, -dy);
      next = advanceSaver(next.position, 100, 100, 100, 0.01);
      assert.equal(next.corners, 0);
      assert.equal(next.bounces, 0);
    }
  }
});

test('subpixel corner contact is snapped once, including across frame boundaries', () => {
  const first = advanceSaver(
    { x: 0.99, y: 0.986, dx: 1, dy: 1 },
    100,
    100,
    100,
    0.01,
  );
  assert.equal(first.corners, 1);
  assert.deepEqual(first.position, { x: 1, y: 1, dx: -1, dy: -1 });
  assert.equal(advanceSaver(first.position, 100, 100, 100, 0.01).corners, 0);
});

test('a slow frame crossing two different walls is not a corner', () => {
  const next = advanceSaver(
    { x: 0.99, y: 0.95, dx: 1, dy: 1 },
    100,
    100,
    200,
    0.05,
  );
  assert.equal(next.bounces, 2);
  assert.equal(next.corners, 0);
  assert.ok(Math.abs(next.position.x - 0.91) < 1e-10);
  assert.ok(Math.abs(next.position.y - 0.95) < 1e-10);
});

test('motion and corner counts agree at 30, 60 and 144 fps', () => {
  const run = fps => {
    let position = { x: 0.25, y: 0.25, dx: 1, dy: 1 };
    let corners = 0;
    for (let i = 0; i < fps * 20; i++) {
      const next = advanceSaver(position, 100, 100, 28, 1 / fps);
      position = next.position;
      corners += next.corners;
    }
    return { position, corners };
  };
  const reference = run(60);
  for (const fps of [30, 144]) {
    const result = run(fps);
    assert.equal(result.corners, reference.corners);
    assert.ok(Math.abs(result.position.x - reference.position.x) < 1e-10);
    assert.ok(Math.abs(result.position.y - reference.position.y) < 1e-10);
  }
});

test('no elapsed time preserves the pose and long gaps cannot jump across the screen', () => {
  const position = { x: 0.25, y: 0.2, dx: 1, dy: 1 };
  assert.deepEqual(advanceSaver(position, 500, 300, 55, 0).position, position);
  assert.deepEqual(
    advanceSaver(position, 500, 300, 55, 20),
    advanceSaver(position, 500, 300, 55, 0.05),
  );
});

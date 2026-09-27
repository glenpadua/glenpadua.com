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

test('a spin lands each place facing the viewer and names it', async () => {
  const { facingAngle, facingPlace, projectPlace } =
    await import('../features/diorama/rooms/work/globe-motion.ts');
  const places = [
    { name: 'Equator', lat: 0, lon: 80 },
    { name: 'North', lat: 56, lon: 38 },
    { name: 'South', lat: -34, lon: -74 },
  ];
  places.forEach((place, i) => {
    const angle = facingAngle(place.lon);
    assert.equal(facingPlace(angle, places), i);
    const { depth } = projectPlace(angle, place.lat, place.lon);
    assert.ok(Math.abs(depth - Math.cos((place.lat * Math.PI) / 180)) < 1e-9);
  });
  // The far side of the globe is hidden and never named.
  assert.ok(projectPlace(facingAngle(80) + Math.PI, 0, 80).depth < 0);
  assert.equal(facingPlace(facingAngle(170), places), -1);
});

test('a drag always comes to rest on the nearest place', async () => {
  const { facingAngle, nearestPlace } =
    await import('../features/diorama/rooms/work/globe-motion.ts');
  const places = [
    { name: 'A', lat: 10, lon: 80 },
    { name: 'B', lat: 40, lon: -9 },
    { name: 'C', lat: 41, lon: -74 },
  ];
  assert.equal(nearestPlace(facingAngle(70), places), 0);
  assert.equal(nearestPlace(facingAngle(-40), places), 1);
  assert.equal(nearestPlace(facingAngle(-60), places), 2);
  // Across the date line, the far side still finds its closest neighbour.
  assert.equal(nearestPlace(facingAngle(-170), places), 2);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cityLightStop,
  prepareCityNight,
  switchCityLights,
  cityNightTint,
} from '../features/diorama/scenes/city/nightfall.ts';

const fixture = () => {
  const pixels = new Uint8ClampedArray(100 * 100 * 4);
  for (let i = 0; i < pixels.length; i += 4) pixels.set([55, 75, 110, 255], i);
  for (let y = 48; y < 60; y++)
    for (let x = 0; x < 100; x++)
      pixels.set([235, 155, 110, 255], (y * 100 + x) * 4);
  for (const x of [12, 38, 74])
    for (let y = 80; y < 84; y++)
      pixels.set([250, 205, 120, 255], (y * 100 + x) * 4);
  return pixels;
};
test('warm window islands switch in groups while the connected sunset stays intact', () => {
  const original = fixture();
  const painting = prepareCityNight(original, 100, 100);
  const frame = original.slice();
  assert.ok(painting.groups.length >= 2);
  const middle = (painting.groups[0].stop + painting.groups.at(-1).stop) / 2;
  const off = switchCityLights(frame, painting, middle);
  assert.ok(off > 0 && off < painting.groups.length);
  assert.deepEqual(
    frame.slice(50 * 100 * 4, 51 * 100 * 4),
    original.slice(50 * 100 * 4, 51 * 100 * 4),
  );
  switchCityLights(frame, painting, 1);
  assert.ok(frame[(80 * 100 + 12) * 4] < 50);
  assert.ok(
    frame[(80 * 100 + 12) * 4] > 35,
    'unlit windows retain the local masonry instead of turning black',
  );
  assert.deepEqual(frame.slice(90 * 100 * 4), original.slice(90 * 100 * 4));
  switchCityLights(frame, painting, 0);
  assert.deepEqual(
    frame,
    original,
    'reverse scroll exactly restores the source pixels',
  );
});
test('waterfront and reflections share deterministic switch times', () => {
  for (const x of [91, 147, 337, 465, 580, 690]) {
    assert.equal(cityLightStop(x, 630), cityLightStop(x, 714));
  }
  assert.notEqual(cityLightStop(91, 630), cityLightStop(337, 630));
});
test('navy multiplication preserves black and keeps an ember until late in the ending', () => {
  assert.deepEqual(cityNightTint(0).city, [1, 1, 1]);
  for (const p of [0.1, 0.4, 0.7, 1])
    for (const tint of Object.values(cityNightTint(p))) {
      assert.ok(tint.every(value => value > 0 && value <= 1));
      assert.equal(0 * tint[0], 0);
    }
  const middle = cityNightTint(0.5),
    last = cityNightTint(1);
  assert.ok(middle.ember[0] > middle.ember[2]);
  assert.ok(last.ember[0] < last.ember[2]);
  assert.ok(last.city[2] > last.city[0]);
});

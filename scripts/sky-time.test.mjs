import test from 'node:test';
import assert from 'node:assert/strict';
import { journeyTime, skyStyle } from '../features/diorama/lib/sky-time.ts';

test('scene times survive additions, reordering, reverse scroll and overscroll', () => {
  for (const times of [
    [0, 0.45, 1],
    [1, 0.45, 0],
    [0],
    [0, 0.2, 0.45, 0.72, 1],
  ]) {
    times.forEach((t, i) => assert.equal(journeyTime(i, times), t));
    assert.equal(journeyTime(-5, times), times[0]);
    assert.equal(journeyTime(99, times), times.at(-1));
    const samples = Array.from(
      { length: 101 },
      (_, i) => (i / 100) * (times.length - 1),
    );
    const forward = samples.map(p => journeyTime(p, times));
    assert.deepEqual(
      samples.toReversed().map(p => journeyTime(p, times)),
      forward.toReversed(),
    );
  }
  assert.equal(journeyTime(0, []), 0);
});

test('sunlight hands over to moonlight and invisible creatures stop animating', () => {
  assert.ok(journeyTime(1.65, [0, 0.45, 1]) < 0.73);
  const dawn = skyStyle(0),
    noon = skyStyle(0.45),
    night = skyStyle(1);
  for (const style of [dawn, noon]) {
    assert.equal(style['--sky-night'], 0);
    assert.equal(style['--sky-sun-opacity'], 1);
    assert.equal(style['--sky-star-motion'], 'paused');
  }
  assert.equal(night['--sky-night'], 1);
  assert.equal(night['--sky-sun-opacity'], 0);
  assert.equal(night['--sky-day'], 0);
  assert.equal(night['--sky-bird-motion'], 'paused');
  assert.ok(parseFloat(noon['--sky-sun-y']) < parseFloat(dawn['--sky-sun-y']));
});

test('sky colour and celestial positions are continuous across all palette stops', () => {
  let previous = skyStyle(0);
  for (let i = 1; i <= 1000; i++) {
    const current = skyStyle(i / 1000);
    for (const key of [
      '--sky-top',
      '--sky-middle',
      '--sky-horizon',
      '--sky-cloud-ink',
      '--sky-cloud-shade',
      '--sky-cloud-rim',
    ]) {
      const a = previous[key].match(/\d+/g).map(Number),
        b = current[key].match(/\d+/g).map(Number);
      assert.ok(a.every((value, j) => Math.abs(value - b[j]) <= 2));
    }
    for (const key of ['--sky-sun-x', '--sky-sun-y'])
      assert.ok(
        Math.abs(parseFloat(previous[key]) - parseFloat(current[key])) < 0.3,
      );
    previous = current;
  }
  assert.deepEqual(skyStyle(-1), skyStyle(0));
  assert.deepEqual(skyStyle(2), skyStyle(1));
});

test('sun rises immediately and travels only east to west across the day', () => {
  assert.ok(journeyTime(0.1, [0, 0.45, 1]) > 0);
  const dawn = skyStyle(0, { x: 91, y: 66 });
  const noon = skyStyle(0.45, { x: 91, y: 66 });
  assert.equal(parseFloat(dawn['--sky-sun-x']), 91);
  assert.equal(parseFloat(dawn['--sky-sun-y']), 66);
  assert.equal(parseFloat(dawn['--sky-sun-y-portrait']), 66);
  assert.ok(parseFloat(noon['--sky-sun-y']) < 15);
  assert.ok(parseFloat(noon['--sky-sun-y-portrait']) < 42);
  let previous = dawn;
  for (let i = 1; i <= 100; i++) {
    const current = skyStyle(i / 100, { x: 91, y: 66 });
    assert.ok(
      parseFloat(current['--sky-sun-x']) <= parseFloat(previous['--sky-sun-x']),
    );
    assert.ok(current['--sky-daylight'] >= previous['--sky-daylight']);
    previous = current;
  }
  assert.equal(previous['--sky-sun-opacity'], 0);
});

test('moon rises while sunset is visible, with stars gradually joining it', () => {
  const twilight = skyStyle(0.72);
  assert.ok(twilight['--sky-moon-opacity'] > 0.5);
  assert.equal(twilight['--sky-sun-opacity'], 1);
  assert.ok(twilight['--sky-night'] > 0 && twilight['--sky-night'] < 0.1);
  let previous = skyStyle(0.64);
  for (let i = 65; i <= 100; i++) {
    const current = skyStyle(i / 100);
    for (const key of ['--sky-moon-y', '--sky-moon-y-portrait']) {
      assert.ok(parseFloat(current[key]) < parseFloat(previous[key]));
    }
    assert.ok(current['--sky-night'] >= previous['--sky-night']);
    previous = current;
  }
  assert.equal(previous['--sky-night'], 1);
});

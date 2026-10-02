import test from 'node:test';
import assert from 'node:assert/strict';
import { artViewport } from '../features/diorama/lib/art-viewport.ts';

const portrait = { width: 393, height: 852 };
const visible = height => ({ height, offsetTop: 0, scale: 1 });

test('a shorter Safari visual viewport lifts the painting above its toolbar', () => {
  const view = artViewport(undefined, portrait, visible(660));
  assert.equal(portrait.height - view.inset, 660);
});

test('collapsing and reopening browser chrome keeps the painting grounded', () => {
  const expanded = artViewport(undefined, portrait, visible(660));
  const collapsed = artViewport(expanded, portrait, visible(812));
  const reopened = artViewport(collapsed, portrait, visible(660));
  assert.equal(collapsed.inset, expanded.inset);
  assert.equal(reopened.inset, expanded.inset);
});

test('rotation clears the old portrait inset', () => {
  const before = artViewport(undefined, portrait, visible(660));
  const after = artViewport(before, { width: 852, height: 393 }, visible(353));
  assert.equal(after.inset, 40);
});

test('browser DOMRect getters retain the stage dimensions across chrome changes', () => {
  class StageRect {
    get width() {
      return 393;
    }
    get height() {
      return 852;
    }
  }
  const stage = new StageRect();
  const before = artViewport(undefined, stage, visible(660));
  const after = artViewport(before, stage, visible(812));
  assert.equal(after.inset, before.inset);
});

test('desktop stays unchanged and visual viewport panning uses its offset', () => {
  assert.equal(artViewport(undefined, portrait, visible(852)).inset, 0);
  assert.equal(
    artViewport(undefined, portrait, { ...visible(700), offsetTop: 14 }).inset,
    138,
  );
});

test('pinch zoom and unavailable geometry preserve the existing composition', () => {
  const before = artViewport(undefined, portrait, visible(660));
  assert.equal(
    artViewport(before, portrait, { ...visible(330), scale: 2 }),
    undefined,
  );
  assert.equal(artViewport(before, portrait, visible(0)), undefined);
  assert.equal(artViewport(before, portrait, visible(NaN)), undefined);
});

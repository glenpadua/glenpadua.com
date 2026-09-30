import test from 'node:test';
import assert from 'node:assert/strict';
import {
  restoreDesk,
  serializeDesk,
} from '../features/diorama/rooms/writing/desk-state.ts';
import { deskArticles } from '../features/diorama/rooms/writing/content.ts';

test('a return to the desk keeps its spread, bookmark and lamp', () => {
  const state = {
    page: 1,
    firstUid: deskArticles[4].uid,
    lastUid: deskArticles[6].uid,
    lampOn: false,
    chronicles: true,
  };
  assert.deepEqual(restoreDesk(serializeDesk(state), deskArticles), state);
});

test('the saved paper anchors the spread when new writing is added', () => {
  const firstUid = deskArticles[4].uid;
  const added = Array.from({ length: 4 }, (_, i) => ({
    ...deskArticles[0],
    uid: `new-${i}`,
  }));
  const saved = serializeDesk({
    page: 1,
    firstUid,
    lastUid: firstUid,
    lampOn: true,
    chronicles: false,
  });
  assert.equal(restoreDesk(saved, [...added, ...deskArticles]).page, 2);
});

test('removed papers and stale page numbers cannot leave an empty desk', () => {
  const raw = serializeDesk({
    page: 100,
    firstUid: 'removed',
    lastUid: 'removed',
    lampOn: false,
    chronicles: true,
  });
  const short = restoreDesk(raw, deskArticles.slice(0, 3));
  assert.equal(short.page, 0);
  assert.equal(short.lastUid, null);
  assert.equal(short.firstUid, deskArticles[0].uid);
  assert.equal(restoreDesk(raw, []).page, 0);
});

test('missing, malformed and incompatible storage leaves a complete default', () => {
  for (const raw of [
    null,
    'invalid json',
    'null',
    '[]',
    '{"version":7}',
    '{"version":1,"page":-3.5,"lampOn":"false"}',
  ]) {
    const state = restoreDesk(raw, deskArticles);
    assert.equal(state.page, 0);
    assert.equal(state.lastUid, null);
    assert.equal(state.lampOn, true);
  }
});

test('a missing collection does not restore an empty chapter spread', () => {
  const saved = serializeDesk({
    page: 0,
    firstUid: null,
    lastUid: null,
    lampOn: true,
    chronicles: true,
  });
  assert.equal(
    restoreDesk(
      saved,
      deskArticles.filter(a => !a.chronicle),
    ).chronicles,
    false,
  );
});

test('the collection retains its authored chapter sequence', () => {
  const chapters = deskArticles
    .filter(a => a.chronicle)
    .sort((a, b) => a.chronicle - b.chronicle);
  assert.deepEqual(
    chapters.map(a => [a.chronicle, a.uid]),
    [
      [1, 'lottery-of-birth'],
      [2, 'the-russian-connection'],
      [3, 'lord-of-the-rings'],
      [4, 'bones-that-got-away'],
      [5, 'bone-to-be-wild'],
      [6, 'back-to-school'],
    ],
  );
});

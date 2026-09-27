import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import ts from 'typescript';
import postcss from 'postcss';

const root = resolve('features/diorama');

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory()
      ? sourceFiles(path)
      : /\.tsx?$/.test(path)
        ? [path]
        : [];
  });
}

test('the illustrated feature can move mounts without importing app route internals', () => {
  const appRoot = resolve('app');
  for (const file of sourceFiles(root)) {
    const source = readFileSync(file, 'utf8');
    for (const { fileName } of ts.preProcessFile(source).importedFiles) {
      const target = fileName.startsWith('@/')
        ? resolve(fileName.slice(2))
        : fileName.startsWith('.')
          ? resolve(dirname(file), fileName)
          : null;
      assert.ok(
        !target || (target !== appRoot && !target.startsWith(appRoot + sep)),
        `${relative(root, file)} imports route internals: ${fileName}`,
      );
    }
  }
});

test('room styles cannot leak into the legacy website', () => {
  for (const file of [
    'styles/rooms.css',
    'styles/motion.css',
    'rooms/work/layout.css',
    'rooms/writing/layout.css',
  ]) {
    postcss.parse(readFileSync(resolve(root, file), 'utf8')).walkRules(rule => {
      if (rule.parent.type === 'atrule' && rule.parent.name === 'keyframes')
        return;
      for (const selector of rule.selectors) {
        assert.match(
          selector,
          /\.world(?:[\s),:#.[>+~]|$)/,
          `${file}: unscoped selector ${selector}`,
        );
      }
    });
  }
});

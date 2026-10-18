// Run with: node --test tests/*.test.js   (also runs in GitHub Actions on every push)
const test = require('node:test');
const assert = require('node:assert');
const { visible } = require('../page/lib.js');

test('only running services when asked, sorted by name', () => {
  const list = [{ name: 'Web', state: 'running' }, { name: 'DB', state: 'stopped' }, { name: 'Alpha', state: 'running' }];
  assert.deepStrictEqual(visible(list, { onlyRunning: true }).map((s) => s.name), ['Alpha', 'Web']);
  assert.strictEqual(visible(list).length, 3);
  assert.deepStrictEqual(visible(null), []);
});

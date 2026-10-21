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

test('error text: first line of the message, never a stack', () => {
  const { errorText } = require('../page/lib.js');
  assert.strictEqual(errorText(new Error('Hostwerk is offline\n    at x (y.js:1)')), 'Hostwerk is offline');
  assert.strictEqual(errorText({ error: 'Forbidden' }), 'Forbidden');
  assert.strictEqual(errorText('plain'), 'plain');
  assert.strictEqual(errorText(null), '');
  assert.strictEqual(errorText(new Error('x'.repeat(500))).length, 200);
});

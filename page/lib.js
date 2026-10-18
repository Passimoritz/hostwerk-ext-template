/* MyExtension – pure logic without DOM, tested in tests/lib.test.js (node --test). */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api; else root.MyExtension = api;
}(typeof self !== 'undefined' ? self : this, () => {
  /* Put logic that does not need the page here – it runs in the browser AND in the tests (tests/lib.test.js). */
  /** Services to show: optionally only running ones, sorted by name. */
  function visible(list, { onlyRunning = false } = {}) {
    return [...(list || [])].filter((s) => !onlyRunning || s.state === 'running').sort((a, b) => String(a.name).localeCompare(String(b.name)));
  }
  return { visible };
}));

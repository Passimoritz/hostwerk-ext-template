// Template page – everything an extension usually needs, in small steps.
const { html, t } = Hostwerk;

// Show the services. Hostwerk.html escapes every ${value}, so names can never break the page.
async function loadServices() {
  const settings = await Hostwerk.settings.get();
  // The filtering/sorting lives in lib.js, so it can be tested without a browser
  const list = MyExtension.visible(await Hostwerk.services(), { onlyRunning: !!settings.onlyRunning });
  Hostwerk.render('#list', list.length
    ? html`${list.map((s) => html`
        <div class="card card-pad">
          <div class="row"><span class="dot ${s.state === 'running' ? 'ok' : ''}"></span><b class="grow ellipsis">${s.name}</b>
          <span class="badge ${s.state === 'running' ? 'ok' : ''}">${t(s.state === 'running' ? 'running' : 'stopped')}</span></div>
        </div>`)}`
    : html`<div class="card card-pad empty"><b>${t('empty')}</b></div>`);
}

// A greeting from the settings (the form is drawn by Hostwerk from manifest.settings).
async function greet() {
  const { greeting } = await Hostwerk.settings.get();
  document.getElementById('hello').textContent = greeting || t('intro');
}

// Remember something across restarts with Hostwerk.storage (needs the "storage" permission).
async function showCounter() {
  const n = (await Hostwerk.storage.get('clicks')) || 0;
  document.getElementById('counter').textContent = t('clicked', { n });
}
document.getElementById('count').addEventListener('click', async () => {
  const n = ((await Hostwerk.storage.get('clicks')) || 0) + 1;
  await Hostwerk.storage.set('clicks', n);
  showCounter();
  if (n % 5 === 0) Hostwerk.toast(t('milestone', { n }), { kind: 'success' });
});
document.getElementById('settings').addEventListener('click', () => Hostwerk.settings.open());

// Start when Hostwerk has sent colours, language and settings – and react live to changes.
Hostwerk.ready().then(() => {
  loadServices(); greet(); showCounter();
  Hostwerk.on('service', loadServices);
  Hostwerk.on('settings', () => { loadServices(); greet(); });
  Hostwerk.on('lang', () => { loadServices(); greet(); showCounter(); });
});

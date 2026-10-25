// Template page – everything an extension usually needs, in small steps.
const { html, t } = Hostwerk;
// Hostwerk's animations (SDK 3.6): Hostwerk.ui.animate/countUp/empty and the hw-* classes. They stop by themselves with
// "Reduce animations". Older Hostwerk versions don't have them yet – so ask first and simply show the result without motion.
const motion = typeof Hostwerk.ui.animate === 'function';
let firstPaint = true;

// Show the services. Hostwerk.html escapes every ${value}, so names can never break the page.
async function loadServices() {
  let list;
  try {
    const settings = await Hostwerk.settings.get();
    // The filtering/sorting lives in lib.js, so it can be tested without a browser
    list = MyExtension.visible(await Hostwerk.services(), { onlyRunning: !!settings.onlyRunning });
  } catch (e) {
    // Never leave the skeleton standing: say what went wrong and offer a retry
    Hostwerk.render('#list', html`<div class="card card-pad empty"><h3>${t('loadFailed')}</h3><p class="small">${MyExtension.errorText(e)}</p>
      <div class="empty-action"><button type="button" class="btn" id="retry">${t('retry')}</button></div></div>`);
    document.getElementById('retry').addEventListener('click', loadServices);
    return;
  }
  Hostwerk.render('#list', list.length
    ? html`${list.map((s) => html`
        <div class="card card-pad">
          <div class="row"><span class="dot ${s.state === 'running' ? 'ok' : ''}"></span><b class="grow ellipsis">${s.name}</b>
          <span class="badge ${s.state === 'running' ? 'ok' : ''}">${t(s.state === 'running' ? 'running' : 'stopped')}</span></div>
        </div>`)}`
    : motion ? html`<div class="card">${Hostwerk.ui.empty({ title: t('empty') })}</div>` : html`<div class="card card-pad empty"><b>${t('empty')}</b></div>`);
  // The cards rise one after another – only the first time, not on every refresh
  if (motion && firstPaint && list.length) Hostwerk.ui.animate('#list', 'stagger');
  firstPaint = false;
}

// A greeting from the settings (the form is drawn by Hostwerk from manifest.settings – here in Settings → Extensions).
async function greet() {
  const { greeting } = await Hostwerk.settings.get();
  document.getElementById('hello').textContent = greeting || t('intro');
}

// Remember something across restarts with Hostwerk.storage (needs the "storage" permission).
async function showCounter() {
  const n = (await Hostwerk.storage.get('clicks')) || 0;
  document.getElementById('counter').textContent = t('clicked', { n: Hostwerk.fmt.number(n) });
}
async function countClick() {
  try {
    const n = ((await Hostwerk.storage.get('clicks')) || 0) + 1;
    await Hostwerk.storage.set('clicks', n);
    await showCounter();
    if (motion) Hostwerk.ui.animate('#counter', 'flash'); // the new value lights up briefly
    if (n % 5 === 0) Hostwerk.toast(t('milestone', { n }), { kind: 'success' });
  } catch (e) { Hostwerk.toast(MyExtension.errorText(e), { kind: 'error' }); }
}
document.getElementById('count').addEventListener('click', countClick);
document.getElementById('settings').addEventListener('click', () => Hostwerk.settings.open());

// "Count a click" in Hostwerk's "New" menu (manifest contributes.new) opens this page with that action.
// The same action can arrive twice (with the start data and as an event) – "at" tells them apart.
let lastAction = '';
function onAction(a) {
  if (!a || a.id !== 'count' || `${a.id}@${a.at}` === lastAction) return;
  lastAction = `${a.id}@${a.at}`;
  countClick();
}

// Events are best (Hostwerk.on('service')). If you have to poll, poll slowly and pause while the page is hidden.
function every(ms, fn) {
  setInterval(() => { if (!document.hidden) fn(); }, ms);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) fn(); });
}

// Start when Hostwerk has sent colours, language and settings – and react live to changes.
Hostwerk.ready().then((info) => {
  loadServices(); greet(); showCounter();
  onAction(info.action);
  Hostwerk.on('action', onAction);
  Hostwerk.on('service', loadServices);
  Hostwerk.on('settings', () => { loadServices(); greet(); });
  Hostwerk.on('lang', () => { loadServices(); greet(); showCounter(); });
  every(60000, loadServices); // safety net, e.g. after Hostwerk was offline
});

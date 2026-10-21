![My Extension](banner.svg)

# Hostwerk extension template

**English** · [Deutsch](README.de.md)

Start your own Hostwerk extension here: **Use this template**, rename it, done. A working page, a dashboard tile, settings, storage, German and English texts – plus a GitHub Action that checks every push and publishes a release for every tag.


## Which template fits?

| You want to … | Template |
|---|---|
| a page and/or a dashboard tile with Hostwerk's data | **this one** (`hostwerk-ext-template`) |
| your own server code (routes, files, webhooks), sandboxed | [hostwerk-ext-template-backend](https://github.com/Passimoritz/hostwerk-ext-template-backend) |
| add a tab, header action or settings to *another* extension | [hostwerk-ext-template-extend](https://github.com/Passimoritz/hostwerk-ext-template-extend) |
| replace or extend named places of Hostwerk (greeting, empty lists) | [hostwerk-ext-template-override](https://github.com/Passimoritz/hostwerk-ext-template-override) |
| tabs on Minecraft/web server pages, right-click and quick search entries | [hostwerk-ext-template-service-tab](https://github.com/Passimoritz/hostwerk-ext-template-service-tab) |
| a colour theme (light and dark, accents, rounding, density) | [hostwerk-ext-template-theme](https://github.com/Passimoritz/hostwerk-ext-template-theme) |

## Features

- `manifest.json` with page, tile, settings and permissions – plus the current SDK fields: `page.nav` (place in the sidebar), `settingsTab` (settings inside Hostwerk's settings), `contributes.new` (an entry in the "New" menu), `contributes.shortcuts` (Ctrl+Alt+M) and `allowExtensions` (other extensions may add tabs – the [add-on template](https://github.com/Passimoritz/hostwerk-ext-template-extend) uses that)
- `page/app.js` – services list, settings, storage counter, live events, error state with "Try again", polling that pauses while hidden (commented step by step)
- `widget/index.html` – tile with its own error state
- Sizes only from Hostwerk's design scale (`var(--sp-*)`, `var(--fs-*)`, `var(--r-*)`)
- `locales/de.json` + `locales/en.json`
- Check & release workflow (same rules as the Hostwerk catalog)

## Start

1. **Use this template** (top right) → new repository.
2. In `manifest.json`: change `id`, `name`, `description`, `author`, `homepage`, `permissions`.
3. Try it in Hostwerk: *Apps → Extensions → File* (ZIP of the folder).
4. Check: `node check.js . --strict` ([check.js](https://raw.githubusercontent.com/Passimoritz/hostwerk-public/main/sdk/check.js)) – the Action does the same on every push.
5. Release: raise `version`, add a line to `CHANGELOG.md`, push tag `v1.0.1` → release with ZIP + SHA-256.
6. Submit: in Hostwerk *Submit*, or [open the form](https://github.com/Passimoritz/hostwerk-public/issues/new?template=extension.yml).

## Permissions

- `read:services`, `storage` – change them in `manifest.json` to what you need

Runs sandboxed in Hostwerk – no access to logins, settings or files.

## Build your own

This repository is also an example for the [Hostwerk extension SDK](https://github.com/Passimoritz/hostwerk-public/blob/main/sdk/README.md): design kit, translations, settings, storage, events, check and releases.

License: MIT

## Tests

Logic that does not need the page goes into `page/lib.js` – it runs in the browser and in `tests/lib.test.js` (`node --test tests/*.test.js`). The workflow runs the tests and the Hostwerk check on every push.

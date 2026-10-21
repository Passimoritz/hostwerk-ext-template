![Meine Erweiterung](banner.svg)

# Vorlage für Hostwerk-Erweiterungen

[English](README.md) · **Deutsch**

Hier startet deine eigene Hostwerk-Erweiterung: **Use this template**, umbenennen, fertig. Lauffähige Seite, Kachel, Einstellungen, Speicher, Texte auf Deutsch und Englisch – und eine GitHub-Action, die jeden Push prüft und zu jedem Tag ein Release baut.


## Welche Vorlage passt?

| Du willst … | Vorlage |
|---|---|
| eine Seite und/oder eine Kachel mit Hostwerks Daten | **diese** (`hostwerk-ext-template`) |
| eigenen Server-Code (Routen, Dateien, Webhooks), abgeschottet | [hostwerk-ext-template-backend](https://github.com/Passimoritz/hostwerk-ext-template-backend) |
| einer *anderen* Erweiterung einen Reiter, eine Aktion oder Einstellungen geben | [hostwerk-ext-template-extend](https://github.com/Passimoritz/hostwerk-ext-template-extend) |
| benannte Stellen von Hostwerk ersetzen oder ergänzen (Begrüßung, leere Listen) | [hostwerk-ext-template-override](https://github.com/Passimoritz/hostwerk-ext-template-override) |
| Reiter auf Minecraft-/Webserver-Seiten, Einträge in Rechtsklick und Schnellsuche | [hostwerk-ext-template-service-tab](https://github.com/Passimoritz/hostwerk-ext-template-service-tab) |
| ein Farbschema (Hell und Dunkel, Akzente, Rundung, Dichte) | [hostwerk-ext-template-theme](https://github.com/Passimoritz/hostwerk-ext-template-theme) |

## Funktionen

- `manifest.json` mit Seite, Kachel, Einstellungen und Rechten – dazu die aktuellen SDK-Felder: `page.nav` (Platz in der Seitenleiste), `settingsTab` (Einstellungen in Hostwerks Einstellungen), `contributes.new` (Eintrag im „Neu“-Menü), `contributes.shortcuts` (Strg+Alt+M) und `allowExtensions` (andere Erweiterungen dürfen Reiter ergänzen – die [Zusatz-Vorlage](https://github.com/Passimoritz/hostwerk-ext-template-extend) nutzt das)
- `page/app.js` – Diensteliste, Einstellungen, Zähler im Speicher, Live-Ereignisse, Fehlerzustand mit „Erneut versuchen“, Nachladen, das bei verstecktem Reiter pausiert (Schritt für Schritt kommentiert)
- `widget/index.html` – Kachel mit eigenem Fehlerzustand
- Größen nur aus Hostwerks Design-Skala (`var(--sp-*)`, `var(--fs-*)`, `var(--r-*)`)
- `locales/de.json` + `locales/en.json`
- Prüf- und Release-Workflow (dieselben Regeln wie der Hostwerk-Katalog)

## Loslegen

1. **Use this template** (oben rechts) → neues Repository.
2. In `manifest.json`: `id`, `name`, `description`, `author`, `homepage`, `permissions` anpassen.
3. In Hostwerk ausprobieren: *Apps → Erweiterungen → Datei* (ZIP des Ordners).
4. Prüfen: `node check.js . --strict` ([check.js](https://raw.githubusercontent.com/Passimoritz/hostwerk-public/main/sdk/check.js)) – die Action macht das bei jedem Push.
5. Release: `version` erhöhen, Zeile in `CHANGELOG.md`, Tag `v1.0.1` pushen → Release mit ZIP + SHA-256.
6. Einreichen: in Hostwerk *Einreichen* oder [Formular öffnen](https://github.com/Passimoritz/hostwerk-public/issues/new?template=extension.yml).

## Rechte

- `read:services`, `storage` – in `manifest.json` auf das ändern, was du brauchst

Läuft in Hostwerk abgeschottet – kein Zugriff auf Anmeldungen, Einstellungen oder Dateien.

## Selbst bauen

Dieses Repository ist auch ein Beispiel für das [Hostwerk-Erweiterungs-SDK](https://github.com/Passimoritz/hostwerk-public/blob/main/sdk/README.de.md): Design-Baukasten, Übersetzungen, Einstellungen, Speicher, Ereignisse, Prüfung und Releases.

Lizenz: MIT

## Tests

Logik, die keine Seite braucht, gehört nach `page/lib.js` – sie läuft im Browser und in `tests/lib.test.js` (`node --test tests/*.test.js`). Der Workflow führt bei jedem Push die Tests und die Hostwerk-Prüfung aus.

# Vorlage für Hostwerk-Erweiterungen

[English](README.md) · **Deutsch**

Hier startet deine eigene Hostwerk-Erweiterung: **Use this template**, umbenennen, fertig. Lauffähige Seite, Kachel, Einstellungen, Speicher, Texte auf Deutsch und Englisch – und eine GitHub-Action, die jeden Push prüft und zu jedem Tag ein Release baut.


## Funktionen

- `manifest.json` mit Seite, Kachel, Einstellungen und Rechten
- `page/app.js` – Diensteliste, Einstellungen, Zähler im Speicher, Live-Ereignisse (Schritt für Schritt kommentiert)
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

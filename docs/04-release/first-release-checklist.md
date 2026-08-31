# Erste Version veröffentlichen – Schritt-für-Schritt

Dieses Dokument beschreibt die Freigabe der ersten stabilen `@chayns-ui`-Version
(Button/IconButton, Card, List, Accordion/AccordionGroup) inklusive Storybook-Deploy.

Ausgeliefert wird in dieser Version bewusst nur dieser Komponentensatz.

## Überblick: Was automatisiert ist vs. was Du selbst tun musst

| Bereich | Status | Zuständig |
|---|---|---|
| CI (`verify` bei jedem PR/Push) | vorhanden (`.github/workflows/ci.yml`) | automatisch |
| Versionierung & Changelog (Changesets) | eingerichtet + Changeset für diese Version vorhanden | automatisch |
| npm-Publish-Workflow (`release.yml`) | erstellt | **Secrets/Scope durch Dich** |
| Storybook-Build + Deploy (`storybook.yml`) | erstellt (GitHub Pages) | **Pages-Aktivierung durch Dich** |
| Tree-Shaking / Package-Exports | geprüft (`tree-shaking:check`, `package:check`) | automatisch |

Die eigentliche Freigabe (npm-Scope, Secrets, GitHub-Pages-Einstellung, Merge des
Version-PRs) erfordert Rechte, die ein Agent nicht hat – deshalb die folgenden manuellen Schritte.

## Deploy-Ansatz (Abweichung von chayns-components – bewusst)

`chayns-components` deployt Storybook auf eine interne AWS-S3-/Cloudflare-Infrastruktur
mit vielen internen Secrets (`AWS_*`, `CF_*`). Für ein neues, eigenständiges Repository ist
das nicht portabel. Übernommen wurde das bewährte Muster „Storybook statisch bauen
(`storybook-static`) und als Artefakt an den Deploy-Schritt geben“. Ziel ist hier
**GitHub Pages** – ohne externe Secrets und ohne Bindung an die alte Infrastruktur.
Falls stattdessen dieselbe AWS/CF-Umgebung genutzt werden soll, sag Bescheid; dann
wird `storybook.yml` auf die entsprechenden Actions/Secrets umgestellt.

## A. npm-Veröffentlichung vorbereiten (durch Dich)

1. **npm-Organisation/Scope `@chayns-ui` sicherstellen.**
   - Die Pakete heißen `@chayns-ui/core` und `@chayns-ui/tokens`.
   - Prüfe, ob die npm-Organisation `chayns-ui` existiert und Dein Publish-Account Mitglied ist.
2. **Zugriffsart: `public` (entschieden).**
   - In `packages/core/package.json`, `packages/tokens/package.json` und
     `.changeset/config.json` steht `access: "public"`; die Pakete sind damit
     öffentlich installierbar.
   - `NPM_CONFIG_PROVENANCE: true` in `.github/workflows/release.yml` bleibt aktiv –
     npm-Provenance funktioniert nur bei öffentlichem Publish.
3. **npm-Automation-Token erstellen** (Typ „Automation“, Publish-Rechte für den Scope).
4. **GitHub-Secret hinterlegen:** Repository → Settings → Secrets and variables → Actions →
   „New repository secret“ → Name `NPM_TOKEN`, Wert = das npm-Token.

## B. GitHub Pages aktivieren (durch Dich)

1. Repository → Settings → **Pages**.
2. Bei „Build and deployment“ → **Source: GitHub Actions** auswählen.
   (Kein `gh-pages`-Branch nötig – der Workflow lädt das Artefakt direkt hoch.)
3. Nach dem nächsten Push auf `main` deployt `storybook.yml` automatisch; die URL steht
   danach unter Settings → Pages bzw. in der Deploy-Zusammenfassung des Workflows.

## C. Version veröffentlichen (Ablauf)

Der Release läuft über Changesets in zwei Stufen:

1. **Diesen Stand nach `main` bringen** (PR gemäß Deiner üblichen Review-Regeln).
   - CI (`verify`) muss grün sein.
2. **Version-PR mergen:** Nach dem Merge nach `main` öffnet `release.yml` automatisch einen
   PR „chore: version packages“. Dieser
   - bumpt die Paketversionen anhand der Changesets in `.changeset/`,
   - schreibt/aktualisiert die `CHANGELOG.md` der Pakete,
   - entfernt die verbrauchten Changeset-Dateien.
3. **Diesen Version-PR prüfen und mergen.** Beim Merge nach `main` führt `release.yml`
   `pnpm release` aus (Build + `changeset publish`) und veröffentlicht die Pakete auf npm.
4. **Storybook** wird beim selben Push auf `main` über `storybook.yml` neu deployt.

> Hinweis: Solange `NPM_TOKEN` fehlt, schlägt nur der Publish-Schritt fehl; der Version-PR
> wird trotzdem erstellt. Danach einfach erneut auslösen (leerer Commit auf `main` oder
> „Re-run jobs“).

## D. Nach der Veröffentlichung (Kontrolle)

- `npm view @chayns-ui/core version` und `npm view @chayns-ui/tokens version` prüfen.
- Storybook-URL öffnen und Button, Card, List, Accordion durchklicken.
- In einem Testprojekt installieren und Tree-Shaking prüfen:
  ```bash
  npm i @chayns-ui/core
  # nur genutzte Komponenten dürfen im Bundle landen; CSS wird explizit importiert:
  #   import { Button } from '@chayns-ui/core';
  #   import '@chayns-ui/core/styles.css'; // oder gezielt '@chayns-ui/core/button.css' etc.
  ```

## Was der Agent bereits erledigt hat

- Komponenten Card, List/ListItem, Accordion/AccordionGroup implementiert (1:1 am Design System),
  inkl. Stories, Unit-/Type-Tests und A11y-Checks (axe) – alle grün.
- Button-Fokus an das Design System angepasst (abgesetzter, abgeschwächter box-shadow-Ring).
- Foundation-Tokens aus der kanonischen `tobit-ds.css` übernommen (keine erfundenen Werte).
- Exports, `sideEffects`, Vite-Entries und CSS-Aggregat für perfektes Tree-Shaking erweitert
  und mit `tree-shaking:check` / `package:check` / `consumer:check` verifiziert.
- Changeset für diese Version angelegt (`.changeset/m1-card-list-accordion.md`).
- Workflows `release.yml` (Changesets → npm) und `storybook.yml` (Build → GitHub Pages) erstellt.
- Interne Dokumentation und Decision Register mit dem Design System synchronisiert.

## Offene Produktentscheidungen (bewusst nicht vom Agenten entschieden)

- **Deploy-Ziel** GitHub Pages vs. interne AWS/CF-Infrastruktur (siehe Abschnitt „Deploy-Ansatz“).

Entschieden: Paket-Sichtbarkeit ist `public`.

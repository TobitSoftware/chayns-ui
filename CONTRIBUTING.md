# Mitwirken an chayns UI

Diese Anleitung erklärt, wie du lokal am Package arbeitest, Änderungen einbringst
und – vor allem – wie neue Versionen entstehen und veröffentlicht werden. Der
Release-Weg läuft bewusst über **Changesets**; wer das noch nicht kennt, findet
den kompletten Ablauf weiter unten.

## Voraussetzungen

- **Node 24.19.0** (siehe `.node-version`).
- **pnpm 11.22.0** – gepinnt über das `packageManager`-Feld. Aktivierung via Corepack:

```sh
corepack enable
```

Andere Paketmanager (npm, yarn) werden für den Workspace nicht verwendet.

## Repository einrichten

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm verify
```

`verify` ist die vollständige Qualitätskette (Format, Lint, Stylelint, Typecheck,
Unit- und Typ-Tests, Build, Token-Check, Storybook-Build inkl. Axe-A11y-Tests,
Package- und Tree-Shaking-Checks). Genau diese Kette läuft auch in der CI – ist sie
lokal grün, ist der PR es in aller Regel auch.

## Aufbau des Workspace

| Pfad                           | Inhalt                                                                   |
| ------------------------------ | ------------------------------------------------------------------------ |
| `packages/core`                | `@chayns-ui/core` – React-Komponenten (ESM-only, explizite CSS-Exports)  |
| `packages/tokens`              | `@chayns-ui/tokens` – generierte Design-Token-CSS, keine JS-Runtime      |
| `docs/`                        | Entscheidungen, Design-System-Doku, Komponenten-Spezifikationen, Release |
| `.storybook/`, `*.stories.tsx` | Storybook als lebende Dokumentation                                      |
| `tooling/`                     | Repository-Checks (Package, Tree-Shaking, Tokens, Consumer)              |

## Täglich entwickeln

```sh
corepack pnpm storybook        # Storybook lokal unter http://localhost:6006
corepack pnpm test:unit        # Unit-Tests mit Coverage
corepack pnpm lint             # ESLint
corepack pnpm verify           # komplette Kette vor dem PR
```

## Neue Komponenten (Gate beachten)

Das Projekt ist gate-gesteuert: Eine Core-, Layout- oder Business-Komponente darf
erst implementiert werden, wenn ihre Spezifikation vollständig und ihre
READY-Bewertung dokumentiert ist (siehe `docs/03-components/` und
`docs/01-decisions/ui-decision-register.md`). Bei Mehrdeutigkeit gilt: nicht raten,
sondern offen markieren und klären. Details in `AGENTS.md`.

## Änderungen einbringen

1. Branch von `main` erstellen.
2. Änderung umsetzen, `corepack pnpm verify` grün bekommen.
3. **Changeset hinzufügen** (siehe unten) – gehört mit in den PR.
4. PR nach `main` öffnen. Die CI (`verify`) muss grün sein.
5. Review, dann Merge.

## Versionen & Veröffentlichung (Changesets)

Wir bestimmen die nächste Version **nicht** manuell über Tags, sondern beschreiben
pro Änderung ihre Auswirkung mit einem _Changeset_. Das ist der Standardweg für
Monorepos und erzeugt automatisch korrekte Per-Paket-Versionen und Changelogs.

### Schritt 1 – Changeset zur Änderung anlegen

Nachdem deine Änderung steht:

```sh
corepack pnpm changeset
```

Der interaktive Dialog fragt:

- **Welche Pakete** sind betroffen (`@chayns-ui/core`, `@chayns-ui/tokens`)?
- **Welche Semver-Stufe** je Paket?
  - **patch** – Bugfix / interne Korrektur, keine API-Änderung.
  - **minor** – neue, abwärtskompatible Funktion (z. B. neue Komponente).
  - **major** – Breaking Change an der öffentlichen API.
- **Kurze Zusammenfassung** – landet später im Changelog (in Englisch schreiben).

Es entsteht eine Markdown-Datei unter `.changeset/`. **Diese Datei committen** und
mit in den PR nehmen.

### Schritt 2 – Merge nach `main`

Sobald dein PR (mitsamt Changeset) auf `main` gemergt ist, öffnet der
Release-Workflow automatisch einen Sammel-PR **„chore: version packages"**. Dieser

- erhöht die Paketversionen anhand aller offenen Changesets,
- schreibt die `CHANGELOG.md`-Dateien,
- entfernt die verbrauchten Changeset-Dateien.

Mehrere gemergte Changesets werden dabei zu **einem** Versions-PR zusammengefasst.

### Schritt 3 – Versions-PR mergen = Veröffentlichung

Beim Merge des „chore: version packages"-PR baut und veröffentlicht der Workflow
die Pakete auf npm. Im selben Push wird auch das Storybook neu deployt.

Die Veröffentlichung nutzt **npm Trusted Publishing (OIDC)**: Die GitHub Action
authentifiziert sich per kurzlebigem Token der Workflow-Identität – es gibt
bewusst **kein** langlebiges npm-Secret im Repository. Build-Provenance wird dabei
automatisch angehängt.

### Kurzform

```text
Änderung → corepack pnpm changeset → PR mergen
      → "chore: version packages"-PR mergen → npm-Release + Storybook-Deploy
```

## Commits

Bevorzugt kleine, atomare Commits; jeweils ein logischer Schritt. Commit-Nachrichten
in Englisch, beginnend mit einem passenden Gitmoji und einem knappen, imperativen
Titel.

## Weiterführend

- Storybook (Live): https://tobitsoftware.github.io/chayns-ui/
- Design System: https://tappqa.tobit.com/Bodywork/DesignSystem/
- Release-Details & manuelle Einrichtung: `docs/04-release/first-release-checklist.md`

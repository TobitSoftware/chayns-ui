# chayns UI

`chayns UI` ist ein modulares UI-System auf Basis von React und TypeScript für chayns-Anwendungen.

Das Projekt verfolgt insbesondere folgende Ziele:

* konsistente und wiederverwendbare UI-Komponenten,
* klare Trennung von UI und Business-Logik,
* zentrale Design Tokens und CSS-Variablen,
* Accessibility von Beginn an,
* wiederverwendbare Layout-Komponenten,
* Vorbereitung auf KI-gestützte Entwicklung und Nutzung,
* eindeutige und maschinenlesbare Regeln für Komponenten und deren Einsatz.

## Aktueller Projektstatus

Das Projekt bleibt grundsätzlich gate-gesteuert in der Planungs- und Spezifikationsphase. Milestone 1 stellt die freigegebene technische Basis sowie die vollständig spezifizierten Core-Komponenten `Button` und `IconButton` bereit. Weitere Komponenten benötigen weiterhin eine dokumentierte READY-Bewertung vor der Implementierung.

## Workspace

Voraussetzungen sind Node 24.19.0 und das über `packageManager` gepinnte pnpm 11.22.0. Der Workspace enthält:

* `@chayns-ui/core`: ESM-only React-Komponenten mit expliziten CSS-Exports,
* `@chayns-ui/tokens`: generierte Baseline- und Patch-CSS ohne JavaScript-Runtime,
* Storybook und die repository-weiten Qualitätsprüfungen als private Root-Infrastruktur.

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm verify
```

## Consumer-Nutzung

```sh
pnpm add @chayns-ui/core @chayns-ui/tokens react
```

```tsx
import { Button, IconButton } from '@chayns-ui/core';
import '@chayns-ui/tokens/baseline.css';
import '@chayns-ui/tokens/patch.css';
import '@chayns-ui/core/button.css';

<Button variant="primary">Speichern</Button>;
<IconButton aria-label="Optionen" icon={<ApprovedRegularIcon />} variant="ghost" />;
```

Anwendungen importieren aufgelöste Token-CSS und Komponenten-CSS ausdrücklich. Die Bibliothek lädt keine Fonts, injiziert kein CSS und kalibriert keine Accent-Farbe zur Laufzeit.

## Logische Bereiche

* Core UI
* Business Components
* Layout Components
* Design Tokens / CSS
* Documentation & AI Specifications

## Design-System-Referenz

Die visuelle und konzeptionelle Grundlage ist das [chayns Design System](https://tappqa.tobit.com/Bodywork/DesignSystem/). Die im Repository dokumentierten und bestätigten Entscheidungen werden später die technische Source of Truth bilden.

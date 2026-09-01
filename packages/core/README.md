# @chayns-ui/core

Barrierefreie React-Core-Komponenten für chayns UI. ESM-only, ohne
Business-Logik, ohne Laufzeit-CSS-Injektion. Komponenten- und Token-CSS werden
ausdrücklich importiert, damit Tree-Shaking nur das Genutzte ins Bundle nimmt.

- **Storybook (Live):** https://tobitsoftware.github.io/chayns-ui/
- **Repository & Mitwirken:** https://github.com/TobitSoftware/chayns-ui

## Installation

```sh
pnpm add @chayns-ui/core @chayns-ui/tokens react
```

`react >= 19.2` ist eine Peer Dependency. `@chayns-ui/tokens` liefert die
Design-Token-Basis.

## Verwendung

```tsx
import { Button, IconButton } from '@chayns-ui/core';

// Einmal pro App:
import '@chayns-ui/tokens/baseline.css';
import '@chayns-ui/tokens/patch.css';

// Pro genutzter Komponente:
import '@chayns-ui/core/button.css';

<Button icon="fa-floppy-disk" variant="primary">Speichern</Button>;
<IconButton aria-label="Optionen" icon="fa-ellipsis" variant="ghost" />;
```

## Enthaltene Komponenten

| Import | CSS-Export |
|---|---|
| `Button`, `IconButton` | `@chayns-ui/core/button.css` |
| `Card` | `@chayns-ui/core/card.css` |
| `List`, `ListItem` | `@chayns-ui/core/list.css` |
| `Accordion`, `AccordionGroup` | `@chayns-ui/core/accordion.css` |

Alternativ lädt `@chayns-ui/core/styles.css` das gebündelte CSS aller Komponenten.

## Hinweise

Die Bibliothek lädt keine Fonts, injiziert kein CSS und kalibriert keine
Accent-Farbe zur Laufzeit. Farb-, Dichte- und Motion-Eingaben kommen aus den
Design Tokens der Anwendung.

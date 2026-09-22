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
| `Button`, `IconButton`, `SplitButton` | `@chayns-ui/core/button.css`, `@chayns-ui/core/split-button.css` |
| `Card` | `@chayns-ui/core/card.css` |
| `Avatar`, `AvatarGroup`, `Badge`, `Banner` | matching CSS exports |
| `List` | `@chayns-ui/core/list.css` |
| `TextField`, `TextArea`, `Checkbox`, `Switch`, `RadioGroup`, `SegmentedControl`, `Banner`, `ComboBox` | matching CSS exports |
| `Accordion`, `AccordionGroup` | `@chayns-ui/core/accordion.css` |
| `Popup`, `PopupList` | `@chayns-ui/core/popup.css` |
| `SplitButton` | `@chayns-ui/core/split-button.css` |

Alternativ lädt `@chayns-ui/core/styles.css` das gebündelte CSS aller Komponenten.

`ListItem` wurde vor 1.0 durch `List.Item` ersetzt. Komponiere Zeilen mit
`List.Item.Action`, `List.Item.Body`, `List.Item.Title` und optionalen Slots.

`ComboBox` unterstützt Single-Select und Multi-Select. `TextField` und
`TextArea` akzeptieren native `type`- beziehungsweise `autoComplete`-Werte,
einschließlich `type="password"`; eine Sichtbarkeitsumschaltung ist kein Teil
des Core-Vertrags. `Badge` ist ein statischer Statusindikator, während
`Banner` ein optional schließbares Statusmuster ist.

## Hinweise

Die Bibliothek lädt keine Fonts, injiziert kein CSS und kalibriert keine
Accent-Farbe zur Laufzeit. Farb-, Dichte- und Motion-Eingaben kommen aus den
Design Tokens der Anwendung.

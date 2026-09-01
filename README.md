# chayns UI

`chayns UI` ist ein modulares UI-System auf Basis von React und TypeScript für
chayns-Anwendungen. Es liefert konsistente, barrierefreie Core-Komponenten auf
Grundlage zentraler Design Tokens – ohne Business-Logik und ohne Laufzeit-Magie.

- **Storybook (Live):** https://tobitsoftware.github.io/chayns-ui/
- **Design-System-Referenz:** https://tappqa.tobit.com/Bodywork/DesignSystem/
- **Mitwirken & Releases:** [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## Ziele

- konsistente, wiederverwendbare UI-Komponenten,
- klare Trennung von UI und Business-Logik,
- zentrale Design Tokens und CSS-Variablen,
- Accessibility (WCAG 2.2 AA) von Beginn an,
- perfektes Tree-Shaking dank granularer, seiteneffektfreier Exports,
- eindeutige, maschinenlesbare Regeln für Komponenten und deren Einsatz.

## Aktueller Projektstatus

Das Projekt ist gate-gesteuert. Veröffentlicht ist ein erster stabiler
Komponentensatz – `Button`/`IconButton`, `Card`, `List`/`ListItem` sowie
`Accordion`/`AccordionGroup`. Weitere Komponenten benötigen vor der
Implementierung eine dokumentierte READY-Bewertung (siehe `docs/`).

## Pakete

| Paket | Inhalt |
|---|---|
| [`@chayns-ui/core`](./packages/core) | React-Core-Komponenten (ESM-only, explizite CSS-Exports) |
| [`@chayns-ui/tokens`](./packages/tokens) | generierte Baseline- und Patch-CSS ohne JS-Runtime |

## In einem Projekt verwenden

```sh
pnpm add @chayns-ui/core @chayns-ui/tokens react
```

```tsx
import { Button, IconButton } from '@chayns-ui/core';

// Einmal pro App die Token-Basis laden:
import '@chayns-ui/tokens/baseline.css';
import '@chayns-ui/tokens/patch.css';

// Pro genutzter Komponente das zugehörige CSS importieren:
import '@chayns-ui/core/button.css';

export function Example() {
  return (
    <>
      <Button icon="fa-floppy-disk" variant="primary">
        Speichern
      </Button>
      <IconButton aria-label="Optionen" icon="fa-ellipsis" variant="ghost" />
    </>
  );
}
```

Komponenten- und Token-CSS werden **ausdrücklich** importiert. Die Bibliothek lädt
keine Fonts, injiziert kein CSS und kalibriert keine Accent-Farbe zur Laufzeit.
Dadurch landet nur das im Bundle, was tatsächlich genutzt wird.

Verfügbare CSS-Exports von `@chayns-ui/core`: `button.css`, `card.css`, `list.css`,
`accordion.css` – oder gebündelt `styles.css`.

## Lokal entwickeln

Voraussetzungen: Node 24.19.0 und das über `packageManager` gepinnte pnpm 11.22.0.

```sh
corepack enable
corepack pnpm install --frozen-lockfile
corepack pnpm storybook   # Storybook unter http://localhost:6006
corepack pnpm verify      # komplette Qualitätskette
```

Anpassungen am Package, Namenskonventionen und der Release-Ablauf sind in
[`CONTRIBUTING.md`](./CONTRIBUTING.md) beschrieben.

## Logische Bereiche

- Core UI
- Business Components
- Layout Components
- Design Tokens / CSS
- Documentation & AI Specifications

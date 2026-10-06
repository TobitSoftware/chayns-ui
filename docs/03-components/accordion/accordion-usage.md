## Einsatz

Inhalt bei Bedarf ein- und ausklappen, etwa zusätzliche Details oder Erläuterungen. Einzelne Accordions öffnen unabhängig voneinander. Die List-Darstellung eignet sich für Einträge mit Titel und Vorschau, bei denen ein Klick Inhalt öffnet statt in eine andere Ansicht zu führen.

## Nicht geeignet

Informationen, die jeder unmittelbar sehen muss, gehören nicht hinter einen Aufklapper. Accordions bilden weder Navigation noch eine verbindliche Schrittfolge ab. Gleichwertige Inhalte bleiben möglichst auf einer Ebene statt unnötig verschachtelt zu werden.

## Alternativen

[Tabs](?path=/docs/layout-tabs--docs) wechseln zwischen gleichrangigen Ansichten. [Card](?path=/docs/core-card--docs) hält zusammengehörigen Inhalt dauerhaft sichtbar. [List](?path=/docs/core-list--docs) eignet sich, wenn ein Eintrag navigiert statt sich aufzuklappen.

## Gut kombinierbar

[AccordionGroup](?path=/story/core-accordion--grouped) verbindet mehrere Accordions zu einer gemeinsamen Fläche und sorgt dafür, dass höchstens eines geöffnet ist. Im aufgeklappten Inhalt können [TextField](?path=/docs/core-textfield--docs), [List](?path=/docs/core-list--docs) und [Button](?path=/docs/core-button--docs) stehen.

## Verwendung

Für einen einfachen Abschnitt reichen `title` und `children`. `defaultOpen` öffnet ihn anfangs; für extern gesteuertes Öffnen gemeinsam `open` und `onOpenChange` verwenden.

```tsx
import { Accordion } from '@chayns-ui/core';

<Accordion title="Details" defaultOpen>
  <p>Weitere Informationen</p>
</Accordion>;
```

## Besonderheiten

In einer AccordionGroup besitzt die Gruppe den Öffnungszustand. Verschachtelung im Inhalt erzeugt automatisch die kompakte Wrapped-Darstellung, ohne eigene Prop; Gruppierung und Verschachtelung sind unabhängig. `appearance={AccordionAppearances.List}` ergänzt die List-Darstellung. Der Header ist per Enter und Leertaste bedienbar. Eigene Header-Slots enthalten keine zusätzlichen Buttons oder Links.

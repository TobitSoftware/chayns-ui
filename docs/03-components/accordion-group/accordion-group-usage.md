## Einsatz

Mehrere zusammengehörige Accordions als gemeinsame Einheit darstellen, beispielsweise FAQ-Abschnitte. AccordionGroup ergänzt Rahmen und Zustandskoordination: Öffnen eines Eintrags schließt den bisher geöffneten Eintrag derselben Gruppe.

## Nicht geeignet

Keine Gruppe einsetzen, wenn mehrere Abschnitte gleichzeitig und unabhängig offen bleiben sollen. Pflichtinformationen bleiben sichtbar; geordnete Arbeitsschritte benötigen einen dafür vorgesehenen Workflow.

## Alternativen

Für unabhängiges Öffnen mehrere [Accordions](?path=/story/core-accordion--standalone) ohne Gruppe nebeneinander verwenden. [Tabs](?path=/docs/layout-tabs--docs) sind geeignet, wenn vollständige gleichrangige Ansichten wechseln sollen.

## Gut kombinierbar

[Accordion](?path=/docs/core-accordion--docs) ist der erforderliche Inhalt der Gruppe und kein austauschbarer Ersatz für sie. [TextField](?path=/docs/core-textfield--docs) und [Button](?path=/docs/core-button--docs) können innerhalb der geöffneten Accordion-Inhalte verwendet werden.

## Verwendung

Accordions mit stabilen `id`-Werten als Kinder einfügen. Normalen Inhalt jedes Accordions in `Accordion.Content` setzen, damit seine Innenabstände stimmen. `defaultOpenId` benennt den anfangs geöffneten Eintrag. Für kontrollierten Zustand `openId` zusammen mit `onOpenChange` verwenden.

```tsx
import { Accordion, AccordionGroup } from '@chayns-ui/core';

<AccordionGroup defaultOpenId="details">
  <Accordion id="details" title="Details">
    <Accordion.Content>Inhalt</Accordion.Content>
  </Accordion>
  <Accordion id="history" title="Verlauf">
    <Accordion.Content>Historie</Accordion.Content>
  </Accordion>
</AccordionGroup>;
```

## Besonderheiten

Eine verschachtelte AccordionGroup direkt im übergeordneten Accordion einsetzen, ohne zusätzlichen Content-Wrapper um die Gruppe. Das gilt auch für verschachtelte Accordions und Listen; gewöhnlicher Text/Controls behalten ihren eigenen Content-Part.

`null` bedeutet, dass alle Einträge geschlossen sind. Lokale `open`-/`defaultOpen`-Props der Kinder steuern die Gruppe nicht. Verschachtelte Gruppen koordinieren nur ihre eigenen Einträge; ihr Zustand ist unabhängig von der äußeren Gruppe. Wrapped-Darstellung entsteht durch Verschachtelung im Accordion-Inhalt, nicht allein durch Gruppierung.

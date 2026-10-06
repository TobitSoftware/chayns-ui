## Einsatz

Zusammengehörige Abschnitte so gruppieren, dass höchstens einer geöffnet ist.

## Nicht geeignet

Unabhängig offene Abschnitte, stets sichtbare Informationen oder geordnete Workflows.

## Alternativen

[Accordion](?path=/docs/core-accordion--docs) für unabhängige Abschnitte; [Tabs](?path=/docs/layout-tabs--docs) für wechselnde Ansichten.

## Gut kombinierbar

[Accordion](?path=/docs/core-accordion--docs) als Kinder; Formular-Controls in deren Inhalten.

## Verwendung

```tsx
<AccordionGroup defaultOpenId="details">
  <Accordion id="details" title="Details">
    Inhalt
  </Accordion>
  <Accordion id="history" title="Verlauf">
    Historie
  </Accordion>
</AccordionGroup>;
```

## Besonderheiten

Die Gruppe besitzt den Öffnungszustand: openId/onOpenChange oder defaultOpenId; null schließt alle. Kinder benötigen stabile IDs. Verschachtelte Gruppen bleiben unabhängig exklusiv und verwenden den kompakten gemeinsamen Rahmen.

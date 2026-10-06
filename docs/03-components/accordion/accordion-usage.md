## Einsatz

Abschnitte unabhängig ein- und ausklappen. Die List-Darstellung eignet sich für zweizeilige Einträge, die sich öffnen statt zu navigieren.

## Nicht geeignet

Pflichtinformationen verstecken, geordnete Arbeitsschritte abbilden oder gleichartige Inhalte unnötig tief verschachteln.

## Alternativen

[AccordionGroup](?path=/docs/core-accordion--docs) für exklusive Abschnitte; [Tabs](?path=/docs/layout-tabs--docs) für wechselnde Ansichten; [Card](?path=/docs/core-card--docs) für dauerhaft sichtbaren Inhalt.

## Gut kombinierbar

Formular-Controls, [List](?path=/docs/core-list--docs) und [Button](?path=/docs/core-button--docs) im Inhalt.

## Verwendung

```tsx
<Accordion title="Details" defaultOpen>
  <p>Weitere Informationen</p>
</Accordion>;
```

## Besonderheiten

open/onOpenChange ist kontrolliert, defaultOpen setzt den Anfangszustand. Verschachtelung im Inhalt erzeugt automatisch Wrapped. Header ist per Enter/Leertaste bedienbar; appearance={AccordionAppearances.List} aktiviert die List-Darstellung.

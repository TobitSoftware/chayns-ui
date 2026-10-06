## Einsatz

Zusammengehörigen, eigenständigen Inhalt auf einer abgegrenzten Fläche bündeln.

## Nicht geeignet

Die gesamte Fläche als Aktion verwenden oder Business-Logik im Container unterbringen.

## Alternativen

[List](?path=/docs/core-list--docs) für viele vergleichbare Einträge; [Accordion](?path=/docs/core-accordion--docs) für einklappbare Abschnitte.

## Gut kombinierbar

[Avatar](?path=/docs/core-avatar--docs), [Badge](?path=/docs/core-badge--docs), [Button](?path=/docs/core-button--docs) und Formular-Controls.

## Verwendung

```tsx
<Card>
  <Card.Header>Projekt</Card.Header>
  <p>Projektbeschreibung</p>
</Card>;
```

## Besonderheiten

Card übernimmt die inneren Standardabstände. Bei Hover hebt sie sich um 4px in 220ms mit Schatten an, ohne Druck-Effekt. Das Header-Icon wird Solid; seine Fläche wächst leicht und wechselt zur Akzentfarbe. Reduced Motion unterdrückt die Bewegung. Header ist optional. Aktionen und Navigation bleiben native Controls bzw. Links innerhalb des Inhalts.

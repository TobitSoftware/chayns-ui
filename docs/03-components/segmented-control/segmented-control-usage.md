## Einsatz

Sofort zwischen zwei bis vier gleichwertigen Darstellungen desselben Inhalts oder eng verwandten Einstellungen wechseln.

## Nicht geeignet

Mehrfachfilter, fünf oder mehr Optionen oder eigenständige Tab-Panels.

## Alternativen

[Tabs](?path=/docs/layout-tabs--docs) für zugehörige Panels; [RadioGroup](?path=/docs/core-radiogroup--docs) für Formularauswahl; [ComboBox](?path=/docs/core-combobox--docs) für längere Auswahl.

## Gut kombinierbar

[List](?path=/docs/core-list--docs) und [Card](?path=/docs/core-card--docs) als umgeschaltete Darstellung.

## Verwendung

```tsx
<SegmentedControl label="Ansicht" defaultValue="list">
  <SegmentedControl.Segment value="list">Liste</SegmentedControl.Segment>
  <SegmentedControl.Segment value="cards">Karten</SegmentedControl.Segment>
</SegmentedControl>;
```

## Besonderheiten

Segment gehört unter SegmentedControl. value/onValueChange ist kontrolliert; defaultValue ist optional. Fehlt eine gültige Auswahl, wird die erste aktivierte Option gewählt bzw. kontrolliert vorgeschlagen. Pfeiltasten sowie Home/End navigieren; Auswahl ist kein Tab-Panel-Vertrag.

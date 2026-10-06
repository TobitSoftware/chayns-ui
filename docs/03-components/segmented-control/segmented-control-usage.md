## Einsatz

Sofort zwischen wenigen gleichwertigen Darstellungen desselben Inhalts wechseln, etwa Liste und Karten. Bodywork empfiehlt zwei bis vier Segmente; auch eng verwandte Einstellungen können so kompakt angeboten werden.

## Nicht geeignet

Keine Mehrfachfilter, umfangreiche Optionsmenge oder eigene Tab-Panels damit abbilden. SegmentedControl wählt einen Wert, es verbindet keine Panels über einen Tabs-Vertrag.

## Alternativen

[Tabs](?path=/docs/layout-tabs--docs) verbindet gleichrangige Ansichten mit Panels. [RadioGroup](?path=/docs/core-radiogroup--docs) eignet sich für sichtbare Formularentscheidungen, [ComboBox](?path=/docs/core-combobox--docs) für längere Auswahlen.

## Gut kombinierbar

[List](?path=/docs/core-list--docs) und [Card](?path=/docs/core-card--docs) können die beiden Darstellungen liefern. Die Anwendung entscheidet anhand des gewählten Werts, welche Darstellung erscheint.

## Verwendung

Segmente mit eindeutigen Werten unter `SegmentedControl` setzen und die Gruppe über `label` benennen. `defaultValue` gibt eine Anfangsauswahl vor; `value`/`onValueChange` steuert sie kontrolliert.

```tsx
import { SegmentedControl } from '@chayns-ui/core';

<SegmentedControl label="Ansicht" defaultValue="list">
  <SegmentedControl.Segment value="list">Liste</SegmentedControl.Segment>
  <SegmentedControl.Segment value="cards">Karten</SegmentedControl.Segment>
</SegmentedControl>;
```

## Besonderheiten

Ohne gültige Auswahl wird die erste aktivierte Option gewählt bzw. kontrolliert einmal vorgeschlagen. Der kontrollierte Consumer muss den Vorschlag bestätigen. Pfeiltasten sowie Home/End ändern die Auswahl; deaktivierte Segmente werden übersprungen. Mengenempfehlungen sind Auswahlhilfe und keine zusätzliche Runtime-Grenze.

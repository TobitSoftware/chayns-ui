## Einsatz

Bekannte Optionen kompakt in einer aufklappbaren Auswahl anbieten. Für längere Einzelauswahlen oder Mehrfachauswahl ab etwa vier Optionen ist das übersichtlicher als viele dauerhaft sichtbare Controls.

## Nicht geeignet

Wenige unabhängige Optionen nicht unnötig verstecken. ComboBox ist kein Freitext- oder Suchfeld. Eine fachliche Personen-Auswahl mit Avatar-/Kanal-Kontext benötigt eigene Business-Komposition statt nur einer allgemeinen Optionsliste.

## Alternativen

[RadioGroup](?path=/docs/core-radiogroup--docs) macht wenige exklusive Optionen sichtbar, [Checkbox](?path=/docs/core-checkbox--docs) wenige unabhängige Optionen. [TextField](?path=/docs/core-textfield--docs) ist für freien Text geeignet.

## Gut kombinierbar

[TextField](?path=/docs/core-textfield--docs) und [Button](?path=/docs/core-button--docs) ergänzen weitere Formularwerte und Bestätigung. [Card](?path=/docs/core-card--docs) kann den Formularbereich zusammenfassen.

## Verwendung

Optionen als `ComboBox.Option` mit stabilen `value`-Werten und sichtbaren Labels einsetzen. Ein Platzhalter liefert die Floating-Beschriftung; ohne sichtbare Beschriftung einen zugänglichen Namen bereitstellen.

```tsx
import { ComboBox } from '@chayns-ui/core';

<ComboBox aria-label="Kategorie" placeholder="Kategorie" defaultValue="design">
  <ComboBox.Option value="design">Design</ComboBox.Option>
  <ComboBox.Option value="engineering">Entwicklung</ComboBox.Option>
</ComboBox>;
```

## Besonderheiten

Einzelauswahl verwendet Strings in `value`/`defaultValue`/`onValueChange`; `multiple` verwendet Arrays von Option-Elementen. Nach jeder Auswahl schließt das Popup, auch bei Mehrfachauswahl. Pfeiltasten navigieren, Escape schließt und stellt Trigger-Fokus wieder her. Optionen werden nicht automatisch gefiltert; die Anwendung liefert Inhalt und Zustand.

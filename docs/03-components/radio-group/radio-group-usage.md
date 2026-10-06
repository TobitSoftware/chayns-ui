## Einsatz

Genau eine von zwei bis fünf sichtbaren Optionen wählen.

## Nicht geeignet

Mehrfachauswahl, lange Optionenlisten oder sofort wirkende binäre Einstellungen.

## Alternativen

[ComboBox](?path=/docs/core-combobox--docs) für längere Auswahl; [Checkbox](?path=/docs/core-checkbox--docs) für unabhängige Optionen; [Switch](?path=/docs/core-switch--docs) für binäre Einstellungen; [Tabs](?path=/docs/layout-tabs--docs) für zugehörige Ansichten.

## Gut kombinierbar

[TextField](?path=/docs/core-textfield--docs) und [Button](?path=/docs/core-button--docs) in Formularen.

## Verwendung

```tsx
<RadioGroup name="delivery" label="Versand" defaultValue="standard">
  <RadioGroup.Radio value="standard">Standard</RadioGroup.Radio>
  <RadioGroup.Radio value="express">Express</RadioGroup.Radio>
</RadioGroup>;
```

## Besonderheiten

name verbindet die nativen Radios. value/onValueChange ist kontrolliert, defaultValue setzt den Anfangswert. Gruppe zugänglich benennen; label erzeugt eine sichtbare Legende. Native Pfeiltastenbedienung und Formularsemantik bleiben erhalten.

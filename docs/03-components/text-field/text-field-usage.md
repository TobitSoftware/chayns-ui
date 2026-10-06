## Einsatz

Freien einzeiligen Text mit Floating Label und optionalen Hilfen, Fehlern und Zähler eingeben.

## Nicht geeignet

Bekannte Auswahlwerte, mehrzeiligen Text oder Datumsauswahl.

## Alternativen

[ComboBox](?path=/docs/core-combobox--docs) für bekannte Werte; [TextArea](?path=/docs/core-textarea--docs) für mehrere Zeilen; [DateTimePicker](?path=/docs/core-datetimepicker--docs) für Datum oder Uhrzeit.

## Gut kombinierbar

[Checkbox](?path=/docs/core-checkbox--docs), [RadioGroup](?path=/docs/core-radiogroup--docs) und [Button](?path=/docs/core-button--docs) in Formularen.

## Verwendung

```tsx
<TextField
  placeholder="E-Mail-Adresse"
  type="email"
  helpText="Für wichtige Nachrichten."
/>;
```

## Besonderheiten

placeholder liefert das Floating Label. Native value/defaultValue und onChange bleiben erhalten. error steuert den Fehlerzustand und die zugängliche Beschreibung; helpText und counter werden von der Anwendung formuliert.

## Einsatz

Wenige unabhängige Optionen sichtbar auswählen; zwei bis drei Optionen bleiben ohne Dropdown gut auffindbar.

## Nicht geeignet

Exklusive Auswahl, sofort wirkende binäre Einstellungen oder lange Mehrfachauswahl.

## Alternativen

[RadioGroup](?path=/docs/core-radiogroup--docs) für exklusive Auswahl; [Switch](?path=/docs/core-switch--docs) für sofortige Einstellungen; [ComboBox](?path=/docs/core-combobox--docs) für längere Mehrfachauswahl.

## Gut kombinierbar

[TextField](?path=/docs/core-textfield--docs), [TextArea](?path=/docs/core-textarea--docs) und [Button](?path=/docs/core-button--docs) in Formularen.

## Verwendung

```tsx
<Checkbox name="newsletter" description="Einmal im Monat">
  Newsletter abonnieren
</Checkbox>;
```

## Besonderheiten

children ist die sichtbare Beschriftung. Native checked/defaultChecked, onChange, required und disabled verwenden. description ergänzt die zugängliche Erklärung; Formularauswertung bleibt Anwendungssache.

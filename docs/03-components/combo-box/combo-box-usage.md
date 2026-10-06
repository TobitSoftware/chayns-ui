## Einsatz

Bekannte Optionen kompakt auswählen; ab vier Optionen vermeidet Mehrfachauswahl eine lange Checkbox-Liste.

## Nicht geeignet

Wenige unabhängige Optionen verstecken, freien Text eingeben oder fachliche Identitätsauswahl mit Datenbeschaffung abbilden.

## Alternativen

[RadioGroup](?path=/docs/core-radiogroup--docs) für wenige exklusive Optionen; [Checkbox](?path=/docs/core-checkbox--docs) für wenige unabhängige Optionen; [TextField](?path=/docs/core-textfield--docs) für freien Text.

## Gut kombinierbar

[TextField](?path=/docs/core-textfield--docs), [Button](?path=/docs/core-button--docs) und [Card](?path=/docs/core-card--docs) in Formularen.

## Verwendung

```tsx
<ComboBox aria-label="Kategorie" placeholder="Kategorie" defaultValue="design">
  <ComboBox.Option value="design">Design</ComboBox.Option>
  <ComboBox.Option value="engineering">Entwicklung</ComboBox.Option>
</ComboBox>;
```

## Besonderheiten

Option gehört unter ComboBox. Einzelauswahl verwendet String-Werte; multiple verwendet Arrays von Option-Elementen. Nach einer Auswahl schließt das Popup. Zugänglichen Namen bereitstellen; Pfeiltasten navigieren, Escape schließt.

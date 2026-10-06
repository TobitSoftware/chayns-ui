## Einsatz

Genau eine Option aus einer kleinen sichtbaren Auswahl wählen, typischerweise zwei bis fünf Möglichkeiten. Radios eignen sich, wenn Nutzer die Alternativen direkt vergleichen sollen, etwa verschiedene Versandarten.

## Nicht geeignet

Keine unabhängige Mehrfachauswahl, lange Optionsliste oder sofortige Ein/Aus-Einstellung als RadioGroup abbilden. Ein Wertwechsel ist keine Navigation zu einem Tab-Panel.

## Alternativen

[ComboBox](?path=/docs/core-combobox--docs) bietet längere Einzelauswahlen kompakt an. [Checkbox](?path=/docs/core-checkbox--docs) erlaubt unabhängige Entscheidungen; [Switch](?path=/docs/core-switch--docs) schaltet eine binäre Einstellung sofort.

## Gut kombinierbar

[TextField](?path=/docs/core-textfield--docs) ergänzt andere Formularwerte. [Button](?path=/docs/core-button--docs) kann die vollständige Formulareingabe bestätigen.

## Verwendung

`RadioGroup.Radio` mit eindeutigen Werten unter der Gruppe verwenden. `name` verbindet die nativen Radios für Auswahl und Formularübermittlung; `label` erzeugt eine sichtbare Gruppenlegende.

```tsx
import { RadioGroup } from '@chayns-ui/core';

<RadioGroup name="delivery" label="Versand" defaultValue="standard">
  <RadioGroup.Radio value="standard">Standard</RadioGroup.Radio>
  <RadioGroup.Radio value="express">Express</RadioGroup.Radio>
</RadioGroup>;
```

## Besonderheiten

`value`/`onValueChange` ist kontrolliert, `defaultValue` bestimmt die Anfangsauswahl. Eine Gruppe benötigt einen zugänglichen Namen, sichtbare Radio-Labels erklären die Optionen. Native Pfeiltastenbedienung bleibt erhalten; die Anwendung interpretiert den ausgewählten Wert und verarbeitet das Formular.

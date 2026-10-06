## Einsatz

Unabhängige Optionen auswählen, von denen mehrere gleichzeitig gelten können. Zwei oder drei sichtbare Optionen bleiben besonders gut auffindbar. Auch eine einzelne Entscheidung, die erst mit einem Formular bestätigt wird, passt zu Checkbox.

## Nicht geeignet

Keine exklusive Auswahl oder sofort wirksame Einstellung als Checkbox-Liste darstellen. Sehr lange Mehrfachauswahlen benötigen meist eine kompaktere Auswahlfläche.

## Alternativen

[RadioGroup](?path=/docs/core-radiogroup--docs) wählt genau eine Option, [Switch](?path=/docs/core-switch--docs) schaltet eine sofort wirksame Einstellung. [ComboBox](?path=/docs/core-combobox--docs) mit `multiple` eignet sich für längere Optionsmengen.

## Gut kombinierbar

[TextField](?path=/docs/core-textfield--docs), [TextArea](?path=/docs/core-textarea--docs) und [Button](?path=/docs/core-button--docs) bilden ein Formular. Unabhängige Checkboxes brauchen keine RadioGroup.

## Verwendung

Die Bedeutung über sichtbare `children` beschriften. `description` erklärt zusätzliche Folgen. Für Formularübermittlung einen passenden `name` und bei Bedarf `value` angeben.

```tsx
import { Checkbox } from '@chayns-ui/core';

<Checkbox name="newsletter" description="Einmal im Monat">
  Newsletter abonnieren
</Checkbox>;
```

## Besonderheiten

Native `checked`/`defaultChecked`, `onChange`, `required` und `disabled` bleiben erhalten; kontrolliert wird der Wert über `event.target.checked` übernommen. Leertaste schaltet die fokussierte Checkbox. Die Komponente validiert keine fachlichen Voraussetzungen und speichert die Entscheidung nicht selbst.

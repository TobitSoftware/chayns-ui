## Einsatz

Freien einzeiligen Text eingeben, etwa E-Mail-Adresse oder Titel. Floating Label und optionale Hilfe, Fehleranzeige oder Zähler halten Beschriftung und Eingaberückmeldung direkt am Control.

## Nicht geeignet

Für bekannte Antwortmöglichkeiten, mehrzeiligen Inhalt oder gezielte Datumsauswahl sind spezialisierte Controls geeigneter. Das TextField übernimmt keine fachliche Validierung oder Datenbeschaffung.

## Alternativen

[ComboBox](?path=/docs/core-combobox--docs) wählt bekannte Werte, [TextArea](?path=/docs/core-textarea--docs) erfasst mehrere Zeilen. [DateTimePicker](?path=/docs/core-datetimepicker--docs) bietet die bestätigte Datum-/Uhrzeitauswahl.

## Gut kombinierbar

[Checkbox](?path=/docs/core-checkbox--docs), [RadioGroup](?path=/docs/core-radiogroup--docs) und [Button](?path=/docs/core-button--docs) ergänzen ein Formular. Ein umgebender Container verantwortet die Abstände zwischen den Controls.

## Verwendung

`placeholder` liefert die Floating-Beschriftung, nicht eine neue `label`-Prop. Den passenden nativen `type` und Formularattribute wie `name` oder `autoComplete` übergeben.

```tsx
import { TextField } from '@chayns-ui/core';

<TextField
  placeholder="E-Mail-Adresse"
  type="email"
  helpText="Für wichtige Nachrichten."
/>;
```

## Besonderheiten

Native `value`/`defaultValue` und `onChange` bleiben erhalten. `error` setzt Fehlerzustand und zugängliche Beschreibung; `helpText` bleibt auch bei einem Fehler sichtbar. `counter` ist bereits formulierter Inhalt, kein automatisch berechneter Zeichenzähler. Die Anwendung liefert Texte, Validierung und Wert; Passwortfelder haben keine zusätzliche Sichtbarkeits-Toggle-API.

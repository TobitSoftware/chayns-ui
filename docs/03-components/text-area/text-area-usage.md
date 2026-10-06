## Einsatz

Freien mehrzeiligen Text eingeben, etwa eine Nachricht oder Beschreibung. Floating Label, Hilfetext und Fehleranzeige bleiben dem Control zugeordnet und erklären die Eingabe im Formular.

## Nicht geeignet

Für kurze einzeilige Werte ist die zusätzliche Höhe unnötig. Bekannte endliche Antwortmöglichkeiten sollten ausgewählt statt frei eingetippt werden.

## Alternativen

[TextField](?path=/docs/core-textfield--docs) erfasst eine einzelne Zeile. [ComboBox](?path=/docs/core-combobox--docs) bietet bekannte Auswahlwerte an.

## Gut kombinierbar

[Button](?path=/docs/core-button--docs) kann das Formular absenden. [Checkbox](?path=/docs/core-checkbox--docs) ergänzt unabhängige Formularentscheidungen; ein [Card](?path=/docs/core-card--docs)-Container kann den Inhalt gruppieren.

## Verwendung

`placeholder` liefert die sichtbare Floating-Beschriftung. Native `rows` bestimmt die anfängliche Zeilenzahl. `helpText` erklärt, welche Informationen erwartet werden.

```tsx
import { TextArea } from '@chayns-ui/core';

<TextArea placeholder="Nachricht" rows={4} helpText="Beschreibe Dein Anliegen." />;
```

## Besonderheiten

Native `value`/`defaultValue`, `onChange`, `name` und Ref adressieren die Textarea. `error` setzt den Fehlerzustand und die zugängliche Beschreibung; Hilfetext bleibt daneben erhalten. `counter` ist ein bereits formulierter Inhalt und wird nicht aus der Eingabelänge berechnet. Validierung, Zählertext und Lokalisierung verantwortet die Anwendung.

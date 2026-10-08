## Einsatz

Ein lokales Datum oder eine lokale Uhrzeit über das freigegebene Wheel-Control auswählen. Das Control stellt die Auswahl dar; die Anwendung liefert den aktuellen Wert und übernimmt die Änderung.

## Nicht geeignet

Keine freie Texteingabe, Zeitzonenauswahl oder Kalendernavigation erwarten. Die aktuelle Library-Komponente ist ausdrücklich der Wheel-Picker und kein Monatskalender.

## Alternativen

Für Kalendernavigation gibt es derzeit keinen gleichwertigen Library-Ersatz. Die Kalenderdarstellung aus Bodywork ist nicht implementiert.

## Gut kombinierbar

[TextField](?path=/docs/core-textfield--docs) kann andere Formularangaben erfassen, [Button](?path=/docs/core-button--docs) die gesamte Eingabe bestätigen. Fachliche Terminregeln verbleiben im Formular bzw. in der Anwendung.

## Verwendung

`value` als `Date` oder `null` kontrolliert übergeben; `onChange` liefert ein `Date`. `mode` wählt Datum, Zeit oder die kombinierte Auswahl. `inline` rendert ausschließlich die Wheel-Inhalte ohne Trigger und Dialog. `date`, `setDate`, `locale` und die lokalisierten `wheelLabels` stammen im Beispiel aus der Anwendung.

```tsx
import { DateTimePicker, DateTimePickerModes } from '@chayns-ui/core';

<DateTimePicker
  mode={DateTimePickerModes.Date}
  value={date}
  onChange={setDate}
  label="Datum"
  placeholder="Datum wählen"
  locale={locale}
  wheelLabels={wheelLabels}
/>;
```

Für einen eingebetteten Termin-Picker werden Datum, Uhrzeit und das Minutenintervall kombiniert:

```tsx
<DateTimePicker
  inline
  mode="date-time"
  value={date}
  onChange={setDate}
  label="Termin"
  placeholder="Termin wählen"
  locale={locale}
  minuteStep={15}
  wheelLabels={wheelLabels}
/>
```

## Besonderheiten

`label`, `placeholder`, `locale` und alle Wheel-Beschriftungen sind explizit zu liefern. `minDate`/`maxDate` begrenzen Daten; `minuteStep` verwendet die bestätigten Schrittwerte. Die Komponente leitet keine Zeitzone ab. Ihre visuelle Referenz ist die freigegebene Wheel-POC; dies ist eine dokumentierte Abweichung von Bodyworks Kalender.

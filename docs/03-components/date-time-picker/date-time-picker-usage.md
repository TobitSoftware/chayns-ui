## Einsatz

Ein lokales Datum oder eine Uhrzeit im bestätigten Wheel-Control auswählen.

## Nicht geeignet

Freie Texte, kombinierte Datum/Uhrzeit-Eingabe, Zeitzonenauswahl oder Kalendernavigation.

## Alternativen

[TextField](?path=/docs/core-textfield--docs) für freien Text; [ComboBox](?path=/docs/core-combobox--docs) für andere endliche Werte. Beide ersetzen keine Datumsauswahl.

## Gut kombinierbar

[Button](?path=/docs/core-button--docs) und weitere Formular-Controls.

## Verwendung

```tsx
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

## Besonderheiten

Kontrolliert: value ist Date oder null. locale und lokalisierte Wheel-Beschriftungen sind explizit erforderlich; keine Zeitzone wird abgeleitet. minDate/maxDate und minuteStep begrenzen die Auswahl. Referenz ist die freigegebene Wheel-POC, nicht Bodyworks Kalender.

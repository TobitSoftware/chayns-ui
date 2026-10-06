## Einsatz

Eine binäre Einstellung mit sofortiger Wirkung ein- oder ausschalten.

## Nicht geeignet

Auswahl erst nach dem Speichern eines Formulars anwenden.

## Alternativen

[Checkbox](?path=/docs/core-checkbox--docs) für eine später bestätigte Formularentscheidung.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und [List](?path=/docs/core-list--docs) in Einstellungen.

## Verwendung

```tsx
<Switch checked={enabled} onChange={(event) => setEnabled(event.target.checked)}>
  Benachrichtigungen
</Switch>;
```

## Besonderheiten

children beschreibt die Einstellung. Native Checkbox-Props und Leertastenbedienung bleiben erhalten. description kann Auswirkungen erklären; die Anwendung übernimmt die tatsächliche Änderung.

## Einsatz

Eine binäre Einstellung sofort ein- oder ausschalten, etwa Benachrichtigungen. Der Zustand soll die aktuelle Einstellung darstellen und nicht nur eine noch unbestätigte Formularentscheidung.

## Nicht geeignet

Keine Auswahl verwenden, deren Wirkung erst nach Speichern eines Formulars eintritt. Switch eignet sich weder für mehrere gleichwertige Optionen noch für eine allgemeine Aktionsbestätigung.

## Alternativen

[Checkbox](?path=/docs/core-checkbox--docs) beschreibt eine Formularentscheidung, die später bestätigt wird. Mehrere exklusive Optionen können als RadioGroup angeboten werden.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und [List](?path=/docs/core-list--docs) gruppieren Einstellungen. Ein erklärender `description`-Text kann die Folgen der Einstellung direkt sichtbar machen.

## Verwendung

Die Einstellung als sichtbare `children` beschriften. Im kontrollierten Beispiel stammen `enabled` und `setEnabled` aus der Anwendung; der Handler übernimmt `event.target.checked`.

```tsx
import { Switch } from '@chayns-ui/core';

<Switch checked={enabled} onChange={(event) => setEnabled(event.target.checked)}>
  Benachrichtigungen
</Switch>;
```

## Besonderheiten

Native Checkbox-Props wie `checked`/`defaultChecked`, `disabled` und `onChange` bleiben erhalten; Leertaste schaltet das fokussierte Control. Die Komponente bildet die Switch-Semantik ab, speichert aber keine Einstellung. Die Anwendung verantwortet die tatsächliche Wirkung und gegebenenfalls Rückmeldung bei Fehlern.

## Einsatz

Einen begrenzten ungefähren Wert mit direkter Wirkung einstellen, etwa Lautstärke. Die Position des Griffs und die sichtbare formatierte Ausgabe geben gleichzeitig Rückmeldung.

## Nicht geeignet

Für exakt zu treffende Mengen ist ein Slider zu unpräzise. Freier Text und ein Wertebereich mit zwei Griffen gehören nicht zu diesem Einzelwert-Control.

## Alternativen

[Stepper](?path=/docs/core-stepper--docs) ändert exakte Mengen in definierten Schritten. Wenn freie manuelle Eingabe erforderlich ist, ist ein passendes [TextField](?path=/docs/core-textfield--docs) geeigneter.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) kann einen Einstellungsbereich strukturieren. [Switch](?path=/docs/core-switch--docs) ergänzt daneben eine unabhängige Ein/Aus-Einstellung.

## Verwendung

`label`, `min`, `max` und den Startwert setzen. `formatValue` liefert die sichtbare Ausgabe inklusive gewünschter Einheit und den zugänglichen Werttext.

```tsx
import { Slider } from '@chayns-ui/core';

<Slider
  label="Lautstärke"
  min={0}
  max={100}
  defaultValue={50}
  formatValue={(value) => `${value} %`}
/>;
```

## Besonderheiten

Das primäre Control bleibt ein natives Range-Input: `value`/`defaultValue`, `onChange`, `step`, `name` und Ref behalten ihre Semantik. Im Handler steht `event.target.valueAsNumber` zur Verfügung. Native Tastaturbedienung bleibt erhalten. Lokalisierung, Einheiten und fachliche Anwendung des Werts übernimmt die Anwendung.

## Einsatz

Exakte Mengen in kleinen, definierten Schritten ändern, etwa eine Anzahl oder eine abgestufte Menge. Sichtbarer Wert sowie Verringern-/Erhöhen-Aktionen machen den nächsten Schritt nachvollziehbar.

## Nicht geeignet

Keine ungefähre Einstellung oder freie Texteingabe damit abbilden. Große Sprünge, bei denen viele einzelne Betätigungen nötig wären, passen schlecht zu diesem Control.

## Alternativen

[Slider](?path=/docs/core-slider--docs) eignet sich für ungefähre begrenzte Einstellungen. [TextField](?path=/docs/core-textfield--docs) ist geeignet, wenn ein Wert frei eingegeben werden muss.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und [List](?path=/docs/core-list--docs) ordnen die Menge ihrem Objekt zu. [Button](?path=/docs/core-button--docs) kann die resultierende Eingabe bestätigen.

## Verwendung

`value`, Grenzen, Schrittweite und `onValueChange` kontrolliert bereitstellen. `count` und `setCount` sind im Beispiel Anwendungszustand; `formatValue` formatiert den bereits numerischen Wert.

```tsx
import { Stepper } from '@chayns-ui/core';

<Stepper
  label="Anzahl"
  value={count}
  min={0}
  max={10}
  step={1}
  onValueChange={setCount}
  decreaseLabel="Verringern"
  increaseLabel="Erhöhen"
  formatValue={String}
/>;
```

## Besonderheiten

`precision` ist standardmäßig 0 und erlaubt 0–6 Nachkommastellen über `StepperPrecisions`. Werte müssen sicher darstellbar und am `min`-basierten Schrittraster ausgerichtet sein; ungültige Konfigurationen werden abgewiesen. Grenzen deaktivieren die entsprechenden Buttons. Änderungen werden höflich angekündigt; Aktionsnamen und Wertformatierung bleiben lokalisierbar. Keine Texteingabe oder Haltewiederholung.

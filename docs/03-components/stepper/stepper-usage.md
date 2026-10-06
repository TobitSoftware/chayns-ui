## Einsatz

Exakte Mengen in kleinen Schritten ändern.

## Nicht geeignet

Ungefähre Einstellungen oder freie Texteingabe.

## Alternativen

[Slider](?path=/docs/core-slider--docs) für ungefähre Werte; [TextField](?path=/docs/core-textfield--docs) für freie Eingabe.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs), [List](?path=/docs/core-list--docs) und weitere Formular-Controls.

## Verwendung

```tsx
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

Kontrolliert; precision ist standardmäßig 0 und erlaubt 0–6 Nachkommastellen. Werte müssen sicher darstellbar und am min-basierten Schrittraster ausgerichtet sein; ungültige Konfigurationen werden abgewiesen. Grenzen deaktivieren die Buttons; Änderungen werden höflich angekündigt. Keine Texteingabe oder Haltewiederholung.

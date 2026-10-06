## Einsatz

Einen ungefähren begrenzten Wert mit sofortiger Wirkung und sichtbarer Formatierung einstellen.

## Nicht geeignet

Exakte Mengen, freien Text oder einen Bereich mit zwei Griffen.

## Alternativen

[Stepper](?path=/docs/core-stepper--docs) für exakte Schritte; [TextField](?path=/docs/core-textfield--docs) für freie Eingabe.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und [Switch](?path=/docs/core-switch--docs) in Einstellungen.

## Verwendung

```tsx
<Slider
  label="Lautstärke"
  min={0}
  max={100}
  defaultValue={50}
  formatValue={(value) => `${value} %`}
/>;
```

## Besonderheiten

Ein natives range-Input: value/defaultValue, onChange, step, name und ref behalten ihre Semantik. formatValue bestimmt sichtbaren Wert und aria-valuetext. Lokalisierung und Einheiten liefert die Anwendung; native Tastaturbedienung bleibt erhalten.

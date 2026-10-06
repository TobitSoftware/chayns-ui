## Einsatz

Unbestimmte Aktivität innerhalb eines bereits benannten Ladebereichs visualisieren.

## Nicht geeignet

Den Ladezustand ausschließlich über die Grafik erklären oder einen bekannten Prozentwert darstellen.

## Alternativen

[Progress](?path=/docs/core-progress--docs) für Prozentwerte; [Skeleton](?path=/docs/core-skeleton--docs) für ein bekanntes Layout; [Button](?path=/docs/core-button--docs) mit loading für laufende Aktionen.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und andere inhaltliche Ladebereiche.

## Verwendung

```tsx
<section aria-label="Ergebnisse" aria-busy="true">
  <Spinner />
  <p>Ergebnisse werden geladen.</p>
</section>;
```

## Besonderheiten

Der Spinner ist dekorativ und vor Screenreadern verborgen. Der umgebende Bereich verantwortet zugängliche Statusinformationen. Die notwendige Ladeanimation bleibt bei Reduced Motion erhalten.

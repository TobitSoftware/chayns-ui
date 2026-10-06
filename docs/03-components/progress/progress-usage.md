## Einsatz

Einen bekannten Fortschritt als Prozentwert mit sichtbarer Beschriftung zeigen.

## Nicht geeignet

Unbekannte Dauer oder Platzhalter für noch ladende Inhalte.

## Alternativen

[Spinner](?path=/docs/core-spinner--docs) für unbekannte Dauer; [Skeleton](?path=/docs/core-skeleton--docs) für ein bekanntes Inhaltslayout.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und [Banner](?path=/docs/core-banner--docs) für den Kontext eines Vorgangs.

## Verwendung

```tsx
<Progress label="Upload" value={65} />;
```

## Besonderheiten

value wird auf ganze Prozent zwischen 0 und 100 begrenzt. Native Props und ref adressieren den progressbar; rootProps adressiert den äußeren Container. Die Anwendung liefert Fortschritt und lokalisierten Namen.

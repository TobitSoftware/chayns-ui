## Einsatz

Einen messbaren Fortschritt mit bekanntem Prozentwert zeigen, etwa beim Hochladen einer Datei. Beschriftung und sichtbare Prozentzahl erklären, welcher Vorgang wie weit abgeschlossen ist.

## Nicht geeignet

Bei unbekannter Dauer keinen erfundenen Prozentwert anzeigen. Progress reserviert auch kein noch unbekanntes Inhaltslayout und berechnet den Fortschritt nicht selbst.

## Alternativen

[Spinner](?path=/docs/core-spinner--docs) signalisiert unbestimmte Aktivität. [Skeleton](?path=/docs/core-skeleton--docs) reserviert die Form eines bekannten Inhalts, der noch lädt.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) kann den Vorgang mit Dateiname oder Details zusammenfassen. [Banner](?path=/docs/core-banner--docs) erklärt ergänzend anhaltende Hinweise zu diesem Vorgang.

## Verwendung

Den bereits berechneten `value` und einen sichtbaren lokalisierten `label` übergeben. Die Komponente zeigt daraus den Balken und die zugehörige Prozentzahl.

```tsx
import { Progress } from '@chayns-ui/core';

<Progress label="Upload" value={65} />;
```

## Besonderheiten

Der Wert wird gerundet und auf 0–100 begrenzt. Native Props und Ref adressieren den Progressbar-Knoten; `rootProps` adressiert den äußeren Container. Die eigene Beschriftung verknüpft Name und Balken. Datenbeschaffung, Fortschrittsberechnung und Fehlerbehandlung verbleiben in der Anwendung.

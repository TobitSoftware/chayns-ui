## Einsatz

Ein bereits bekanntes Inhaltslayout während des Ladens reservieren, etwa die Position eines Avatars oder von Textzeilen. Dadurch bleibt erkennbar, welche Art Inhalt an dieser Stelle erscheinen wird.

## Nicht geeignet

Keine Platzhalter erfinden, wenn das spätere Layout unbekannt ist. Skeleton stellt weder einen Fortschrittswert dar noch erklärt seine Grafik allein einen zugänglichen Ladezustand.

## Alternativen

[Spinner](?path=/docs/core-spinner--docs) zeigt unbestimmte Aktivität ohne bekannte Inhaltsform. [Progress](?path=/docs/core-progress--docs) zeigt einen messbaren Fortschritt.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und [List](?path=/docs/core-list--docs) liefern den späteren Inhaltsrahmen. Ein kreisförmiger Skeleton kann den Platz eines [Avatar](?path=/docs/core-avatar--docs) reservieren.

## Verwendung

Form über `shape` und Abmessungen entsprechend dem späteren Inhalt wählen. Der umgebende Ladebereich erhält einen Namen und `aria-busy`; der Platzhalter selbst ist dekorativ.

```tsx
import { Skeleton, SkeletonShapes } from '@chayns-ui/core';

<section aria-label="Profil" aria-busy="true">
  <Skeleton
    shape={SkeletonShapes.Circular}
    style={{ width: 'var(--k40)', height: 'var(--k40)' }}
  />
</section>;
```

## Besonderheiten

Skeleton ist vor Screenreadern verborgen und lädt keine Daten. Container und Anwendung entscheiden, wann echter Inhalt ersetzt wird und welche Statusbeschreibung nötig ist. Die Anwendung legt passende Platzhalter-Abmessungen für den erwarteten Inhalt fest; Skeleton hat keine lokale S/M/L-Größenvariante.

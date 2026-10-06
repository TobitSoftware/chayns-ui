## Einsatz

Unbestimmte Aktivität anzeigen, wenn noch kein belastbarer Prozentwert bekannt ist. Der Spinner steht innerhalb eines benannten Ladebereichs und ergänzt eine verständliche Statusbeschreibung.

## Nicht geeignet

Die Grafik allein erklärt weder den Vorgang noch dessen Ergebnis. Bei bekanntem Fortschritt ist eine unbestimmte Drehbewegung die falsche Rückmeldung.

## Alternativen

[Progress](?path=/docs/core-progress--docs) zeigt bekannte Prozentwerte, [Skeleton](?path=/docs/core-skeleton--docs) reserviert ein bekanntes Inhaltslayout. Während einer Button-Aktion dessen eingebauten `loading`-Zustand verwenden.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und [List](?path=/docs/core-list--docs) liefern den betroffenen Inhaltsbereich. Der umgebende Bereich stellt den Namen, `aria-busy` und eine bei Bedarf angekündigte Statusmeldung bereit.

## Verwendung

Spinner als dekorative Grafik in den Ladebereich setzen und den Vorgang zusätzlich benennen. Die Anwendung zeigt ihn nur solange die zugehörige Aktivität läuft.

```tsx
import { Spinner } from '@chayns-ui/core';

<section aria-label="Ergebnisse" aria-busy="true">
  <Spinner />
  <p>Ergebnisse werden geladen.</p>
</section>;
```

## Besonderheiten

Der Spinner ist vor Screenreadern verborgen und besitzt keine eigene Statusmeldung. Er hat keine lokale Größen- oder Fortschritts-API. Bei Reduced Motion stoppt die Rotation; die sichtbare Grafik und die Statusinformation des umgebenden Bereichs bleiben bestehen.

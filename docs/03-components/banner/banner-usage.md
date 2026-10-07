## Einsatz

Einen anhaltenden Hinweis zu einem Bereich sichtbar halten, bis er erledigt oder geschlossen wird. Geeignet für Verbindungsprobleme, Warnungen oder relevante Informationen, die neben dem Inhalt Aufmerksamkeit brauchen.

## Nicht geeignet

Feldbezogene Fehler gehören direkt an das jeweilige Control. Kurze Rückmeldungen nach einer Aktion sollten den Bereich nicht dauerhaft als Banner belegen. Eine Farbe ohne erklärenden Text reicht nicht.

## Alternativen

[TextField](?path=/docs/core-textfield--docs) und [TextArea](?path=/docs/core-textarea--docs) zeigen ihre eigenen Fehler und Hilfen. Für flüchtige Aktionsrückmeldungen beschreibt Bodywork Toast; eine Toast-Komponente ist noch nicht verfügbar.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und [AppLayout](?path=/docs/layout-applayout--docs) liefern den betroffenen Bereich. [Button](?path=/docs/core-button--docs) kann im Inhalt eine verständlich benannte Lösung anbieten.

## Verwendung

Den Hinweis als `children` formulieren und über `tone` einordnen. Standard ist ein nicht schließbarer Hinweis. Für eine Schließen-Aktion `onClose` und `closeLabel` gemeinsam bereitstellen.

```tsx
import { Banner, BannerTones } from '@chayns-ui/core';

<Banner tone={BannerTones.Warning}>Die Verbindung ist unterbrochen.</Banner>;
```

## Besonderheiten

`open`/`onOpenChange` steuert Sichtbarkeit kontrolliert; `defaultOpen` den Anfang. Der Schließen-Callback gehört zur Anwendung und kann fachliche Folgen behandeln. Dynamische Warn-/Gefahrenhinweise verwenden die spezifizierte Alert-Semantik.

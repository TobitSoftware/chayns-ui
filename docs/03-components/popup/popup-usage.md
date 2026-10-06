## Einsatz

Eine nicht modale, am Auslöser verankerte Fläche für kurze kontextbezogene Informationen oder Controls öffnen. Die Fläche ergänzt den aktuellen Kontext, ohne die übrige Oberfläche als Dialog zu sperren.

## Nicht geeignet

Keine modale Bestätigung oder komplexen eigenständigen Workflow darin verstecken. Ein generisches Popup bekommt nicht automatisch die Semantik und Fokusführung eines Aktionsmenüs.

## Alternativen

[Tooltip](?path=/docs/core-tooltip--docs) liefert eine kurze, nicht interaktive Erklärung. Ein Dialog wäre für modale Entscheidungen geeignet, ist jedoch noch keine verfügbare Library-Komponente.

## Gut kombinierbar

[PopupList](?path=/story/core-popup--action-list) baut auf Popup auf und ergänzt dessen Fläche um Aktionsmenü, Keyboard-Bedienung und Fokusführung. [Button](?path=/docs/core-button--docs) und [Card](?path=/docs/core-card--docs) können im generischen Popup eigene Inhalte darstellen.

## Verwendung

`Popup.Trigger` und `Popup.Content` unter demselben Popup zusammensetzen. Der Trigger öffnet die Fläche; `open`/`onOpenChange` kann den Zustand extern steuern, `defaultOpen` setzt den Anfang.

```tsx
import { Popup } from '@chayns-ui/core';

<Popup>
  <Popup.Trigger>Details</Popup.Trigger>
  <Popup.Content>Weitere Informationen</Popup.Content>
</Popup>;
```

## Besonderheiten

Escape und Außenklick schließen standardmäßig; beide Verhaltensweisen sind abschaltbar. Content wird in einem Portal positioniert. Das generische Popup setzt keinen Menüfokus und keine Menürolle: Für ein Aktionsmenü PopupList verwenden. Trigger- und Content-Props sowie Refs adressieren ihre jeweiligen nativen Elemente.

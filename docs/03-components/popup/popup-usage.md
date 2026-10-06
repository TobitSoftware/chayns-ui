## Einsatz

Eine nicht modale Fläche mit kontextbezogenen Informationen oder Aktionen am Auslöser öffnen.

## Nicht geeignet

Modale Entscheidungen oder automatisch ein Aktionsmenü mit Menu-Semantik erzeugen.

## Alternativen

[PopupList](?path=/docs/core-popup--docs) für Aktionsmenüs; [Tooltip](?path=/docs/core-tooltip--docs) für kurze nicht interaktive Erklärungen.

## Gut kombinierbar

[Button](?path=/docs/core-button--docs) im Inhalt und [Card](?path=/docs/core-card--docs) für strukturierte Informationen.

## Verwendung

```tsx
<Popup>
  <Popup.Trigger>Details</Popup.Trigger>
  <Popup.Content>Weitere Informationen</Popup.Content>
</Popup>;
```

## Besonderheiten

Trigger und Content gehören unter Popup. open/onOpenChange ist kontrolliert; defaultOpen setzt den Anfangszustand. Escape und Außenklick schließen standardmäßig. Content liegt im Portal; das generische Popup übernimmt keinen Menüfokus.

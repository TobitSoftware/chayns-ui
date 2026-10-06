## Einsatz

Bis zu fünf gleichrangige Ansichten einer Seite wechseln. Attached verbindet den aktiven Tab mit seiner Inhaltsfläche; Underline wechselt Ansichten auf einer gemeinsamen Fläche.

## Nicht geeignet

Routen, einzelne Aktionen, gleichzeitig sichtbare Panels oder geordnete Workflow-Schritte. Für mehr als fünf Ansichten ist meist Anwendungsnavigation sinnvoller.

## Alternativen

Native Links für Routen; [SegmentedControl](?path=/docs/core-segmentedcontrol--docs) für Einstellungen/Darstellungen; [Accordion](?path=/docs/core-accordion--docs) für aufklappbare Abschnitte.

## Gut kombinierbar

[AppLayout](?path=/docs/layout-applayout--docs), [Card](?path=/docs/core-card--docs) und Core-Controls in den Panels.

## Verwendung

```tsx
<Tabs appearance={TabsAppearances.Underline} defaultValue="details">
  <Tabs.List aria-label="Bereiche">
    <Tabs.Tab value="details">Details</Tabs.Tab>
    <Tabs.Tab value="history">Verlauf</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="details">Details</Tabs.Panel>
  <Tabs.Panel value="history">Verlauf</Tabs.Panel>
</Tabs>;
```

## Besonderheiten

Tab und Panel sind durch stabile String-Werte verbunden; nur das aktive Panel wird gerendert. value/onValueChange ist kontrolliert. Fehlt eine gültige Auswahl, wird die erste aktivierte Option gewählt bzw. kontrolliert einmal vorgeschlagen. Pfeiltasten und Home/End aktivieren Tabs. Ohne `onRemove` am jeweiligen Tab fehlen Entfernen-Symbol und Delete/Backspace-Aktion. Ohne `Tabs.Add` gibt es keine Hinzufügen-Aktion. Für dynamische Tabs verwaltet die Anwendung die Einträge, übergibt `onRemove(value)` nur an entfernbare Tabs und komponiert `<Tabs.Add onClick={addTab} aria-label="Tab hinzufügen">…</Tabs.Add>`. Die Beispiele Underline und UnderlineEditable zeigen beide Fälle.

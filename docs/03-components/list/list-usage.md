## Einsatz

Viele vergleichbare Einträge in einer vertikalen Folge zeigen, etwa Nachrichten oder Projekte. Titel, optionale Identität und kurze Vorschau helfen beim schnellen Erfassen; eine Zeile kann navigieren oder eine Aktion auslösen.

## Nicht geeignet

Für mehrere gleichzeitig vergleichbare Eigenschaften ist eine Tabelle geeigneter. Eine List-Zeile ist kein Aufklapper und kein Ersatz für eigenständigen umfangreichen Inhalt.

## Alternativen

[Accordion](?path=/docs/core-accordion--docs) klappt Inhalt unter einem Eintrag auf. Eine native Tabelle stellt mehrere Eigenschaften spaltenweise gegenüber. [Card](?path=/docs/core-card--docs) bündelt einen eigenständigen Inhalt.

## Gut kombinierbar

[Avatar](?path=/docs/core-avatar--docs) passt in den Leading-Slot. [Badge](?path=/docs/core-badge--docs) beschreibt den Eintrag. Separate [IconButton](?path=/docs/core-iconbutton--docs)-Aktionen gehören in Trailing, außerhalb der primären Zeilenaktion.

## Verwendung

`List.Item` unter List und die Inhalts-Parts unter dem jeweiligen Item einsetzen. `List.Item.Action` mit `href` ist ein Link; ohne `href` ein Button für einen Handler.

```tsx
import { List } from '@chayns-ui/core';

<List>
  <List.Item>
    <List.Item.Action href="/details">
      <List.Item.Title>Projekt</List.Item.Title>
    </List.Item.Action>
  </List.Item>
</List>;
```

## Besonderheiten

Eine Zeile besitzt eine primäre Aktion; zusätzliche Buttons oder Links bleiben Geschwister dieser Aktion, keine interaktiven Kinder. `Title` und `Preview` strukturieren den Inhalt. Ein Status-Punkt benötigt seine lokalisierte `label`-Beschreibung. Liste und Einträge beschaffen keine Daten oder Router-Zustände selbst.

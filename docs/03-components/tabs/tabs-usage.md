## Einsatz

Zwischen wenigen gleichrangigen Ansichten derselben Seite wechseln. Bodywork empfiehlt bis zu fünf Ansichten. Attached verbindet den aktiven Tab sichtbar mit seiner Inhaltsfläche; Underline passt zu Ansichtswechseln auf einer gemeinsamen Fläche ohne angesetzte Tab-Fläche.

## Nicht geeignet

Keine Routen, unabhängigen Aktionen oder geordneten Arbeitsschritte als Tabs anbieten. Gleichzeitig sichtbare Abschnitte benötigen keine Tab-Auswahl. Bei vielen Ansichten ist Anwendungsnavigation meist übersichtlicher.

## Alternativen

Native Links navigieren zu Routen. [SegmentedControl](?path=/docs/core-segmentedcontrol--docs) wählt eine Darstellung oder Einstellung ohne Tab-Panel-Vertrag. [Accordion](?path=/docs/core-accordion--docs) erlaubt aufklappbare Abschnitte.

## Gut kombinierbar

[AppLayout](?path=/docs/layout-applayout--docs) stellt den Anwendungskontext bereit. [Card](?path=/docs/core-card--docs) und Core-Controls können Inhalt eines Panels sein. Tab, List und Panel sind die zusammengehörigen Parts derselben Tabs-Instanz.

## Verwendung

List benennen und Tab-/Panel-Paare über stabile String-Werte verbinden. `appearance` über `TabsAppearances` wählen; Attached ist Standard. `defaultValue` setzt den Anfang, `value`/`onValueChange` steuert die Auswahl extern.

```tsx
import { Tabs, TabsAppearances } from '@chayns-ui/layout';

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

Nur das aktive Panel wird gerendert; benötigter dauerhafter Inhaltzustand gehört nach außen. Fehlt eine gültige Auswahl, wird die erste aktivierte Option gewählt bzw. kontrolliert vorgeschlagen. Pfeiltasten und Home/End aktivieren Tabs. `onRemove` je Tab macht ihn entfernbar; ohne Callback fehlen Symbol und Delete/Backspace-Aktion. Nur ein komponiertes `Tabs.Add` bietet Hinzufügen an. Die Anwendung verwaltet dynamische Einträge; [UnderlineEditable](?path=/story/layout-tabs--underline-editable) zeigt diese Kombination.

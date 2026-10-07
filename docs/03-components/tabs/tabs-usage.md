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

Ein führendes Icon wird über `Tabs.Tab icon` gesetzt, z. B.
`<Tabs.Tab value="details" icon="fa-circle-info">Details</Tabs.Tab>`.
Die Namen entsprechen Button: Classic `fa-*`, Brands `fab fa-*` oder Tobit `ts-*`.
Das Icon ist dekorativ; der Text benennt den Tab. Die Anwendung stellt die
benötigten Glyphen bereit. Freie Inhalte bleiben über `children` möglich.
[AttachedWithIcons](?path=/story/layout-tabs--attached-with-icons) und
[UnderlineWithIcons](?path=/story/layout-tabs--underline-with-icons) zeigen beide
Darstellungen ohne zusätzlichen Icon-Wrapper im Verbrauchscode.

## Besonderheiten

Die Anwendung verwaltet dynamische Einträge. `onRemove` je Tab macht ihn entfernbar;
ohne Callback fehlen Entfernen-Symbol und Delete/Backspace-Aktion. Hinzufügen gibt
es nur mit einem komponierten `Tabs.Add`. [UnderlineEditable](?path=/story/layout-tabs--underline-editable)
zeigt einen festen ersten Tab und weitere entfernbare Einträge.

Fehlt eine gültige Auswahl, wird die erste aktivierte Option gewählt bzw. über
`onValueChange` kontrolliert vorgeschlagen. Bei kontrollierter Verwendung muss die
Anwendung diesen Vorschlag übernehmen. Die Werte der Tab-/Panel-Paare müssen
auch beim Hinzufügen, Entfernen und Umsortieren stabil bleiben.

Inaktive Panels werden entfernt. Zustand, der beim Wechsel erhalten bleiben soll,
gehört deshalb außerhalb des jeweiligen Panels in die Anwendung.

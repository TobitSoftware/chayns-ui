## Einsatz

Eine sichtbar benannte Aktion auslösen, etwa Speichern, Antworten oder Löschen. Primary betont die wichtigste Aktion eines abgeschlossenen Bereichs, Outline gleichwertige Alternativen, Ghost Nebenaktionen und Danger destruktive Aktionen.

## Nicht geeignet

Keine Navigation oder dauerhafte Auswahl als Button-Aktion verkleiden. Die Beschriftung soll die Aktion erkennen lassen. Pro abgeschlossenem Aktionsbereich höchstens eine Primary-Aktion verwenden.

## Alternativen

[IconButton](?path=/docs/core-iconbutton--docs) ist für vertraute Icon-Aktionen ohne sichtbares Textlabel geeignet. Native Links verwenden, wenn ein Ziel geöffnet statt eine Aktion ausgeführt wird.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und Formular-Controls geben den Aktionskontext. [Tooltip](?path=/docs/core-tooltip--docs) kann eine bereits verständliche Aktion ergänzend erklären. Button ist außerdem Teil von [SplitButton](?path=/docs/core-splitbutton--docs): Für eine Hauptaktion mit verwandten Varianten dessen API verwenden, statt die internen Controls zusätzlich zu komponieren.

## Verwendung

`variant` ausdrücklich wählen und die sichtbare Beschriftung über `children` setzen. Der Handler `save` im Beispiel übernimmt die Anwendung; Button beschafft oder speichert selbst keine Daten.

```tsx
import { Button, ButtonVariants } from '@chayns-ui/core';

<Button variant={ButtonVariants.Primary} onClick={save}>
  Speichern
</Button>;
```

## Besonderheiten

Standard ist `type="button"`; zum Absenden eines Formulars `type="submit"` setzen. `loading` erhält die Beschriftung und deaktiviert die Aktion. Icons über `icon` wechseln bei Hover/Druck zu Solid. Hover hebt um 1px an, Druck setzt zurück und skaliert auf 97%; Reduced Motion unterdrückt Bewegung. Native Props und Ref adressieren den Button.

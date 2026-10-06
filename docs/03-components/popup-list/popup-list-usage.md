## Einsatz

Mehrere sekundäre Icon/Text-Aktionen hinter einem Auslöser bündeln, beispielsweise „Kopieren“ und „Archivieren“. PopupList deckt den Aktions-Dropdown aus Bodywork ab und ergänzt Popup um einen Menu-Vertrag.

## Nicht geeignet

Keine Datenauswahl oder modale Entscheidung als Aktionsmenü darstellen. Pflichtinformationen dürfen nicht nur über ein verstecktes Menü zugänglich sein.

## Alternativen

[ComboBox](?path=/docs/core-combobox--docs) wählt einen Datenwert statt eine Aktion auszulösen. Ein generisches [Popup](?path=/docs/core-popup--docs) ist geeignet, wenn Inhalte und Controls kein Aktionsmenü bilden.

## Gut kombinierbar

[SplitButton](?path=/docs/core-splitbutton--docs) kombiniert eine Hauptaktion mit PopupList für verwandte Varianten. [List](?path=/docs/core-list--docs) kann das Menü als separate Zeilenaktion aufnehmen.

## Verwendung

`items` mit lokalisierten Aktionsnamen, Icons und Handlern bereitstellen. `trigger` kann eine Beschriftung für den erzeugten Button oder ein passendes natives Button-Element enthalten. `copy` im Beispiel gehört zur Anwendung.

```tsx
import { PopupList } from '@chayns-ui/core';

<PopupList
  trigger="Weitere Aktionen"
  items={[{ icon: 'fa-copy', text: 'Kopieren', onClick: copy }]}
/>;
```

## Besonderheiten

PopupList übernimmt Menu-Semantik und fokussiert beim Öffnen die erste Aktion. Pfeiltasten sowie Home/End navigieren. Aktivieren einer Aktion und Escape schließen mit Fokus-Rückkehr zum Trigger. Die zugrunde liegende Popup-Struktur bleibt ein Implementierungsdetail; im Verbrauchscode werden keine zusätzlichen Popup-Parts um PopupList gelegt.

## Einsatz

Eine kurze zusätzliche Erklärung zu einem bereits verständlichen Control zeigen, etwa die genaue Wirkung einer Icon-Aktion. Tooltip ergänzt die vorhandene Aktion und verändert sie nicht.

## Nicht geeignet

Keine wesentlichen Hinweise, Fehlermeldungen oder interaktiven Inhalte verstecken. Ein Tooltip ersetzt weder ein sichtbares Label noch den zugänglichen Namen seines Auslösers.

## Alternativen

Sichtbarer Hilfetext erklärt notwendige Informationen direkt. [Banner](?path=/docs/core-banner--docs) hält einen Bereichshinweis sichtbar, [Popup](?path=/docs/core-popup--docs) bietet eine interaktive Fläche. Aktionen gehören in [PopupList](?path=/story/core-popup--action-list).

## Gut kombinierbar

[Button](?path=/docs/core-button--docs) und [IconButton](?path=/docs/core-iconbutton--docs) sind geeignete Auslöser, wenn ihre Bedeutung auch ohne Tooltip erkennbar ist.

## Verwendung

Genau ein aktiviertes, fokussierbares Trigger-Element als Kind einsetzen und die Erklärung über `content` liefern. Der Trigger muss native Props und Ref weiterreichen. `copy` im Beispiel bleibt seine ursprüngliche Anwendungsaktion.

```tsx
import { ButtonVariants, IconButton, Tooltip } from '@chayns-ui/core';

<Tooltip content="Kopiert den Link in die Zwischenablage.">
  <IconButton
    variant={ButtonVariants.Ghost}
    icon="fa-copy"
    aria-label="Link kopieren"
    onClick={copy}
  />
</Tooltip>;
```

## Besonderheiten

Öffnet bei Hover, Fokus und Touch; der erste Touch behält die Aktion des Controls. Escape, Fokusverlust, Verlassen von Trigger/Inhalt und Außenklick schließen entsprechend dem Interaction-Vertrag. Beim Überfahren bleibt der Tooltip-Inhalt erreichbar; er enthält selbst keine Controls. Deaktivierte oder nicht fokussierbare Auslöser erfüllen diesen Vertrag nicht.

## Einsatz

Eine kurze ergänzende Erklärung zu einem bestehenden Control geben, ohne seine Aktion zu übernehmen.

## Nicht geeignet

Wesentliche Hinweise verstecken oder interaktive Inhalte/Aktionen anbieten.

## Alternativen

Sichtbarer Hilfetext oder [Banner](?path=/docs/core-banner--docs) für wichtige Information; [PopupList](?path=/docs/core-popup--docs) für Aktionen.

## Gut kombinierbar

[Button](?path=/docs/core-button--docs) und [IconButton](?path=/docs/core-iconbutton--docs) als bereits verständliche Auslöser.

## Verwendung

```tsx
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

Genau ein aktivierter, fokussierbarer Auslöser muss native Props und ref weiterreichen. Öffnet bei Hover, Fokus und Touch; der erste Touch behält die Aktion. Escape, Fokusverlust bzw. Verlassen und Außenklick schließen. Inhalt bleibt beim Überfahren erreichbar und ist nicht interaktiv.

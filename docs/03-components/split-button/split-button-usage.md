## Einsatz

Eine Hauptaktion direkt ausführbar machen und verwandte Varianten im zusätzlichen Menü anbieten, etwa Senden, später Senden und Entwurf speichern. Die Hauptaktion bleibt ohne Öffnen des Menüs erreichbar.

## Nicht geeignet

Gleichwertige unabhängige Aktionen nicht willkürlich in eine Haupt- und Nebenaktion aufteilen. Ein reines Kontextmenü benötigt keinen zusätzlichen Hauptbutton.

## Alternativen

Separate [Buttons](?path=/docs/core-button--docs) mit Outline-Variante zeigen gleichwertige Aktionen. [PopupList](?path=/story/core-popup--action-list) reicht für ein reines sekundäres Aktionsmenü.

## Gut kombinierbar

[Button](?path=/docs/core-button--docs) und [PopupList](?path=/story/core-popup--action-list) bilden intern die beiden Controls; im Verbrauchscode werden sie nicht zusätzlich darum komponiert. [Card](?path=/docs/core-card--docs) kann den gemeinsamen Aktionsbereich bereitstellen.

## Verwendung

Die sichtbare Hauptaktion über `children` und `onClick` angeben. `items` enthält die Varianten mit Icon, lokalisiertem Text und Handler. `send` und `schedule` im Beispiel gehören zur Anwendung.

```tsx
import { ButtonVariants, SplitButton } from '@chayns-ui/core';

<SplitButton
  variant={ButtonVariants.Primary}
  onClick={send}
  items={[{ icon: 'fa-clock', text: 'Später senden', onClick: schedule }]}
>
  Senden
</SplitButton>;
```

## Besonderheiten

Ein Primary-SplitButton zählt als die Primary-Aktion des Bereichs. Hauptaktion und Menüauslöser sind separate native Buttons mit gemeinsamem Disabled-Zustand. Native Root-Props und Ref gehören zum umgebenden Container; PopupList übernimmt Menübedienung und Fokus-Rückkehr.

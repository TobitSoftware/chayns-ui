## Einsatz

Eine vertraute Aktion platzsparend als Icon anbieten, etwa einen Anhang hinzufügen oder ein Kontextmenü öffnen. Geeignet für Werkzeugleisten und separate Zeilenaktionen, deren Bedeutung Nutzer bereits erkennen können.

## Nicht geeignet

Unbekannte oder mehrdeutige Aktionen benötigen sichtbaren Text. IconButton ersetzt keine Navigation und darf nicht nur gewählt werden, um ein eigentlich hilfreiches Label wegzulassen.

## Alternativen

[Button](?path=/docs/core-button--docs) zeigt eine Aktion mit sichtbarer Beschriftung. Native Links verwenden, wenn das Icon zu einem Ziel navigiert.

## Gut kombinierbar

[List](?path=/docs/core-list--docs) und [Card](?path=/docs/core-card--docs) bieten Kontext für Nebenaktionen. [Tooltip](?path=/docs/core-tooltip--docs) ergänzt eine Erklärung, ersetzt aber den zugänglichen Namen nicht.

## Verwendung

`variant`, `icon` und genau eine zugängliche Benennung über `aria-label` oder `aria-labelledby` angeben. Der Handler `remove` ist die Anwendungsaktion; IconButton definiert keine Löschlogik.

```tsx
import { ButtonVariants, IconButton } from '@chayns-ui/core';

<IconButton
  variant={ButtonVariants.Ghost}
  icon="fa-trash"
  aria-label="Löschen"
  onClick={remove}
/>;
```

## Besonderheiten

`loading` und native Button-Props funktionieren wie bei Button. Icons sind Regular in Ruhe und Solid bei Hover/Druck; verfügbare Einzelstile bleiben konsistent. Hover hebt um 2px an, Druck setzt zurück und skaliert auf 90%. Reduced Motion unterdrückt Bewegung. IconButton erhält keine sichtbaren `children`.

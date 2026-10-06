## Einsatz

Mehrere beteiligte Identitäten kompakt als überlappende Avatare zeigen, etwa das Team eines Projekts. Die Gruppe eignet sich als schneller Überblick, wenn vollständige Namen an anderer Stelle verfügbar sind.

## Nicht geeignet

Keine vollständige Mitgliederliste oder Personen-Auswahl ersetzen. Wenn Nutzer Namen, Rollen oder einzelne Aktionen direkt erfassen müssen, ist die überlappende Darstellung zu knapp.

## Alternativen

[List](?path=/docs/core-list--docs) zeigt Identitäten mit lesbaren Namen und weiteren Angaben untereinander. Für nur eine Identität wird kein Gruppencontainer benötigt.

## Gut kombinierbar

[Avatar](?path=/docs/core-avatar--docs) liefert die einzelnen Identitätsdarstellungen als Kinder. [Card](?path=/docs/core-card--docs) kann den Projektkontext und zusätzliche Namen sichtbar bereitstellen.

## Verwendung

Avatar-Kinder in der gewünschten Reihenfolge einsetzen. `max` begrenzt die sichtbaren Plätze; bei mehr Einträgen reserviert die Gruppe den letzten Platz für die Überlaufanzahl.

```tsx
import { Avatar, AvatarGroup } from '@chayns-ui/core';

<AvatarGroup max={3}>
  <Avatar name="Ada" />
  <Avatar name="Grace" />
  <Avatar name="Katherine" />
  <Avatar name="Dorothy" />
</AvatarGroup>;
```

## Besonderheiten

`max={3}` zeigt bei vier Personen zwei Avatare und einen Überlaufplatz. Ohne `max` werden alle Avatare gezeigt. `size` am Gruppencontainer vereinheitlicht Kinder und Überlaufplatz und überschreibt individuelle Avatar-Größen. Die Gruppe beschafft keine Personen und öffnet keine Auswahlansicht.

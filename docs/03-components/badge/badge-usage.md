## Einsatz

Einen kurzen Status oder eine Anzahl direkt einem zugehörigen Element zuordnen, etwa „Freigegeben“ an einem Dokument oder einen Zähler neben einem Namen. Das Badge beschreibt einen Zustand und löst keine Aktion aus.

## Nicht geeignet

Keine frei stehenden Hinweise, Buttons oder entfernbare/wählbare Tags daraus bauen. Eine Verifizierungsanzeige darf nur eine tatsächlich geprüfte Identität kennzeichnen.

## Alternativen

[Banner](?path=/docs/core-banner--docs) erklärt einen Hinweis für einen ganzen Bereich. [Progress](?path=/docs/core-progress--docs) zeigt einen messbaren Fortschritt statt eines kurzen Statuslabels. Interaktive Chips und Tags sind noch keine eigenen Library-Komponenten.

## Gut kombinierbar

[Avatar](?path=/docs/core-avatar--docs), [List](?path=/docs/core-list--docs) und [Card](?path=/docs/core-card--docs) liefern das Bezugsobjekt und den Kontext. Ein dekorativer Avatar-Badge benötigt zusätzlich eine zugängliche Statusbeschreibung.

## Verwendung

Eine verständliche Beschriftung als `children` setzen und einen zur Bedeutung passenden `tone` wählen. Die Größen `sm` und `md` sind bestätigte lokale Varianten, keine Nutzerdichten.

```tsx
import { Badge, BadgeTones } from '@chayns-ui/core';

<Badge tone={BadgeTones.Success}>Freigegeben</Badge>;
```

## Besonderheiten

Farbe allein erklärt den Status nicht. Ohne `aria-label` ist der Inhalt Teil des umgebenden Kontexts; mit `aria-label` verwendet Badge Status-Semantik. Hover hebt die Fläche um 2px an, ohne sie zur Aktion zu machen; Reduced Motion unterdrückt Bewegung. Eigene Icon-Inhalte verantworten ihre Regular/Solid-Darstellung selbst.

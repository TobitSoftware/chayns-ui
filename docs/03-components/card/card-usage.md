## Einsatz

Zusammengehörigen, eigenständigen Inhalt auf einer klar abgegrenzten Fläche bündeln, etwa eine Projektzusammenfassung. Die Card gibt dem Inhalt einen gemeinsamen Rahmen, ohne seine fachliche Bedeutung oder Aktionen festzulegen.

## Nicht geeignet

Die Fläche selbst nicht als Ersatz für einen Link oder Button anklickbar machen. Card implementiert keine Navigation, Datenbeschaffung oder Business-Logik. Viele gleichartige Einträge müssen nicht jeweils eine eigene Card erhalten.

## Alternativen

[List](?path=/docs/core-list--docs) zeigt viele vergleichbare Einträge untereinander. [Accordion](?path=/docs/core-accordion--docs) hält ergänzenden Inhalt einklappbar statt dauerhaft sichtbar.

## Gut kombinierbar

[Avatar](?path=/docs/core-avatar--docs) und [Badge](?path=/docs/core-badge--docs) ergänzen Identität und Status. [Button](?path=/docs/core-button--docs) oder native Links innerhalb der Card übernehmen Aktionen; Formular-Controls können einen Bearbeitungsbereich bilden.

## Verwendung

Inhalt direkt als `children` einsetzen. `Card.Header` ist ein optionaler semantischer Header mit optionalem führenden Icon. Die Card übernimmt Standardabstände innen; der umgebende Container bestimmt ihre Platzierung.

```tsx
import { Card } from '@chayns-ui/core';

<Card>
  <Card.Header>Projekt</Card.Header>
  <p>Projektbeschreibung</p>
</Card>;
```

## Besonderheiten

Card bleibt eine nicht-interaktive Oberfläche. Aktionen und Navigation gehören in eigene Buttons bzw. Links im Inhalt; ein Hover-Effekt ersetzt diese Semantik nicht.

Wenn eine Card visuell inline bleiben muss, unterdrückt `disableHover` ausschließlich diese dekorative Behandlung. Die Card bleibt dabei weiterhin eine nicht-interaktive Oberfläche.

```tsx
import { Card } from '@chayns-ui/core';

<Card disableHover>
  <Card.Header>Projekt</Card.Header>
  <p>Projektbeschreibung</p>
</Card>
```

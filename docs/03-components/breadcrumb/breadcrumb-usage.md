## Einsatz

Den aktuellen Ort und den Rückweg durch eine Hierarchie zeigen, vor allem ab drei Ebenen, etwa Start → Projekte → Projektdetails. Nutzer können einen Vorfahren direkt aufrufen.

## Nicht geeignet

Keine flache Hauptnavigation, Ansichtsumschaltung oder Schrittfolge darstellen. Breadcrumb erklärt die Position in einer Hierarchie, nicht die Reihenfolge einer Bearbeitung.

## Alternativen

Native Navigationslinks reichen für flache Ziele. [Tabs](?path=/docs/layout-tabs--docs) wechseln gleichrangige Ansichten innerhalb einer Seite und besitzen keine Hierarchiebedeutung.

## Gut kombinierbar

[AppLayout](?path=/docs/layout-applayout--docs) kann den Pfad im Hauptinhalt aufnehmen. [Card](?path=/docs/core-card--docs) und [List](?path=/docs/core-list--docs) zeigen darunter den Inhalt des aktuellen Orts.

## Verwendung

Einträge von der obersten Ebene bis zur aktuellen Seite übergeben. Vorfahren benötigen `href`; der letzte Eintrag hat kein Ziel und kennzeichnet die aktuelle Seite. Die Navigation mit `aria-label` benennen.

```tsx
import { Breadcrumb } from '@chayns-ui/core';

<Breadcrumb
  aria-label="Pfad"
  items={[
    { label: 'Start', href: '/' },
    { label: 'Projekte', href: '/projects' },
    { label: 'Details' },
  ]}
/>;
```

## Besonderheiten

Die Anwendung liefert Hierarchie, Ziele und lokalisierte Labels. Die Komponente hat keine Router-Anbindung und leitet keinen Pfad automatisch ab. Der aktuelle Eintrag ist kein zusätzlicher Navigationslink; die native Linkbedienung der Vorfahren bleibt erhalten.

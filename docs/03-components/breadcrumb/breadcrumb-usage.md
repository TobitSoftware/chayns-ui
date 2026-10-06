## Einsatz

Den Rückweg in einer Hierarchie ab drei Ebenen zeigen.

## Nicht geeignet

Flache Navigation oder Auswahl gleichrangiger Panels.

## Alternativen

Native Navigationslinks für flache Wege; [Tabs](?path=/docs/layout-tabs--docs) für Panels.

## Gut kombinierbar

[AppLayout](?path=/docs/layout-applayout--docs) und [Card](?path=/docs/core-card--docs) als umgebenden Inhalt.

## Verwendung

```tsx
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

Vorfahren erhalten href, der letzte Eintrag ohne href ist die aktuelle Seite. Die Anwendung liefert Hierarchie, Ziele und lokalisierte Labels; die Komponente besitzt keine Routing-Logik.

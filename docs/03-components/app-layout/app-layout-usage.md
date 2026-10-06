## Einsatz

Eine wiederkehrende Anwendungshülle mit Header, Navigation und Hauptinhalt zusammensetzen. Die Parts geben diesen Bereichen klare Rollen; ein gemeinsamer Collapse-Zustand steuert die kompakte Navigation.

## Nicht geeignet

AppLayout ist kein Router und speichert keinen Anwendungszustand. Für einen einzelnen Inhaltsblock oder ein beliebiges Zweispaltenlayout ohne Anwendungshülle ist seine Struktur unnötig.

## Alternativen

Für eine einfache Seite ohne wiederkehrende Navigation reicht eine native Seitenstruktur mit `main` und passenden Überschriften.

## Gut kombinierbar

[Breadcrumb](?path=/docs/core-breadcrumb--docs) zeigt den Pfad innerhalb des Inhalts, [Tabs](?path=/docs/layout-tabs--docs) wechseln dort Ansichten. [Card](?path=/docs/core-card--docs) und [List](?path=/docs/core-list--docs) strukturieren den Hauptinhalt.

## Verwendung

Die Header-, Navigation- und Content-Parts unter AppLayout zusammensetzen. Navigation benennen und Einträge mit sichtbarem `label` versehen; `href` erzeugt einen nativen Link.

```tsx
import { AppLayout } from '@chayns-ui/layout';

<AppLayout>
  <AppLayout.Header>Meine Anwendung</AppLayout.Header>
  <AppLayout.Navigation aria-label="Hauptnavigation">
    <AppLayout.Navigation.Item href="/projects" label="Projekte" />
  </AppLayout.Navigation>
  <AppLayout.Content>Inhalt</AppLayout.Content>
</AppLayout>;
```

## Besonderheiten

Die Anwendung liefert Ziele und `isActive`. Ohne `href` ist ein Navigation.Item eine Aktion oder ein Disclosure für Untereinträge. `collapsed`/`onCollapsedChange` steuert die Navigation kontrolliert, `defaultCollapsed` ihren Anfangszustand. Ein CollapseToggle benötigt lokalisierte `expandLabel`-/`collapseLabel`-Texte. Routing und Persistenz bleiben in der Anwendung.

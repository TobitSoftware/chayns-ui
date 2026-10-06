## Einsatz

Die bestätigte Anwendungshülle aus Header, Navigation und Inhalt zusammensetzen.

## Nicht geeignet

Routing, Persistenz oder ein beliebiges Zweispaltenlayout implementieren.

## Alternativen

[Card](?path=/docs/core-card--docs) für einzelne Inhaltsflächen; [Tabs](?path=/docs/layout-tabs--docs) für wechselnde Ansichten innerhalb der Anwendung.

## Gut kombinierbar

[Breadcrumb](?path=/docs/core-breadcrumb--docs), [Tabs](?path=/docs/layout-tabs--docs) und Core-Controls in Content.

## Verwendung

```tsx
<AppLayout>
  <AppLayout.Header>Meine Anwendung</AppLayout.Header>
  <AppLayout.Navigation aria-label="Hauptnavigation">
    <AppLayout.Navigation.Item href="/projects" label="Projekte" />
  </AppLayout.Navigation>
  <AppLayout.Content>Inhalt</AppLayout.Content>
</AppLayout>;
```

## Besonderheiten

Die Anwendung verantwortet Routen und isActive. Navigation.Item mit href ist ein Link; ohne href ein Button bzw. Disclosure. collapsed/onCollapsedChange steuert den Zustand, defaultCollapsed den Anfang. CollapseToggle benötigt lokalisierte expandLabel/collapseLabel.

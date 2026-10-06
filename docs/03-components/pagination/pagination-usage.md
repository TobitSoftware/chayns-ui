## Einsatz

Seiten einer langen, seitenweise geladenen Sammlung wechseln.

## Nicht geeignet

Feeds, Hierarchien oder geordnete Workflow-Schritte.

## Alternativen

[Button](?path=/docs/core-button--docs) zum expliziten Nachladen in Feeds; [Breadcrumb](?path=/docs/core-breadcrumb--docs) für Hierarchien.

## Gut kombinierbar

[List](?path=/docs/core-list--docs) und [Card](?path=/docs/core-card--docs) für Ergebnisse.

## Verwendung

```tsx
<Pagination
  aria-label="Ergebnisseiten"
  page={page}
  pageCount={10}
  onPageChange={setPage}
  labels={{ previous: 'Zurück', next: 'Weiter', pageLabel: (page) => `Seite ${page}` }}
/>;
```

## Besonderheiten

Kontrolliert und ab Seite 1 gezählt. Die Anwendung lädt Daten und bestätigt die nächste Seite. labels liefert alle zugänglichen Button-Namen. Gesamtanzahl, Seitengröße und Tabellenbereiche gehören nicht zum aktuellen Vertrag.

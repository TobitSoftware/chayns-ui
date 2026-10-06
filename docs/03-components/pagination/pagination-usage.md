## Einsatz

Seiten einer langen, seitenweise geladenen Sammlung wechseln, etwa Suchergebnisse oder Dokumentlisten. Die sichtbaren Seitenzahlen ermöglichen gezielte Sprünge statt nur fortlaufenden Nachladens.

## Nicht geeignet

Pagination beschreibt weder eine Hierarchie noch eine Schrittfolge. Für fortlaufende Feeds ohne sinnvolle Seitenziele ist ein explizites Nachladen meist passender.

## Alternativen

Ein [Button](?path=/docs/core-button--docs) „Mehr laden“ ergänzt einen Feed ohne Seitenwechsel. Ein hierarchischer Rückweg gehört in Breadcrumb, nicht in eine Pagination.

## Gut kombinierbar

[List](?path=/docs/core-list--docs) oder [Card](?path=/docs/core-card--docs) zeigt die Ergebnisse der gewählten Seite. Die Anwendung verbindet Seitenwechsel mit Datenbeschaffung und ihren Ladezuständen.

## Verwendung

`page` wird ab 1 gezählt; `pageCount` beschreibt die verfügbare Seitenzahl. `setPage` im Beispiel bestätigt den Änderungswunsch und kann die passenden Daten laden.

```tsx
import { Pagination } from '@chayns-ui/core';

<Pagination
  aria-label="Ergebnisseiten"
  page={page}
  pageCount={10}
  onPageChange={setPage}
  labels={{ previous: 'Zurück', next: 'Weiter', pageLabel: (page) => `Seite ${page}` }}
/>;
```

## Besonderheiten

Pagination ist kontrolliert und lädt selbst keine Daten. `aria-label` benennt die Seitennavigation; `labels` liefert lokalisierte Namen für Zurück, Weiter und einzelne Seiten. Grenzen deaktivieren die entsprechenden Pfeile. Gesamtanzahl, Seitengrößenauswahl und Tabellenbereiche sind nicht Teil des aktuellen Vertrags.

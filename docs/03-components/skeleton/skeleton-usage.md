## Einsatz

Ein bekanntes Layout während des Ladens reservieren.

## Nicht geeignet

Unbekanntes Inhaltslayout oder bekannten Fortschritt darstellen.

## Alternativen

[Spinner](?path=/docs/core-spinner--docs) für unbekannte Dauer; [Progress](?path=/docs/core-progress--docs) für einen bekannten Prozentwert.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs), [List](?path=/docs/core-list--docs) und [Avatar](?path=/docs/core-avatar--docs)-Platzhalter.

## Verwendung

```tsx
<section aria-label="Profil" aria-busy="true">
  <Skeleton
    shape={SkeletonShapes.Circular}
    style={{ width: 'var(--k40)', height: 'var(--k40)' }}
  />
</section>;
```

## Besonderheiten

Skeleton ist dekorativ; der Ladebereich liefert Namen und Status. Form über shape konfigurieren, Abmessungen entsprechend dem späteren Inhalt durch den Container festlegen. Dekorative Bewegung entfällt bei Reduced Motion.

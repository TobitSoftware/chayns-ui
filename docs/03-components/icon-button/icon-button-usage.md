## Einsatz

Eine vertraute Aktion platzsparend als Icon darstellen, etwa in einer Werkzeugleiste oder Listenzeile.

## Nicht geeignet

Unklare Icons oder Aktionen, die einen sichtbaren Text benötigen. Nicht für Navigation.

## Alternativen

[Button](?path=/docs/core-button--docs) für sichtbare Beschriftungen.

## Gut kombinierbar

[List](?path=/docs/core-list--docs), [Card](?path=/docs/core-card--docs) und [Tooltip](?path=/docs/core-tooltip--docs) für ergänzende Erklärungen.

## Verwendung

```tsx
<IconButton
  variant={ButtonVariants.Ghost}
  icon="fa-trash"
  aria-label="Löschen"
  onClick={remove}
/>;
```

## Besonderheiten

Ein lokalisierter zugänglicher Name über aria-label oder aria-labelledby ist Pflicht. variant ist erforderlich; loading und native Button-Props funktionieren wie bei Button.

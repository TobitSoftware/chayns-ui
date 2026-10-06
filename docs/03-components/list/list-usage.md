## Einsatz

Viele vergleichbare Einträge untereinander mit optionalem Avatar und einzeiliger Vorschau darstellen.

## Nicht geeignet

Mehrspaltige Datentabellen, aufklappbaren Inhalt oder eigenständige Inhaltsflächen.

## Alternativen

[Accordion](?path=/docs/core-accordion--docs) für Disclosure; native Tabellen für mehrere vergleichbare Eigenschaften; [Card](?path=/docs/core-card--docs) für eigenständigen Inhalt.

## Gut kombinierbar

[Avatar](?path=/docs/core-avatar--docs), [Badge](?path=/docs/core-badge--docs) und [IconButton](?path=/docs/core-iconbutton--docs) für separate Zeilenaktionen.

## Verwendung

```tsx
<List>
  <List.Item>
    <List.Item.Action href="/details">
      <List.Item.Title>Projekt</List.Item.Title>
    </List.Item.Action>
  </List.Item>
</List>;
```

## Besonderheiten

Action mit href navigiert als Link, ohne href handelt sie als Button. Trailing-Aktionen bleiben separate Geschwister. Status benötigt eine lokalisierte label-Beschreibung.

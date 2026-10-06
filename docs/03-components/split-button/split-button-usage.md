## Einsatz

Eine Hauptaktion mit verwandten Varianten verbinden, etwa Senden, später Senden und Entwurf speichern.

## Nicht geeignet

Gleichwertige Alternativen ohne klare Hauptaktion bündeln.

## Alternativen

Separate Outline-Buttons für gleichwertige Aktionen; [PopupList](?path=/docs/core-popup--docs) für reine Nebenaktionen.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs) und Formularbereiche.

## Verwendung

```tsx
<SplitButton
  variant={ButtonVariants.Primary}
  onClick={send}
  items={[{ icon: 'fa-clock', text: 'Später senden', onClick: schedule }]}
>
  Senden
</SplitButton>;
```

## Besonderheiten

Die Hauptaktion und das Menü sind getrennte Controls. Ein Primary-SplitButton zählt als Primary-Aktion des Bereichs. onClick gehört zur Hauptaktion; items beschreibt Menüaktionen, native Root-Props adressieren den Container.

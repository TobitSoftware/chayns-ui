## Einsatz

Eine anhaltende Information zu einem Bereich anzeigen, bis sie erledigt oder geschlossen wird.

## Nicht geeignet

Feldfehler oder kurze Rückmeldung nach einer Aktion.

## Alternativen

[TextField](?path=/docs/core-textfield--docs) bzw. [TextArea](?path=/docs/core-textarea--docs) für Feldfehler. Toast ist noch nicht Bestandteil der Library.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs), Formulare und AppLayout.Content.

## Verwendung

```tsx
<Banner tone={BannerTones.Warning}>Die Verbindung ist unterbrochen.</Banner>;
```

## Besonderheiten

Für eine Schließen-Aktion onClose und den lokalisierten closeLabel gemeinsam übergeben. open/onOpenChange steuern die Sichtbarkeit; defaultOpen setzt den Anfangszustand.

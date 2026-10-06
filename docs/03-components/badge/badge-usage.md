## Einsatz

Status oder Anzahl direkt an einem zugehörigen Element anzeigen.

## Nicht geeignet

Aktionen oder Hinweise ohne Bezugsobjekt. Verifizierung nur für tatsächlich verifizierte Identitäten zeigen.

## Alternativen

[Banner](?path=/docs/core-banner--docs) für Hinweise zu einem Bereich; [Progress](?path=/docs/core-progress--docs) für einen bekannten Fortschritt.

## Gut kombinierbar

[Avatar](?path=/docs/core-avatar--docs), [List](?path=/docs/core-list--docs) und Card.

## Verwendung

```tsx
<Badge tone={BadgeTones.Success}>Freigegeben</Badge>;
```

## Besonderheiten

Der Text muss den Status erklären; Farbe allein genügt nicht. size ist eine bestätigte lokale Variante, keine globale Nutzerdichte. Das Badge löst keine Aktion aus.

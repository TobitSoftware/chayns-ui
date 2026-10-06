## Einsatz

Eine sichtbar beschriftete Aktion auslösen. Primary bezeichnet die wichtigste Aktion im abgeschlossenen Bereich, Outline gleichwertige Alternativen, Ghost Nebenaktionen und Danger destruktive Aktionen.

## Nicht geeignet

Navigation, Auswahlzustände oder reine Icon-Aktionen. Pro abgeschlossenem Aktionsbereich höchstens eine Primary-Aktion.

## Alternativen

[IconButton](?path=/docs/core-iconbutton--docs) für vertraute Icon-Aktionen; native Links für Navigation.

## Gut kombinierbar

[Card](?path=/docs/core-card--docs), [List](?path=/docs/core-list--docs) und Formular-Controls.

## Verwendung

```tsx
<Button variant={ButtonVariants.Primary} onClick={save}>
  Speichern
</Button>;
```

## Besonderheiten

variant ist erforderlich. loading deaktiviert den Button und erhält die Beschriftung. Für Formulare type="submit" setzen; Standard ist button. Icons über icon angeben; sie wechseln bei Hover oder Druck zu Solid. Hover hebt den Button um 1px an, Druck setzt ihn zurück und skaliert auf 97%. Reduced Motion unterdrückt die Bewegung.

## Einsatz

Mehrere sekundäre Icon/Text-Aktionen hinter einem vorhandenen Auslöser bündeln; entspricht dem Dropdown-Anwendungsfall.

## Nicht geeignet

Daten auswählen, Pflichtinformationen verstecken oder modale Entscheidungen treffen.

## Alternativen

[ComboBox](?path=/docs/core-combobox--docs) für Datenwahl; [Tooltip](?path=/docs/core-tooltip--docs) für ergänzende Erklärungen; [Popup](?path=/docs/core-popup--docs) für frei zusammengesetzte Inhalte.

## Gut kombinierbar

[SplitButton](?path=/docs/core-splitbutton--docs) für Varianten einer Hauptaktion; [List](?path=/docs/core-list--docs) für Zeilenaktionen.

## Verwendung

```tsx
<PopupList
  trigger="Weitere Aktionen"
  items={[{ icon: 'fa-copy', text: 'Kopieren', onClick: copy }]}
/>;
```

## Besonderheiten

items enthält bereits lokalisierte Aktionsnamen und Callback-Funktionen. PopupList übernimmt Menu-Semantik und initialen Fokus; Pfeiltasten navigieren, Escape schließt und gibt den Fokus zurück.

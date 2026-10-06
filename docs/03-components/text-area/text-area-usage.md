## Einsatz

Freien mehrzeiligen Text mit Floating Label eingeben.

## Nicht geeignet

Einzeilige Werte oder eine endliche Auswahl.

## Alternativen

[TextField](?path=/docs/core-textfield--docs) für eine Zeile; [ComboBox](?path=/docs/core-combobox--docs) für bekannte Werte.

## Gut kombinierbar

[Button](?path=/docs/core-button--docs) und weitere Formular-Controls.

## Verwendung

```tsx
<TextArea placeholder="Nachricht" rows={4} helpText="Beschreibe Dein Anliegen." />;
```

## Besonderheiten

placeholder liefert das Floating Label. Native value/defaultValue und onChange bleiben erhalten. helpText, error und counter sind Inhalts-Props; Validierung und Zählertext liefert die Anwendung.

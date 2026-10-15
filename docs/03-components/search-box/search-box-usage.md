## Einsatz

SearchBox verbindet eine kontrollierte Suche mit einer kontrollierten Mehrfachauswahl. Die Anwendung liefert Vorschläge und bereits gewählte Einträge; sie filtert nach dem eingegebenen Text und aktualisiert die Auswahl nach Auswahl- oder Entfernen-Callbacks.

## Nicht geeignet

SearchBox akzeptiert keinen Freitext als Auswahl. Für freie Texte eignet sich [TextField](?path=/docs/core-textfield--docs); für bekannte, nicht editierbare Optionen ist [ComboBox](?path=/docs/core-combobox--docs) vorgesehen.

## Alternativen

[TextField](?path=/docs/core-textfield--docs) ist richtig, wenn der Text selbst der Wert ist. [ComboBox](?path=/docs/core-combobox--docs) bietet eine kompakte Auswahl bekannter Optionen, aber keine Filtereingabe oder frei gestaltete Item-Zeilen.

## Gut kombinierbar

[Avatar](?path=/docs/core-avatar--docs) kann in `renderSelectedItem` und `renderSuggestion` den sichtbaren Personen-Kontext liefern. SearchBox bleibt dabei generisch; auch die Kanal- oder Fachinformation im Slot bleibt Anwendungsverantwortung.

## Verwendung

`selectedItems`, `suggestions` und `inputValue` werden vollständig von der Anwendung kontrolliert. `placeholder` steht dauerhaft vor allen Badges. `aria-label` oder `aria-labelledby` ist erforderlich; beide Slot-Renderfunktionen erhalten nur die fachlichen `item`-Werte.

```tsx
import { SearchBox, type SearchBoxItem } from '@chayns-ui/core';
import { useState } from 'react';

type Contact = { name: string; detail: string };

const contacts: SearchBoxItem<Contact>[] = [
  { id: 'eva', item: { name: 'Eva Fischer', detail: 'eva.fischer@tobit.com' } },
  { id: 'thomas', item: { name: 'Thomas Dahm', detail: 'Messenger' } },
];

function Recipients() {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<SearchBoxItem<Contact>[]>([contacts[0]!]);
  const suggestions = contacts.filter(({ item }) =>
    item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
  );

  return (
    <SearchBox
      aria-label="Empfänger suchen"
      getItemLabel={(contact) => contact.name}
      getRemoveItemLabel={(contact) => `${contact.name} entfernen`}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      onRemove={(entry) => setSelectedItems((items) => items.filter((item) => item.id !== entry.id))}
      onSelect={(entry) => setSelectedItems((items) => [...items, entry])}
      placeholder="An:"
      renderSelectedItem={(contact) => contact.name}
      renderSuggestion={(contact) => (
        <>
          <strong>{contact.name}</strong>
          <span>{contact.detail}</span>
        </>
      )}
      selectedItems={selectedItems}
      suggestions={suggestions}
      suggestionsLabel="Vorschläge"
    />
  );
}
```

## Besonderheiten

Bereits gewählte Vorschläge bleiben im Dropdown sichtbar und sind als ausgewählt markiert, aber nicht erneut aktivierbar. ArrowUp/ArrowDown wählen einen Vorschlag vor, Enter übernimmt ihn, und Backspace entfernt bei leerer Eingabe das letzte Badge. `onSelect` und `onRemove` aktualisieren keine Werte intern; sie informieren ausschließlich die Anwendung.

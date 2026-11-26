# TeamTalkInput — Verwendung

## Einsatz

Für TeamTalk-spezifische Nachrichteneingabe mit kontrolliertem Entwurf, Teilnehmeranzeige, optionaler Leave-Aktion und consumer-gesteuerter Personensuche mit Checkbox-Auswahl.

## Nicht geeignet

Nicht als vollständiger TeamTalk-Verlauf, Nachrichtendarstellung, Transport-/Chat-Service oder allgemeiner Composer. Personensuche und Mitgliederverwaltung bleiben Aufgaben des Consumers.

## Alternativen

Für allgemeine Komposition Core MessageComposer verwenden. TeamTalkInput ist auf die TeamTalk-Anatomie und Agree-Aktion spezialisiert.

## Gut kombinierbar

Mit der umgebenden TeamTalk-Ansicht und Consumer-eigener Versand-/Leave-Logik. Teilnehmerdaten und deren Aktualisierung bleiben beim Consumer.

## Verwendung

Lade die Tokens und Core Styles sowie `@chayns-ui/business/styles.css` in deiner Anwendung. Entwurf, Teilnehmer, Suchquery und Suchtreffer werden kontrolliert übergeben; alle Texte sind bereits lokalisiert. Das mehrzeilige Feld startet in TextField-Höhe und wächst mit dem Inhalt; Enter sendet, Shift+Enter fügt einen Zeilenumbruch ein. Das Add-Overlay öffnet die externe Personensuche mit Checkboxen; Auswahl wird erst mit „Hinzufügen“ an den Consumer gemeldet.

```tsx
import { useState } from 'react';
import { TeamTalkInput } from '@chayns-ui/business';

const labels = {
  input: 'Kommentar schreiben',
  placeholder: 'Stimme zu',
  agree: 'Zustimmen',
  send: 'Senden',
  addPerson: 'Personen hinzufügen',
  peopleSearch: 'Personen suchen',
  peopleSearchPlaceholder: 'Person suchen',
  peopleLoading: 'Personen werden geladen …',
  peopleNoResults: 'Keine Personen gefunden.',
  peopleSelectionCount: (count: number) => `${count} Personen ausgewählt`,
  peopleApply: 'Hinzufügen',
  leave: 'TeamTalk verlassen',
  participants: (names: readonly string[]) => `Im TeamTalk: ${names.join(', ')}`,
};

function Example() {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [members, setMembers] = useState<Array<{ id: string; name: string; avatarSrc?: string; description?: string }>>([
    { id: 'ada', name: 'Ada Lovelace', avatarSrc: '/ada.png' },
  ]);
  const people = query ? [] : [{ id: 'grace', name: 'Grace Hopper', description: 'Softwareentwicklung' }];
  return <TeamTalkInput
    labels={labels}
    members={members}
    peopleSuggestions={people}
    peopleQuery={query}
    onPeopleQueryChange={setQuery}
    onAddPeople={(selected) => setMembers((current) => [...current, ...selected])}
    value={value}
    onValueChange={setValue}
    onSend={(payload) => console.log(payload)}
    allowAgree
    onLeave={() => console.log('Leave requested')}
  />;
}
```

## Besonderheiten

`onSend` erhält `{ type: 'message', text }` mit getrimmtem Text oder bei aktiviertem Agree und leerem Entwurf `{ type: 'agree', text: '' }`. Der Consumer entscheidet, wann der kontrollierte Entwurf geleert wird. Leave wird nur bei übergebenem Callback angezeigt. Die Suche bleibt extern: Query-Änderungen und Treffer kommen vom Consumer; `onAddPeople` erhält erst nach Apply ausschließlich die temporär angehakten, noch nicht teilnehmenden Personen. Schließen ohne Apply verwirft die Auswahl und setzt die Query zurück.
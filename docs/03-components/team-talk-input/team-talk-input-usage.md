# TeamTalkInput — Verwendung

## Einsatz

Für TeamTalk-spezifische Nachrichteneingabe mit kontrolliertem Entwurf, Teilnehmeranzeige, optionaler Leave-Aktion und dem vorerst deaktivierten Add-Button.

## Nicht geeignet

Nicht als vollständiger TeamTalk-Verlauf, Nachrichtendarstellung, Transport-/Chat-Service oder allgemeiner Composer. Das Personen-Overlay und Hinzufügen von Teilnehmern sind noch nicht enthalten.

## Alternativen

Für allgemeine Komposition Core MessageComposer verwenden. TeamTalkInput ist auf die TeamTalk-Anatomie und Agree-Aktion spezialisiert.

## Gut kombinierbar

Mit der umgebenden TeamTalk-Ansicht und Consumer-eigener Versand-/Leave-Logik. Teilnehmerdaten und deren Aktualisierung bleiben beim Consumer.

## Verwendung

Lade die Tokens und Core Styles sowie `@chayns-ui/business/team-talk-input.css` in deiner Anwendung. Der Entwurf und die Teilnehmerliste werden kontrolliert übergeben; alle Texte sind bereits lokalisiert. Das mehrzeilige Feld startet in TextField-Höhe und wächst mit dem Inhalt; das Textfeld bleibt vertikal mittig mit gleichem Abstand oben und unten. Der Button ist im einzeiligen Composer mittig und wandert beim Wachsen mit, sodass sein unterer Abstand gleich bleibt. Enter sendet, Shift+Enter fügt einen Zeilenumbruch ein.

```tsx
import { useState } from 'react';
import { TeamTalkInput } from '@chayns-ui/business';

const labels = {
  input: 'Kommentar schreiben',
  placeholder: 'Stimme zu',
  agree: 'Zustimmen',
  send: 'Senden',
  addPerson: 'Personen hinzufügen',
  leave: 'TeamTalk verlassen',
  participants: (names: readonly string[]) => `Im TeamTalk: ${names.join(', ')}`,
};

function Example() {
  const [value, setValue] = useState('');
  return <TeamTalkInput
    labels={labels}
    members={[{ id: 'ada', name: 'Ada Lovelace', avatarSrc: '/ada.png' }]}
    value={value}
    onValueChange={setValue}
    onSend={(payload) => console.log(payload)}
    allowAgree
    onLeave={() => console.log('Leave requested')}
  />;
}
```

## Besonderheiten

`onSend` erhält `{ type: 'message', text }` mit getrimmtem Text oder bei aktiviertem Agree und leerem Entwurf `{ type: 'agree', text: '' }`. Der Consumer entscheidet, wann der kontrollierte Entwurf geleert wird. Leave wird nur bei übergebenem Callback angezeigt. Add ist sichtbar, aber deaktiviert; das Overlay wird später ergänzt.
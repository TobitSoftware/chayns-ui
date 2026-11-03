# MessageComposer — Verwendung

Status: implementiert im freigegebenen READY-Scope. Testnachweise und noch ausstehende manuelle Prüfungen stehen im [gemeinsamen Implementierungsbericht](../sidekick-input/sidekick-input-implementation-report.md).

## Einsatz

Für eine generische Nachrichteneingabe mit Rich Text, externen Aktionen und optionalen Anhängen, Textbausteinen, Auswahl und nativer Audioaufnahme. Die sichtbare Oberfläche bleibt in Core.

## Nicht geeignet

Für ein gewöhnliches Formularfeld TextArea verwenden. Für fachliche Sidekick-Kontextsteuerung ist SideKickInput vorgesehen; Backend-, Upload- und Transportdienste bleiben extern.

## Alternativen

RichTextEditor allein für Text mit Erwähnungen ohne Composer-Oberfläche; TextArea für einfache Formulartexte.

## Gut kombinierbar

RichTextEditor wird intern verwendet. Button, Avatar und Spinner liefern passende Core-Darstellung. Ihre interne Verwendung bedeutet keine frei platzierbaren öffentlichen Composer-Parts.

## Verwendung

Die kleinste Verwendung zeigt kontrollierten Inhalt und eine explizite
zugängliche Beschriftung. Anwendungsbeispiele ersetzen die Texte später durch ihre
aufgelösten Textstrings. `composerLabels` enthält alle bereits aufgelösten vollständigen Texte des Labels-Vertrags. `consumeDraft` ist eine Anwendungsaktion; dieser generische Core-Baustein leert den Entwurf nicht selbst.

```tsx
import { useState } from 'react';
import {
  MessageComposer,
  MessageComposerLayouts,
  type RichTextDocument,
} from '@chayns-ui/core';

function GenericComposer() {
  const [value, setValue] = useState<RichTextDocument>({ version: 1, content: [] });

  return (
    <MessageComposer
      aria-label="Nachrichtenentwurf"
      layout={MessageComposerLayouts.TwoLine}
      labels={composerLabels}
      value={value}
      onValueChange={setValue}
      onSubmit={() => consumeDraft(value)}
    />
  );
}
```

## Besonderheiten

Native Props/Ref gehen an den Editor; rootProps adressiert ausdrücklich die äußere Hülle. Collections sind extern kontrolliert. Diktierung ist bei leerem Feld und unterstützter Browser-API standardmäßig verfügbar. Mit `dictation={{ disabled: true }}` wird sie ausgeblendet. `dictation.language` überschreibt optional die HTML-/Browsersprache. Voice erscheint nur mit `voice={{ onStream: handleStream }}`; die Komponente gibt einen lebenden MediaStream aus und beendet eigene Tracks. `voice.state` und `voice.onEnd` sind optional. Während aktiver oder pausierter Diktierung bleibt der Editor gesperrt. Alle Texte kommen aufgelöst vom Consumer.


X verwirft die gesamte Diktier-Sitzung; der Haken übernimmt den finalen Text ohne Versand. Das Mikrofon pausiert und setzt fort. Die Core-Stories DictationRecording und DictationPaused zeigen diese Zustände mit ausdrücklich simulierter Browser-Erkennung.

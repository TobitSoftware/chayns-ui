# MessageComposer — Verwendung (vor Implementierung)

Status: READY FOR IMPLEMENTATION. Die folgenden Imports/Props sind bestätigt,
aber noch nicht implementiert und daher noch nicht verfügbar. Dieses Beispiel ist Consumer-Dokumentation vor Implementierung, kein
Nachweis gegen bereits veröffentlichte Typen.

## Einsatz

Für eine generische Nachrichteneingabe mit Rich Text, externen Aktionen und optionalen Anhängen, Textbausteinen, Auswahl und nativer Audioaufnahme. Die sichtbare Oberfläche bleibt in Core.

## Nicht geeignet

Für ein gewöhnliches Formularfeld TextArea verwenden. Für fachliche Sidekick-Kontextsteuerung ist SideKickInput vorgesehen; Backend-, Upload- und Transportdienste bleiben extern.

## Alternativen

RichTextEditor allein für Text mit Erwähnungen ohne Composer-Oberfläche; TextArea für einfache Formulartexte. Neue Editor-/Composer-Komponenten sind noch nicht implementiert.

## Gut kombinierbar

RichTextEditor wird intern verwendet. Button, Avatar und Spinner liefern passende Core-Darstellung. Ihre interne Verwendung bedeutet keine frei platzierbaren öffentlichen Composer-Parts.

## Verwendung

Die kleinste geplante Verwendung zeigt kontrollierten Inhalt und eine explizite
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

Native Props/Ref gehen an den Editor; rootProps adressiert ausdrücklich die äußere Hülle. Collections sind extern kontrolliert. Diktierung benötigt eine explizite Erkennungssprache und eine unterstützte Browser-API; Voice gibt einen lebenden MediaStream aus und beendet eigene Tracks. Während aktiver oder pausierter Diktierung bleibt der Editor gesperrt. Alle Texte kommen aufgelöst vom Consumer.

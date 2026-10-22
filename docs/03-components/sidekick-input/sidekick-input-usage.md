# SideKickInput — Verwendung (vor Implementierung)

Status: READY FOR IMPLEMENTATION. Die folgenden Imports/Props sind bestätigt,
aber noch nicht implementiert und daher noch nicht verfügbar. Dieses Beispiel ist Consumer-Dokumentation vor Implementierung, kein
Nachweis gegen bereits veröffentlichte Typen.

## Einsatz

Für Sidekick-Dialoge mit KI-Agent-/Modellkontext und optimistischer Übergabe eines Entwurfs an den Consumer. Daten, Versand, Fehleraufbewahrung und Voice-Verbindung liefert die Anwendung.

## Nicht geeignet

Für eine allgemeine Nachrichteneingabe ist MessageComposer vorgesehen. SideKickInput stellt keinen Sidekick-Dienst, Dateiupload oder Voice-Transport bereit.

## Alternativen

MessageComposer für fachlich neutrale Komposition mit eigener Anwendungssteuerung. Beide neuen Komponenten sind erst nach Umsetzung verfügbar.

## Gut kombinierbar

MessageComposer liefert intern die gesamte UI. Die Anwendung ergänzt ihre Dienste und Entwurfsaufbewahrung über die definierten Callbacks, ohne Business-eigene Composer-Markup-Alternativen.

## Verwendung

Die kleinste geplante Verwendung zeigt kontrollierten Inhalt und eine explizite
zugängliche Beschriftung. Anwendungsbeispiele ersetzen die Texte später durch ihre
aufgelösten Textstrings. `composerLabels` enthält alle bereits aufgelösten vollständigen Texte des Labels-Vertrags. `saveDraftForRetry` und `sendSavedDraft` sind Consumer-Funktionen. Die erste sichert den gesamten Snapshot; die zweite behandelt ihre asynchronen Fehler selbst.

```tsx
import { useState } from 'react';
import { MessageComposerLayouts, type RichTextDocument } from '@chayns-ui/core';
import { SideKickInput, type SideKickDraft } from '@chayns-ui/business';

function SideKickComposer() {
  const [value, setValue] = useState<RichTextDocument>({ version: 1, content: [] });

  function handleSend(draft: SideKickDraft) {
    // The application retains the complete snapshot before starting its request.
    saveDraftForRetry(draft);
    sendSavedDraft(draft);
  }

  return (
    <SideKickInput
      aria-label="Nachricht an Sidekick"
      layout={MessageComposerLayouts.TwoLine}
      labels={composerLabels}
      value={value}
      onValueChange={setValue}
      onSend={handleSend}
    />
  );
}
```

## Besonderheiten

onSend erhält zuerst einen unabhängigen Snapshot; danach fordert die Komponente die kontrollierte Leerung an. Der Consumer sichert fehlgeschlagene Entwürfe und aktualisiert seine Attachment-Liste. Prompt-Chips verwenden eine eigene Aktion und leeren keinen Entwurf. Recents, Agent und Layout bleiben kontrolliert. Funktionale Audio-/Zusatzdarstellung ist noch keine finale Designfreigabe.

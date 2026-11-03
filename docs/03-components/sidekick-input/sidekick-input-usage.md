# SideKickInput — Verwendung

Status: implementiert im freigegebenen READY-Scope. Testnachweise und noch ausstehende manuelle Prüfungen stehen im [gemeinsamen Implementierungsbericht](../sidekick-input/sidekick-input-implementation-report.md).

## Einsatz

Für Sidekick-Dialoge mit KI-Agent-/Modellkontext und optimistischer Übergabe eines Entwurfs an den Consumer. Daten, Versand, Fehleraufbewahrung und Voice-Verbindung liefert die Anwendung.

## Nicht geeignet

Für eine allgemeine Nachrichteneingabe ist MessageComposer vorgesehen. SideKickInput stellt keinen Sidekick-Dienst, Dateiupload oder Voice-Transport bereit.

## Alternativen

MessageComposer für fachlich neutrale Komposition mit eigener Anwendungssteuerung.

## Gut kombinierbar

MessageComposer liefert intern die gesamte UI. Die Anwendung ergänzt ihre Dienste und Entwurfsaufbewahrung über die definierten Callbacks, ohne Business-eigene Composer-Markup-Alternativen.

## Verwendung

Die kleinste Verwendung zeigt kontrollierten Inhalt und eine explizite
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


### Standardfunktionen und Beispiele

Diktieren ist bei leerem Feld und Browserunterstützung ohne zusätzliche Konfiguration verfügbar. `dictation={{ disabled: true }}` blendet es aus; `dictation={{ language: 'de-DE' }}` überschreibt die automatisch aufgelöste Sprache. Ohne Override gilt HTML-lang des Editors beziehungsweise seiner Umgebung, danach die Browsersprache.

Voice wird nur angeboten, wenn der Consumer `voice={{ onStream: handleStream }}` übergibt. Der Consumer kann zusätzlich `state` und `onEnd` liefern, um Verbindung und Beenden an seinen Transport zu koppeln. Ohne Callback gibt es weder einen Voice-Button noch Mikrofonzugriff dafür.

Business/SideKickInput:Default zeigt die vollständige Oberfläche mit nativen Browser-APIs, externen Prompt-Aktionen, Agent-/Modellwahl und Consumer-eigenem Dateidialog. Attachments zeigt vorausgelieferte Items sowie Auswahl, Entfernen und Snapshot-Übergabe beim Versand. Dateien und Upload bleiben beim Consumer; innerhalb des Feldes übernimmt Core die Anordnung und Entfernen-Steuerung.

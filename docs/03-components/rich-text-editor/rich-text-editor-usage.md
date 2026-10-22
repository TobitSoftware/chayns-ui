# RichTextEditor — Verwendung (vor Implementierung)

Status: READY FOR IMPLEMENTATION. Die folgenden Imports/Props sind bestätigt,
aber noch nicht implementiert und daher noch nicht verfügbar. Dieses Beispiel ist Consumer-Dokumentation vor Implementierung, kein
Nachweis gegen bereits veröffentlichte Typen.

## Einsatz

Für mehrzeiligen Text mit atomaren Erwähnungen, wenn eine native TextArea die nötigen Inhalte nicht darstellen kann. Der Consumer kontrolliert das strukturierte Dokument und liefert Suchergebnisse.

## Nicht geeignet

Für gewöhnliche Formulartexte reicht TextArea. Umfangreiche Dokumentformatierung, HTML-Importe und fachliche Identitätssuche gehören nicht in diesen Editor.

## Alternativen

TextArea für einfachen mehrzeiligen Text, TextField für einzeilige Eingaben. MessageComposer ergänzt diesen Editor um die vollständige Nachrichtenoberfläche und ist kein kleinerer Ersatz.

## Gut kombinierbar

MessageComposer nutzt den Editor intern. Externe Suche liefert zum aktuellen Query passende Mention-Ergebnisse; der Editor übernimmt deren Tastaturauswahl.

## Verwendung

Die kleinste geplante Verwendung zeigt kontrollierten Inhalt und eine explizite
zugängliche Beschriftung. Anwendungsbeispiele ersetzen die Texte später durch ihre
aufgelösten Textstrings.

```tsx
import { useState } from 'react';
import { RichTextEditor, type RichTextDocument } from '@chayns-ui/core';

function MessageDraft() {
  const [value, setValue] = useState<RichTextDocument>({ version: 1, content: [] });

  return (
    <RichTextEditor
      aria-label="Nachrichtenentwurf"
      value={value}
      onValueChange={setValue}
    />
  );
}
```

## Besonderheiten

Das Dokument enthält Text, Zeilenumbrüche und Erwähnungen mit stabilen IDs. HTML wird nicht als Speicherformat verwendet. Clipboard-Transfer übernimmt Klartext. Native Props und Ref adressieren den editierbaren Knoten; für Befehle gibt es commandsRef. Externe Ersetzungen setzen History zurück; kontrollierte Echos erhalten Auswahl und Undo.

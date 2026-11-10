---
id: markdown-editor-usage
type: submodule-design
status: active
parent: markdown-editor-component
title: MarkdownEditor Storybook Usage Guide
---

# MarkdownEditor — Verwendung

## Einsatz

Für kontrollierte Markdown-Eingaben, wenn Nutzende Text direkt formatieren und die Anwendung den Markdown-String verwaltet. HTML lässt sich zusätzlich über das Ref abrufen.

## Nicht geeignet

Nicht für einfachen Klartext in Formularen: Dafür ist TextArea geeignet. Nicht für strukturierte Erwähnungen: Dafür gibt es RichTextEditor. Für Nachrichtenversand samt Anhängen und Aktionen ist MessageComposer zuständig.

## Alternativen

- TextArea für unformatierten mehrzeiligen Text.
- RichTextEditor für strukturierte `RichTextDocument`-Inhalte mit atomaren Erwähnungen.
- MessageComposer für eine vollständige Messaging-Oberfläche.

Die Story `Business/MarkdownEditor:ReplyDraftStory` zeigt einen längeren Antwortentwurf mit begrenzter Editorhöhe und Scrollen innerhalb des Storybook-Containers.

## Gut kombinierbar

Der Consumer-Wrapper setzt Hintergrund, Rahmen, Farben und Abstände. MarkdownEditor passt sich dem Wrapper an und bringt keine eigene Oberfläche mit. Speichern, Vorschau und Linkdialoge bleiben Aufgaben der Anwendung.

## Verwendung

MarkdownEditor ist controlled. Die Anwendung verwaltet `value` und übernimmt `onValueChange`. Eine zugängliche Beschriftung über `aria-label` oder `aria-labelledby` ist erforderlich.

```tsx
import { useRef, useState } from 'react';
import { MarkdownEditor } from '@chayns-ui/business';
import type { MarkdownEditorRef } from '@chayns-ui/business';

function ArticleEditor() {
  const [markdown, setMarkdown] = useState('**Hallo**');
  const editorRef = useRef<MarkdownEditorRef>(null);
  const [html, setHtml] = useState('');

  return (
    <div>
      <MarkdownEditor
        ref={editorRef}
        aria-label="Artikeltext"
        value={markdown}
        onValueChange={setMarkdown}
        placeholder="Artikeltext eingeben"
      />
      <button type="button" onClick={() => setHtml(editorRef.current?.getHTML() ?? '')}>
        HTML auslesen
      </button>
      <output>{html}</output>
    </div>
  );
}
```

`ref.current.getHTML()` liefert das aktuelle HTML; `ref.current.focus()` fokussiert den Editor.

Die Story `Business/MarkdownEditor:ReplyDraft` zeigt einen längeren Antwortentwurf in einem gerundeten Storybook-Wrapper. Rahmen, Rundung und Fokusdarstellung gehören nur zur Story und ändern die Editor-Komponente nicht.

Die Default-Toolbar bietet Fett, Kursiv, Unterstrichen, Durchgestrichen, nummerierte und Aufzählungslisten sowie Link. `markdownEditorDefaultItems` ist exportiert. `items` ersetzt die Default-Liste vollständig. Jedes Item hat `type: 'button'`, eindeutige `id`, lokalisiertes `label`, `onClick(editor)` und optional einen Icon-Namen im mit Core `ButtonIcon` kompatiblen Format. Buttons und Icons rendert MarkdownEditor selbst, ohne Core-Button-Komponente. Shortcuts unterstützen `key`, `ctrlKey`, `metaKey`, `shiftKey` und `altKey`.

`onRequestLink({ href, text })` gibt dem Consumer die aktuelle Auswahl. Der Callback kann synchron oder asynchron eine URL oder `null` zum Entfernen des Links liefern. Der Consumer stellt bei Bedarf selbst einen zugänglichen Linkdialog bereit.

## Besonderheiten

Unterstreichung wird als `<u>...</u>` im Markdown-String gespeichert, da Standard-Markdown keine Unterstreichungs-Syntax enthält. Die Toolbar nutzt normale Tab-Reihenfolge und zugängliche Namen. Farbe und Editoroberfläche kommen vom Wrapper beziehungsweise Theme.

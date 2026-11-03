import { useRef, useState } from 'react';
import { Button, RichTextEditor } from '@chayns-ui/core';
import type {
  MentionQuery,
  RichTextDocument,
  RichTextEditorCommands,
  RichTextEditorProps,
} from '@chayns-ui/core';

function ControlledRichTextEditor(props: Partial<RichTextEditorProps>) {
  const [value, setValue] = useState<RichTextDocument>(props.value ?? { version: 1, content: [] });
  const [query, setQuery] = useState<MentionQuery | null>(null);
  const commands = useRef<RichTextEditorCommands>(null);
  return (
    <div>
      <RichTextEditor
        aria-label="Nachrichtenentwurf"
        {...props}
        commandsRef={commands}
        value={value}
        onMentionQueryChange={setQuery}
        onValueChange={setValue}
        {...(query
          ? {
              mentionResults: {
                queryId: query.id,
                items: [
                  { id: 'support', label: 'Support' },
                  { id: 'design', label: 'Design' },
                ],
              },
            }
          : {})}
      />
      <Button onClick={() => commands.current?.insertText('Bitte prüfen.')} variant="ghost">
        Textbaustein einsetzen
      </Button>
      <Button onClick={() => setValue({ version: 1, content: [] })} variant="ghost">
        Entwurf zurücksetzen
      </Button>
      <output aria-label="Dokument">{JSON.stringify(value)}</output>
    </div>
  );
}
ControlledRichTextEditor.displayName = 'ControlledRichTextEditor';
export default ControlledRichTextEditor;

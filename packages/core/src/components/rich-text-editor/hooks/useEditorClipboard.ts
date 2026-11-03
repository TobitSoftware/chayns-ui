import { useEffect } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  COPY_COMMAND,
  CUT_COMMAND,
  DROP_COMMAND,
  PASTE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical';
import type { LexicalEditor } from 'lexical';
import type { RichTextEditorProps } from '../RichTextEditor.types.js';

export function useEditorClipboard(
  editor: LexicalEditor,
  insertText: (text: string) => void,
  props: RichTextEditorProps,
) {
  const { onCopy, onCut, onPaste, onDrop, readOnly, disabled } = props;
  useEffect(() => {
    const unregister = [
      editor.registerCommand(COPY_COMMAND, () => true, COMMAND_PRIORITY_CRITICAL),
      editor.registerCommand(CUT_COMMAND, () => true, COMMAND_PRIORITY_CRITICAL),
      editor.registerCommand(PASTE_COMMAND, () => true, COMMAND_PRIORITY_CRITICAL),
      editor.registerCommand(DROP_COMMAND, () => true, COMMAND_PRIORITY_CRITICAL),
    ];
    return () => unregister.forEach((remove) => remove());
  }, [editor]);

  function copy(event: React.ClipboardEvent<HTMLDivElement>, cut: boolean) {
    if (cut) onCut?.(event);
    else onCopy?.(event);
    if (event.defaultPrevented) return;
    editor.read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      try {
        event.clipboardData.setData('text/plain', selection.getTextContent());
      } catch {
        return;
      }
      event.preventDefault();
      if (cut && !readOnly && !disabled)
        editor.update(
          () => {
            const range = $getSelection();
            if ($isRangeSelection(range)) range.removeText();
          },
          { tag: 'history-push', discrete: true },
        );
    });
  }

  return {
    onCopy: (event: React.ClipboardEvent<HTMLDivElement>) => copy(event, false),
    onCut: (event: React.ClipboardEvent<HTMLDivElement>) => copy(event, true),
    onPaste: (event: React.ClipboardEvent<HTMLDivElement>) => {
      onPaste?.(event);
      if (!event.defaultPrevented) {
        event.preventDefault();
        insertText(event.clipboardData.getData('text/plain'));
      }
    },
    onDrop: (event: React.DragEvent<HTMLDivElement>) => {
      onDrop?.(event);
      if (!event.defaultPrevented) {
        event.preventDefault();
        insertText(event.dataTransfer.getData('text/plain'));
      }
    },
  };
}

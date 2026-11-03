import { useRef, useState } from 'react';
import { MessageComposer } from '@chayns-ui/core';
import type { MessageComposerProps, RichTextDocument } from '@chayns-ui/core';
import { composerLabels } from './ComposerLabels.js';

function ControlledMessageComposer(props: Partial<MessageComposerProps>) {
  const picker = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<RichTextDocument>(props.value ?? { version: 1, content: [] });
  const [sent, setSent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [attachments, setAttachments] = useState(props.attachments ?? []);
  const [prompts, setPrompts] = useState(props.prompts ?? []);
  const [selectedId, setSelectedId] = useState(props.selector?.selectedItem.id);
  const [action, setAction] = useState('');

  const selectedItem = props.selector?.groups
    .flatMap((group) => group.items)
    .find((item) => item.id === selectedId);

  function handleAction(id: string) {
    if (id === 'images' || id === 'files') {
      if (picker.current) picker.current.accept = id === 'images' ? 'image/*' : '';
      picker.current?.click();
    } else setAction(id);
    props.onAction?.(id);
  }

  return (
    <div>
      <input
        aria-label="Anhänge auswählen"
        hidden
        multiple
        ref={picker}
        type="file"
        onChange={(event) => {
          const files = Array.from(event.currentTarget.files ?? []);
          setAttachments((items) => [
            ...items,
            ...files.map((file) => ({
              id: crypto.randomUUID(),
              content: file.name,
              removeLabel: `${file.name} entfernen`,
            })),
          ]);
          event.currentTarget.value = '';
        }}
      />
      <MessageComposer
        aria-label="Nachrichtenentwurf"
        labels={composerLabels}
        layout="twoLine"
        {...props}
        onAction={handleAction}
        attachments={attachments}
        onAttachmentRemove={(id) =>
          setAttachments((items) => items.filter((item) => item.id !== id))
        }
        prompts={prompts}
        onPrompt={(id) => {
          setPrompt(id);
          setPrompts((items) => items.filter((item) => item.id !== id));
          props.onPrompt?.(id);
        }}
        {...(props.selector
          ? {
              selector: {
                ...props.selector,
                selectedItem: selectedItem ?? props.selector.selectedItem,
                onSelect: (id) => {
                  setSelectedId(id);
                  props.selector?.onSelect(id);
                },
                onAction: (id) => {
                  setAction(id);
                  props.selector?.onAction?.(id);
                },
              },
            }
          : {})}
        value={value}
        onValueChange={setValue}
        onSubmit={() => {
          setSent(JSON.stringify(value));
          setValue({ version: 1, content: [] });
          setAttachments([]);
          props.onSubmit?.();
        }}
      />
      <output aria-label="Gesendeter Entwurf" hidden>
        {sent}
      </output>
      <output aria-label="Consumer-Aktion">{action}</output>
      <output aria-label="Prompt-Aktion">{prompt}</output>
    </div>
  );
}
ControlledMessageComposer.displayName = 'ControlledMessageComposer';
export default ControlledMessageComposer;

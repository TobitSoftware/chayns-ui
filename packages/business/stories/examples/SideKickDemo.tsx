import { useRef, useState } from 'react';
import { SideKickInput } from '@chayns-ui/business';
import type {
  SideKickDraft,
  SideKickIdentity,
  SideKickInputProps,
  SideKickSelection,
} from '@chayns-ui/business';
import type { ComposerAction, ComposerAttachment, RichTextDocument } from '@chayns-ui/core';
import { composerLabels } from '../ComposerLabels.js';

const agents: readonly SideKickIdentity[] = [
  { id: 'support', label: 'Support-Agent', shortLabel: 'Support', description: 'Kundenservice' },
  {
    id: 'research',
    label: 'Recherche-Agent',
    shortLabel: 'Recherche',
    description: 'Recherche und Analyse',
  },
];
const models: readonly SideKickIdentity[] = [
  { id: 'gpt', label: 'ChatGPT', shortLabel: 'ChatGPT', icon: 'fa-microchip-ai' },
  { id: 'claude', label: 'Claude', shortLabel: 'Claude', icon: 'fa-microchip-ai' },
  { id: 'gemini', label: 'Gemini', shortLabel: 'Gemini', icon: 'fa-microchip-ai' },
];
const initialPrompts: readonly ComposerAction[] = [
  { id: 'image', label: 'Bild erstellen', icon: 'fa-image' },
  { id: 'search', label: 'Suchen', icon: 'fa-globe' },
  { id: 'document', label: 'Dokument analysieren', icon: 'fa-book-open-lines' },
];

/** Consumer example: owns files, prompts, identities and transport integration. */
function SideKickDemo({
  withAttachment = false,
  ...props
}: Partial<SideKickInputProps> & { withAttachment?: boolean }) {
  const [value, setValue] = useState<RichTextDocument>({ version: 1, content: [] });
  const [selection, setSelection] = useState<SideKickSelection>({ kind: 'automatic' });
  const [attachments, setAttachments] = useState<readonly ComposerAttachment[]>(
    withAttachment
      ? [
          {
            id: 'report',
            content: 'Projektbericht.pdf',
            removeLabel: 'Projektbericht.pdf entfernen',
          },
        ]
      : [],
  );
  const [prompts, setPrompts] = useState(initialPrompts);
  const [lastAction, setLastAction] = useState('');
  const [saved, setSaved] = useState<SideKickDraft | null>(null);
  const picker = useRef<HTMLInputElement>(null);
  const selectedIdentity =
    selection.kind === 'automatic'
      ? undefined
      : [...agents, ...models].find((item) => item.id === selection.id);

  return (
    <>
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
      <SideKickInput
        aria-label="Nachricht an Sidekick"
        placeholder="Frag irgendetwas"
        layout="twoLine"
        labels={composerLabels}
        {...props}
        value={value}
        onValueChange={setValue}
        attachments={attachments}
        onAttachmentRemove={(id) =>
          setAttachments((items) => items.filter((item) => item.id !== id))
        }
        actions={[
          { id: 'images', label: 'Bilder', icon: 'fa-image' },
          { id: 'files', label: 'Dateien', icon: 'fa-paperclip' },
          { id: 'temporary', label: 'Temporärer Chat', icon: 'fa-message' },
          { id: 'project', label: 'Projektzuordnung', icon: 'fa-folder' },
        ]}
        onAction={(id) => {
          if (id === 'images' || id === 'files') {
            if (picker.current) picker.current.accept = id === 'images' ? 'image/*' : '';
            picker.current?.click();
          } else setLastAction(id);
        }}
        prompts={prompts}
        onPrompt={(id) => {
          setLastAction(id);
          setPrompts((items) => items.filter((item) => item.id !== id));
        }}
        agentSelector={{
          value: selection,
          onValueChange: setSelection,
          automatic: {
            label: 'Automatisch',
            shortLabel: 'Auto',
            description: 'Passend zur Aufgabe',
            icon: 'fa-sparkles',
          },
          recentAgents: agents,
          recentModels: models,
          recentAgentsLabel: 'Zuletzt verwendete Agents',
          recentModelsLabel: 'Zuletzt verwendete Modelle',
          allAction: { id: 'all', label: 'Alle Agents & Modelle', icon: 'fa-grid-2' },
          onAllAction: () => setLastAction('Alle Agents & Modelle'),
          ...(selectedIdentity ? { selectedIdentity } : {}),
        }}
        onSend={(draft) => {
          setSaved(draft);
          setAttachments([]);
          setLastAction('Nachricht an Consumer übergeben');
        }}
      />
      <output aria-label="Consumer-Aktion">{lastAction}</output>
      {saved ? (
        <output aria-label="Gesicherter Entwurf" hidden>
          {JSON.stringify(saved)}
        </output>
      ) : null}
    </>
  );
}
SideKickDemo.displayName = 'SideKickDemo';
export default SideKickDemo;

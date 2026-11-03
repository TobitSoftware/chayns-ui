import SideKickDemo from './examples/SideKickDemo.js';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { SideKickInput } from '@chayns-ui/business';
import type { SideKickDraft, SideKickInputProps, SideKickSelection } from '@chayns-ui/business';
import type { RichTextDocument } from '@chayns-ui/core';
import usage from '../../../docs/03-components/sidekick-input/sidekick-input-usage.md?raw';
import { composerLabels } from './ComposerLabels.js';

function ControlledSideKick(props: Partial<SideKickInputProps>) {
  const [selection, setSelection] = useState<SideKickSelection>(
    props.agentSelector?.value ?? { kind: 'automatic' },
  );
  const identities = [
    ...(props.agentSelector?.recentAgents ?? []),
    ...(props.agentSelector?.recentModels ?? []),
  ];
  const selectedIdentity =
    selection.kind === 'automatic'
      ? undefined
      : identities.find((item) => item.id === selection.id);

  const [value, setValue] = useState<RichTextDocument>({ version: 1, content: [] });
  const [saved, setSaved] = useState<SideKickDraft | null>(null);
  return (
    <div>
      <SideKickInput
        aria-label="Nachricht an Sidekick"
        layout="twoLine"
        labels={composerLabels}
        {...props}
        value={value}
        onValueChange={setValue}
        {...(props.agentSelector
          ? {
              agentSelector: {
                ...props.agentSelector,
                value: selection,
                onValueChange: setSelection,
                ...(selectedIdentity ? { selectedIdentity } : {}),
              },
            }
          : {})}
        onSend={setSaved}
      />
      <output aria-label="Gesicherter Entwurf">{saved ? JSON.stringify(saved) : ''}</output>
      {saved ? (
        <button onClick={() => setValue(saved.document)} type="button">
          Für erneuten Versand wiederherstellen
        </button>
      ) : null}
    </div>
  );
}
ControlledSideKick.displayName = 'ControlledSideKick';
const meta = {
  title: 'Business/SideKickInput',
  component: SideKickInput,
  tags: ['autodocs'],
  args: {
    value: { version: 1, content: [] },
    onValueChange: () => undefined,
    onSend: () => undefined,
    layout: 'twoLine',
    labels: composerLabels,
  },
  parameters: { docs: { description: { component: usage } }, a11y: { test: 'error' } },
  render: ControlledSideKick,
} satisfies Meta<typeof SideKickInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { voice: { onStream: () => undefined } },
  render: (args) => <SideKickDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Vollständiger Consumer mit nativer Diktierung und Audioaufnahme. Die Anwendung erhält den Stream; dieses Beispiel stellt keine Sprachchat-Verbindung her. Bilder/Dateien werden über einen Consumer-eigenen Dateidialog als Attachment-Items bereitgestellt.',
      },
    },
  },
};
export const Attachments: Story = {
  args: { ...Default.args },
  render: (args) => <SideKickDemo {...args} withAttachment />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Projektbericht.pdf entfernen' }));
    await expect(canvas.queryByText('Projektbericht.pdf')).not.toBeInTheDocument();
    await userEvent.upload(
      canvas.getByLabelText('Anhänge auswählen'),
      new File(['Bericht'], 'Neuer Bericht.txt', { type: 'text/plain' }),
    );
    await expect(canvas.getByText('Neuer Bericht.txt')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('textbox'));
    await userEvent.type(canvas.getByRole('textbox'), 'Bitte analysieren');
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByLabelText('Gesicherter Entwurf')).toHaveTextContent('attachmentIds');
    await expect(canvas.queryByText('Neuer Bericht.txt')).not.toBeInTheDocument();
  },
};
export const DefaultInteractions: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox');
    await userEvent.click(canvas.getByRole('button', { name: 'Hinzufügen' }));
    await userEvent.click(within(document.body).getByRole('menuitem', { name: 'Temporärer Chat' }));
    await expect(canvas.getByLabelText('Consumer-Aktion')).toHaveTextContent('temporary');
    await userEvent.click(canvas.getByRole('button', { name: 'KI-Kontext: Automatisch' }));
    await userEvent.click(within(document.body).getByRole('menuitemradio', { name: 'ChatGPT' }));
    await expect(canvas.getByRole('button', { name: 'KI-Kontext: ChatGPT' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Suchen' }));
    await expect(canvas.queryByRole('button', { name: 'Suchen' })).not.toBeInTheDocument();
    await expect(editor.textContent).toBe('');
    await userEvent.click(editor);
    await userEvent.type(editor, 'Bitte prüfen');
    await waitFor(() => expect(canvas.getByRole('button', { name: 'Senden' })).toBeVisible());
    await userEvent.keyboard('{Enter}');
    await expect(editor.textContent).toBe('');
    await expect(canvas.getByLabelText('Gesicherter Entwurf')).toHaveTextContent('Bitte prüfen');
    await expect(canvas.getByLabelText('Gesicherter Entwurf')).toHaveTextContent(
      '"kind":"model","id":"gpt"',
    );
  },
};
export const WithoutVoice: Story = {
  render: (args) => <SideKickDemo {...args} />,
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).queryByRole('button', { name: 'Voice-Chat starten' }),
    ).not.toBeInTheDocument();
  },
};
export const ControlledSend: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox', { name: 'Nachricht an Sidekick' });
    await userEvent.click(editor);
    await userEvent.type(editor, 'Bitte prüfen.');
    await userEvent.keyboard('{Enter}');
    await expect(editor).toHaveTextContent('');
    await expect(canvas.getByLabelText('Gesicherter Entwurf')).toHaveTextContent('Bitte prüfen.');
  },
};
export const OptimisticFailureAndRetry: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox', { name: 'Nachricht an Sidekick' });
    await userEvent.click(editor);
    await userEvent.type(editor, 'Entwurf behalten');
    await userEvent.keyboard('{Enter}');
    await userEvent.type(editor, 'Neuer Entwurf');
    await expect(canvas.getByLabelText('Gesicherter Entwurf')).toHaveTextContent(
      'Entwurf behalten',
    );
    await expect(editor).toHaveTextContent('Neuer Entwurf');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Für erneuten Versand wiederherstellen' }),
    );
    await expect(editor).toHaveTextContent('Entwurf behalten');
  },
};

export const AgentAndModelSelection: Story = {
  args: {
    agentSelector: {
      value: { kind: 'automatic' },
      automatic: { label: 'Automatisch', shortLabel: 'Auto', icon: 'fa-sparkles' },
      recentAgents: [{ id: 'support', label: 'Support-Agent', shortLabel: 'Support' }],
      recentModels: [{ id: 'model', label: 'Sprachmodell', shortLabel: 'Modell' }],
      recentAgentsLabel: 'Letzte Agenten',
      recentModelsLabel: 'Letzte Modelle',
      onValueChange: () => undefined,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'KI-Kontext: Automatisch' }));
    await userEvent.click(
      within(document.body).getByRole('menuitemradio', { name: 'Sprachmodell' }),
    );
    await expect(
      canvas.getByRole('button', { name: 'KI-Kontext: Sprachmodell' }),
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('textbox'));
    await userEvent.type(canvas.getByRole('textbox'), 'Mit diesem Modell senden');
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByLabelText('Gesicherter Entwurf')).toHaveTextContent(
      '"kind":"model","id":"model"',
    );
  },
};

export const ExternalDraftRestoresFocus: Story = {
  args: { voice: { onStream: () => undefined } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox');
    await userEvent.click(editor);
    await userEvent.type(editor, 'Gesicherter Entwurf');
    await expect(editor.textContent).toBe('Gesicherter Entwurf');
    await userEvent.keyboard('{Enter}');
    const voice = await canvas.findByRole('button', { name: 'Voice-Chat starten' });
    voice.focus();
    await expect(voice).toHaveFocus();
    // Consumer-driven replacement while focus still belongs to the disappearing action.
    canvas.getByRole('button', { name: 'Für erneuten Versand wiederherstellen' }).click();
    await waitFor(() => expect(editor).toHaveTextContent('Gesicherter Entwurf'));
    await expect(editor).toHaveFocus();
    await expect(voice).toHaveAttribute('aria-hidden', 'true');
  },
};

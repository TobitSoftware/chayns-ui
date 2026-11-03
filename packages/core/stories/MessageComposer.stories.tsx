import { checkComposerActionMotion } from './interactions/composer-motion.js';
import VoiceMessageComposer from './examples/VoiceMessageComposer.js';
import { installCaptureMocks, StoryRecognition, storyTrack } from './mocks/native-capture.js';
import { composerLabels } from './examples/ComposerLabels.js';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import usage from '../../../docs/03-components/message-composer/message-composer-usage.md?raw';
import MessageComposer from '../src/components/message-composer/MessageComposer.js';
import ControlledMessageComposer from './examples/ControlledMessageComposer.js';

const meta = {
  title: 'Core/MessageComposer',
  component: MessageComposer,
  tags: ['autodocs'],
  args: {
    value: { version: 1, content: [] },
    onValueChange: () => undefined,
    layout: 'twoLine',
    labels: composerLabels,
  },
  parameters: { docs: { description: { component: usage } }, a11y: { test: 'error' } },
  render: ControlledMessageComposer,
} satisfies Meta<typeof MessageComposer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const TwoLine: Story = {
  args: {
    placeholder: 'Frag irgendetwas',
    actions: [
      { id: 'images', label: 'Bilder', icon: 'fa-image' },
      { id: 'files', label: 'Dateien', icon: 'fa-paperclip' },
      { id: 'temporary', label: 'Temporärer Chat', icon: 'fa-message' },
      { id: 'project', label: 'Projektzuordnung', icon: 'fa-folder' },
    ],
    onAction: () => undefined,
    prompts: [
      { id: 'image', label: 'Bild erstellen', icon: 'fa-image' },
      { id: 'search', label: 'Suchen', icon: 'fa-globe' },
      { id: 'document', label: 'Dokument analysieren', icon: 'fa-book-open-lines' },
    ],
    onPrompt: () => undefined,
    selector: {
      selectedItem: { id: 'auto', label: 'Automatisch', shortLabel: 'Auto', icon: 'fa-sparkles' },
      groups: [
        {
          id: 'automatic',
          items: [
            {
              id: 'auto',
              label: 'Automatisch',
              shortLabel: 'Auto',
              description: 'Passend zur Aufgabe',
              icon: 'fa-sparkles',
            },
          ],
        },
        {
          id: 'agents',
          label: 'Zuletzt verwendete Agents',
          items: [
            {
              id: 'support',
              label: 'Support-Agent',
              shortLabel: 'Support',
              description: 'Kundenservice',
            },
            {
              id: 'research',
              label: 'Recherche-Agent',
              shortLabel: 'Recherche',
              description: 'Recherche und Analyse',
            },
          ],
        },
        {
          id: 'models',
          label: 'Zuletzt verwendete Modelle',
          items: ['ChatGPT', 'Claude', 'Gemini'].map((label) => ({
            id: label,
            label,
            shortLabel: label,
            icon: 'fa-microchip-ai',
          })),
        },
      ],
      onSelect: () => undefined,
      action: { id: 'all', label: 'Alle Agents & Modelle', icon: 'fa-grid-2' },
      onAction: () => undefined,
    },
    voice: { onStream: () => undefined },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Vollständiges 2-line-Beispiel nach Bodywork. Diktierung nutzt die native Browser-API. Voice ist über onStream eingebunden; das Beispiel stellt keine Sprachchat-Verbindung her. Der Consumer verwaltet Dateien, Auswahl und Prompt-Aktionen.',
      },
    },
  },
};
export const OneLine: Story = { args: { layout: 'oneLine' } };
export const TwoLineInteractions: Story = {
  ...TwoLine,
  beforeEach: () => installCaptureMocks(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox');
    await userEvent.click(canvas.getByRole('button', { name: 'Hinzufügen' }));
    const menu = within(within(document.body).getByRole('menu'));
    for (const name of ['Bilder', 'Dateien', 'Temporärer Chat', 'Projektzuordnung']) {
      await waitFor(() => expect(menu.getByRole('menuitem', { name })).toBeVisible());
    }
    await userEvent.keyboard('{Escape}');
    await userEvent.click(canvas.getByRole('button', { name: 'KI-Kontext: Automatisch' }));
    await userEvent.click(within(document.body).getByRole('menuitemradio', { name: 'ChatGPT' }));
    await expect(canvas.getByRole('button', { name: 'KI-Kontext: ChatGPT' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Suchen' }));
    await expect(canvas.queryByRole('button', { name: 'Suchen' })).not.toBeInTheDocument();
    await expect(editor.textContent).toBe('');
    await userEvent.upload(
      canvas.getByLabelText('Anhänge auswählen'),
      new File(['Bericht'], 'Bericht.txt', { type: 'text/plain' }),
    );
    await expect(canvas.getByText('Bericht.txt')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Bericht.txt entfernen' }));
    await expect(canvas.queryByText('Bericht.txt')).not.toBeInTheDocument();
    await userEvent.click(editor);
    await userEvent.type(editor, 'Bitte prüfen');
    await waitFor(() => expect(canvas.getByRole('button', { name: 'Senden' })).toBeVisible());
    await expect(canvas.queryByRole('button', { name: 'Diktieren' })).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'Voice-Chat starten' }),
    ).not.toBeInTheDocument();
    await userEvent.keyboard('{Enter}');
    await expect(editor.textContent).toBe('');
    await expect(canvas.getByLabelText('Gesendeter Entwurf')).toHaveTextContent('Bitte prüfen');
    await waitFor(() => expect(canvas.getByRole('button', { name: 'Diktieren' })).toBeVisible());
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: 'Voice-Chat starten' })).toBeVisible(),
    );
  },
};
export const MultilineOverflow: Story = {
  args: { value: { version: 1, content: [{ type: 'text', text: 'Eine Zeile\n'.repeat(20) }] } },
};
export const PromptActions: Story = {
  args: { prompts: [{ id: 'summary', label: 'Zusammenfassung erstellen' }] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Zusammenfassung erstellen' }));
    await expect(canvas.getByLabelText('Prompt-Aktion')).toHaveTextContent('summary');
  },
};
export const AttachmentsAndSnippets: Story = {
  args: {
    attachments: [{ id: 'file', content: 'Bericht.pdf', removeLabel: 'Bericht entfernen' }],
    snippets: [{ id: 'review', label: 'Prüfung anfragen', text: 'Bitte prüfe den Bericht.' }],
  },
};
export const AddMenu: Story = {
  args: {
    actions: [
      { id: 'file', label: 'Datei anhängen', icon: 'fa-paperclip' },
      { id: 'temporary', label: 'Temporärer Chat' },
    ],
    onAction: () => undefined,
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Hinzufügen' }));
    await expect(
      within(document.body).getByRole('menuitem', { name: 'Datei anhängen' }),
    ).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(within(canvasElement).getByRole('button', { name: 'Hinzufügen' })).toHaveFocus();
  },
};
export const Pending: Story = {
  args: {
    pending: true,
    value: { version: 1, content: [{ type: 'text', text: 'Nächster Entwurf' }] },
  },
};
export const Error: Story = { args: { error: 'Die Nachricht konnte nicht gesendet werden.' } };
export const Disabled: Story = { args: { disabled: true } };
export const UnsupportedCapture: Story = {
  args: { dictation: { language: 'de-DE', disabled: true } },
};

export const DictationLifecycle: Story = {
  beforeEach: () => installCaptureMocks(),
  args: { ...TwoLine.args, lang: 'de-DE' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox', { name: 'Nachrichtenentwurf' });
    await userEvent.click(await canvas.findByRole('button', { name: 'Diktieren' }));
    await expect(StoryRecognition.current!.lang).toBe('de-DE');
    await expect(canvas.getByRole('button', { name: 'Diktierung verwerfen' })).toBeEnabled();
    await expect(
      canvas.queryByRole('button', { name: 'Voice-Chat starten' }),
    ).not.toBeInTheDocument();
    StoryRecognition.current!.result('Vorläuf', false);
    await waitFor(() => expect(editor).toHaveTextContent('Vorläuf'));
    StoryRecognition.current!.result('Bestätigt ', true);
    await userEvent.click(canvas.getByRole('button', { name: 'Diktierung pausieren' }));
    await expect(editor).toHaveAttribute('contenteditable', 'false');
    await userEvent.click(canvas.getByRole('button', { name: 'Diktierung fortsetzen' }));
    StoryRecognition.current!.result('fortgesetzt', true);
    await waitFor(() => expect(editor).toHaveTextContent('Bestätigt fortgesetzt'));
    await userEvent.click(canvas.getByRole('button', { name: 'Diktierung übernehmen' }));
    await expect(editor).toHaveAttribute('contenteditable', 'true');
    await expect(editor).toHaveFocus();
    await userEvent.keyboard(
      navigator.platform.includes('Mac') ? '{Meta>}z{/Meta}' : '{Control>}z{/Control}',
    );
    await waitFor(() => expect(editor.textContent).toBe(''));
  },
};
export const VoiceLifecycle: Story = {
  beforeEach: () => installCaptureMocks(),
  render: VoiceMessageComposer,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Voice-Chat starten' }));
    await expect(canvas.getByRole('textbox')).toHaveAttribute('contenteditable', 'false');
    await userEvent.click(canvas.getByRole('button', { name: 'Mikrofon stummschalten' }));
    await expect(storyTrack.enabled).toBe(false);
    await userEvent.click(canvas.getByRole('button', { name: 'Voice-Chat beenden' }));
    await expect(storyTrack.stopped).toBe(true);
    await expect(canvas.getByRole('button', { name: 'Voice-Chat starten' })).toHaveFocus();
    await expect(canvas.getByRole('textbox')).toHaveAttribute('contenteditable', 'true');
  },
};

export const OneLineExpansionPreservesEditing: Story = {
  args: {
    layout: 'oneLine',
    actions: [{ id: 'file', label: 'Datei anhängen' }],
    onAction: () => undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox');
    await userEvent.click(editor);
    await userEvent.type(editor, 'Erste Zeile');
    await userEvent.keyboard('{Shift>}{Enter}{/Shift}');
    await userEvent.type(editor, 'Zweite Zeile');
    await expect(canvas.getByRole('textbox')).toBe(editor);
    await expect(editor).toHaveFocus();
    await expect(editor).toHaveTextContent('Zweite Zeile');
    await expect(editor.closest('.chayns-message-composer')).toHaveClass(
      'chayns-message-composer--expanded',
    );
  },
};

export const CompleteComposition: Story = {
  args: {
    ...TwoLine.args,
    snippets: [
      { id: 'review', label: 'Prüfung anfragen', text: 'Bitte prüfe den folgenden Inhalt: ' },
    ],
  },
};

export const DictationFinalizesOneUndoStep: Story = {
  beforeEach: () => installCaptureMocks(),
  args: { dictation: { language: 'de-DE' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox');
    await userEvent.click(await canvas.findByRole('button', { name: 'Diktieren' }));
    StoryRecognition.current!.onresult?.({
      results: [
        { isFinal: true, 0: { transcript: 'Bestätigt' } },
        { isFinal: false, 0: { transcript: ' vorläufig' } },
      ],
    });
    await waitFor(() => expect(editor).toHaveTextContent('Bestätigt vorläufig'));
    await userEvent.click(canvas.getByRole('button', { name: 'Diktierung übernehmen' }));
    await expect(editor.textContent).toBe('Bestätigt');
    await userEvent.keyboard(
      navigator.platform.includes('Mac') ? '{Meta>}z{/Meta}' : '{Control>}z{/Control}',
    );
    await waitFor(() => expect(editor.textContent).toBe(''));
  },
};

export const DictationRecording: Story = {
  args: { ...TwoLine.args },
  beforeEach: () => installCaptureMocks(),
  parameters: {
    docs: {
      description: {
        story:
          'Simulierte Browser-Erkennung für eine reproduzierbare Darstellung des Aufnahmezustands. Die Standard-Stories verwenden die native Browser-API.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Diktieren' }));
    StoryRecognition.current!.result('Das ist mein Diktat.', true);
    await expect(canvas.getByRole('textbox')).toHaveAttribute('contenteditable', 'false');
    await expect(canvas.getByRole('button', { name: 'Diktierung pausieren' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  },
};
export const DictationPaused: Story = {
  args: { ...TwoLine.args },
  beforeEach: () => installCaptureMocks(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Diktieren' }));
    StoryRecognition.current!.result('Bisher erkannter Text.', true);
    await userEvent.click(canvas.getByRole('button', { name: 'Diktierung pausieren' }));
    await expect(canvas.getByRole('button', { name: 'Diktierung fortsetzen' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    await expect(canvas.getByRole('textbox')).toHaveAttribute('contenteditable', 'false');
  },
};
export const DictationCancel: Story = {
  beforeEach: () => installCaptureMocks(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox');
    await userEvent.click(await canvas.findByRole('button', { name: 'Diktieren' }));
    const recognition = StoryRecognition.current!;
    recognition.result('Verwerfen', true);
    await waitFor(() => expect(editor).toHaveTextContent('Verwerfen'));
    const late = recognition.onresult;
    await userEvent.click(canvas.getByRole('button', { name: 'Diktierung verwerfen' }));
    late?.({ results: [{ isFinal: true, 0: { transcript: 'Verspätet' } }] });
    await expect(editor.textContent).toBe('');
    await expect(editor).toHaveAttribute('contenteditable', 'true');
    await expect(editor).toHaveFocus();
    await userEvent.keyboard(
      navigator.platform.includes('Mac') ? '{Meta>}z{/Meta}' : '{Control>}z{/Control}',
    );
    await expect(editor.textContent).toBe('');
    await userEvent.keyboard(
      navigator.platform.includes('Mac')
        ? '{Meta>}{Shift>}z{/Shift}{/Meta}'
        : '{Control>}y{/Control}',
    );
    await expect(editor.textContent).toBe('');
  },
};
export const DictationDisabled: Story = {
  beforeEach: () => installCaptureMocks(),
  args: { dictation: { disabled: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', { name: 'Diktieren' })).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'Voice-Chat starten' }),
    ).not.toBeInTheDocument();
  },
};

export const StableActionTransitions: Story = {
  ...TwoLine,
  beforeEach: () => installCaptureMocks(),
  play: async ({ canvasElement }) => checkComposerActionMotion(canvasElement),
};

export const ReversibleExpansion: Story = {
  ...OneLineExpansionPreservesEditing,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox');
    const root = editor.closest<HTMLElement>('.chayns-message-composer')!;
    const add = canvas.getByRole('button', { name: 'Hinzufügen' });
    await userEvent.click(editor);
    await userEvent.type(editor, 'Erste Zeile');
    await userEvent.keyboard('{Shift>}{Enter}{/Shift}');
    await waitFor(() => expect(root).toHaveClass('chayns-message-composer--expanded'));
    await expect(add.getAnimations().some((animation) => animation.playState === 'running')).toBe(
      true,
    );
    await userEvent.keyboard('{Backspace}');
    await waitFor(() => expect(root).not.toHaveClass('chayns-message-composer--expanded'));
    await expect(add.getAnimations().some((animation) => animation.playState === 'running')).toBe(
      true,
    );
    await expect(canvas.getByRole('textbox')).toBe(editor);
    await expect(editor).toHaveFocus();
    await expect(editor.textContent).toBe('Erste Zeile');
  },
};

export const LongSelectionLabels: Story = {
  ...TwoLine,
  beforeEach: () => installCaptureMocks(),
  args: {
    ...TwoLine.args,
    rootProps: { style: { maxWidth: 272 } },
    selector: {
      selectedItem: {
        id: 'long',
        label: 'Ein Agent mit einem sehr langen übersetzten Namen',
        shortLabel: 'Eine längere lokalisierte Kurzbezeichnung',
      },
      groups: [
        {
          id: 'agents',
          items: [
            {
              id: 'long',
              label: 'Ein Agent mit einem sehr langen übersetzten Namen',
              shortLabel: 'Eine längere lokalisierte Kurzbezeichnung',
            },
          ],
        },
      ],
      onSelect: () => undefined,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox');
    await userEvent.click(editor);
    await userEvent.type(editor, 'Ein Entwurf');
    const surface = editor.closest('.chayns-message-composer__surface')!;
    await waitFor(async () => {
      const bounds = surface.getBoundingClientRect();
      for (const button of canvas.getAllByRole('button')) {
        if (button.closest('.chayns-message-composer__prompts')) continue;
        const rect = button.getBoundingClientRect();
        await expect(rect.left).toBeGreaterThanOrEqual(bounds.left);
        await expect(rect.right).toBeLessThanOrEqual(bounds.right);
      }
    });
    await expect(editor).toHaveFocus();
  },
};

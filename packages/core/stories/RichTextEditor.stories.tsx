import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import usage from '../../../docs/03-components/rich-text-editor/rich-text-editor-usage.md?raw';
import RichTextEditor from '../src/components/rich-text-editor/RichTextEditor.js';
import ControlledRichTextEditor from './examples/ControlledRichTextEditor.js';

const meta = {
  title: 'Core/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
  args: { value: { version: 1, content: [] }, onValueChange: () => undefined },
  parameters: { docs: { description: { component: usage } }, a11y: { test: 'error' } },
  render: ControlledRichTextEditor,
} satisfies Meta<typeof RichTextEditor>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
export const AtomicMentions: Story = {
  args: {
    value: {
      version: 1,
      content: [
        { type: 'text', text: 'Frage ' },
        { type: 'mention', id: 'support', label: 'Support' },
      ],
    },
  },
};
export const MentionSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox', { name: 'Nachrichtenentwurf' });
    await userEvent.click(editor);
    await userEvent.type(editor, '@sup');
    await expect(
      within(document.body).getByRole('option', { name: 'Support' }),
    ).toBeInTheDocument();
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(editor).toHaveTextContent('@Support');
    await expect(canvas.getByLabelText('Dokument')).toHaveTextContent('"id":"support"');
  },
};
export const ReadOnly: Story = {
  args: { readOnly: true, value: { version: 1, content: [{ type: 'text', text: 'Nur lesen' }] } },
};
export const Disabled: Story = { args: { disabled: true } };
export const LongLocalizedContent: Story = {
  args: {
    value: {
      version: 1,
      content: [
        {
          type: 'text',
          text: 'A long translated message with Unicode 日本語 and العربية. '.repeat(30),
        },
      ],
    },
  },
};
export const ConsumerKeyboardCancellation: Story = {
  args: {
    onKeyDown: (event) => {
      if (event.key === 'Enter') event.preventDefault();
    },
  },
};

export const BeforeInputCancellation: Story = {
  args: { onBeforeInput: (event) => event.preventDefault() },
  play: async ({ canvasElement }) => {
    const editor = within(canvasElement).getByRole('textbox');
    await userEvent.click(editor);
    await userEvent.type(editor, 'veto');
    await expect(editor.textContent).toBe('');
  },
};
export const SelectionAndSnippets: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox');
    await userEvent.click(editor);
    await userEvent.type(editor, 'ab');
    await userEvent.keyboard('{ArrowLeft}');
    await userEvent.click(canvas.getByRole('button', { name: 'Textbaustein einsetzen' }));
    await expect(editor).toHaveTextContent('aBitte prüfen.b');
    await expect(editor).toHaveFocus();
    await userEvent.keyboard(
      navigator.platform.includes('Mac') ? '{Meta>}z{/Meta}' : '{Control>}z{/Control}',
    );
    await expect(editor).toHaveTextContent('ab');
  },
};
export const AtomicDeletion: Story = {
  args: { value: { version: 1, content: [{ type: 'mention', id: 'support', label: 'Support' }] } },
  play: async ({ canvasElement }) => {
    const editor = within(canvasElement).getByRole('textbox');
    await userEvent.click(editor);
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(range);
    await userEvent.keyboard('{Backspace}');
    await expect(editor.textContent).toBe('');
    await userEvent.keyboard(
      navigator.platform.includes('Mac') ? '{Meta>}z{/Meta}' : '{Control>}z{/Control}',
    );
    await expect(editor).toHaveTextContent('@Support');
  },
};

export const PlainTextClipboard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox');
    await userEvent.click(editor);
    const data = new DataTransfer();
    data.setData('text/html', '<b>HTML</b><img src="x" onerror="alert(1)">');
    data.setData('text/plain', 'Plain\ntext');
    editor.dispatchEvent(
      new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: data }),
    );
    await expect(editor).toHaveTextContent('Plain');
    await expect(editor.querySelector('img,b')).toBeNull();
    await expect(canvas.getByLabelText('Dokument')).toHaveTextContent('"type":"lineBreak"');
    window.getSelection()!.selectAllChildren(editor);
    document.dispatchEvent(new Event('selectionchange'));
    const copied = new DataTransfer();
    editor.dispatchEvent(
      new ClipboardEvent('cut', { bubbles: true, cancelable: true, clipboardData: copied }),
    );
    await expect(copied.getData('text/plain')).toBe('Plain\ntext');
    await expect(editor.textContent).toBe('');
  },
};

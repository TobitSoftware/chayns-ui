import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkdownEditor, markdownEditorDefaultItems } from '@chayns-ui/business';
import type { MarkdownEditorProps, MarkdownEditorRef } from '@chayns-ui/business';
import '@chayns-ui/business/markdown-editor.css';
import './markdown-editor.stories.css';
import usage from '../../../docs/03-components/markdown-editor/markdown-editor-usage.md?raw';

function ControlledMarkdownEditor(props: Partial<MarkdownEditorProps>) {
  const [value, setValue] = useState(props.value ?? '**Markdown** bearbeiten');
  const [html, setHtml] = useState('');
  const editorRef = useRef<MarkdownEditorRef>(null);

  return (
    <div className="chayns-storybook-example-markdown-editor">
      <div className="chayns-storybook-example-markdown-editor__input">
        <MarkdownEditor
          aria-label="Markdown bearbeiten"
          {...props}
          ref={editorRef}
          value={value}
          onValueChange={setValue}
          placeholder={props.placeholder ?? 'Text eingeben'}
        />
      </div>
      <div className="chayns-storybook-example-markdown-editor__output">
        <strong>Markdown value</strong>
        <pre>{value || '(leer)'}</pre>
        <button type="button" onClick={() => setHtml(editorRef.current?.getHTML() ?? '')}>
          HTML auslesen
        </button>
        <pre aria-label="Aktuelles HTML">{html || '(noch nicht ausgelesen)'}</pre>
      </div>
    </div>
  );
}

function ReplyDraftEditor() {
  const [value, setValue] = useState(
    'Hallo Markus,\n\ndanke für Deine Nachricht. Ich melde mich in Kürze bei Dir.\n\nViele Grüße\nAlexander',
  );

  return (
    <div className="chayns-storybook-example-markdown-editor">
      <div className="chayns-storybook-example-markdown-editor__reply">
        <MarkdownEditor
          aria-label="Antwort verfassen"
          value={value}
          onValueChange={setValue}
          placeholder=""
        />
      </div>
    </div>
  );
}

const meta = {
  title: 'Business/MarkdownEditor',
  component: MarkdownEditor,
  tags: ['autodocs'],
  args: {
    value: '',
    onValueChange: () => undefined,
    placeholder: 'Markdown eingeben',
  },
  argTypes: {
    'aria-label': {
      control: 'text',
      description: 'Required localized accessible name for the editor control.',
      table: { category: 'Accessibility', type: { summary: 'string' } },
    },
    'aria-labelledby': {
      control: 'text',
      description: 'ID of an element that provides the editor accessible name.',
      table: { category: 'Accessibility', type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      description: 'Controlled Markdown string rendered and edited by Tiptap.',
      table: { category: 'Value', type: { summary: 'string' } },
    },
    onValueChange: {
      control: false,
      description: 'Receives the updated Markdown string after each document change.',
      table: { category: 'Value', type: { summary: '(value: string) => void' } },
    },
    items: {
      control: false,
      description: 'Replaces default toolbar items. Use exported defaults as a starting point.',
      table: { category: 'Toolbar' },
    },
    onRequestLink: {
      control: false,
      description: 'Requests a link URL for the current selection; return null to remove a link.',
      table: { category: 'Toolbar' },
    },
    placeholder: {
      control: 'text',
      description: 'Optional hint shown while the document is empty.',
      table: { category: 'Content' },
    },
    readOnly: {
      control: 'boolean',
      description: 'Keeps content readable while preventing editing and toolbar actions.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables editing and all toolbar actions.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
  parameters: {
    docs: { description: { component: usage } },
    controls: { expanded: true, sort: 'requiredFirst' },
    a11y: { test: 'error' },
  },
  render: (args) => <ControlledMarkdownEditor {...args} />,
} satisfies Meta<typeof MarkdownEditor>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Controlled',
  parameters: {
    docs: {
      description: {
        story: 'The consumer owns Markdown state and receives updates through onValueChange.',
      },
    },
  },
};

export const ReplyDraft: Story = {
  name: 'Antwortentwurf',
  render: () => <ReplyDraftEditor />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Zeigt die benötigten Props: zugänglicher Name, kontrollierter Markdown-Wert, Änderungs-Handler und optionaler Placeholder.',
      },
    },
  },
};

export const CustomToolbar: Story = {
  name: 'Eigene Toolbar',
  args: {
    items: markdownEditorDefaultItems.filter((item) =>
      ['bold', 'italic', 'link'].includes(item.id),
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Providing items replaces the default toolbar. This example keeps bold, italic, and link.',
      },
    },
  },
};

export const ReadOnly: Story = {
  name: 'Nur lesen',
  args: { readOnly: true, value: 'Dieser **Markdown-Text** ist schreibgeschützt.' },
  parameters: {
    docs: {
      description: {
        story: 'Read-only content remains visible; editing and toolbar actions are disabled.',
      },
    },
  },
};

export const Disabled: Story = {
  name: 'Deaktiviert',
  args: { disabled: true, value: 'Dieser Editor ist deaktiviert.' },
  parameters: {
    docs: {
      description: { story: 'Disabled prevents editing and activation of toolbar buttons.' },
    },
  },
};

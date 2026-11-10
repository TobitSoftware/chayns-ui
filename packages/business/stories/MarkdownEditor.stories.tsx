import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkdownEditor } from '@chayns-ui/business';

function ControlledMarkdownEditor() {
  const [value, setValue] = useState('**Markdown** bearbeiten');
  return (
    <div>
      <MarkdownEditor
        aria-label="Markdown bearbeiten"
        value={value}
        onValueChange={setValue}
        placeholder="Text eingeben"
      />
      <pre>{value}</pre>
    </div>
  );
}

const meta = {
  title: 'Business/MarkdownEditor',
  component: MarkdownEditor,
  tags: ['autodocs'],
  render: () => <ControlledMarkdownEditor />,
} satisfies Meta<typeof MarkdownEditor>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

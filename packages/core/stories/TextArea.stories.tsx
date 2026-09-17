import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import TextArea from '../src/components/text-area/TextArea.js';

const meta = {
  title: 'Core/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: { placeholder: 'Nachricht', rows: 4 },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

function TextAreaWithCounter() {
  const [value, setValue] = useState('');

  return (
    <TextArea
      counter={`${value.length} / 500`}
      helpText="Maximal 500 Zeichen."
      maxLength={500}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Nachricht"
      rows={4}
      value={value}
    />
  );
}

export const Default: Story = {};
export const HelpAndCounter: Story = {
  render: () => <TextAreaWithCounter />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole('textbox', { name: 'Nachricht' });

    await userEvent.type(field, 'Hallo');
    await expect(canvas.getByText('5 / 500')).toBeInTheDocument();
  },
};
export const Error: Story = {
  args: { error: 'Bitte beschreibe dein Anliegen.', value: 'Zu kurz', onChange: () => undefined },
};
export const Disabled: Story = {
  args: { disabled: true, value: 'Nicht bearbeitbar', onChange: () => undefined },
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import MessageBox from '../src/components/message-box/MessageBox.js';

const meta = {
  title: 'Core/MessageBox',
  component: MessageBox,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof MessageBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: { children: 'Gelöschte Nachrichten bleiben 30 Tage im Papierkorb.' },
};
export const Admin: Story = {
  args: { children: 'Diese Einstellung gilt für alle Mitglieder deines Teams.', tone: 'admin' },
};
export const Warning: Story = {
  args: {
    children: 'Die neue Aufbewahrungsfrist gilt auch für bestehende Inhalte.',
    tone: 'warning',
  },
};

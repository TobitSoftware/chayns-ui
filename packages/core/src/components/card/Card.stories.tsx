import type { Meta, StoryObj } from '@storybook/react-vite';

import Card from './Card.js';

const meta = {
  title: 'Core/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    elevated: {
      control: 'boolean',
      description: 'Adds the subtle resting card elevation token.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    children: { control: false, table: { category: 'Content' } },
  },
  parameters: {
    a11y: { test: 'error' },
    controls: { include: ['elevated'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ maxInlineSize: '24rem', padding: 'var(--k24)' }}>
      <h3 style={{ margin: '0 0 var(--k8)', fontSize: 'var(--fs-h2)', color: 'var(--text)' }}>
        Q3-Budget freigegeben
      </h3>
      <p style={{ margin: 0, color: 'var(--text-3)', lineHeight: 1.55 }}>
        Ein in sich geschlossener Inhalt, der als Ganzes für sich steht.
      </p>
    </Card>
  ),
};

export const Elevated: Story = { ...Default, args: { elevated: true } };

import type { Meta, StoryObj } from '@storybook/react-vite';

import Card from '../src/components/card/Card.js';

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
    <Card {...args} className="chayns-storybook-example-card">
      <h3>Q3-Budget freigegeben</h3>
      <p>Ein in sich geschlossener Inhalt, der als Ganzes für sich steht.</p>
    </Card>
  ),
};

export const Elevated: Story = { ...Default, args: { elevated: true } };

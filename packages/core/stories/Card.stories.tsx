import type { Meta, StoryObj } from '@storybook/react-vite';

import Card from '../src/components/card/Card.js';

const meta = {
  title: 'Core/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: { children: { control: false, table: { category: 'Content' } } },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header icon="fa-chart-line">Q3-Budget freigegeben</Card.Header>
      <p>Ein in sich geschlossener Inhalt, der als Ganzes für sich steht.</p>
    </Card>
  ),
};

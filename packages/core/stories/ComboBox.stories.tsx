import specification from '../../../docs/03-components/combo-box/combo-box-specification.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import ComboBox from '../src/components/combo-box/ComboBox.js';

const meta = {
  title: 'Core/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: specification.slice(specification.indexOf('\n---\n') + 5) } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
  args: { children: null },
  render: () => (
    <ComboBox aria-label="Kategorie" placeholder="Kategorie" defaultValue="design">
      <ComboBox.Option value="design">Design</ComboBox.Option>
      <ComboBox.Option value="engineering">Engineering</ComboBox.Option>
      <ComboBox.Option value="support">Support</ComboBox.Option>
    </ComboBox>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Kategorie' });

    await userEvent.click(trigger);
    const popup = within(document.body);
    await expect(popup.getByRole('option', { name: 'Design' })).toBeInTheDocument();
    await expect(popup.getByRole('option', { name: 'Engineering' })).toBeInTheDocument();
  },
};

export const MultiSelect: Story = {
  args: { children: null },
  render: () => (
    <ComboBox aria-label="Kategorien" multiple placeholder="Kategorien">
      <ComboBox.Option value="design">Design</ComboBox.Option>
      <ComboBox.Option value="engineering">Engineering</ComboBox.Option>
      <ComboBox.Option value="support">Support</ComboBox.Option>
      <ComboBox.Option value="product">Product</ComboBox.Option>
    </ComboBox>
  ),
};

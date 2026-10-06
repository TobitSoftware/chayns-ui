import usage from '../../../docs/03-components/tooltip/tooltip-usage.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import Tooltip from '../src/components/tooltip/Tooltip.js';
import Button from '../src/components/button/Button.js';

const meta = {
  title: 'Core/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: usage } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { content: 'Hilfreiche Erklärung', children: <Button variant="ghost">Information</Button> },
  render: (args) => <Tooltip {...args} />,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'Information' });
    await userEvent.hover(trigger);
    await waitFor(() => expect(within(document.body).getByRole('tooltip')).toBeVisible());
    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');
    await expect(within(document.body).queryByRole('tooltip')).toBeNull();
    await expect(trigger).toHaveFocus();
  },
};

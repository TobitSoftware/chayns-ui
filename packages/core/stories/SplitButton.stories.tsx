import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import SplitButton from '../src/components/split-button/SplitButton.js';

const createItems = () => [
  { icon: 'fa-clock' as const, onClick: fn(), text: 'Später senden' },
  { icon: 'fa-calendar' as const, onClick: fn(), text: 'Zeitpunkt planen' },
  { icon: 'fa-floppy-disk' as const, onClick: fn(), text: 'Als Entwurf speichern' },
];

const meta = {
  title: 'Core/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  args: {
    children: 'Senden',
    items: createItems(),
    variant: 'primary',
  },
  parameters: {
    a11y: { test: 'error' },
    controls: { disable: true },
  },
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <SplitButton items={createItems()} onClick={fn()} variant="primary">
      Senden
    </SplitButton>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[1]!);
    const body = within(document.body);
    await expect(body.getByRole('menu')).toBeInTheDocument();
    await expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="chayns-storybook-example-row">
      <SplitButton items={createItems()} variant="primary">
        Senden
      </SplitButton>
      <SplitButton items={createItems()} variant="outline">
        Antworten
      </SplitButton>
      <SplitButton items={createItems()} variant="ghost">
        Optionen
      </SplitButton>
      <SplitButton items={createItems()} variant="danger">
        Löschen
      </SplitButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <SplitButton disabled items={createItems()} variant="primary">
      Senden
    </SplitButton>
  ),
};

export const LongLocalizedLabel: Story = {
  render: () => (
    <div className="chayns-storybook-example-constrained">
      <SplitButton items={createItems()} variant="outline">
        Änderungen für alle ausgewählten Empfängerinnen und Empfänger übernehmen
      </SplitButton>
    </div>
  ),
};

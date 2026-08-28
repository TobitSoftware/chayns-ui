import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import List from './List.js';
import ListItem from './ListItem.js';

const meta = {
  title: 'Core/List',
  component: List,
  subcomponents: { ListItem: ListItem as never },
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    controls: { disable: true },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxInlineSize: '28rem' }}>
      <List>
        <ListItem
          subtitle="Das Q3-Budget ist freigegeben, Personalkosten bleiben wie geplant."
          title="Eva Sommer"
          unread
          unreadLabel="Ungelesen"
        />
        <ListItem
          subtitle="Ich aktualisiere die Projektübersicht bis Freitag."
          title="Thomas Wolf"
        />
        <ListItem subtitle="Termin für das Review am Donnerstag um 10:00 Uhr." title="Sidekick" />
      </List>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={{ maxInlineSize: '28rem' }}>
      <List>
        <ListItem onClick={fn()} subtitle="Öffnet den Eintrag" title="Aktionszeile" />
        <ListItem href="#dokumente" subtitle="Navigiert zur Ansicht" title="Navigationszeile" />
      </List>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const first = within(canvasElement).getByRole('button', { name: /Aktionszeile/ });
    await userEvent.tab();
    await expect(first).toHaveFocus();
    await expect(getComputedStyle(first).boxShadow).not.toBe('none');
  },
};

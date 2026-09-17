import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import Avatar from '../src/components/avatar/Avatar.js';
import List from '../src/components/list/List.js';
import ListItem from '../src/components/list-item/ListItem.js';

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
          leading={<Avatar name="Eva Sommer" />}
          subtitle="Das Q3-Budget ist freigegeben, Personalkosten bleiben wie geplant."
          title="Eva Sommer"
          trailing={<time dateTime="08:40">08:40</time>}
          unread
          unreadLabel="Ungelesen"
          onClick={fn()}
        />
        <ListItem
          leading={<Avatar badge={<span aria-hidden="true">✉</span>} name="Thomas Wolf" />}
          subtitle="Ich aktualisiere die Projektübersicht bis Freitag."
          title="Thomas Wolf"
          trailing={<time dateTime="08:18">08:18</time>}
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

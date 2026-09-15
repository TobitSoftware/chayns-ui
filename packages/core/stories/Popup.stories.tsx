import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import Popup from '../src/components/popup/Popup.js';
import PopupList from '../src/components/popup/PopupList.js';

const defaultItems = [
  { icon: 'fa-clock', onClick: fn(), text: 'Später senden' },
  { icon: 'fa-calendar', onClick: fn(), text: 'Zeitpunkt planen' },
  { icon: 'fa-floppy-disk', onClick: fn(), text: 'Als Entwurf speichern' },
] as const;

const meta = {
  title: 'Core/Popup',
  component: PopupList,
  tags: ['autodocs'],
  args: {
    items: [...defaultItems],
    trigger: <button type="button">Aktionen</button>,
  },
  parameters: {
    a11y: { test: 'error' },
    controls: { disable: true },
  },
} satisfies Meta<typeof PopupList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActionList: Story = {
  render: () => (
    <PopupList
      items={[...defaultItems]}
      trigger={
        <button className="chayns-button chayns-button--primary" type="button">
          Mehr Optionen
        </button>
      }
    />
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <PopupList
      items={[...defaultItems]}
      trigger={
        <button className="chayns-button chayns-button--primary" type="button">
          Aktionen
        </button>
      }
    />
  ),
  play: async () => {
    const body = within(document.body);
    await userEvent.click(body.getByRole('button', { name: 'Aktionen' }));
    await expect(body.getByRole('menuitem', { name: 'Später senden' })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(body.getByRole('menuitem', { name: 'Zeitpunkt planen' })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(body.queryByRole('menu')).not.toBeInTheDocument();
  },
};

export const BaseComposition: Story = {
  render: () => (
    <Popup
      trigger={
        <button className="chayns-button chayns-button--outline" type="button">
          Benutzerdefinierter Inhalt
        </button>
      }
    >
      <div style={{ padding: 'var(--sp-4)' }}>Komponierter Popup-Inhalt</div>
    </Popup>
  ),
};

export const LongLocalizedItems: Story = {
  render: () => (
    <PopupList
      items={[
        {
          icon: 'fa-clock',
          onClick: fn(),
          text: 'Später an alle ausgewählten Empfängerinnen und Empfänger senden',
        },
        {
          icon: 'fa-calendar',
          onClick: fn(),
          text: 'Einen benutzerdefinierten Zeitpunkt für die Zustellung planen',
        },
      ]}
      trigger={
        <button className="chayns-button chayns-button--primary" type="button">
          Senden
        </button>
      }
    />
  ),
};

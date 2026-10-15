import { useState } from 'react';

import usage from '../../../docs/03-components/search-box/search-box-usage.md?raw';
import './SearchBox.stories.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import Avatar from '../src/components/avatar/Avatar.js';
import SearchBox from '../src/components/search-box/SearchBox.js';
import type { SearchBoxItem } from '../src/components/search-box/SearchBox.types.js';

interface Recipient {
  channelIcon: string;
  channelLabel: string;
  detail: string;
  name: string;
}

const recipients: SearchBoxItem<Recipient>[] = [
  {
    id: 'eva-fischer',
    item: {
      channelIcon: 'fa-envelope',
      channelLabel: 'E-Mail',
      detail: 'eva.fischer@tobit.com',
      name: 'Eva Fischer',
    },
  },
  {
    id: 'thomas-dahm',
    item: {
      channelIcon: 'fa-comment-dots',
      channelLabel: 'Messenger',
      detail: 'Messenger',
      name: 'Thomas Dahm',
    },
  },
  {
    id: 'thea-mau',
    item: {
      channelIcon: 'fa-envelope',
      channelLabel: 'E-Mail',
      detail: 'thea.mau@tobit.com',
      name: 'Thea Mau',
    },
  },
  {
    id: 'karlo-pflieger',
    item: {
      channelIcon: 'fa-hashtag',
      channelLabel: 'Social Media',
      detail: 'Social Media',
      name: 'Karlo Pflieger',
    },
  },
];

const RecipientSearchBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<SearchBoxItem<Recipient>[]>([recipients[0]!]);
  const suggestions = recipients.filter(({ item }) =>
    item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
  );

  return (
    <SearchBox
      aria-label="Empfänger suchen"
      getItemLabel={(recipient) => recipient.name}
      getRemoveItemLabel={(recipient) => `${recipient.name} entfernen`}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      onRemove={(entry) =>
        setSelectedItems((items) => items.filter((item) => item.id !== entry.id))
      }
      onSelect={(entry) => setSelectedItems((items) => [...items, entry])}
      placeholder="An:"
      renderSelectedItem={(recipient) => (
        <>
          <Avatar name={recipient.name} size="small" />
          <span>{recipient.name}</span>
          <i aria-label={recipient.channelLabel} className={`far ${recipient.channelIcon}`} />
        </>
      )}
      renderSuggestion={(recipient) => (
        <>
          <Avatar name={recipient.name} size="small" />
          <span className="search-box-story__suggestion">
            <strong>{recipient.name}</strong>
            <span>{recipient.detail}</span>
          </span>
          <i aria-label={recipient.channelLabel} className={`far ${recipient.channelIcon}`} />
        </>
      )}
      selectedItems={selectedItems}
      suggestions={suggestions}
      suggestionsLabel="Vorschläge"
    />
  );
};

const meta = {
  title: 'Core/SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: usage } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RecipientSelection: Story = {
  args: {} as never,
  render: () => <RecipientSearchBox />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', { name: 'Empfänger suchen' });

    await userEvent.click(input);

    const popup = within(document.body);
    await expect(popup.getByRole('listbox', { name: 'Vorschläge' })).toBeInTheDocument();
    await expect(popup.getByRole('option', { name: 'Eva Fischer' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  },
};

import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SearchBox from '../src/components/search-box/SearchBox.js';
import type { SearchBoxItem } from '../src/components/search-box/SearchBox.types.js';

const entries: SearchBoxItem<{ name: string }>[] = [
  { id: 'eva', item: { name: 'Eva Fischer' } },
  { id: 'thomas', item: { name: 'Thomas Dahm' } },
];

function ControlledSearchBox({
  maxItems,
  onRemove = vi.fn(),
  onSelect = vi.fn(),
}: {
  maxItems?: number;
  onRemove?: (entry: SearchBoxItem<{ name: string }>) => void;
  onSelect?: (entry: SearchBoxItem<{ name: string }>) => void;
}) {
  const [inputValue, setInputValue] = useState('');

  return (
    <SearchBox
      aria-label="Empfänger suchen"
      getItemLabel={(item) => item.name}
      getRemoveItemLabel={(item) => `${item.name} entfernen`}
      inputValue={inputValue}
      {...(maxItems === undefined ? {} : { maxItems })}
      onInputValueChange={setInputValue}
      onRemove={onRemove}
      onSelect={onSelect}
      placeholder="An:"
      renderSelectedItem={(item) => item.name}
      renderSuggestion={(item) => item.name}
      selectedItems={[entries[0]!]}
      suggestions={entries}
      suggestionsLabel="Vorschläge"
    />
  );
}

describe('SearchBox', () => {
  it('opens suggestions, filters through its controlled input, and preserves selected suggestions', async () => {
    const user = userEvent.setup();

    render(<ControlledSearchBox />);

    const input = screen.getByRole('combobox', { name: 'Empfänger suchen' });
    await user.click(input);

    expect(screen.getByRole('listbox', { name: 'Vorschläge' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Eva Fischer' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('option', { name: 'Eva Fischer' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );

    await user.type(input, 'th');

    expect(input).toHaveValue('th');
  });

  it('selects the active unselected suggestion with Enter and closes the popup', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<ControlledSearchBox onSelect={onSelect} />);

    const input = screen.getByRole('combobox', { name: 'Empfänger suchen' });
    await user.click(input);
    await user.keyboard('{ArrowDown}{Enter}');

    expect(onSelect).toHaveBeenCalledWith(entries[1]);
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(input).toHaveFocus();
  });

  it('removes the last selected item with Backspace in an empty input', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();

    render(<ControlledSearchBox onRemove={onRemove} />);

    const input = screen.getByRole('combobox', { name: 'Empfänger suchen' });
    await user.click(input);
    await user.keyboard('{Backspace}');

    expect(onRemove).toHaveBeenCalledWith(entries[0]);
  });

  it('prevents selection and typing when the item limit is reached while allowing removal', async () => {
    const onRemove = vi.fn();
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<ControlledSearchBox maxItems={1} onRemove={onRemove} onSelect={onSelect} />);

    const input = screen.getByRole('combobox', { name: 'Empfänger suchen' });
    expect(input).toHaveAttribute('readonly');

    await user.click(input);
    await user.type(input, 'th');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(onSelect).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Eva Fischer entfernen' }));
    expect(onRemove).toHaveBeenCalledWith(entries[0]);
  });
});

import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import ComboBox from '../src/components/combo-box/ComboBox.js';

const options = (
  <>
    <ComboBox.Option value="design">Design</ComboBox.Option>
    <ComboBox.Option value="engineering">Engineering</ComboBox.Option>
    <ComboBox.Option value="support">Support</ComboBox.Option>
  </>
);

describe('ComboBox', () => {
  it('selects the active single option with the keyboard', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ComboBox aria-label="Kategorie" onValueChange={onValueChange} placeholder="Kategorie">
        {options}
      </ComboBox>,
    );

    const input = screen.getByRole('combobox', { name: 'Kategorie' });
    await user.click(input);
    await user.keyboard('{Enter}');

    expect(input).toHaveValue('Design');
    expect(onValueChange).toHaveBeenCalledWith('design');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('filters options and restores the selected value on Escape', async () => {
    const user = userEvent.setup();

    render(
      <ComboBox aria-label="Kategorie" defaultValue="design" placeholder="Kategorie">
        {options}
      </ComboBox>,
    );

    const input = screen.getByRole('combobox', { name: 'Kategorie' });
    await user.click(input);
    await user.clear(input);
    await user.type(input, 'eng');

    expect(screen.getByRole('option', { name: 'Engineering' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Design' })).not.toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(input).toHaveValue('design');
  });

  it('returns selected option elements in multiple mode', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ComboBox aria-label="Kategorien" multiple onValueChange={onValueChange}>
        {options}
      </ComboBox>,
    );

    await user.click(screen.getByRole('combobox', { name: 'Kategorien' }));
    await user.click(screen.getByRole('option', { name: 'Design' }));

    expect(
      screen.getByRole('option', { name: 'Design' }).querySelector('[data-checked="true"]'),
    ).toBeInTheDocument();
    expect(onValueChange).toHaveBeenCalledWith([
      expect.objectContaining({ props: expect.objectContaining({ value: 'design' }) }),
    ]);
  });

  it('requires its documented parent for options and renders on the server', () => {
    expect(() => render(<ComboBox.Option value="orphan">Orphan</ComboBox.Option>)).toThrow(
      'ComboBox.Option must be rendered within ComboBox.',
    );
    expect(renderToString(<ComboBox aria-label="Kategorie">{options}</ComboBox>)).toContain(
      'Kategorie',
    );
  });
});

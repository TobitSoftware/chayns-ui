import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';

import ComboBox from '../src/components/combo-box/ComboBox.js';
import type { ComboBoxOptionProps } from '../src/components/combo-box/ComboBox.types.js';

const options = (
  <>
    <ComboBox.Option value="design">Design</ComboBox.Option>
    <ComboBox.Option value="engineering">Engineering</ComboBox.Option>
    <ComboBox.Option value="support">Support</ComboBox.Option>
  </>
);

describe('ComboBox', () => {
  it('opens all options and selects a single option with the keyboard', async () => {
    const onValueChange = vi.fn<(value: string) => void>();
    const user = userEvent.setup();

    render(
      <ComboBox aria-label="Kategorie" onValueChange={onValueChange} placeholder="Kategorie">
        {options}
      </ComboBox>,
    );

    const trigger = screen.getByRole('button', { name: 'Kategorie' });
    await user.click(trigger);

    expect(screen.getByRole('option', { name: 'Design' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Engineering' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Support' })).toBeInTheDocument();

    await user.keyboard('{Enter}');

    expect(trigger).toHaveTextContent('Design');
    expect(onValueChange).toHaveBeenCalledWith('design');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes a multi-select popup after every selection while retaining all options', async () => {
    let selectedOptions: ReactElement<ComboBoxOptionProps>[] | undefined;
    const onValueChange = (value: ReactElement<ComboBoxOptionProps>[]) => {
      selectedOptions = value;
    };
    const user = userEvent.setup();

    render(
      <ComboBox aria-label="Kategorien" multiple onValueChange={onValueChange} placeholder="Kategorien">
        {options}
      </ComboBox>,
    );

    const trigger = screen.getByRole('button', { name: 'Kategorien' });
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Design' }));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(selectedOptions?.[0]?.props.value).toBe('design');
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    expect(screen.getByRole('option', { name: 'Design' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: 'Engineering' })).toBeInTheDocument();
  });

  it('skips disabled options and restores trigger focus on Escape', async () => {
    const user = userEvent.setup();

    render(
      <ComboBox aria-label="Kategorie" placeholder="Kategorie">
        <ComboBox.Option disabled value="design">
          Design
        </ComboBox.Option>
        <ComboBox.Option value="engineering">Engineering</ComboBox.Option>
      </ComboBox>,
    );

    const trigger = screen.getByRole('button', { name: 'Kategorie' });
    await user.click(trigger);

    expect(screen.getByRole('option', { name: 'Engineering' })).toHaveFocus();
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('requires an accessible name and renders on the server', () => {
    expect(() => render(<ComboBox>{options}</ComboBox>)).toThrow();
    expect(() => render(<ComboBox.Option value="orphan">Orphan</ComboBox.Option>)).toThrow(
      'ComboBox.Option must be rendered within ComboBox.',
    );
    expect(renderToString(<ComboBox aria-label="Kategorie">{options}</ComboBox>)).toContain(
      'Kategorie',
    );
  });
});

import { renderToString } from 'react-dom/server';
import { render, screen, waitFor } from '@testing-library/react';
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
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it('closes a multi-select popup after every selection while retaining all options', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ComboBox
        aria-label="Kategorien"
        multiple
        onValueChange={onValueChange}
        placeholder="Kategorien"
      >
        {options}
      </ComboBox>,
    );

    const trigger = screen.getByRole('button', { name: 'Kategorien' });
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Design' }));

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    expect(screen.getByRole('option', { name: 'Design' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: 'Engineering' })).toBeInTheDocument();
  });

  it('portals the popup to the document body and aligns it to the trigger', async () => {
    const user = userEvent.setup();

    render(
      <ComboBox aria-label="Kategorie" placeholder="Kategorie">
        {options}
      </ComboBox>,
    );

    const trigger = screen.getByRole('button', { name: 'Kategorie' });
    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      bottom: 48,
      height: 40,
      left: 24,
      right: 224,
      top: 8,
      width: 200,
      x: 24,
      y: 8,
      toJSON: () => ({}),
    });
    await user.click(trigger);

    const listbox = screen.getByRole('listbox');
    expect(listbox.parentElement).toBe(document.body);
    expect(listbox).toHaveStyle({
      insetBlockStart: 'calc(48px + var(--k4))',
      insetInlineStart: '24px',
      inlineSize: '200px',
    });
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

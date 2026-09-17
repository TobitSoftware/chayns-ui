import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Checkbox from '../src/components/checkbox/Checkbox.js';

describe('Checkbox', () => {
  it('forwards native checkbox props, events and ref', async () => {
    const onChange = vi.fn();
    const ref = createRef<HTMLInputElement>();
    const user = userEvent.setup();

    render(
      <Checkbox
        data-purpose="terms"
        defaultChecked
        name="terms"
        onChange={onChange}
        ref={ref}
        required
        value="yes"
      >
        Bedingungen akzeptieren
      </Checkbox>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Bedingungen akzeptieren' });
    expect(checkbox).toBe(ref.current);
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeRequired();
    expect(checkbox).toHaveAttribute('name', 'terms');
    expect(checkbox).toHaveAttribute('value', 'yes');
    expect(checkbox).toHaveAttribute('data-purpose', 'terms');

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('uses native controlled, disabled and keyboard behaviour', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Checkbox onChange={onChange}>Aktiv</Checkbox>);
    const checkbox = screen.getByRole('checkbox', { name: 'Aktiv' });

    checkbox.focus();
    await user.keyboard(' ');
    expect(checkbox).toBeChecked();

    rerender(
      <Checkbox checked disabled onChange={onChange}>
        Aktiv
      </Checkbox>,
    );
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeDisabled();
  });

  it('renders safely on the server', () => {
    const markup = renderToString(<Checkbox>Server selection</Checkbox>);
    expect(markup).toContain('type="checkbox"');
    expect(markup).toContain('Server selection');
  });
});

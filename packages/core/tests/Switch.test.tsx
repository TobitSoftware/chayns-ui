import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Switch from '../src/components/switch/Switch.js';

describe('Switch', () => {
  it('forwards native checkbox props, events and ref', async () => {
    const onChange = vi.fn();
    const ref = createRef<HTMLInputElement>();
    const user = userEvent.setup();

    render(
      <Switch
        data-purpose="notifications"
        defaultChecked
        name="notifications"
        onChange={onChange}
        ref={ref}
        value="enabled"
      >
        E-Mail-Benachrichtigungen
      </Switch>,
    );

    const input = screen.getByRole('checkbox', { name: 'E-Mail-Benachrichtigungen' });
    expect(input).toBe(ref.current);
    expect(input).toBeChecked();
    expect(input).toHaveAttribute('name', 'notifications');
    expect(input).toHaveAttribute('data-purpose', 'notifications');

    await user.click(input);
    expect(input).not.toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('uses native controlled, disabled and keyboard behaviour', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Switch onChange={onChange}>Kompakte Ansicht</Switch>);
    const input = screen.getByRole('checkbox', { name: 'Kompakte Ansicht' });

    input.focus();
    await user.keyboard(' ');
    expect(input).toBeChecked();

    rerender(
      <Switch checked disabled onChange={onChange}>
        Kompakte Ansicht
      </Switch>,
    );
    expect(input).toBeChecked();
    expect(input).toBeDisabled();
  });

  it('renders safely on the server', () => {
    const markup = renderToString(<Switch>Server setting</Switch>);
    expect(markup).toContain('type="checkbox"');
    expect(markup).toContain('Server setting');
  });
});

import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import TextField from '../src/components/text-field/TextField.js';

describe('TextField', () => {
  it('renders a labelled native input and forwards native props, events and ref', async () => {
    const ref = createRef<HTMLInputElement>();
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <TextField
        className="consumer-class"
        data-purpose="account-name"
        inputMode="email"
        aria-label="Email"
        maxLength={120}
        onChange={onChange}
        placeholder="name@example.com"
        ref={ref}
        required
        type="email"
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toBe(ref.current);
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('inputmode', 'email');
    expect(input).toHaveAttribute('maxlength', '120');
    expect(input).toHaveAttribute('data-purpose', 'account-name');
    expect(input).toHaveClass('consumer-class', 'chayns-text-field__input');
    expect(input).toBeRequired();

    await user.type(input, 'a');
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('links help and error content while owning aria-invalid', () => {
    render(
      <TextField
        counter="3 / 120"
        error="Ungültige E-Mail-Adresse"
        helpText="Geschäftliche Adresse"
        aria-label="Email"
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Email' });
    const descriptionIds = input.getAttribute('aria-describedby')?.split(' ');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(descriptionIds).toHaveLength(2);
    expect(screen.getByText('Geschäftliche Adresse')).toHaveAttribute('id', descriptionIds?.[0]);
    expect(screen.getByText('Ungültige E-Mail-Adresse')).toHaveAttribute('id', descriptionIds?.[1]);
    expect(screen.getByText('3 / 120')).not.toHaveAttribute('id');
  });

  it('uses placeholder as the associated Bodywork floating label', async () => {
    const user = userEvent.setup();

    render(<TextField placeholder="Kontoname" />);

    const input = screen.getByRole('textbox', { name: 'Kontoname' });
    expect(input).toHaveAttribute('placeholder', ' ');
    expect(screen.getByText('Kontoname')).toHaveAttribute('for', input.id);

    await user.type(input, 'Ada');
    expect(input).toHaveValue('Ada');
  });

  it('preserves native controlled, disabled and readonly behaviour', () => {
    const { rerender } = render(<TextField aria-label="Name" defaultValue="Initial" readOnly />);
    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveValue('Initial');
    expect(input).toHaveAttribute('readonly');

    rerender(
      <TextField aria-label="Name" disabled value="Controlled" onChange={() => undefined} />,
    );
    expect(input).toBeDisabled();
    expect(input).toHaveValue('Controlled');
  });

  it('supports password fields through the native input type', () => {
    render(
      <TextField
        autoComplete="current-password"
        placeholder="Passwort"
        type="password"
        defaultValue="secret"
      />,
    );

    const input = screen.getByLabelText('Passwort');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('autocomplete', 'current-password');
    expect(input).toHaveValue('secret');
  });

  it('renders safely on the server', () => {
    const markup = renderToString(<TextField aria-label="Name" helpText="Optional" />);
    expect(markup).toContain('<input');
    expect(markup).toContain('Name');
  });
});

import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import RadioGroup from '../src/components/radio-group/RadioGroup.js';

describe('RadioGroup', () => {
  it('forwards native props and shares its name and ref with radio options', () => {
    const ref = createRef<HTMLFieldSetElement>();

    render(
      <RadioGroup
        data-purpose="visibility"
        defaultValue="all"
        label="Sichtbarkeit"
        name="visibility"
        ref={ref}
      >
        <RadioGroup.Radio value="all">Alle</RadioGroup.Radio>
        <RadioGroup.Radio required value="members">
          Mitglieder
        </RadioGroup.Radio>
      </RadioGroup>,
    );

    const group = screen.getByRole('group', { name: 'Sichtbarkeit' });
    expect(group).toBe(ref.current);
    expect(group).toHaveAttribute('data-purpose', 'visibility');
    expect(screen.getByRole('radio', { name: 'Alle' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Mitglieder' })).toHaveAttribute('name', 'visibility');
    expect(screen.getByRole('radio', { name: 'Mitglieder' })).toBeRequired();
  });

  it('updates uncontrolled selection through native keyboard behaviour', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <RadioGroup
        defaultValue="all"
        label="Sichtbarkeit"
        name="visibility"
        onValueChange={onValueChange}
      >
        <RadioGroup.Radio value="all">Alle</RadioGroup.Radio>
        <RadioGroup.Radio value="members">Mitglieder</RadioGroup.Radio>
      </RadioGroup>,
    );

    const all = screen.getByRole('radio', { name: 'Alle' });
    all.focus();
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('radio', { name: 'Mitglieder' })).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('members');
  });

  it('uses the controlled value and disables every option with the fieldset', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <RadioGroup
        disabled
        label="Sichtbarkeit"
        name="visibility"
        onValueChange={onValueChange}
        value="members"
      >
        <RadioGroup.Radio value="all">Alle</RadioGroup.Radio>
        <RadioGroup.Radio value="members">Mitglieder</RadioGroup.Radio>
      </RadioGroup>,
    );

    const all = screen.getByRole('radio', { name: 'Alle' });
    expect(screen.getByRole('radio', { name: 'Mitglieder' })).toBeChecked();
    expect(all).toBeDisabled();
    await user.click(all);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('rejects Radio outside its documented parent', () => {
    expect(() => render(<RadioGroup.Radio value="all">Alle</RadioGroup.Radio>)).toThrow(
      'RadioGroup.Radio must be rendered within RadioGroup.',
    );
  });
});

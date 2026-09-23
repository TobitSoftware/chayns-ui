import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import DateTimePicker from '../src/components/date-time-picker/DateTimePicker.js';

const wheelLabels = {
  day: 'Tag',
  dayPeriod: 'Tageszeit',
  hour: 'Stunde',
  minute: 'Minute',
  month: 'Monat',
  year: 'Jahr',
};

describe('DateTimePicker', () => {
  it('opens its wheel dialog and closes it with Escape', async () => {
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Uhrzeit"
        locale="de-DE"
        onChange={() => undefined}
        placeholder="Uhrzeit auswählen"
        value={new Date(2026, 8, 22, 10, 30)}
        wheelLabels={wheelLabels}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Uhrzeit' });
    expect(trigger).toHaveTextContent('10:30 Uhr');

    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Uhrzeit' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('emits a local Date when a wheel option changes', async () => {
    const onChange = vi.fn<(value: Date) => void>();
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Uhrzeit"
        locale="de-DE"
        onChange={onChange}
        placeholder="Uhrzeit auswählen"
        value={new Date(2026, 8, 22, 10, 30)}
        wheelLabels={wheelLabels}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Uhrzeit' }));
    await user.click(screen.getAllByRole('option', { name: '11' }).at(5)!);

    expect(onChange).toHaveBeenLastCalledWith(expect.any(Date));
    expect(onChange.mock.calls.at(-1)?.[0].getHours()).toBe(11);
  });

  it('renders only the configured minute intervals', async () => {
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Uhrzeit"
        locale="de-DE"
        minuteStep={15}
        onChange={() => undefined}
        placeholder="Uhrzeit auswählen"
        value={new Date(2026, 8, 22, 10, 32)}
        wheelLabels={wheelLabels}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Uhrzeit' });
    expect(trigger).toHaveTextContent('10:30 Uhr');
    await user.click(trigger);

    expect(screen.getAllByRole('option', { name: '45' })).not.toHaveLength(0);
    expect(screen.queryByRole('option', { name: '46' })).not.toBeInTheDocument();
  });
  it('honours preventDefault from the consumer click handler', async () => {
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Uhrzeit"
        locale="de-DE"
        onChange={() => undefined}
        onClick={(event) => event.preventDefault()}
        placeholder="Uhrzeit auswählen"
        value={null}
        wheelLabels={wheelLabels}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Uhrzeit' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('normalizes an out-of-range date without emitting a change', () => {
    const onChange = vi.fn();

    render(
      <DateTimePicker
        label="Datum"
        locale="de-DE"
        maxDate={new Date(2026, 8, 30)}
        minDate={new Date(2026, 8, 1)}
        mode="date"
        onChange={onChange}
        placeholder="Datum auswählen"
        value={new Date(2026, 9, 1)}
        wheelLabels={wheelLabels}
      />,
    );

    expect(screen.getByRole('button', { name: 'Datum' })).toHaveTextContent('30. September 2026');
    expect(onChange).not.toHaveBeenCalled();
  });
});
